# fantium
Fantium Code Challenge

Welcome to my solution for the Fantium Code Challenge!

In order to access the application you'll need to have metamask installed in your browser. You can import the [contract owner wallet](https://github.com/olmaygti/fantium/blob/ca856374679c1afcdb5799c66c1b00a2873a7f90/contracts/truffle-config.js#L82) to login in the application with administrator privileges.


This platform consists of 4 main components:

* Contracts proyect containing the [FantiumMetaToken.sol](./contracts/contracts/FantiumMetaToken.sol) contract, holding all the NFT shares for all Fantium Athletes.

  * I created an [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) contract instead of the requested ERC-721 as I think is more convenient to have all the NFTs constrained into a single solidity contract.
  * In the future, we could also take advantage of the `*Batch` methods that the interface offers, as well as the possibility that it offers to mix NFTs with standard "ERC-20 alike" fungible tokens.
  * As the contract is meant to held all the NFTs for all Fantium Athlete's, I created the concept of "NFT Collection":
    * The owner can add new collections to the contract.
    * Once a collection is created, she can add/remove minting privileges for an specific collection as requested. Once a new token is minted, the minting permission is immediately revoked.
  * I *HAVE NOT* implemented the requested `tokenURI` interface.
    * Following the [EIP extension standard](https://eips.ethereum.org/EIPS/eip-721) tokenUri(uint) retuns a string.
    * The information that was requested to be provided originally is queryable though, through the following methods:
      * collections(uint collectionId)
      * getTokenInfo(uint tokenId)
    
* [Fantium API](https://github.com/olmaygti/fantium/tree/master/back/fantium-api): 
