package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.CenterDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Center}.
 */
public interface CenterService {

    /**
     * Save a center.
     *
     * @param centerDTO the entity to save.
     * @return the persisted entity.
     */
    CenterDTO save(CenterDTO centerDTO);

    /**
     * Get all the centers.
     *
     * @return the list of entities.
     */
    List<CenterDTO> findAll();


    /**
     * Get the "id" center.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CenterDTO> findOne(Long id);

    /**
     * Delete the "id" center.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
