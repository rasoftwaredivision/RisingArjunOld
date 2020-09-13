package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.SalarypaymentDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Salarypayment}.
 */
public interface SalarypaymentService {

    /**
     * Save a salarypayment.
     *
     * @param salarypaymentDTO the entity to save.
     * @return the persisted entity.
     */
    SalarypaymentDTO save(SalarypaymentDTO salarypaymentDTO);

    /**
     * Get all the salarypayments.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<SalarypaymentDTO> findAll(Pageable pageable);


    /**
     * Get the "id" salarypayment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<SalarypaymentDTO> findOne(Long id);

    /**
     * Delete the "id" salarypayment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
