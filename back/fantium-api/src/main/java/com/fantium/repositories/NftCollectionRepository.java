package com.fantium.repositories;

import java.util.List;
import java.util.Optional;

import com.fantium.domains.NftCollection;

import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;


@JdbcRepository(dialect = Dialect.POSTGRES)
public interface NftCollectionRepository extends CrudRepository<NftCollection, Long> {

    List<NftCollection> findAll();

    Optional<NftCollection> findByContractId(Long contractId);
}
