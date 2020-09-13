package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.EnterprisesettingsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Enterprisesettings}.
 */
public interface EnterprisesettingsService {

    /**
     * Save a enterprisesettings.
     *
     * @param enterprisesettingsDTO the entity to save.
     * @return the persisted entity.
     */
    EnterprisesettingsDTO save(EnterprisesettingsDTO enterprisesettingsDTO);

    /**
     * Get all the enterprisesettings.
     *
     * @return the list of entities.
     */
    List<EnterprisesettingsDTO> findAll();


    /**
     * Get the "id" enterprisesettings.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<EnterprisesettingsDTO> findOne(Long id);

    /**
     * Delete the "id" enterprisesettings.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
