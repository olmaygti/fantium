const { Web3Service } = require('../services/web3Service.js');
const { kafkaService } = require('../services/kafkaService.js');


const CONFIG = [
	{
		eventName: 'NewCollection',
		kafkaKey: 'NEW_COLLECTION',
		values: ['description', 'collectionId', 'correlationId'],
	},
	{
		eventName: 'MinterAllowed',
		kafkaKey: 'MINTER_ALLOWED',
		values: ['addr', 'collectionId'],
	},
	{
		eventName: 'MinterRevoked',
		kafkaKey: 'MINTER_REVOKED',
		values: ['addr', 'collectionId'],
	},
	{
		eventName: 'MinterRevoked',
		kafkaKey: 'MINTER_REVOKED',
		values: ['addr', 'collectionId'],
	},
	{
		eventName: 'TokenMinted',
		kafkaKey: 'TOKEN_MINTED',
		values: ['owner', 'tokenId', 'collectionId', 'tokenUri', 'share'],
	},
	
];

async function run() {
	const web3Service = new Web3Service(true);
	const contract = web3Service.getTokenContract();


	CONFIG.forEach((config) => {
		contract.events[config.eventName]({}, async (err, evt) => {
			console.log(`${config.eventName} event received: ${JSON.stringify(evt?.returnValues, null, '\n')}`);

			const kafkaPayload = config.values.reduce((payload, evtKey) => ({
				...payload,
				[evtKey === 'addr' ? 'address' : evtKey]: evt.returnValues[evtKey],
			}), {
				transactionHash: evt.transactionHash,
			});

			console.log('Emitting evt payload ', kafkaPayload);

			await kafkaService.send(config.kafkaKey, kafkaPayload);
		});
	});
}

module.exports = { run };
