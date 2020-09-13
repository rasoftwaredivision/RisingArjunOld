package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.JhiauthorityService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.JhiauthorityDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.risingarjun.arjun.domain.Jhiauthority}.
 */
@RestController
@RequestMapping("/api")
public class JhiauthorityResource {

    private final Logger log = LoggerFactory.getLogger(JhiauthorityResource.class);

    private static final String ENTITY_NAME = "jhiauthority";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final JhiauthorityService jhiauthorityService;

    public JhiauthorityResource(JhiauthorityService jhiauthorityService) {
        this.jhiauthorityService = jhiauthorityService;
    }

    /**
     * {@code POST  /jhiauthorities} : Create a new jhiauthority.
     *
     * @param jhiauthorityDTO the jhiauthorityDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new jhiauthorityDTO, or with status {@code 400 (Bad Request)} if the jhiauthority has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/jhiauthorities")
    public ResponseEntity<JhiauthorityDTO> createJhiauthority(@Valid @RequestBody JhiauthorityDTO jhiauthorityDTO) throws URISyntaxException {
        log.debug("REST request to save Jhiauthority : {}", jhiauthorityDTO);
        if (jhiauthorityDTO.getId() != null) {
            throw new BadRequestAlertException("A new jhiauthority cannot already have an ID", ENTITY_NAME, "idexists");
        }
        JhiauthorityDTO result = jhiauthorityService.save(jhiauthorityDTO);
        return ResponseEntity.created(new URI("/api/jhiauthorities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /jhiauthorities} : Updates an existing jhiauthority.
     *
     * @param jhiauthorityDTO the jhiauthorityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated jhiauthorityDTO,
     * or with status {@code 400 (Bad Request)} if the jhiauthorityDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the jhiauthorityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/jhiauthorities")
    public ResponseEntity<JhiauthorityDTO> updateJhiauthority(@Valid @RequestBody JhiauthorityDTO jhiauthorityDTO) throws URISyntaxException {
        log.debug("REST request to update Jhiauthority : {}", jhiauthorityDTO);
        if (jhiauthorityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        JhiauthorityDTO result = jhiauthorityService.save(jhiauthorityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, jhiauthorityDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /jhiauthorities} : get all the jhiauthorities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of jhiauthorities in body.
     */
    @GetMapping("/jhiauthorities")
    public List<JhiauthorityDTO> getAllJhiauthorities() {
        log.debug("REST request to get all Jhiauthorities");
        return jhiauthorityService.findAll();
    }

    /**
     * {@code GET  /jhiauthorities/:id} : get the "id" jhiauthority.
     *
     * @param id the id of the jhiauthorityDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the jhiauthorityDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/jhiauthorities/{id}")
    public ResponseEntity<JhiauthorityDTO> getJhiauthority(@PathVariable Long id) {
        log.debug("REST request to get Jhiauthority : {}", id);
        Optional<JhiauthorityDTO> jhiauthorityDTO = jhiauthorityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(jhiauthorityDTO);
    }

    /**
     * {@code DELETE  /jhiauthorities/:id} : delete the "id" jhiauthority.
     *
     * @param id the id of the jhiauthorityDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/jhiauthorities/{id}")
    public ResponseEntity<Void> deleteJhiauthority(@PathVariable Long id) {
        log.debug("REST request to delete Jhiauthority : {}", id);
        jhiauthorityService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
