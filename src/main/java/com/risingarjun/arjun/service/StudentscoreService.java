package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.StudentscoreDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Studentscore}.
 */
public interface StudentscoreService {

    /**
     * Save a studentscore.
     *
     * @param studentscoreDTO the entity to save.
     * @return the persisted entity.
     */
    StudentscoreDTO save(StudentscoreDTO studentscoreDTO);

    /**
     * Get all the studentscores.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StudentscoreDTO> findAll(Pageable pageable);


    /**
     * Get the "id" studentscore.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentscoreDTO> findOne(Long id);

    /**
     * Delete the "id" studentscore.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
