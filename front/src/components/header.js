import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Image from 'next/image';

import AppBar from '@material-ui/core/AppBar';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import LogoutIcon from '@mui/icons-material/Logout';

import { LOGOUT } from 'root/actions';

export default function Header() {
	const dispatch = useDispatch();

	const loggedIn = useSelector(({ session }) => session?.user?.username);

	return (
		<AppBar>
			<Toolbar>
				<Image src="/fantiumLogo.svg" height={100} width={150}/>
				{ loggedIn &&
					<div>
						<Button
							onClick={() => dispatch({ type: LOGOUT })}
							target="_blank">
							<LogoutIcon/>
							Logout
						</Button>
					</div>
				}
			</Toolbar>
		</AppBar>
	);
}
