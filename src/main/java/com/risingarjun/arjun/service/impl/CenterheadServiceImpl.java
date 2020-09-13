package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.CenterheadService;
import com.risingarjun.arjun.domain.Centerhead;
import com.risingarjun.arjun.repository.CenterheadRepository;
import com.risingarjun.arjun.service.dto.CenterheadDTO;
import com.risingarjun.arjun.service.mapper.CenterheadMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Centerhead}.
 */
@Service
@Transactional
public class CenterheadServiceImpl implements CenterheadService {

    private final Logger log = LoggerFactory.getLogger(CenterheadServiceImpl.class);

    private final CenterheadRepository centerheadRepository;

    private final CenterheadMapper centerheadMapper;

    public CenterheadServiceImpl(CenterheadRepository centerheadRepository, CenterheadMapper centerheadMapper) {
        this.centerheadRepository = centerheadRepository;
        this.centerheadMapper = centerheadMapper;
    }

    /**
     * Save a centerhead.
     *
     * @param centerheadDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public CenterheadDTO save(CenterheadDTO centerheadDTO) {
        log.debug("Request to save Centerhead : {}", centerheadDTO);
        Centerhead centerhead = centerheadMapper.toEntity(centerheadDTO);
        centerhead = centerheadRepository.save(centerhead);
        return centerheadMapper.toDto(centerhead);
    }

    /**
     * Get all the centerheads.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<CenterheadDTO> findAll() {
        log.debug("Request to get all Centerheads");
        return centerheadRepository.findAllWithEagerRelationships().stream()
            .map(centerheadMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the centerheads with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<CenterheadDTO> findAllWithEagerRelationships(Pageable pageable) {
        return centerheadRepository.findAllWithEagerRelationships(pageable).map(centerheadMapper::toDto);
    }
    

    /**
     * Get one centerhead by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CenterheadDTO> findOne(Long id) {
        log.debug("Request to get Centerhead : {}", id);
        return centerheadRepository.findOneWithEagerRelationships(id)
            .map(centerheadMapper::toDto);
    }

    /**
     * Delete the centerhead by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Centerhead : {}", id);
        centerheadRepository.deleteById(id);
    }
}
