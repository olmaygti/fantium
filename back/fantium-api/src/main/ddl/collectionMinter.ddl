CREATE TABLE collection_minter (
    id SERIAL NOT NULL  UNIQUE PRIMARY KEY,
    address  VARCHAR(42) NOT NULL,
    collection_id INTEGER REFERENCES nft_collection (id)
);
