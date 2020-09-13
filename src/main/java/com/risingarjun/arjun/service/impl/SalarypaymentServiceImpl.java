package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.SalarypaymentService;
import com.risingarjun.arjun.domain.Salarypayment;
import com.risingarjun.arjun.repository.SalarypaymentRepository;
import com.risingarjun.arjun.service.dto.SalarypaymentDTO;
import com.risingarjun.arjun.service.mapper.SalarypaymentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Salarypayment}.
 */
@Service
@Transactional
public class SalarypaymentServiceImpl implements SalarypaymentService {

    private final Logger log = LoggerFactory.getLogger(SalarypaymentServiceImpl.class);

    private final SalarypaymentRepository salarypaymentRepository;

    private final SalarypaymentMapper salarypaymentMapper;

    public SalarypaymentServiceImpl(SalarypaymentRepository salarypaymentRepository, SalarypaymentMapper salarypaymentMapper) {
        this.salarypaymentRepository = salarypaymentRepository;
        this.salarypaymentMapper = salarypaymentMapper;
    }

    /**
     * Save a salarypayment.
     *
     * @param salarypaymentDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SalarypaymentDTO save(SalarypaymentDTO salarypaymentDTO) {
        log.debug("Request to save Salarypayment : {}", salarypaymentDTO);
        Salarypayment salarypayment = salarypaymentMapper.toEntity(salarypaymentDTO);
        salarypayment = salarypaymentRepository.save(salarypayment);
        return salarypaymentMapper.toDto(salarypayment);
    }

    /**
     * Get all the salarypayments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SalarypaymentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Salarypayments");
        return salarypaymentRepository.findAll(pageable)
            .map(salarypaymentMapper::toDto);
    }


    /**
     * Get one salarypayment by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SalarypaymentDTO> findOne(Long id) {
        log.debug("Request to get Salarypayment : {}", id);
        return salarypaymentRepository.findById(id)
            .map(salarypaymentMapper::toDto);
    }

    /**
     * Delete the salarypayment by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Salarypayment : {}", id);
        salarypaymentRepository.deleteById(id);
    }
}
