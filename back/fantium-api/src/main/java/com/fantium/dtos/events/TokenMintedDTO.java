package com.fantium.dtos.events;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TokenMintedDTO extends TransactionMinedDTO {

    private String owner;
    private Long tokenId;
    private Long collectionId;
    private String tokenUri;
    private Long share;
}
