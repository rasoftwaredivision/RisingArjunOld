package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.SubjectsbasefeeDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Subjectsbasefee}.
 */
public interface SubjectsbasefeeService {

    /**
     * Save a subjectsbasefee.
     *
     * @param subjectsbasefeeDTO the entity to save.
     * @return the persisted entity.
     */
    SubjectsbasefeeDTO save(SubjectsbasefeeDTO subjectsbasefeeDTO);

    /**
     * Get all the subjectsbasefees.
     *
     * @return the list of entities.
     */
    List<SubjectsbasefeeDTO> findAll();


    /**
     * Get the "id" subjectsbasefee.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SubjectsbasefeeDTO> findOne(Long id);

    /**
     * Delete the "id" subjectsbasefee.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
