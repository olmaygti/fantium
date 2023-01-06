import React from 'react';

import styled from '@emotion/styled';

import Button from '@material-ui/core/Button';
import { DataGrid } from '@mui/x-data-grid';

import Dialog from 'components/dialog';

import Inject from 'root/inject';

import { useWithBackendEvent } from 'root/hooks';


const ErrorRow = styled.div`
	color: red;
	padding: 10px;
`;
	
export default Inject(['api', 'web3Service'], function manageCollection({ open, close, collection }) {
	const [overlayMsg, setOverlayMsg] = React.useState();
	const [minters, setMinters] = React.useState([]);
	const [error, setError] = React.useState();

	const fetchMinters = async () => setMinters(await this.api.getCollectionMinters(collection.id));

	const newTxMinedEvent = useWithBackendEvent('TX_MINED');

	const addNewMinterRow = () => setMinters([{ id: -1, address: 'Enter new ethereum address' }].concat(minters));

	const discardNewMinter = () => {
		setMinters(minters.filter((it) => it.id !== -1));
		setTimeout(() => setError(null));
	};

	const validateNewMinter = (address) => {
		if (address) {
			const validAddress = this.web3Service.isValidAddress(address);
			const existingAddress =  minters.find((it) => it.address === address);
			const error = !validAddress
				? 'Invalid address'
				: existingAddress
					? 'Address is already a minter'
					: null;
			setError(error);
			return error;
		}
	}


	const changeMinterStatus = async (addingMinter, address) => {
		const contract = await this.web3Service.getConnectedNftContract();

		setOverlayMsg('Waiting for transaction confirmation');

		try {
			const methodToCall = addingMinter ? 'allowMinter' : 'revokeMinter';
			await contract[methodToCall](collection.contractId, address);
			setOverlayMsg(addingMinter ? 'New minter added' : 'Minter removed');
			discardNewMinter();
			fetchMinters();
		} catch(err) {
			const errorMsg = err?.data?.message.substring(err?.data?.message.indexOf(':') + 2)
			setOverlayMsg(`Operation failed: ${errorMsg || err?.reason || 'Unknown error'}`);

		}
		setTimeout(() => setOverlayMsg(null), 2000);

	}

	React.useEffect(() => { fetchMinters(); }, []);

	React.useEffect(() => { newTxMinedEvent && fetchMinters() }, [newTxMinedEvent])

	return (
		<Dialog open={open} close={close} modalOverlay={overlayMsg} title={`${collection.athleteName} collection minters`}>
			<Button
				variant="contained"
				color="primary"
				disabled={minters?.findIndex((it) => it.id === -1) !== -1}
				onClick={addNewMinterRow}>
				Add new token minter
			</Button>
			<div style={{ height: 300, width: '100%' }}>
				{ error && <ErrorRow> { error } </ErrorRow> }
				<DataGrid
					rows={minters}
					experimentalFeatures={{ newEditingApi: true }}
					isCellEditable={(params) => params.row.id === -1}
					columns={[
						{
							field: 'address', headerName: 'Address', flex: 0.1, editable: true,
						},
						{
							field: 'actions',
							headerName: 'Actions',
							flex: 0.1,
							renderCell: ({ row }) => (
								row.id === -1
									? <div>
										<Button
											color="primary"
											disabled={!!validateNewMinter(row.address)}
											onClick={() => changeMinterStatus(true, row.address)}>
											Save
										</Button> |
										<Button
											color="secondary"
											onClick={discardNewMinter}>
											Discard
										</Button>
									</div>
									: <Button
										color="secondary"
										onClick={() => changeMinterStatus(false, row.address)}>
										Revoke Minter
									</Button>
							),
						},
					]}/>
			</div>
		</Dialog>
	);
});
