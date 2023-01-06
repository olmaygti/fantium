package com.fantium.bootstrap;

import com.fantium.repositories.NftCollectionRepository;

import io.micronaut.runtime.event.annotation.EventListener;
import io.micronaut.runtime.server.event.ServerStartupEvent;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

@Singleton
public class ApplicationBootstrapper {

    @Inject
    private NftCollectionRepository collectionRepository;

    @EventListener
    public void onStart(ServerStartupEvent event) {
        // if (this.collectionRepository.findAll().isEmpty()) {
        //     this.collectionRepository.save(new NftCollection()
        //         .description("Dominics collection 2023"));
        // }
    }
    
}
