package com.fantium.ws;


import com.fantium.services.WSBroadcaster;

import io.micronaut.security.annotation.Secured;
import io.micronaut.security.rules.SecurityRule;
import io.micronaut.websocket.WebSocketSession;
import io.micronaut.websocket.annotation.OnClose;
import io.micronaut.websocket.annotation.OnMessage;
import io.micronaut.websocket.annotation.OnOpen;
import io.micronaut.websocket.annotation.ServerWebSocket;
import jakarta.inject.Inject;

@ServerWebSocket("/ws/session") 
@Secured(SecurityRule.IS_AUTHENTICATED)
public class WebSocketServer {
    @Inject
    WSBroadcaster broadcaster;

    @OnOpen
    public void onOpen(WebSocketSession session) {
        System.out.println("Connected!");
    }

    @OnMessage
    public void onMessage(String message, WebSocketSession session) {
        this.broadcaster.send("{\"type\":\"PONG\"}", session.getUserPrincipal().get().getName());
    }

    @OnClose
    public void onClose(WebSocketSession session) {
        System.out.println("Session closed");
    }
}