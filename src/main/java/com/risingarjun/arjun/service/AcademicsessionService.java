package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.AcademicsessionDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Academicsession}.
 */
public interface AcademicsessionService {

    /**
     * Save a academicsession.
     *
     * @param academicsessionDTO the entity to save.
     * @return the persisted entity.
     */
    AcademicsessionDTO save(AcademicsessionDTO academicsessionDTO);

    /**
     * Get all the academicsessions.
     *
     * @return the list of entities.
     */
    List<AcademicsessionDTO> findAll();


    /**
     * Get the "id" academicsession.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AcademicsessionDTO> findOne(Long id);

    /**
     * Delete the "id" academicsession.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
