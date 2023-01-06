import React from 'react';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from 'components/header';
import Copyright from 'components/copyright';

export default function Layout({ children }) {

	return (
		<Container maxWidth="lg">
			<Header/>
			<Box my={20}>
				{children}
				<Copyright />
			</Box>
		</Container>
	);
}
