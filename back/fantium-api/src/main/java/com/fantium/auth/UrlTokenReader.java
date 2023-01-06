package com.fantium.auth;

import java.util.Optional;

import io.micronaut.http.HttpRequest;
import io.micronaut.security.token.reader.TokenReader;
import jakarta.inject.Singleton;

@Singleton
public class UrlTokenReader implements TokenReader{

    @Override
    public Optional<String> findToken(HttpRequest<?> request) {
        return request.getParameters().get("access_token", String.class);
    }
    
}
