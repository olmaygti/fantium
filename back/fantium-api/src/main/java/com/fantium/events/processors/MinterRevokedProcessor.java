package com.fantium.events.processors;

import com.fantium.dtos.events.MinterChangeDTO;

import jakarta.inject.Named;
import jakarta.inject.Singleton;

@Singleton
@Named("MINTER_REVOKED")
public class MinterRevokedProcessor extends EventProcessor {
    @Override
    public void processEvent(String key, String msg) {
        MinterChangeDTO payload = mapper.parseMsg(msg, MinterChangeDTO.class);

        this.nftCollectionRepository.findByContractId(payload.getCollectionId())
            .ifPresent(nftCollection -> {
                this.minterRepository.findByCollectionIdAndAddress(nftCollection.getId(), payload.getAddress())
                    .ifPresent(minter -> {
                        this.minterRepository.delete(minter);
                    });
            });

        super.processEvent(key, msg);
    }
}