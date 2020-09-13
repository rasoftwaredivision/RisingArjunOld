package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.ScholarshipDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Scholarship}.
 */
public interface ScholarshipService {

    /**
     * Save a scholarship.
     *
     * @param scholarshipDTO the entity to save.
     * @return the persisted entity.
     */
    ScholarshipDTO save(ScholarshipDTO scholarshipDTO);

    /**
     * Get all the scholarships.
     *
     * @return the list of entities.
     */
    List<ScholarshipDTO> findAll();


    /**
     * Get the "id" scholarship.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ScholarshipDTO> findOne(Long id);

    /**
     * Delete the "id" scholarship.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
