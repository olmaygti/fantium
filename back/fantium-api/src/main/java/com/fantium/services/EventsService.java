package com.fantium.services;

import java.util.HashMap;
import java.util.Map;

import com.fantium.domains.NftCollection;

import io.micronaut.configuration.kafka.annotation.KafkaClient;
import io.micronaut.configuration.kafka.annotation.KafkaKey;
import io.micronaut.configuration.kafka.annotation.Topic;

@KafkaClient
public interface EventsService {

    @Topic("Commands")
    void uploadTokenDetails(@KafkaKey String key, Map<String, Object> details);

    default void uploadTokenDetails(NftCollection collection, Long share, String userAddress) {
        Map<String, Object> details = new HashMap<>();
        Map<String, String> benefits = new HashMap<>();
        details.put("Athlete", collection.getAthleteName());
        details.put("Season", collection.getSeason());
        details.put("Share", share);
        details.put("Benefits", benefits);
        benefits.put("Benefit1", collection.getBenefit1());
        benefits.put("Benefit2", collection.getBenefit2());

        details.put("userAddress", userAddress);

        System.out.println("UPLOADING " + details);

        this.uploadTokenDetails("UPLOAD_TOKEN_DETAILS", details);
    }
}
