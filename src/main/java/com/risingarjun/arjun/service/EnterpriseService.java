package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.EnterpriseDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Enterprise}.
 */
public interface EnterpriseService {

    /**
     * Save a enterprise.
     *
     * @param enterpriseDTO the entity to save.
     * @return the persisted entity.
     */
    EnterpriseDTO save(EnterpriseDTO enterpriseDTO);

    /**
     * Get all the enterprises.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<EnterpriseDTO> findAll(Pageable pageable);


    /**
     * Get the "id" enterprise.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EnterpriseDTO> findOne(Long id);

    /**
     * Delete the "id" enterprise.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
