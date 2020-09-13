package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.ChapterService;
import com.risingarjun.arjun.domain.Chapter;
import com.risingarjun.arjun.repository.ChapterRepository;
import com.risingarjun.arjun.service.dto.ChapterDTO;
import com.risingarjun.arjun.service.mapper.ChapterMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Chapter}.
 */
@Service
@Transactional
public class ChapterServiceImpl implements ChapterService {

    private final Logger log = LoggerFactory.getLogger(ChapterServiceImpl.class);

    private final ChapterRepository chapterRepository;

    private final ChapterMapper chapterMapper;

    public ChapterServiceImpl(ChapterRepository chapterRepository, ChapterMapper chapterMapper) {
        this.chapterRepository = chapterRepository;
        this.chapterMapper = chapterMapper;
    }

    /**
     * Save a chapter.
     *
     * @param chapterDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ChapterDTO save(ChapterDTO chapterDTO) {
        log.debug("Request to save Chapter : {}", chapterDTO);
        Chapter chapter = chapterMapper.toEntity(chapterDTO);
        chapter = chapterRepository.save(chapter);
        return chapterMapper.toDto(chapter);
    }

    /**
     * Get all the chapters.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ChapterDTO> findAll() {
        log.debug("Request to get all Chapters");
        return chapterRepository.findAll().stream()
            .map(chapterMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one chapter by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ChapterDTO> findOne(Long id) {
        log.debug("Request to get Chapter : {}", id);
        return chapterRepository.findById(id)
            .map(chapterMapper::toDto);
    }

    /**
     * Delete the chapter by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Chapter : {}", id);
        chapterRepository.deleteById(id);
    }
}
