import React from 'react';

import styled from '@emotion/styled';

import { TextField} from '@mui/material';
import Button from '@material-ui/core/Button';

import Dialog from 'components/dialog';

import Inject from 'root/inject';

import { useWithBackendEvent } from 'root/hooks';

const ErrorRow = styled.div`
	color: red;
	padding: 10px;
`;

const MAX_TOKENS_PER_COLLECTION = 100000;

export default Inject(['web3Service', 'api'], function MintToken({
	open, close, collection, userAddress,
}) {
	const [overlayMsg, setOverlayMsg] = React.useState();
	const [share, setShare] = React.useState('');
	const [shareLeft, setShareLeft] = React.useState();
	const [error, setError] = React.useState(false);
	const [helperText, setHelperText] = React.useState();

	const uploadComplete = useWithBackendEvent('UPLOAD_COMPLETE');


	React.useEffect(() => {
		if (!error) {
			setHelperText('Share units are in milli-cents');
		}
	}, [error]);


	React.useEffect(() => {
		(async () => {
			const contract = await this.web3Service.getConnectedNftContract();
			
			const allowed = await contract.isAllowedToMint(collection.contractId, userAddress);
			if (!allowed) {
				setOverlayMsg(`Now allowed to mint on ${collection.athleteName} collection`);
				setTimeout(close, 2000);
			} else {
				const collectionDetails = await contract.collections(collection.contractId);
				setShareLeft(collectionDetails.shareLeft.toNumber());
			}
		})();
	}, []);


	React.useEffect(() => {
		if (uploadComplete) {
			setOverlayMsg('Waiting for transaction');
			const tokenInfoBundle = `${uploadComplete.cid}-${share}`;
			const contractCallData = [...tokenInfoBundle].map(it => Number(it.charCodeAt(0)).toString(16)).join('');
			(async () => {
				let txHash = true;

				const contract = await this.web3Service.getConnectedNftContract();
				const collectionTokens = await contract.collectionTotalSupply(collection.contractId);

				const newTokenId = (MAX_TOKENS_PER_COLLECTION * collection.contractId) + collectionTokens.toNumber();

				try {
					const txResult = await contract.mint(userAddress, newTokenId, 1, `0x${contractCallData}`);
					txHash = txResult.hash;
					setOverlayMsg('New token minted');
				} catch(err) {
					txHash = false;
					const errorMsg = err?.data?.message.substring(err?.data?.message.indexOf(':') + 2)
					setOverlayMsg(`Operation failed: ${errorMsg || 'Unknown error'}`);

				}
				setTimeout(() => close(txHash), 1500);
			})();
		}
	}, [uploadComplete]);

	const startMintingFlow = async () => {
		setOverlayMsg('Uploading assets to IPFS')
		await this.api.mintToken(collection.id, { tokenShare: Number.parseInt(share) });
	}

	const setAndValidateShare = (newValue) => {
		setShare(newValue);
		const parsed = Number.parseInt(newValue);
		if (Number.isNaN(parsed)) {
			setHelperText('Introduce a valid number');
			setError(true);
		} else if (parsed > shareLeft) {
			setHelperText('Amount cannot exceed current share left');
			setError(true);
		} else {
			setError(false);
		}
	}

	return (
		<Dialog open={open} close={close} modalOverlay={overlayMsg} title={`New ${collection.athleteName} collection token`}>
			<div>
				{ error && <ErrorRow> { error } </ErrorRow> }
				<form>
					<div>
						<TextField
							value={share}
							error={error}
							helperText={helperText}
							onInput={(e) => setAndValidateShare(e.target.value)}
							label="Share"/>
					</div>
					<Button
						variant="contained"
						color="primary"
						disabled={error}
						onClick={startMintingFlow}>
						Mint new token
					</Button>
				</form>
			</div>
		</Dialog>
	);
});
