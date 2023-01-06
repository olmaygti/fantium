package com.fantium.events.processors;

import com.fantium.domains.NftCollection;
import com.fantium.domains.NftToken;
import com.fantium.dtos.events.TokenMintedDTO;

import jakarta.inject.Named;
import jakarta.inject.Singleton;

@Singleton
@Named("TOKEN_MINTED")
public class TokenMintedProcessor extends EventProcessor{

    @Override
    public void processEvent(String key, String msg) {
        TokenMintedDTO payload = mapper.parseMsg(msg, TokenMintedDTO.class);

        nftCollectionRepository.findByContractId(payload.getCollectionId())
            .ifPresent(nftCollection -> {
                nftCollection.setShareLeft(nftCollection.getShareLeft() - payload.getShare());
                nftCollection.setTokensMinted(nftCollection.getTokensMinted() + 1);

                nftCollectionRepository.update(nftCollection);
                
                tokenRepository.save(new NftToken()
                    .tokenId(payload.getTokenId())
                    .share(payload.getShare())
                    .cid(payload.getTokenUri())
                    .owner(payload.getOwner())
                    .collection(new NftCollection().id(nftCollection.getId())));
        });

        super.processEvent(key, msg);
    }
}
