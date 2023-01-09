# FANtium Contracts

Welcome to the Solidity Contracts repository for the Fantium Code challenge.

There are some discrepancies with the original challenge specs:


  * I created an [ERC-1155](https://eips.ethereum.org/EIPS/eip-1155) contract instead of the requested ERC-721 as I think is more convenient to have all the NFTs constrained into a single solidity contract.
  * In the future, we could also take advantage of the `*Batch` methods that the interface offers, as well as the possibility that it offers to mix NFTs with standard "ERC-20 alike" fungible tokens.
  * As the contract is meant to held all the NFTs for all Fantium Athlete's, I created the concept of "NFT Collection":
    * The owner can add new collections to the contract.
    * Once a collection is created, she can add/remove minting privileges for an specific collection as requested. Once a new token is minted, the minting permission is immediately revoked.
  * For each collection, a maximum of 100000 tokens are permitted to allow 0.001% share granularity for each token.
  * The tokenIds live in fixed namespaces of 100000 virtual ids, that is, tokens for collection 0 will go from 0 to 99999, collection 1 will use [100000,199999], and so on.
  * The base implementation is taken from OZ's [ERC-1155 reference](https://docs.openzeppelin.com/contracts/3.x/erc1155).
    * The method's signature to `mint`/`mintBatch` is respected, so the minter passes by the tokenId(s) and also the quantities. However:
      * Internal validation is done to ensure the tokenId(s) are all consecutive, so the collection is easier to handler, with no gaps inside them.
      * The quantities are being ignored; because the contract right now behaves as a NFT contract (ignoring the fungible tokens minting capabilities) each NFT is tracked in the `CollectionToken` struct with a 1-1 relationship, and the associated amounts passed by when minted are *irrelevant*, whether they're 1 or more.
    * In order to be able to mint batches of tokens with one single transaction, still providing both the IPFS token uris and the share of each token in the call, I used a kinda esoteric method to provide that information along within the transaction :), using the `bytes memory data` final argument to the `mint`/`mintBatch` methods:
      * It has to contain a comma separated list of `$uri-$tokens` pairs (each pair has to be tokenized with a hyphen `-`).
      * A valid value would be `0x746f6b656e5572692d313030303030`, which is the hex representation of the string `tokenUri-100000`.

  * I *HAVE NOT* implemented the requested `tokenURI` interface.
    * Following the [EIP extension standard](https://eips.ethereum.org/EIPS/eip-721) tokenUri(uint) retuns a string, not a JSON structure. I hope the spec was wrong intentionally :D.
    * The information that was requested to be provided originally is queryable though, through the following methods:
      * collections(uint collectionId)
      * getTokenInfo(uint tokenId).


Both the deployer address and the secret key to use [Alchemy](https://www.alchemy.com/) gateway to access Goerli are hardcoded within the code base, please forgive me :).
