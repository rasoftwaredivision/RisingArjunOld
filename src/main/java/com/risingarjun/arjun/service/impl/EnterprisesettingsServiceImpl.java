package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.EnterprisesettingsService;
import com.risingarjun.arjun.domain.Enterprisesettings;
import com.risingarjun.arjun.repository.EnterprisesettingsRepository;
import com.risingarjun.arjun.service.dto.EnterprisesettingsDTO;
import com.risingarjun.arjun.service.mapper.EnterprisesettingsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Enterprisesettings}.
 */
@Service
@Transactional
public class EnterprisesettingsServiceImpl implements EnterprisesettingsService {

    private final Logger log = LoggerFactory.getLogger(EnterprisesettingsServiceImpl.class);

    private final EnterprisesettingsRepository enterprisesettingsRepository;

    private final EnterprisesettingsMapper enterprisesettingsMapper;

    public EnterprisesettingsServiceImpl(EnterprisesettingsRepository enterprisesettingsRepository, EnterprisesettingsMapper enterprisesettingsMapper) {
        this.enterprisesettingsRepository = enterprisesettingsRepository;
        this.enterprisesettingsMapper = enterprisesettingsMapper;
    }

    /**
     * Save a enterprisesettings.
     *
     * @param enterprisesettingsDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public EnterprisesettingsDTO save(EnterprisesettingsDTO enterprisesettingsDTO) {
        log.debug("Request to save Enterprisesettings : {}", enterprisesettingsDTO);
        Enterprisesettings enterprisesettings = enterprisesettingsMapper.toEntity(enterprisesettingsDTO);
        enterprisesettings = enterprisesettingsRepository.save(enterprisesettings);
        return enterprisesettingsMapper.toDto(enterprisesettings);
    }

    /**
     * Get all the enterprisesettings.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<EnterprisesettingsDTO> findAll() {
        log.debug("Request to get all Enterprisesettings");
        return enterprisesettingsRepository.findAll().stream()
            .map(enterprisesettingsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one enterprisesettings by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<EnterprisesettingsDTO> findOne(Long id) {
        log.debug("Request to get Enterprisesettings : {}", id);
        return enterprisesettingsRepository.findById(id)
            .map(enterprisesettingsMapper::toDto);
    }

    /**
     * Delete the enterprisesettings by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enterprisesettings : {}", id);
        enterprisesettingsRepository.deleteById(id);
    }
}
