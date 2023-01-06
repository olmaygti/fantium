package com.fantium.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import com.fantium.domains.NftCollection;
import com.fantium.repositories.NftCollectionRepository;
import com.fantium.services.EventsService;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import jakarta.inject.Inject;

@Controller("/nftCollections")
@Secured(SecurityRule.IS_AUTHENTICATED)
public class NftCollectionController {

    @Inject
    private NftCollectionRepository repo;

    @Inject
    private EventsService eventsService;

    @Get("/")
    public List<NftCollection> list() {
        return this.repo.findAll();
    }

    @Post("/")
    public NftCollection saveCollection(NftCollection collection) {
        this.repo.save(collection);
        return collection;
    }

    @Delete("/{collectionId}")
    public HttpResponse deleteCollection(Long collectionId) {
        return this.repo.findById(collectionId)
            .map(nftCollection -> {
                this.repo.delete(nftCollection);
                return HttpResponse.ok();
            }).orElse(HttpResponse.notFound());    }

    @Post("/{collectionId}")
    public HttpResponse uploadTokenDetails(Long collectionId, @Body Map<String, Long> body, Principal principal) {
        return this.repo.findById(collectionId)
            .map(nftCollection -> {
                this.eventsService.uploadTokenDetails(nftCollection, body.get("tokenShare"), principal.getName());
                return HttpResponse.ok();
            }).orElse(HttpResponse.notFound());
    }
}
