package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.QuestionDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Question}.
 */
public interface QuestionService {

    /**
     * Save a question.
     *
     * @param questionDTO the entity to save.
     * @return the persisted entity.
     */
    QuestionDTO save(QuestionDTO questionDTO);

    /**
     * Get all the questions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<QuestionDTO> findAll(Pageable pageable);

    /**
     * Get all the questions with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<QuestionDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" question.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<QuestionDTO> findOne(Long id);

    /**
     * Delete the "id" question.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
