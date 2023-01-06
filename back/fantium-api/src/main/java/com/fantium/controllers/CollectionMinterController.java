package com.fantium.controllers;

import java.util.List;

import com.fantium.domains.CollectionMinter;
import com.fantium.repositories.CollectionMinterRepository;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import jakarta.inject.Inject;

@Controller("/collectionMinter")
@Secured(SecurityRule.IS_AUTHENTICATED)
public class CollectionMinterController {

    @Inject
    private CollectionMinterRepository repository;

    @Get("/{id}")
    public List<CollectionMinter> findByCollectionId(Long id) {
        return repository.findAllByCollectionId(id);
    }
    
}
