CREATE TABLE nft_token (
    id SERIAL NOT NULL  UNIQUE PRIMARY KEY,
    owner  VARCHAR(42) NOT NULL,
    cid  VARCHAR(60) NOT NULL UNIQUE,
    share NUMERIC NOT NULL,
    token_id NUMERIC NOT NULL,
    collection_id INTEGER REFERENCES nft_collection (id)
);
