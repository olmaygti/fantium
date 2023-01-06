const createRestConfig = (domainName, baseConfig = {}) => {
	const namespace = `/${domainName[0].toLowerCase()}${domainName.slice(1)}s`;
	return {
		[`get${domainName}`]: { uri: `${namespace}/{id}`, method: 'GET' },
		[`update${domainName}`]: { uri: `${namespace}/{id}`, method: 'PUT' },
		[`delete${domainName}`]: { uri: `${namespace}/{id}`, method: 'DELETE' },
		[`save${domainName}`]: { uri: namespace, method: 'POST' },
		[`list${domainName}s`]: { uri: namespace, method: 'GET' },
		...baseConfig,
	};
};


export default {
	login: { uri: '/login', method: 'POST' },
	...createRestConfig('NftCollection', {
		mintToken: { uri: '/nftCollections/{collectionId}', method: 'POST' },
	}),
	...createRestConfig('Tokens', {
		myTokens: { uri: '/tokens/myTokens' },
	}),
	
	getCollectionMinters: { uri: '/collectionMinter/{collectionId}', method: 'GET'},
};
