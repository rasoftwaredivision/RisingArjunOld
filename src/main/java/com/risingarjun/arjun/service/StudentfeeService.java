package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.StudentfeeDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Studentfee}.
 */
public interface StudentfeeService {

    /**
     * Save a studentfee.
     *
     * @param studentfeeDTO the entity to save.
     * @return the persisted entity.
     */
    StudentfeeDTO save(StudentfeeDTO studentfeeDTO);

    /**
     * Get all the studentfees.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<StudentfeeDTO> findAll(Pageable pageable);


    /**
     * Get the "id" studentfee.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentfeeDTO> findOne(Long id);

    /**
     * Delete the "id" studentfee.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
