package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.UserdetailDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Userdetail}.
 */
public interface UserdetailService {

    /**
     * Save a userdetail.
     *
     * @param userdetailDTO the entity to save.
     * @return the persisted entity.
     */
    UserdetailDTO save(UserdetailDTO userdetailDTO);

    /**
     * Get all the userdetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<UserdetailDTO> findAll(Pageable pageable);


    /**
     * Get the "id" userdetail.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<UserdetailDTO> findOne(Long id);

    /**
     * Delete the "id" userdetail.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
