package com.fantium.events.processors;

import java.util.Map;

import jakarta.inject.Named;
import jakarta.inject.Singleton;


@Singleton
@Named("UPLOAD_COMPLETE")
public class UploadCompleteProcessor extends EventProcessor {

    @Override
    public void processEvent(String key, String msg) {
        Map<String, String> payload = mapper.parseMsg(msg);
        payload.put("type", "UPLOAD_COMPLETE");
        broadcaster.send(payload, payload.get("userAddress"));
    }
}
