import React from 'react';

import { useSelector } from 'react-redux';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Card from '@mui/material/Card';

import Inject from 'root/inject';

import 'root/services';

import CollectionsList from './collectionsList';
import MyTokens from './myTokens';


export default Inject(['web3Service'], function Home() {
	const [selectedTab, setSelectedTab] = React.useState(0);

	const [isAdmin, setAdmin] = React.useState(false);

	const userAddress = useSelector(({ session }) => session?.user?.username);

	React.useEffect(() => {
		(async () => {
			const contract = await this.web3Service.getConnectedNftContract();
			const owner = await contract.owner();
			setAdmin(owner === userAddress);
		})();
	}, []);



	return (
		<div>
			<Card>
				{ isAdmin && <CollectionsList isAdmin={isAdmin} userAddress={userAddress}/> }
				
				{ !isAdmin &&
					<Tabs
						value={selectedTab}
						onChange={(evt, value) => setSelectedTab(value)}>
						<Tab
							key={0}
							label="Collections"
						/>
						<Tab
							key={1}
							label="My Tokens"
						/>

					</Tabs>
				}
				{ !isAdmin && selectedTab === 0 && <CollectionsList isAdmin={isAdmin} userAddress={userAddress}/> }
				{ !isAdmin && selectedTab === 1 && <MyTokens isAdmin={isAdmin} userAddress={userAddress}/> }
			</Card>
		</div>
	);
});