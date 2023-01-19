const Web3 = require('web3');
const { EventEmitter } = require('events');

const tokenContractAbi = require('../../abis/fantiumToken.json');

class Web3Service extends EventEmitter {
	constructor() {
		super();
		this.init();
	}

	init() {
		this.provider = new Web3.providers.WebsocketProvider(process.env.RPC_URL);

		this.web3 = new Web3(this.provider);

		this.provider.connection.addEventListener('open', () => {
			console.log('connection stablished');
		});

		this.provider.connection.addEventListener('close', () => {
			console.log('connection closed');
			this.emit('disconnection')
		});
	}


	getTokenContract() {
		return new this.web3.eth.Contract(tokenContractAbi, process.env.TOKEN_ADDRESS);
	}
}

module.exports = { Web3Service };
