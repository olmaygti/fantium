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
		eventName: 'TokenMinted',
		kafkaKey: 'TOKEN_MINTED',
		values: ['owner', 'tokenId', 'collectionId', 'tokenUri', 'share'],
	},
	
];

async function run() {
	do {
		console.log('Creating new WS connection');
		const web3Service = new Web3Service();

		await subscribeToEvents(web3Service);

		await new Promise((resolve) => {
			web3Service.on('disconnection', () => {
				console.log('\n\nWeb3service disconnection\n\n');
				resolve();
			});
		});

		console.log('Waiting to reopen connection');

		await new Promise((resolve) => setTimeout(resolve, 5000));
	} while(true)
};

async function subscribeToEvents(web3Service) {
	const contract = web3Service.getTokenContract();


	CONFIG.forEach((config) => {
		console.log(`Configuring handler for ${config.eventName} event.`);
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
