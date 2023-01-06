package com.fantium.dtos.events;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MinterChangeDTO extends TransactionMinedDTO {
    private Long collectionId;
    
    private String address;
    
}
