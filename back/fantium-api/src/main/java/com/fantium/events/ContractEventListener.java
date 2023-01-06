package com.fantium.events;

import java.util.Objects;

import com.fantium.events.processors.EventProcessor;

import io.micronaut.configuration.kafka.annotation.KafkaKey;
import io.micronaut.configuration.kafka.annotation.KafkaListener;
import io.micronaut.configuration.kafka.annotation.OffsetReset;
import io.micronaut.configuration.kafka.annotation.Topic;
import io.micronaut.context.BeanLocator;
import io.micronaut.inject.qualifiers.Qualifiers;
import jakarta.inject.Inject;

@KafkaListener(offsetReset = OffsetReset.LATEST)
public class ContractEventListener {

    @Inject
    private BeanLocator locator;

    @Topic("Events") 
    public void receive(@KafkaKey String key, String message) { 
        System.out.println("EVENT RECEIVED " + key);
        System.out.println("EVENT RECEIVED " + message);

        EventProcessor processor = this.getProcessor(key);

        if(Objects.nonNull(processor)) {
            System.out.println("Delegating processing in " + processor);
            processor.processEvent(key, message);
        }
    }

    private EventProcessor getProcessor(String key) {
        try {
            return locator.getBean(EventProcessor.class, Qualifiers.byName(key));
        } catch (Exception ex) {
            return null;
        }
    }
    
}
