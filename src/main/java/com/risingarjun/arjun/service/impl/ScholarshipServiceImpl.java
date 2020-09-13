package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.ScholarshipService;
import com.risingarjun.arjun.domain.Scholarship;
import com.risingarjun.arjun.repository.ScholarshipRepository;
import com.risingarjun.arjun.service.dto.ScholarshipDTO;
import com.risingarjun.arjun.service.mapper.ScholarshipMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Scholarship}.
 */
@Service
@Transactional
public class ScholarshipServiceImpl implements ScholarshipService {

    private final Logger log = LoggerFactory.getLogger(ScholarshipServiceImpl.class);

    private final ScholarshipRepository scholarshipRepository;

    private final ScholarshipMapper scholarshipMapper;

    public ScholarshipServiceImpl(ScholarshipRepository scholarshipRepository, ScholarshipMapper scholarshipMapper) {
        this.scholarshipRepository = scholarshipRepository;
        this.scholarshipMapper = scholarshipMapper;
    }

    /**
     * Save a scholarship.
     *
     * @param scholarshipDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ScholarshipDTO save(ScholarshipDTO scholarshipDTO) {
        log.debug("Request to save Scholarship : {}", scholarshipDTO);
        Scholarship scholarship = scholarshipMapper.toEntity(scholarshipDTO);
        scholarship = scholarshipRepository.save(scholarship);
        return scholarshipMapper.toDto(scholarship);
    }

    /**
     * Get all the scholarships.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<ScholarshipDTO> findAll() {
        log.debug("Request to get all Scholarships");
        return scholarshipRepository.findAll().stream()
            .map(scholarshipMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one scholarship by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ScholarshipDTO> findOne(Long id) {
        log.debug("Request to get Scholarship : {}", id);
        return scholarshipRepository.findById(id)
            .map(scholarshipMapper::toDto);
    }

    /**
     * Delete the scholarship by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Scholarship : {}", id);
        scholarshipRepository.deleteById(id);
    }
}
