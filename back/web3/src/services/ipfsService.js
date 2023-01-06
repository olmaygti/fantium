const { Web3Storage, File  } = require('web3.storage');

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM2MzU5ODkzQmU5ZDI3MzRGOTdjZkI0ZWZlYjNlNDY4NjQ0NzBGNDYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA0OTQ4MzM1ODgsIm5hbWUiOiJkZXZlbG9wIn0.F0xtOvujRkc4rSx0CRFykfXBRd4ETC8Y9I5VIF0Wmh4';

class IpfsService {
	async storeAsset (payload) {
		const client = new Web3Storage({ token: apiKey });
		const metadata = new File([Buffer.from(JSON.stringify(payload))], 'metadata.json');
		return client.put([metadata]);
	}
}

module.exports = { IpfsService };
