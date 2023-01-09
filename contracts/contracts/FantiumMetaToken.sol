pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "./utils/strings.sol";

contract FantiumMetaToken is ERC1155, Ownable, ERC1155Supply {
    event NewCollection(string description, uint256 collectionId, int256 correlationId);
    event MinterAllowed(address addr, uint256 collectionId);
    event MinterRevoked(address addr, uint256 collectionId);

    event TokenMinted(address owner, uint256 tokenId, uint256 collectionId, string tokenUri, uint256 share);

    uint256 public constant MAX_TOKENS_PER_COLLECTION = 100000;
    uint256 collectionCounter;

    string private _baseURI;

    struct TokenCollection {
        string description;
        uint256 shareLeft;
        uint256 supply;
        mapping(address => bool) approvedMinters;
    }

    struct CollectionToken {
        uint256 id;
        uint256 collectionId;
        uint256 share;
        string tokenUri;
    }

    mapping(uint256 => TokenCollection) public collections;
    mapping(uint256 => CollectionToken) private _tokens;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC1155("https://assets.fantium.olmaygti.com/tokens/${id}.json") {
        _setBaseURI("https://ipfs.io/ipfs/");
        collectionCounter = 0;
    }

    function addNewCollection(string memory description, int256 correlationId) external onlyOwner {
        TokenCollection storage newCollection = collections[collectionCounter];
        newCollection.description = description;
        newCollection.shareLeft = 100000;
        newCollection.supply = 0;
        emit NewCollection(description, collectionCounter++, correlationId);
    }

    function allowMinter(uint256 collection, address allowedAddress) external onlyOwner {
        require(bytes(collections[collection].description).length > 0, "Collection does not exist");
        require(allowedAddress != owner(), "Contract owner is already allowed to mint tokens");
        require(!collections[collection].approvedMinters[allowedAddress], "Address is already allowed");
        collections[collection].approvedMinters[allowedAddress] = true;
        emit MinterAllowed(allowedAddress, collection);
    }


    function revokeMinter(uint256 collection, address revokedAddress) external onlyOwner {
        require(bytes(collections[collection].description).length > 0, "Collection does not exist");
        require(collections[collection].approvedMinters[revokedAddress], "Address is not a minter");
        collections[collection].approvedMinters[revokedAddress] = false;
        emit MinterRevoked(revokedAddress, collection);
    }

    function isAllowedToMint(uint256 collection, address addr) public view returns (bool) {
        return owner() == addr || collections[collection].approvedMinters[addr];
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        if (from == address(0)) { // We're minting
            strings.slice memory s = strings.toSlice(string(data));
            strings.slice memory tokenDelimiter = strings.toSlice(",");
            uint urisSize = strings.count(s, tokenDelimiter) + 1;
            require(urisSize == ids.length);

            for(uint i = 0; i < ids.length; i++) {
                require(totalSupply(ids[i]) == 0, "Token already exists");

                uint256 collectionId = ids[i] / (MAX_TOKENS_PER_COLLECTION);

                require(collections[collectionId].supply == (ids[i] - (collectionId * MAX_TOKENS_PER_COLLECTION)), "Wrong token id sequence");
                require(isAllowedToMint(collectionId, operator), "Address not allowed to mint new tokens");

                string memory tokenInfo = strings.toString(strings.split(s, tokenDelimiter));

                CollectionToken memory tokenDetails  = _newTokenDetails(tokenInfo, ids[i], collectionId);

                _setURI(ids[i], tokenDetails.tokenUri);

                collections[collectionId].supply++;

                if (operator != owner()) {
                    collections[collectionId].approvedMinters[operator] = false;
                    emit MinterRevoked(operator, collectionId);
                }

                emit TokenMinted(to, ids[i], collectionId, tokenDetails.tokenUri, tokenDetails.share);
            }
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function _newTokenDetails(string memory tokenData, uint256 tokenId, uint256 collectionId) private returns (CollectionToken memory) {
        strings.slice memory inTokenDelimiter = strings.toSlice("-");
        strings.slice memory left = strings.toSlice(tokenData);

        string memory tokenURI = strings.toString(strings.split(left, inTokenDelimiter));
        string memory stringShare = strings.toString(strings.split(left, inTokenDelimiter));

        uint tokenShare = stringToUint(stringShare);

        require(tokenShare <= collections[collectionId].shareLeft, "Not enough share left for this collection");

        _tokens[tokenId] = CollectionToken(tokenId, collectionId, tokenShare, tokenURI);

        collections[collectionId].shareLeft -= tokenShare;

        return _tokens[tokenId];

    }

    // Customized from OpenZeppelin's ERC1155URIStorage contract
    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];
        // If token URI is set, concatenate base URI and tokenURI (via abi.encodePacked).
        return bytes(tokenURI).length > 0 ? string(abi.encodePacked(_baseURI, tokenURI, "/metadata.json")) : super.uri(tokenId);
    }

    /**
     * @dev Sets `tokenURI` as the tokenURI of `tokenId`.
     */
    function _setURI(uint256 tokenId, string memory tokenURI) internal virtual {
        _tokenURIs[tokenId] = tokenURI;
        emit URI(uri(tokenId), tokenId);
    }

    /**
     * @dev Sets `baseURI` as the `_baseURI` for all tokens
     */
    function _setBaseURI(string memory baseURI) internal virtual {
        _baseURI = baseURI;
    }

    function collectionTotalSupply(uint256 collectionId) public view returns (uint256) {
        return collections[collectionId].supply;
    }

    function getTokenInfo(uint256 tokenId) external view returns (uint256, string memory) {
        return (_tokens[tokenId].share, _tokens[tokenId].tokenUri);
    }

    function stringToUint(string memory s) public pure returns (uint) {
        bytes memory b = bytes(s);
        uint result = 0;
        for (uint256 i = 0; i < b.length; i++) {
            uint256 c = uint256(uint8(b[i]));
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
        return result;
    }
}