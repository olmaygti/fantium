package com.fantium.events.processors;

import java.util.Map;
import java.util.Objects;

import com.fantium.dtos.events.TransactionMinedDTO;
import com.fantium.repositories.CollectionMinterRepository;
import com.fantium.repositories.NftCollectionRepository;
import com.fantium.repositories.NftTokenRepository;
import com.fantium.services.JSONMapper;
import com.fantium.services.WSBroadcaster;

import jakarta.inject.Inject;

public abstract class EventProcessor {

    @Inject
    protected JSONMapper mapper;

    @Inject
    protected NftCollectionRepository nftCollectionRepository;

    @Inject
    protected CollectionMinterRepository minterRepository;

    @Inject
    protected NftTokenRepository tokenRepository;

    @Inject
    protected WSBroadcaster broadcaster;

    public void processEvent(String key, String msg) {
        TransactionMinedDTO payload = mapper.parseMsg(msg, TransactionMinedDTO.class);

        if (Objects.nonNull(payload)) {
            broadcaster.broadcast(Map.of("type", "TX_MINED", "hash", payload.getTransactionHash()));
        }

    }
}
