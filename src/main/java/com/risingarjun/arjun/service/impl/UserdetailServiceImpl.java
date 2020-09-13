package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.UserdetailService;
import com.risingarjun.arjun.domain.Userdetail;
import com.risingarjun.arjun.repository.UserdetailRepository;
import com.risingarjun.arjun.service.dto.UserdetailDTO;
import com.risingarjun.arjun.service.mapper.UserdetailMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Userdetail}.
 */
@Service
@Transactional
public class UserdetailServiceImpl implements UserdetailService {

    private final Logger log = LoggerFactory.getLogger(UserdetailServiceImpl.class);

    private final UserdetailRepository userdetailRepository;

    private final UserdetailMapper userdetailMapper;

    public UserdetailServiceImpl(UserdetailRepository userdetailRepository, UserdetailMapper userdetailMapper) {
        this.userdetailRepository = userdetailRepository;
        this.userdetailMapper = userdetailMapper;
    }

    /**
     * Save a userdetail.
     *
     * @param userdetailDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public UserdetailDTO save(UserdetailDTO userdetailDTO) {
        log.debug("Request to save Userdetail : {}", userdetailDTO);
        Userdetail userdetail = userdetailMapper.toEntity(userdetailDTO);
        userdetail = userdetailRepository.save(userdetail);
        return userdetailMapper.toDto(userdetail);
    }

    /**
     * Get all the userdetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserdetailDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Userdetails");
        return userdetailRepository.findAll(pageable)
            .map(userdetailMapper::toDto);
    }


    /**
     * Get one userdetail by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserdetailDTO> findOne(Long id) {
        log.debug("Request to get Userdetail : {}", id);
        return userdetailRepository.findById(id)
            .map(userdetailMapper::toDto);
    }

    /**
     * Delete the userdetail by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Userdetail : {}", id);
        userdetailRepository.deleteById(id);
    }
}
