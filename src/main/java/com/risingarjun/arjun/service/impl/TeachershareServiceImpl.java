package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.TeachershareService;
import com.risingarjun.arjun.domain.Teachershare;
import com.risingarjun.arjun.repository.TeachershareRepository;
import com.risingarjun.arjun.service.dto.TeachershareDTO;
import com.risingarjun.arjun.service.mapper.TeachershareMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Teachershare}.
 */
@Service
@Transactional
public class TeachershareServiceImpl implements TeachershareService {

    private final Logger log = LoggerFactory.getLogger(TeachershareServiceImpl.class);

    private final TeachershareRepository teachershareRepository;

    private final TeachershareMapper teachershareMapper;

    public TeachershareServiceImpl(TeachershareRepository teachershareRepository, TeachershareMapper teachershareMapper) {
        this.teachershareRepository = teachershareRepository;
        this.teachershareMapper = teachershareMapper;
    }

    /**
     * Save a teachershare.
     *
     * @param teachershareDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public TeachershareDTO save(TeachershareDTO teachershareDTO) {
        log.debug("Request to save Teachershare : {}", teachershareDTO);
        Teachershare teachershare = teachershareMapper.toEntity(teachershareDTO);
        teachershare = teachershareRepository.save(teachershare);
        return teachershareMapper.toDto(teachershare);
    }

    /**
     * Get all the teachershares.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<TeachershareDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Teachershares");
        return teachershareRepository.findAll(pageable)
            .map(teachershareMapper::toDto);
    }


    /**
     * Get one teachershare by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TeachershareDTO> findOne(Long id) {
        log.debug("Request to get Teachershare : {}", id);
        return teachershareRepository.findById(id)
            .map(teachershareMapper::toDto);
    }

    /**
     * Delete the teachershare by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Teachershare : {}", id);
        teachershareRepository.deleteById(id);
    }
}
