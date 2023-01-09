# FANtium Web3 Backend


This is a very simple Node project that aims to hold backend Web3 logic.

It communicates with the [Java backend](https://github.com/olmaygti/fantium/tree/master/back/fantium-api) through Kafka, encapsulates logic to upload token assets to [IPFS](https://en.wikipedia.org/wiki/InterPlanetary_File_System) and directly connects to the blockchain using websockets to listen to [relevant events](https://github.com/olmaygti/fantium/blob/ff949566d5560b8bfdf4bb4fd56d7bbc6d3d5c96/back/web3/src/workers/blockchainListener.js#L5) from the FANtium contract.
