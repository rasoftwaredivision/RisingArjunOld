package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.UserpreferenceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Userpreference}.
 */
public interface UserpreferenceService {

    /**
     * Save a userpreference.
     *
     * @param userpreferenceDTO the entity to save.
     * @return the persisted entity.
     */
    UserpreferenceDTO save(UserpreferenceDTO userpreferenceDTO);

    /**
     * Get all the userpreferences.
     *
     * @return the list of entities.
     */
    List<UserpreferenceDTO> findAll();


    /**
     * Get the "id" userpreference.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserpreferenceDTO> findOne(Long id);

    /**
     * Delete the "id" userpreference.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
