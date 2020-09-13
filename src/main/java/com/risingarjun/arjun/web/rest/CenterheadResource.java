package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.CenterheadService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.CenterheadDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Centerhead}.
 */
@RestController
@RequestMapping("/api")
public class CenterheadResource {

    private final Logger log = LoggerFactory.getLogger(CenterheadResource.class);

    private static final String ENTITY_NAME = "centerhead";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CenterheadService centerheadService;

    public CenterheadResource(CenterheadService centerheadService) {
        this.centerheadService = centerheadService;
    }

    /**
     * {@code POST  /centerheads} : Create a new centerhead.
     *
     * @param centerheadDTO the centerheadDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new centerheadDTO, or with status {@code 400 (Bad Request)} if the centerhead has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/centerheads")
    public ResponseEntity<CenterheadDTO> createCenterhead(@RequestBody CenterheadDTO centerheadDTO) throws URISyntaxException {
        log.debug("REST request to save Centerhead : {}", centerheadDTO);
        if (centerheadDTO.getId() != null) {
            throw new BadRequestAlertException("A new centerhead cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CenterheadDTO result = centerheadService.save(centerheadDTO);
        return ResponseEntity.created(new URI("/api/centerheads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /centerheads} : Updates an existing centerhead.
     *
     * @param centerheadDTO the centerheadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated centerheadDTO,
     * or with status {@code 400 (Bad Request)} if the centerheadDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the centerheadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/centerheads")
    public ResponseEntity<CenterheadDTO> updateCenterhead(@RequestBody CenterheadDTO centerheadDTO) throws URISyntaxException {
        log.debug("REST request to update Centerhead : {}", centerheadDTO);
        if (centerheadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CenterheadDTO result = centerheadService.save(centerheadDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, centerheadDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /centerheads} : get all the centerheads.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of centerheads in body.
     */
    @GetMapping("/centerheads")
    public List<CenterheadDTO> getAllCenterheads(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Centerheads");
        return centerheadService.findAll();
    }

    /**
     * {@code GET  /centerheads/:id} : get the "id" centerhead.
     *
     * @param id the id of the centerheadDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the centerheadDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/centerheads/{id}")
    public ResponseEntity<CenterheadDTO> getCenterhead(@PathVariable Long id) {
        log.debug("REST request to get Centerhead : {}", id);
        Optional<CenterheadDTO> centerheadDTO = centerheadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(centerheadDTO);
    }

    /**
     * {@code DELETE  /centerheads/:id} : delete the "id" centerhead.
     *
     * @param id the id of the centerheadDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/centerheads/{id}")
    public ResponseEntity<Void> deleteCenterhead(@PathVariable Long id) {
        log.debug("REST request to delete Centerhead : {}", id);
        centerheadService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
