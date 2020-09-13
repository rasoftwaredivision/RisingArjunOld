package com.risingarjun.arjun.service;

import com.risingarjun.arjun.service.dto.DiscountDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.risingarjun.arjun.domain.Discount}.
 */
public interface DiscountService {

    /**
     * Save a discount.
     *
     * @param discountDTO the entity to save.
     * @return the persisted entity.
     */
    DiscountDTO save(DiscountDTO discountDTO);

    /**
     * Get all the discounts.
     *
     * @return the list of entities.
     */
    List<DiscountDTO> findAll();


    /**
     * Get the "id" discount.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DiscountDTO> findOne(Long id);

    /**
     * Delete the "id" discount.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
