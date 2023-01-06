package com.fantium.controllers;

import java.security.Principal;
import java.util.List;

import com.fantium.domains.NftToken;
import com.fantium.repositories.NftTokenRepository;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import jakarta.inject.Inject;

@Controller("/tokens")
@Secured(SecurityRule.IS_AUTHENTICATED)
public class NftTokenController {

    @Inject
    NftTokenRepository tokenRepository;

    @Get("/")
    public List<NftToken> list() {
        return tokenRepository.findAll();
    }

    @Get("/myTokens")
    public List<NftToken> list(Principal principal) {
        return tokenRepository.findAllByOwner(principal.getName());
    }

}
