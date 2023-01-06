const Web3 = require('web3');

const tokenContractAbi = require('../../abis/fantiumToken.json');

class Web3Service {
	constructor(wsConnection) {
		const provider = wsConnection
			? new Web3.providers.WebsocketProvider(process.env.RPC_URL)
			: new Web3.providers.HttpProvider(`http://${process.env.RPC_URL}`);

		this.web3 = new Web3(provider);
	}


	getTokenContract() {
		return new this.web3.eth.Contract(tokenContractAbi, process.env.TOKEN_ADDRESS);
	}
}

module.exports = { Web3Service };
