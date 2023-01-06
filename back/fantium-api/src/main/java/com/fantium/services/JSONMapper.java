package com.fantium.services;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import lombok.Getter;
import lombok.Setter;

@Singleton
@Setter @Getter
public class JSONMapper {

    @Inject
    private ObjectMapper mapper;

    public Map parseMsg(String msg) {
        return this.parseMsg(msg, Map.class);
    }

    public <T> T parseMsg(String msg, Class<T> clazz) {
        try {
            return mapper
                .readerFor(clazz)
                .readValue(msg);
        } catch(JsonProcessingException jPEx) {
            return null;
        }
    }
}
