package com.fantium.auth;


import org.reactivestreams.Publisher;

import com.fantium.auth.utils.SignUtil;

import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpRequest;
import io.micronaut.security.authentication.AuthenticationProvider;
import io.micronaut.security.authentication.AuthenticationRequest;
import io.micronaut.security.authentication.AuthenticationResponse;
import jakarta.inject.Singleton;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

@Singleton 
public class AuthenticationProviderUserPassword implements AuthenticationProvider {

    private static final String LOGIN_MESSAGE = "loginChallenge";

    @Override
    public Publisher<AuthenticationResponse> authenticate(@Nullable HttpRequest<?> httpRequest,
                                                          AuthenticationRequest<?, ?> authenticationRequest) {

        return Flux.create(emitter -> {
            String identity = (String) authenticationRequest.getIdentity();
            String secret = (String) authenticationRequest.getSecret();
            String signerAddress = SignUtil.getAddressUsedToSignHashedMessage((secret), AuthenticationProviderUserPassword.LOGIN_MESSAGE);

            if (signerAddress.equals(((String)identity).toLowerCase())) {
                emitter.next(AuthenticationResponse.success(identity));
                emitter.complete();
            } else {
                emitter.error(AuthenticationResponse.exception());
            }

        }, FluxSink.OverflowStrategy.ERROR);
    }
}