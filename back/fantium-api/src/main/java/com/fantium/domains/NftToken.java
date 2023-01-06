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
public class NftToken {
    @Id
    @GeneratedValue(GeneratedValue.Type.AUTO)
    private Long id;

    @NotNull
    private Long tokenId;

    @NotNull
    private Long share;

    @NotNull
    private String cid;

    @NotNull
    private String owner;
    
    @Relation(value = Relation.Kind.ONE_TO_ONE)
    private NftCollection collection;

    public NftToken tokenId(Long tokenId) {
        setTokenId(tokenId);
        return this;
    }

    public NftToken share(Long share) {
        setShare(share);
        return this;
    }

    public NftToken cid(String cid) {
        setCid(cid);
        return this;
    }

    public NftToken owner(String owner) {
        setOwner(owner);
        return this;
    }

    public NftToken collection(NftCollection collection) {
        setCollection(collection);
        return this;
    }

}
