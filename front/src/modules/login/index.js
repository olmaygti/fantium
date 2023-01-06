import React from 'react';

import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';

import Dialog from 'components/dialog';


import 'root/services';
import Inject from 'root/inject';

import { LOGGED_IN } from 'root/actions';

const LOGIN_MSG = 'loginChallenge'

export default Inject(['web3Service', 'api'], function Index() {
	const dispatch = useDispatch();

	const [loginIn, setLoginIn] = React.useState(false);
	const [overlayMsg, setOverlayMsg] = React.useState();

	const closeLoginDialog = () => {
		setOverlayMsg(null);
		setLoginIn(false);
	}

	const login = async () => {
		setLoginIn(true);
		setOverlayMsg('Switching chains');

		const onTheRightChain = await this.web3Service.switchToFantiumChain();
		if (!onTheRightChain) {
			setOverlayMsg('Please switch to Fantium chain in order to continue');
			setTimeout(closeLoginDialog, 2000);
			return;
		}

		setOverlayMsg('Waiting for login signature');

		const [signatureOrError, address] = await this.web3Service.signMessage(LOGIN_MSG);

		if (!address) {
			setOverlayMsg(`Error ${signatureOrError.message}`);
			setTimeout(closeLoginDialog, 2000);

			return;
		}

		try {
			const user = await this.api.login({ username: address, password: signatureOrError.replace(/0x/, '') });
			dispatch({ type: LOGGED_IN, user });
		} catch (error) {
			setOverlayMsg(`Error ${error.message}`);
			setTimeout(closeLoginDialog, 2000);
		}
	}

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				onClick={login}>
				Login
			</Button>
			<Dialog
				open={loginIn}
				modalOverlay={overlayMsg}
				maxWidth="sm"
				fullWidth
				title="Login in">
			</Dialog>
		</>
	);
});
