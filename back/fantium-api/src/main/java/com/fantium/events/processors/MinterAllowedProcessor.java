package com.fantium.events.processors;

import com.fantium.domains.CollectionMinter;
import com.fantium.dtos.events.MinterChangeDTO;

import jakarta.inject.Named;
import jakarta.inject.Singleton;

@Singleton
@Named("MINTER_ALLOWED")
public class MinterAllowedProcessor extends EventProcessor {
    @Override
    public void processEvent(String key, String msg) {
        MinterChangeDTO payload = mapper.parseMsg(msg, MinterChangeDTO.class);

        this.nftCollectionRepository.findByContractId(payload.getCollectionId())
            .ifPresent(nftCollection -> this.minterRepository.save(
                new CollectionMinter()
                    .collection(nftCollection)
                    .address(payload.getAddress()))
            );

        super.processEvent(key, msg);
    }
}