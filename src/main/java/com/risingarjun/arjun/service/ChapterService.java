package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.ChapterDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Chapter}.
 */
public interface ChapterService {

    /**
     * Save a chapter.
     *
     * @param chapterDTO the entity to save.
     * @return the persisted entity.
     */
    ChapterDTO save(ChapterDTO chapterDTO);

    /**
     * Get all the chapters.
     *
     * @return the list of entities.
     */
    List<ChapterDTO> findAll();


    /**
     * Get the "id" chapter.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ChapterDTO> findOne(Long id);

    /**
     * Delete the "id" chapter.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
