package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.UserpreferenceService;
import com.risingarjun.arjun.domain.Userpreference;
import com.risingarjun.arjun.repository.UserpreferenceRepository;
import com.risingarjun.arjun.service.dto.UserpreferenceDTO;
import com.risingarjun.arjun.service.mapper.UserpreferenceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Userpreference}.
 */
@Service
@Transactional
public class UserpreferenceServiceImpl implements UserpreferenceService {

    private final Logger log = LoggerFactory.getLogger(UserpreferenceServiceImpl.class);

    private final UserpreferenceRepository userpreferenceRepository;

    private final UserpreferenceMapper userpreferenceMapper;

    public UserpreferenceServiceImpl(UserpreferenceRepository userpreferenceRepository, UserpreferenceMapper userpreferenceMapper) {
        this.userpreferenceRepository = userpreferenceRepository;
        this.userpreferenceMapper = userpreferenceMapper;
    }

    /**
     * Save a userpreference.
     *
     * @param userpreferenceDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserpreferenceDTO save(UserpreferenceDTO userpreferenceDTO) {
        log.debug("Request to save Userpreference : {}", userpreferenceDTO);
        Userpreference userpreference = userpreferenceMapper.toEntity(userpreferenceDTO);
        userpreference = userpreferenceRepository.save(userpreference);
        return userpreferenceMapper.toDto(userpreference);
    }

    /**
     * Get all the userpreferences.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserpreferenceDTO> findAll() {
        log.debug("Request to get all Userpreferences");
        return userpreferenceRepository.findAll().stream()
            .map(userpreferenceMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one userpreference by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserpreferenceDTO> findOne(Long id) {
        log.debug("Request to get Userpreference : {}", id);
        return userpreferenceRepository.findById(id)
            .map(userpreferenceMapper::toDto);
    }

    /**
     * Delete the userpreference by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Userpreference : {}", id);
        userpreferenceRepository.deleteById(id);
    }
}
