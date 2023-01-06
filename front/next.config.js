const envVariables = ['IPFS_GATEWAY', 'CHAIN_NAME', 'API_ENDPOINT', 'CHAIN_ENDPOINT', 'TOKEN_ADDRESS', 'TOKEN_ADMIN'];

module.exports = {
	pageExtensions: ['page.js'],
	eslint: {
		ignoreDuringBuilds: true,
	},
	env: {
		...envVariables.reduce((vars, varName) => ({
			...vars,
			[varName]: process.env[varName],
		}), {}),
		HTTP: `http${/443/.test(process.env.API_ENDPOINT) ? 's' : ''}`,
		WS: `ws${/443/.test(process.env.API_ENDPOINT) ? 's' : ''}`,
	},
};
