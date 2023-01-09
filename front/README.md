# FANtium UI


This is the FANtium UI project, a [NextJS](https://nextjs.org/) application that offers administration for the FANtium contract.

**DISCLAIMER**: This UI has only been tested with [Metamask](https://docs.metamask.io/guide/), so it's likely to fail if other Wallet Providers are used while testing it :)

The UI combines a mixture of both API and contract queries to show all the information it displays; the idea is that all non-blockchain calls should be *cheaper* than contract queries, so I am using traditional web2 data fetching when possible, and only hit the contract to make transactions or fetch **important** data that we would like to have **REAL TIME** such as contract ownership or minting privileges.

The application has only two main:


## Landing page

It that just shows a Login button that will:
* Switch to the configured FANtium network, adding it to Metamask if not already present:
    * Goerli by default for *production* environment.
    * Local ganache for development.
* Perform [login](https://github.com/olmaygti/fantium/blob/master/back/fantium-api/src/main/java/com/fantium/auth/AuthenticationProviderUserPassword.java) with the backend:
    * Just signing a message with your wallet that gets verified by our backend, given back a valid JWT token for that session.

## Home page

It will render the list of created collections and, depending on the uers's role:

* If the logged in user is the contract owner, it will allow her to:
  * Create new collections: will send a transaction to add a new collection to the contract.
  * Manage minters of a given collection, allowing to add new minters or revoke already existing ones.


* If the logged in user is a contract minter, it will allow him to:
  * Mint new tokens for the collections he's allowed to.
  * Access the list of FANtium tokens he alreay owns.

## Tracking transactions

To avoid polling the blockchain to track when UI sent transactions are mined, the application is receiving this information from the Java Backend through WebSockets and thanks to the transaction mined [event handler](https://github.com/olmaygti/fantium/blob/master/back/fantium-api/src/main/java/com/fantium/events/processors/EventProcessor.java).

However, in terms of UX, I didn't have time to build any visual tracking for this :(. So when the UI sends a successful transaction you will see no immediate feedback, but when the `TX_MINED` is received through the websocket then the UI should be refreshed (i.e. after creating a new collection, it's status should get automatically updated).

Please open the network inspector to track this flow :)




There's a bug I couldn't yet solve though (🐛). When a new token is minted, even though the information comes back to the UI through the WebSocket, I wasn't able to get the collection list to refresh automatically to reflect the new share left of the collection.

So please be aware that this feature won't work from the minter's UI and you'll have to hard refresh the page to fetch updated data.