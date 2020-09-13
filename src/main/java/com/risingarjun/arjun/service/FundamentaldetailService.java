package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.FundamentaldetailDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Fundamentaldetail}.
 */
public interface FundamentaldetailService {

    /**
     * Save a fundamentaldetail.
     *
     * @param fundamentaldetailDTO the entity to save.
     * @return the persisted entity.
     */
    FundamentaldetailDTO save(FundamentaldetailDTO fundamentaldetailDTO);

    /**
     * Get all the fundamentaldetails.
     *
     * @return the list of entities.
     */
    List<FundamentaldetailDTO> findAll();


    /**
     * Get the "id" fundamentaldetail.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FundamentaldetailDTO> findOne(Long id);

    /**
     * Delete the "id" fundamentaldetail.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
