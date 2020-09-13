package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.AcademicsessionService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.AcademicsessionDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Academicsession}.
 */
@RestController
@RequestMapping("/api")
public class AcademicsessionResource {

    private final Logger log = LoggerFactory.getLogger(AcademicsessionResource.class);

    private static final String ENTITY_NAME = "academicsession";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AcademicsessionService academicsessionService;

    public AcademicsessionResource(AcademicsessionService academicsessionService) {
        this.academicsessionService = academicsessionService;
    }

    /**
     * {@code POST  /academicsessions} : Create a new academicsession.
     *
     * @param academicsessionDTO the academicsessionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new academicsessionDTO, or with status {@code 400 (Bad Request)} if the academicsession has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/academicsessions")
    public ResponseEntity<AcademicsessionDTO> createAcademicsession(@Valid @RequestBody AcademicsessionDTO academicsessionDTO) throws URISyntaxException {
        log.debug("REST request to save Academicsession : {}", academicsessionDTO);
        if (academicsessionDTO.getId() != null) {
            throw new BadRequestAlertException("A new academicsession cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AcademicsessionDTO result = academicsessionService.save(academicsessionDTO);
        return ResponseEntity.created(new URI("/api/academicsessions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /academicsessions} : Updates an existing academicsession.
     *
     * @param academicsessionDTO the academicsessionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated academicsessionDTO,
     * or with status {@code 400 (Bad Request)} if the academicsessionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the academicsessionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/academicsessions")
    public ResponseEntity<AcademicsessionDTO> updateAcademicsession(@Valid @RequestBody AcademicsessionDTO academicsessionDTO) throws URISyntaxException {
        log.debug("REST request to update Academicsession : {}", academicsessionDTO);
        if (academicsessionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AcademicsessionDTO result = academicsessionService.save(academicsessionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, academicsessionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /academicsessions} : get all the academicsessions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of academicsessions in body.
     */
    @GetMapping("/academicsessions")
    public List<AcademicsessionDTO> getAllAcademicsessions() {
        log.debug("REST request to get all Academicsessions");
        return academicsessionService.findAll();
    }

    /**
     * {@code GET  /academicsessions/:id} : get the "id" academicsession.
     *
     * @param id the id of the academicsessionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the academicsessionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/academicsessions/{id}")
    public ResponseEntity<AcademicsessionDTO> getAcademicsession(@PathVariable Long id) {
        log.debug("REST request to get Academicsession : {}", id);
        Optional<AcademicsessionDTO> academicsessionDTO = academicsessionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(academicsessionDTO);
    }

    /**
     * {@code DELETE  /academicsessions/:id} : delete the "id" academicsession.
     *
     * @param id the id of the academicsessionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/academicsessions/{id}")
    public ResponseEntity<Void> deleteAcademicsession(@PathVariable Long id) {
        log.debug("REST request to delete Academicsession : {}", id);
        academicsessionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
