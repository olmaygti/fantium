# FANtium API


This project contains the seed for a thin API layer for the FANtium platform. 

It's using [Java 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) and the great [Micronaut Framework](https://docs.micronaut.io/3.5.1/guide/index.html) to run, connecting to a [postgresql](https://www.postgresql.org/) database and a [Kafka broker](https://kafka.apache.org/).


Right now it's tracking:

* All token collections within the contract.
* Allowed minters for each collection.
* All NFT minted for each collection.


This is mostly a *read* API, offering this data to the UI and thus minimizing interactions with the contract itself, but it is also connected with the [Web3 backend](https://github.com/olmaygti/fantium/tree/master/back/web3) through Kafka, providing two more essential features:

* It will *proxy* the IPFS upload requests by token minters to the [Web3 backend](https://github.com/olmaygti/fantium/tree/master/back/web3), so the UI Javascript code doesn't deal with IPFS keys or other sensitive secrets.
* It listens to all relevant contract events that are sent through Kafka and broadcast them to all the UI clients using [WebSockets](https://en.wikipedia.org/wiki/WebSocket).
    - This way, we save the need to implement polling mechanisms from our UI clients to track transactions statutes (or directly creating WS connections to the blockhain from the browser).




