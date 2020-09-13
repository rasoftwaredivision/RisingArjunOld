package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.RoleaccessService;
import com.risingarjun.arjun.domain.Roleaccess;
import com.risingarjun.arjun.repository.RoleaccessRepository;
import com.risingarjun.arjun.service.dto.RoleaccessDTO;
import com.risingarjun.arjun.service.mapper.RoleaccessMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Roleaccess}.
 */
@Service
@Transactional
public class RoleaccessServiceImpl implements RoleaccessService {

    private final Logger log = LoggerFactory.getLogger(RoleaccessServiceImpl.class);

    private final RoleaccessRepository roleaccessRepository;

    private final RoleaccessMapper roleaccessMapper;

    public RoleaccessServiceImpl(RoleaccessRepository roleaccessRepository, RoleaccessMapper roleaccessMapper) {
        this.roleaccessRepository = roleaccessRepository;
        this.roleaccessMapper = roleaccessMapper;
    }

    /**
     * Save a roleaccess.
     *
     * @param roleaccessDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public RoleaccessDTO save(RoleaccessDTO roleaccessDTO) {
        log.debug("Request to save Roleaccess : {}", roleaccessDTO);
        Roleaccess roleaccess = roleaccessMapper.toEntity(roleaccessDTO);
        roleaccess = roleaccessRepository.save(roleaccess);
        return roleaccessMapper.toDto(roleaccess);
    }

    /**
     * Get all the roleaccesses.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<RoleaccessDTO> findAll() {
        log.debug("Request to get all Roleaccesses");
        return roleaccessRepository.findAll().stream()
            .map(roleaccessMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one roleaccess by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<RoleaccessDTO> findOne(Long id) {
        log.debug("Request to get Roleaccess : {}", id);
        return roleaccessRepository.findById(id)
            .map(roleaccessMapper::toDto);
    }

    /**
     * Delete the roleaccess by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Roleaccess : {}", id);
        roleaccessRepository.deleteById(id);
    }
}
