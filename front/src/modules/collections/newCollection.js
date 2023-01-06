import React from 'react';

import styled from '@emotion/styled';

import { TextField} from '@mui/material';
import Button from '@material-ui/core/Button';

import Dialog from 'components/dialog';

import Inject from 'root/inject';


const FormRow = styled.div`
	margin-bottom: 10px;
`;

export default Inject(['api', 'web3Service'], function NewCollection({ open, close}) {
	const [athleteName, setAthleteName] = React.useState('');
	const [season, setSeason] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [benefit1, setBenefit1] = React.useState('');
	const [benefit2, setBenefit2] = React.useState('');

	const [overlayMsg, setOverlayMsg] = React.useState();

	const submit = async () => {
		let txHash;
		setOverlayMsg('Saving collection');
		const savedCollection = await this.api.saveNftCollection({
			athleteName,
			description,
			season: Number.parseInt(season),
			benefit1,
			benefit2,
		});


		const contract = await this.web3Service.getConnectedNftContract();

		setOverlayMsg('Waiting for transaction confirmation');

		try {
			const txResult = await contract.addNewCollection(description, savedCollection.id);
			txHash = txResult.hash;
			setOverlayMsg('New collection created');
		} catch(err) {
			await this.api.deleteNftCollection(savedCollection.id);
			txHash = false;
			const errorMsg = err?.data?.message.substring(err?.data?.message.indexOf(':') + 2)
			setOverlayMsg(`Operation failed: ${errorMsg || 'Unknown error'}`);

		}
		setTimeout(() => close(txHash), 2000);
	}

	return (
		<Dialog open={open} modalOverlay={overlayMsg} title="New Collection">
				<div>
					<form>
						<FormRow>
							<TextField
								value={athleteName}
								onInput={(e) => setAthleteName(e.target.value)}
								label="Athlete name"/>
						</FormRow>
						<FormRow>
							<TextField
								value={description}
								onInput={(e) => setDescription(e.target.value)}
								label="Description"/>
						</FormRow>
						<FormRow>
							<TextField
								value={season}
								onInput={(e) => setSeason(e.target.value)}
								label="Season"/>
						</FormRow>
						<FormRow>
							<TextField
								value={benefit1}
								onInput={(e) => setBenefit1(e.target.value)}
								label="First benefit"/>
						</FormRow>
						<FormRow>
							<TextField
								value={benefit2}
								onInput={(e) => setBenefit2(e.target.value)}
								label="Second benefit"/>
						</FormRow>
						<Button
							variant="contained"
							color="primary"
							onClick={submit}>
							Create collection
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => close()}>
							Close
						</Button>
					</form>
				</div>
		</Dialog>
	);
});
