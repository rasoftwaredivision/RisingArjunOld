package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.FundamentaldetailService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.FundamentaldetailDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.risingarjun.arjun.domain.Fundamentaldetail}.
 */
@RestController
@RequestMapping("/api")
public class FundamentaldetailResource {

    private final Logger log = LoggerFactory.getLogger(FundamentaldetailResource.class);

    private static final String ENTITY_NAME = "fundamentaldetail";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FundamentaldetailService fundamentaldetailService;

    public FundamentaldetailResource(FundamentaldetailService fundamentaldetailService) {
        this.fundamentaldetailService = fundamentaldetailService;
    }

    /**
     * {@code POST  /fundamentaldetails} : Create a new fundamentaldetail.
     *
     * @param fundamentaldetailDTO the fundamentaldetailDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fundamentaldetailDTO, or with status {@code 400 (Bad Request)} if the fundamentaldetail has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fundamentaldetails")
    public ResponseEntity<FundamentaldetailDTO> createFundamentaldetail(@RequestBody FundamentaldetailDTO fundamentaldetailDTO) throws URISyntaxException {
        log.debug("REST request to save Fundamentaldetail : {}", fundamentaldetailDTO);
        if (fundamentaldetailDTO.getId() != null) {
            throw new BadRequestAlertException("A new fundamentaldetail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FundamentaldetailDTO result = fundamentaldetailService.save(fundamentaldetailDTO);
        return ResponseEntity.created(new URI("/api/fundamentaldetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fundamentaldetails} : Updates an existing fundamentaldetail.
     *
     * @param fundamentaldetailDTO the fundamentaldetailDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fundamentaldetailDTO,
     * or with status {@code 400 (Bad Request)} if the fundamentaldetailDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fundamentaldetailDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fundamentaldetails")
    public ResponseEntity<FundamentaldetailDTO> updateFundamentaldetail(@RequestBody FundamentaldetailDTO fundamentaldetailDTO) throws URISyntaxException {
        log.debug("REST request to update Fundamentaldetail : {}", fundamentaldetailDTO);
        if (fundamentaldetailDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FundamentaldetailDTO result = fundamentaldetailService.save(fundamentaldetailDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fundamentaldetailDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fundamentaldetails} : get all the fundamentaldetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fundamentaldetails in body.
     */
    @GetMapping("/fundamentaldetails")
    public List<FundamentaldetailDTO> getAllFundamentaldetails() {
        log.debug("REST request to get all Fundamentaldetails");
        return fundamentaldetailService.findAll();
    }

    /**
     * {@code GET  /fundamentaldetails/:id} : get the "id" fundamentaldetail.
     *
     * @param id the id of the fundamentaldetailDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fundamentaldetailDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fundamentaldetails/{id}")
    public ResponseEntity<FundamentaldetailDTO> getFundamentaldetail(@PathVariable Long id) {
        log.debug("REST request to get Fundamentaldetail : {}", id);
        Optional<FundamentaldetailDTO> fundamentaldetailDTO = fundamentaldetailService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fundamentaldetailDTO);
    }

    /**
     * {@code DELETE  /fundamentaldetails/:id} : delete the "id" fundamentaldetail.
     *
     * @param id the id of the fundamentaldetailDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fundamentaldetails/{id}")
    public ResponseEntity<Void> deleteFundamentaldetail(@PathVariable Long id) {
        log.debug("REST request to delete Fundamentaldetail : {}", id);
        fundamentaldetailService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
