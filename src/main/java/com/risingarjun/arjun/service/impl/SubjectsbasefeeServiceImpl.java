package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.SubjectsbasefeeService;
import com.risingarjun.arjun.domain.Subjectsbasefee;
import com.risingarjun.arjun.repository.SubjectsbasefeeRepository;
import com.risingarjun.arjun.service.dto.SubjectsbasefeeDTO;
import com.risingarjun.arjun.service.mapper.SubjectsbasefeeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Subjectsbasefee}.
 */
@Service
@Transactional
public class SubjectsbasefeeServiceImpl implements SubjectsbasefeeService {

    private final Logger log = LoggerFactory.getLogger(SubjectsbasefeeServiceImpl.class);

    private final SubjectsbasefeeRepository subjectsbasefeeRepository;

    private final SubjectsbasefeeMapper subjectsbasefeeMapper;

    public SubjectsbasefeeServiceImpl(SubjectsbasefeeRepository subjectsbasefeeRepository, SubjectsbasefeeMapper subjectsbasefeeMapper) {
        this.subjectsbasefeeRepository = subjectsbasefeeRepository;
        this.subjectsbasefeeMapper = subjectsbasefeeMapper;
    }

    /**
     * Save a subjectsbasefee.
     *
     * @param subjectsbasefeeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public SubjectsbasefeeDTO save(SubjectsbasefeeDTO subjectsbasefeeDTO) {
        log.debug("Request to save Subjectsbasefee : {}", subjectsbasefeeDTO);
        Subjectsbasefee subjectsbasefee = subjectsbasefeeMapper.toEntity(subjectsbasefeeDTO);
        subjectsbasefee = subjectsbasefeeRepository.save(subjectsbasefee);
        return subjectsbasefeeMapper.toDto(subjectsbasefee);
    }

    /**
     * Get all the subjectsbasefees.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<SubjectsbasefeeDTO> findAll() {
        log.debug("Request to get all Subjectsbasefees");
        return subjectsbasefeeRepository.findAll().stream()
            .map(subjectsbasefeeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one subjectsbasefee by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubjectsbasefeeDTO> findOne(Long id) {
        log.debug("Request to get Subjectsbasefee : {}", id);
        return subjectsbasefeeRepository.findById(id)
            .map(subjectsbasefeeMapper::toDto);
    }

    /**
     * Delete the subjectsbasefee by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Subjectsbasefee : {}", id);
        subjectsbasefeeRepository.deleteById(id);
    }
}
