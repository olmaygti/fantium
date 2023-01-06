const blockchainWorker = require('./blockchainListener.js');
const kafkaWorker = require('./kafkaListener.js');

module.exports = [blockchainWorker, kafkaWorker];
