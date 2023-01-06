import React from 'react';

import { DataGrid } from '@mui/x-data-grid';

import Button from '@material-ui/core/Button';

import Inject from 'root/inject';

export default Inject(['api'], function MyTokens() {
	const [tokens, setTokens] = React.useState([]);

	React.useEffect(() => {
		(async () => setTokens(await this.api.myTokens()))();
	}, []);

	return (
		<div style={{ height: 300, width: '100%' }}>

			<DataGrid
				rows={tokens}
				columns={[
					{
						field: 'tokenId',
						headerName: 'TokenId',
						flex: 0.1,
					},
					{
						field: 'Collection',
						headerName: 'Collection',
						flex: 0.5,
						valueGetter: ({ row }) => row.collection.description,
					},
					{
						field: 'share',
						headerName: 'Share',
						flex: 0.2,
						valueGetter: ({ row }) => `${row.share / 1000}%`,
					},
					{
						field: 'Metadata',
						headerName: 'Metadata',
						flex: 0.3,
						renderCell: ({ row }) => (
							<a href={`${process.env.IPFS_GATEWAY}/${row.cid}/metadata.json`}>{row.cid }</a>
						)
					},
					{
						field: 'actions',
						headerName: 'Actions',
						flex: 0.3,
						renderCell: () => (
							<Button
								color="primary"
								onClick={() => alert('Hire me to get this feature done')}>
								Trade token
							</Button> 
						),
					}
				]}
			/>
		</div>
	);
});
