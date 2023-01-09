# FANtium Platform

Fantium Code Challenge

Welcome to my solution for the Fantium Code Challenge!

In order to access the application you'll need to have metamask installed in your browser. You can import the [contract owner wallet](https://github.com/olmaygti/fantium/blob/ca856374679c1afcdb5799c66c1b00a2873a7f90/contracts/truffle-config.js#L82) to login in the application with administrator privileges.


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