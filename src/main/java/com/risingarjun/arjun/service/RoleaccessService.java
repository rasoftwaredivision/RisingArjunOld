package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.RoleaccessDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Roleaccess}.
 */
public interface RoleaccessService {

    /**
     * Save a roleaccess.
     *
     * @param roleaccessDTO the entity to save.
     * @return the persisted entity.
     */
    RoleaccessDTO save(RoleaccessDTO roleaccessDTO);

    /**
     * Get all the roleaccesses.
     *
     * @return the list of entities.
     */
    List<RoleaccessDTO> findAll();


    /**
     * Get the "id" roleaccess.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RoleaccessDTO> findOne(Long id);

    /**
     * Delete the "id" roleaccess.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
