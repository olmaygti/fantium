package com.fantium.dtos.events;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class NewCollectionDTO extends TransactionMinedDTO {
    private Long collectionId;
    
    private Long correlationId;
}
