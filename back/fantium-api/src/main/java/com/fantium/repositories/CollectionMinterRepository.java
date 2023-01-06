package com.fantium.repositories;

import java.util.List;
import java.util.Optional;

import com.fantium.domains.CollectionMinter;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect=  Dialect.POSTGRES)
public interface CollectionMinterRepository extends CrudRepository<CollectionMinter, Long> {

    Optional<CollectionMinter> findByCollectionIdAndAddress(Long collectionId, String address);

    List<CollectionMinter> findAllByCollectionId(Long collectionId);
    
}
