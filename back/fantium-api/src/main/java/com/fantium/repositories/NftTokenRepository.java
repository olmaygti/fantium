package com.fantium.repositories;

import java.util.List;

import com.fantium.domains.NftToken;

import io.micronaut.data.annotation.Join;
import io.micronaut.data.jdbc.annotation.JdbcRepository;
import io.micronaut.data.model.query.builder.sql.Dialect;
import io.micronaut.data.repository.CrudRepository;

@JdbcRepository(dialect = Dialect.POSTGRES)
public interface NftTokenRepository extends CrudRepository<NftToken, Long> {

    @Join(value = "collection", type = Join.Type.FETCH)
    List<NftToken> findAllByOwner(String owner);

    List<NftToken> findAll();
}
