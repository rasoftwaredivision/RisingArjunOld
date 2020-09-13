package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.EnterpriseService;
import com.risingarjun.arjun.domain.Enterprise;
import com.risingarjun.arjun.repository.EnterpriseRepository;
import com.risingarjun.arjun.service.dto.EnterpriseDTO;
import com.risingarjun.arjun.service.mapper.EnterpriseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Enterprise}.
 */
@Service
@Transactional
public class EnterpriseServiceImpl implements EnterpriseService {

    private final Logger log = LoggerFactory.getLogger(EnterpriseServiceImpl.class);

    private final EnterpriseRepository enterpriseRepository;

    private final EnterpriseMapper enterpriseMapper;

    public EnterpriseServiceImpl(EnterpriseRepository enterpriseRepository, EnterpriseMapper enterpriseMapper) {
        this.enterpriseRepository = enterpriseRepository;
        this.enterpriseMapper = enterpriseMapper;
    }

    /**
     * Save a enterprise.
     *
     * @param enterpriseDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public EnterpriseDTO save(EnterpriseDTO enterpriseDTO) {
        log.debug("Request to save Enterprise : {}", enterpriseDTO);
        Enterprise enterprise = enterpriseMapper.toEntity(enterpriseDTO);
        enterprise = enterpriseRepository.save(enterprise);
        return enterpriseMapper.toDto(enterprise);
    }

    /**
     * Get all the enterprises.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EnterpriseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Enterprises");
        return enterpriseRepository.findAll(pageable)
            .map(enterpriseMapper::toDto);
    }


    /**
     * Get one enterprise by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EnterpriseDTO> findOne(Long id) {
        log.debug("Request to get Enterprise : {}", id);
        return enterpriseRepository.findById(id)
            .map(enterpriseMapper::toDto);
    }

    /**
     * Delete the enterprise by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enterprise : {}", id);
        enterpriseRepository.deleteById(id);
    }
}
