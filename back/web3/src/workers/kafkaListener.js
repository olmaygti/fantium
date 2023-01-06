const { IpfsService } = require('../services/ipfsService');
const { kafkaService } = require('../services/kafkaService.js');


async function run() {
	return kafkaService.subscribe('Commands', async ({ message }) => {
		try {
			const key = message.key?.toString();
			const msgDetails = JSON.parse(message.value.toString());
			console.log('Processing: ', key, ' with msg: ', msgDetails);

			if (key === 'UPLOAD_TOKEN_DETAILS') {
				const cid  = await new IpfsService().storeAsset({
					...msgDetails,
					Share: `${parseFloat(msgDetails.Share / 1000).toFixed(3)}%`,
					userAddress: undefined,
				});

				await kafkaService.send('UPLOAD_COMPLETE', {
					cid,
					...msgDetails,
				});
			}
		} catch (err) {
			console.log('failed with ', err);
		}
	});
}

module.exports = { run };
