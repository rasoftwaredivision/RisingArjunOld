package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.TeachershareDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Teachershare}.
 */
public interface TeachershareService {

    /**
     * Save a teachershare.
     *
     * @param teachershareDTO the entity to save.
     * @return the persisted entity.
     */
    TeachershareDTO save(TeachershareDTO teachershareDTO);

    /**
     * Get all the teachershares.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TeachershareDTO> findAll(Pageable pageable);


    /**
     * Get the "id" teachershare.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TeachershareDTO> findOne(Long id);

    /**
     * Delete the "id" teachershare.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
