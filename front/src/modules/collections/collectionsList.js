import React from 'react';

import Button from '@material-ui/core/Button';

import { DataGrid } from '@mui/x-data-grid';

import Inject from 'root/inject';

import 'root/services';

import NewCollection from './newCollection';
import ManageCollection from './manageCollection';
import MintToken from './mintToken';

import { useWithBackendEvent } from 'root/hooks';


export default  Inject(['api', 'web3Service'], function CollectionsList({ userAddress, isAdmin }) {
	const [collections, setCollections] = React.useState([]);
	const [managedCollection, setManagedCollection] = React.useState(false);
	const [collectionToMint, setCollectionToMint] = React.useState(false);
	const [newCollection, setNewCollection] = React.useState(false);
	const [txHash, setTxHash] = React.useState(false);

	const fetchColections = async () => setCollections(await this.api.listNftCollections());

	const newTxMinedEvent = useWithBackendEvent('TX_MINED');

	React.useEffect(() => {
		if (newTxMinedEvent?.hash === txHash) {
			setTimeout(() => fetchColections(), 500);
		}
	}, [newTxMinedEvent]);

	React.useEffect(() => { fetchColections() }, []);

	const closeNewCollectionWindow = async (newCollectionHash) => {
		setNewCollection(false);
		if (newCollectionHash) {
			setTxHash(newCollectionHash);
			fetchColections();
		}
	}

	const closeMintNewTokenWindow = async (newTokenHash) => {
		setCollectionToMint(null);
		if (newTokenHash) {
			setTxHash(newTokenHash);
			fetchColections();
		}
	}

	return (
		<div style={{ height: 300, width: '100%' }}>
			{ isAdmin && <Button
				variant="contained"
				color="primary"
				onClick={() => setNewCollection(true)}>
				Create collection
			</Button> }
			<DataGrid
				rows={collections}
				columns={[
					{ field: 'id', headerName: 'ID', flex: 0.1 },
					{ field: 'athleteName', headerName: 'AthleteName', flex: 0.3 },
					{ field: 'season', headerName: 'Season', flex: 0.2 },
					{ field: 'tokensMinted', headerName: 'Tokens Minted', flex: 0.2 },
					{
						field: 'shareLeft',
						headerName: 'Share Left',
						flex: 0.2,
						valueGetter: ({ row }) => (
							row.shareLeft ? `${parseFloat(row.shareLeft / 1000).toFixed(3)}%` : '-'
						),
					},
					{
						field: 'actions',
						headerName: 'Actions',
						flex: 0.5,
						renderCell: ({ row }) => (
							Number.isInteger(row.contractId)
								? isAdmin
									? <div>
										<Button
											color="primary"
											onClick={() => setManagedCollection(row)}>
											Manage minters
										</Button> |
									</div>
								: <Button
										color="primary"
										onClick={() => setCollectionToMint(row)}>
										Mint token
									</Button> 
								: 'Waiting for contract sync'
						),
					},
				]}
			/>
			{ newCollection && <NewCollection open={newCollection} close={closeNewCollectionWindow}/>}
			{ managedCollection && <ManageCollection
				collection={managedCollection}
				open={!!managedCollection}
				close={() => setManagedCollection(null)}/>
			}
			{ collectionToMint && <MintToken
				collection={collectionToMint}
				userAddress={userAddress}
				open={!!collectionToMint}
				close={closeMintNewTokenWindow}/>
			}
		</div>
	);
});
