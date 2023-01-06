package com.fantium.events.processors;

import com.fantium.dtos.events.NewCollectionDTO;

import jakarta.inject.Named;
import jakarta.inject.Singleton;

@Singleton
@Named("NEW_COLLECTION")
public class NewCollectionProcessor extends EventProcessor {
    @Override
    public void processEvent(String key, String msg) {
        NewCollectionDTO payload = mapper.parseMsg(msg, NewCollectionDTO.class);

        nftCollectionRepository.findById(payload.getCorrelationId())
            .ifPresent(nftCollection -> {
                nftCollection.setContractId(payload.getCollectionId());
                nftCollection.setTokensMinted(0l);
                nftCollection.setShareLeft(100000l);
                nftCollectionRepository.update(nftCollection);
            });

        super.processEvent(key, msg);
    }
}