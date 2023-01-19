# FANtium Platform

Welcome to my solution for the Fantium Code Challenge!

The application is live at [https://fantium-olmaygti.vercel.app](https://fantium-olmaygti.vercel.app/) and in order to access the application you'll need to have metamask installed in your browser.

You can import the [contract owner wallet](https://github.com/olmaygti/fantium/blob/ca856374679c1afcdb5799c66c1b00a2873a7f90/contracts/truffle-config.js#L82) to login in the application with administrator privileges.

The contract is deployed in goerli network at [0xc8fC174030C9E3EBb69632FFF4157Be76fa2BCe2](https://goerli.etherscan.io/address/0xc8fC174030C9E3EBb69632FFF4157Be76fa2BCe2).


This platform consists of 4 main components:

* [Contracts](https://github.com/olmaygti/fantium/tree/master/contracts) project containing the [FantiumMetaToken.sol](./contracts/contracts/FantiumMetaToken.sol) contract, holding all the NFT shares for all Fantium Athletes.

* [Fantium API](https://github.com/olmaygti/fantium/tree/master/back/fantium-api) offering a thin layer of services to our clients.

* [Fantium UI](https://github.com/olmaygti/fantium/tree/master/front): simple UI for admins/minters to manage Athletes collections.

* [Fantium Web3](https://github.com/olmaygti/fantium/tree/master/back/web3): a simple NodeJS backend to interact with blockchain related technologies.



## Application deployment

* The UI NextJS is deployed and host by [Vercel](https://vercel.com/dashboard).
* For the Java and Web3 backends, I'm using two AWS EC2 micro instances.
  * For the Web3 project, I manually set up the environment through SSH (mostly installing [nvm](https://github.com/nvm-sh/nvm) to manage Node).
  * The Java Backend runs with SSL under the DNS name `api.fantium.olmaygti.com` so:
    * The [infra](https://github.com/olmaygti/fantium/tree/master/infra) project contains ansible descriptors to bootstrap an EC2 machine with Java, to generate the SSL certificate for the aforementioned domain name, and to run an HAProxy instance as the entry point to route traffic to the backend server.
    * The HAProxy is completely unnecessary at this project's stage, but I love it and use on every project I work on :)
* The [Kafka broker](https://kafka.apache.org/documentation/) runs in another EC2 instance. This is one machine I had already running for a personal project I'm working on.
* The postgresql database is run as a service using [AWS RDS](https://aws.amazon.com/rds/?trk=fa2f76d8-422d-4a11-9d8c-b8c8d407fe2f&sc_channel=ps&s_kwcid=AL!4422!3!549068929568!e!!g!!amazon%20relational%20database&ef_id=CjwKCAiAk--dBhABEiwAchIwkcDFJJRP1EuDTHiSJD1vPHhr8ZnzDTnXTU204bdum816oSvTN4gPChoC9AkQAvD_BwE:G:s&s_kwcid=AL!4422!3!549068929568!e!!g!!amazon%20relational%20database).


## Discussion:

A list of possible tasks to continue on this project:

* **WRITE TESTS**: I'm ashamed of delivering this application without any test, this should get fixed ASAP :)
* Add UI/Backend handling to allow users to transfer their tokens to other wallets.
* Complete UI validation: there are forms in the application that contains no validation (new collection Dialog), and other where the logic/feedback could be improved.
* Review and adjust DB SQL types for efficiency.
* Add roles (ADMIN/MINTER) and validation in the backend:
  * Only ADMINs should be able to add/delete collections in the DB.
  * Only MINTERs should be entitled to upload token assets to IPFS.
* Remove api keys, secrets, and owner private key from source control.
  * Yet another thing to be ashamed!.
  * All this information should be kept elsewhere (I'd choose [KMS](https://aws.amazon.com/es/kms/))
* Refactor all string literals throughout the codebase and extract them to Enum types or appropiate structure.
* Listen for wallet disconnections/network changes:
  * This is only checked in the login screen, if the user changes network while logged in the application is not reacting.
* Add backend transactions
  * At least [TokenMintedProcessor](https://github.com/olmaygti/fantium/blob/master/back/fantium-api/src/main/java/com/fantium/events/processors/TokenMintedProcessor.java) performs two database writes that should be transaction.
  * Scan the codebase for other suitable places to incorporate them.
* Add an i18n library and remove harcoded english messages in the UI.
* Add cron jobs to look for missing blockchain events
  * Query contract status to identify inconsistencies
  * Query past contract events to access the missing information
