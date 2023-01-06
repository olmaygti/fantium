const workers = require('./src/workers');

const { Web3Service } = require('./src/services/web3Service');

const envFile = process.env.LOCAL_ENV ? '.env.local' : '.env';

require('dotenv').config({ path: envFile });

async function run() {
	await Promise.all(workers.map((it) => it.run()));
}

run();
