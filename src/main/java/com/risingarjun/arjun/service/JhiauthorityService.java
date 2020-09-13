package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.JhiauthorityDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Jhiauthority}.
 */
public interface JhiauthorityService {

    /**
     * Save a jhiauthority.
     *
     * @param jhiauthorityDTO the entity to save.
     * @return the persisted entity.
     */
    JhiauthorityDTO save(JhiauthorityDTO jhiauthorityDTO);

    /**
     * Get all the jhiauthorities.
     *
     * @return the list of entities.
     */
    List<JhiauthorityDTO> findAll();


    /**
     * Get the "id" jhiauthority.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<JhiauthorityDTO> findOne(Long id);

    /**
     * Delete the "id" jhiauthority.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
