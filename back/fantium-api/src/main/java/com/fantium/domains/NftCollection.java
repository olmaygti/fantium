package com.fantium.domains;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import io.micronaut.data.annotation.GeneratedValue;
import io.micronaut.data.annotation.Id;
import io.micronaut.data.annotation.MappedEntity;
import lombok.Getter;
import lombok.Setter;


@MappedEntity
@Getter @Setter
public class NftCollection {
    @Id
    @GeneratedValue(GeneratedValue.Type.AUTO)
    private Long id;

    @Column(name = "contract_id", nullable = true)
    private Long contractId;

    @NotNull
    private String description;

    @NotNull
    private String athleteName;

    @NotNull
    private Integer season;

    @NotNull
    private String benefit1;

    @NotNull
    private String benefit2;

    private Long tokensMinted;

    private Long shareLeft;

    public NftCollection id(Long id) {
        setId(id);
        return this;
    }

    public NftCollection contractId(Long contractId) {
        setContractId(contractId);
        return this;
    }

    public NftCollection description(String description) {
        setDescription(description);
        return this;
    }

    public NftCollection athleteName(String athleteName) {
        setAthleteName(athleteName);
        return this;
    }

    public NftCollection season(Integer season) {
        setSeason(season);
        return this;
    }

    public NftCollection benefit1(String benefit1) {
        setBenefit1(benefit1);
        return this;
    }

    public NftCollection benefit2(String benefit2) {
        setBenefit2(benefit2);
        return this;
    }

    public NftCollection tokensMinted(Long tokensMinted) {
        setTokensMinted(tokensMinted);
        return this;
    }

    public NftCollection shareLeft(Long shareLeft) {
        setShareLeft(shareLeft);
        return this;
    }


    
}
