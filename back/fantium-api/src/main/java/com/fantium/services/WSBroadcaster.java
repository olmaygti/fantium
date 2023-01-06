package com.fantium.services;

import java.util.Map;

import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

import com.nimbusds.jose.shaded.json.JSONObject;

import io.micronaut.websocket.WebSocketBroadcaster;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;

class FakeSubscriber implements Subscriber {
    public void onComplete() {
        // System.out.println("Completed");
    }

    public void onError(java.lang.Throwable t) {
        // System.out.println("errorer " + t);
    }

    public void onNext(Object t) {
        // System.out.println("NEXT " + t);
    }

    public void onSubscribe(Subscription s) {
        // System.out.println("On subscribe " + s);
    }    
}

@Singleton
public class WSBroadcaster {

    @Inject
    private WebSocketBroadcaster broadcaster;

    public void send(Map payload, String user) {
        broadcaster
            .broadcast(
                new JSONObject(payload).toString(),
                s-> s.getUserPrincipal().get().getName().equals(user))
            .subscribe(new FakeSubscriber());
    }

    public void broadcast(Map payload) {
        broadcaster
            .broadcast( new JSONObject(payload).toString())
            .subscribe(new FakeSubscriber());
    }

    public void send(String msg, String user) {
        broadcaster
            .broadcast(
                msg,
                s-> s.getUserPrincipal().get().getName().equals(user))
            .subscribe(new FakeSubscriber());
    }
}
