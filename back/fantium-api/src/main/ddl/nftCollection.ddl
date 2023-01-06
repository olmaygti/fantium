CREATE TABLE nft_collection (
    id   SERIAL NOT NULL  UNIQUE PRIMARY KEY,
    contract_id NUMERIC,
    description  VARCHAR(80) NOT NULL,
    athlete_name  VARCHAR(42) NOT NULL UNIQUE,
    season  NUMERIC NOT NULL,
    tokens_minted NUMERIC,
    share_left NUMERIC,
    benefit1  VARCHAR(80) NOT NULL,
    benefit2  VARCHAR(80) NOT NULL
);
