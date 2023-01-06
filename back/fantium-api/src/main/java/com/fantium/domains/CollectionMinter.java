package com.fantium.domains;

import javax.validation.constraints.NotNull;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import io.micronaut.data.annotation.Relation;
import lombok.Getter;
import lombok.Setter;

@MappedEntity
@Getter @Setter
public class CollectionMinter {

    @Id
    @GeneratedValue(GeneratedValue.Type.AUTO)
    private Long id;

    @NotNull
    private String address;

    @Relation(value = Relation.Kind.ONE_TO_ONE)
    private NftCollection collection;

    public CollectionMinter address(String address) {
        setAddress(address);
        return this;
    }

    public CollectionMinter collection(NftCollection collection) {
        setCollection(collection);
        return this;
    }
}
