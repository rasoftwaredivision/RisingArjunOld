package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.StudentsubjectDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Studentsubject}.
 */
public interface StudentsubjectService {

    /**
     * Save a studentsubject.
     *
     * @param studentsubjectDTO the entity to save.
     * @return the persisted entity.
     */
    StudentsubjectDTO save(StudentsubjectDTO studentsubjectDTO);

    /**
     * Get all the studentsubjects.
     *
     * @return the list of entities.
     */
    List<StudentsubjectDTO> findAll();

    /**
     * Get all the studentsubjects with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<StudentsubjectDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" studentsubject.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<StudentsubjectDTO> findOne(Long id);

    /**
     * Delete the "id" studentsubject.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
