const { Kafka } = require('kafkajs');

class KafkaService {
	constructor() {
		this.kafka = new Kafka({
			clientId: 'my-app',
			brokers: ['localhost:9092'],
		});
	}

	async send(key, message) {
		const producer = this.kafka.producer();

		await producer.connect();
		await producer.send({
			topic: 'Events',
			messages: [{
				key,
				value: JSON.stringify(message),
			}],
		});
	}

	async subscribe(topic, handler) {
		const consumer = this.kafka.consumer({
			groupId: 'web3-group',
		});

		await consumer.connect();
		await consumer.subscribe({
			topic,
		});

		return consumer.run({ eachMessage: handler });
	}
}

module.exports = { kafkaService: new KafkaService() };
