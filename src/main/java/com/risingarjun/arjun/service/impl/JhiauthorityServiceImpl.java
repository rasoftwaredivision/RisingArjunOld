package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.JhiauthorityService;
import com.risingarjun.arjun.domain.Jhiauthority;
import com.risingarjun.arjun.repository.JhiauthorityRepository;
import com.risingarjun.arjun.service.dto.JhiauthorityDTO;
import com.risingarjun.arjun.service.mapper.JhiauthorityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Jhiauthority}.
 */
@Service
@Transactional
public class JhiauthorityServiceImpl implements JhiauthorityService {

    private final Logger log = LoggerFactory.getLogger(JhiauthorityServiceImpl.class);

    private final JhiauthorityRepository jhiauthorityRepository;

    private final JhiauthorityMapper jhiauthorityMapper;

    public JhiauthorityServiceImpl(JhiauthorityRepository jhiauthorityRepository, JhiauthorityMapper jhiauthorityMapper) {
        this.jhiauthorityRepository = jhiauthorityRepository;
        this.jhiauthorityMapper = jhiauthorityMapper;
    }

    /**
     * Save a jhiauthority.
     *
     * @param jhiauthorityDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public JhiauthorityDTO save(JhiauthorityDTO jhiauthorityDTO) {
        log.debug("Request to save Jhiauthority : {}", jhiauthorityDTO);
        Jhiauthority jhiauthority = jhiauthorityMapper.toEntity(jhiauthorityDTO);
        jhiauthority = jhiauthorityRepository.save(jhiauthority);
        return jhiauthorityMapper.toDto(jhiauthority);
    }

    /**
     * Get all the jhiauthorities.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<JhiauthorityDTO> findAll() {
        log.debug("Request to get all Jhiauthorities");
        return jhiauthorityRepository.findAll().stream()
            .map(jhiauthorityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one jhiauthority by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<JhiauthorityDTO> findOne(Long id) {
        log.debug("Request to get Jhiauthority : {}", id);
        return jhiauthorityRepository.findById(id)
            .map(jhiauthorityMapper::toDto);
    }

    /**
     * Delete the jhiauthority by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Jhiauthority : {}", id);
        jhiauthorityRepository.deleteById(id);
    }
}
