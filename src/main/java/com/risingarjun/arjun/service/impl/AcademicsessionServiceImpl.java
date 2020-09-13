package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.AcademicsessionService;
import com.risingarjun.arjun.domain.Academicsession;
import com.risingarjun.arjun.repository.AcademicsessionRepository;
import com.risingarjun.arjun.service.dto.AcademicsessionDTO;
import com.risingarjun.arjun.service.mapper.AcademicsessionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Academicsession}.
 */
@Service
@Transactional
public class AcademicsessionServiceImpl implements AcademicsessionService {

    private final Logger log = LoggerFactory.getLogger(AcademicsessionServiceImpl.class);

    private final AcademicsessionRepository academicsessionRepository;

    private final AcademicsessionMapper academicsessionMapper;

    public AcademicsessionServiceImpl(AcademicsessionRepository academicsessionRepository, AcademicsessionMapper academicsessionMapper) {
        this.academicsessionRepository = academicsessionRepository;
        this.academicsessionMapper = academicsessionMapper;
    }

    /**
     * Save a academicsession.
     *
     * @param academicsessionDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public AcademicsessionDTO save(AcademicsessionDTO academicsessionDTO) {
        log.debug("Request to save Academicsession : {}", academicsessionDTO);
        Academicsession academicsession = academicsessionMapper.toEntity(academicsessionDTO);
        academicsession = academicsessionRepository.save(academicsession);
        return academicsessionMapper.toDto(academicsession);
    }

    /**
     * Get all the academicsessions.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<AcademicsessionDTO> findAll() {
        log.debug("Request to get all Academicsessions");
        return academicsessionRepository.findAll().stream()
            .map(academicsessionMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one academicsession by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AcademicsessionDTO> findOne(Long id) {
        log.debug("Request to get Academicsession : {}", id);
        return academicsessionRepository.findById(id)
            .map(academicsessionMapper::toDto);
    }

    /**
     * Delete the academicsession by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Academicsession : {}", id);
        academicsessionRepository.deleteById(id);
    }
}
