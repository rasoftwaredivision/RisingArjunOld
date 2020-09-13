package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.FundamentaldetailService;
import com.risingarjun.arjun.domain.Fundamentaldetail;
import com.risingarjun.arjun.repository.FundamentaldetailRepository;
import com.risingarjun.arjun.service.dto.FundamentaldetailDTO;
import com.risingarjun.arjun.service.mapper.FundamentaldetailMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Fundamentaldetail}.
 */
@Service
@Transactional
public class FundamentaldetailServiceImpl implements FundamentaldetailService {

    private final Logger log = LoggerFactory.getLogger(FundamentaldetailServiceImpl.class);

    private final FundamentaldetailRepository fundamentaldetailRepository;

    private final FundamentaldetailMapper fundamentaldetailMapper;

    public FundamentaldetailServiceImpl(FundamentaldetailRepository fundamentaldetailRepository, FundamentaldetailMapper fundamentaldetailMapper) {
        this.fundamentaldetailRepository = fundamentaldetailRepository;
        this.fundamentaldetailMapper = fundamentaldetailMapper;
    }

    /**
     * Save a fundamentaldetail.
     *
     * @param fundamentaldetailDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public FundamentaldetailDTO save(FundamentaldetailDTO fundamentaldetailDTO) {
        log.debug("Request to save Fundamentaldetail : {}", fundamentaldetailDTO);
        Fundamentaldetail fundamentaldetail = fundamentaldetailMapper.toEntity(fundamentaldetailDTO);
        fundamentaldetail = fundamentaldetailRepository.save(fundamentaldetail);
        return fundamentaldetailMapper.toDto(fundamentaldetail);
    }

    /**
     * Get all the fundamentaldetails.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<FundamentaldetailDTO> findAll() {
        log.debug("Request to get all Fundamentaldetails");
        return fundamentaldetailRepository.findAll().stream()
            .map(fundamentaldetailMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one fundamentaldetail by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FundamentaldetailDTO> findOne(Long id) {
        log.debug("Request to get Fundamentaldetail : {}", id);
        return fundamentaldetailRepository.findById(id)
            .map(fundamentaldetailMapper::toDto);
    }

    /**
     * Delete the fundamentaldetail by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Fundamentaldetail : {}", id);
        fundamentaldetailRepository.deleteById(id);
    }
}
