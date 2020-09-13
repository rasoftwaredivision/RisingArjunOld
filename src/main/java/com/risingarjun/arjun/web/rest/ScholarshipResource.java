package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.ScholarshipService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.ScholarshipDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Scholarship}.
 */
@RestController
@RequestMapping("/api")
public class ScholarshipResource {

    private final Logger log = LoggerFactory.getLogger(ScholarshipResource.class);

    private static final String ENTITY_NAME = "scholarship";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ScholarshipService scholarshipService;

    public ScholarshipResource(ScholarshipService scholarshipService) {
        this.scholarshipService = scholarshipService;
    }

    /**
     * {@code POST  /scholarships} : Create a new scholarship.
     *
     * @param scholarshipDTO the scholarshipDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new scholarshipDTO, or with status {@code 400 (Bad Request)} if the scholarship has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/scholarships")
    public ResponseEntity<ScholarshipDTO> createScholarship(@RequestBody ScholarshipDTO scholarshipDTO) throws URISyntaxException {
        log.debug("REST request to save Scholarship : {}", scholarshipDTO);
        if (scholarshipDTO.getId() != null) {
            throw new BadRequestAlertException("A new scholarship cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScholarshipDTO result = scholarshipService.save(scholarshipDTO);
        return ResponseEntity.created(new URI("/api/scholarships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /scholarships} : Updates an existing scholarship.
     *
     * @param scholarshipDTO the scholarshipDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated scholarshipDTO,
     * or with status {@code 400 (Bad Request)} if the scholarshipDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the scholarshipDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/scholarships")
    public ResponseEntity<ScholarshipDTO> updateScholarship(@RequestBody ScholarshipDTO scholarshipDTO) throws URISyntaxException {
        log.debug("REST request to update Scholarship : {}", scholarshipDTO);
        if (scholarshipDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ScholarshipDTO result = scholarshipService.save(scholarshipDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, scholarshipDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /scholarships} : get all the scholarships.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of scholarships in body.
     */
    @GetMapping("/scholarships")
    public List<ScholarshipDTO> getAllScholarships() {
        log.debug("REST request to get all Scholarships");
        return scholarshipService.findAll();
    }

    /**
     * {@code GET  /scholarships/:id} : get the "id" scholarship.
     *
     * @param id the id of the scholarshipDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the scholarshipDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/scholarships/{id}")
    public ResponseEntity<ScholarshipDTO> getScholarship(@PathVariable Long id) {
        log.debug("REST request to get Scholarship : {}", id);
        Optional<ScholarshipDTO> scholarshipDTO = scholarshipService.findOne(id);
        return ResponseUtil.wrapOrNotFound(scholarshipDTO);
    }

    /**
     * {@code DELETE  /scholarships/:id} : delete the "id" scholarship.
     *
     * @param id the id of the scholarshipDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/scholarships/{id}")
    public ResponseEntity<Void> deleteScholarship(@PathVariable Long id) {
        log.debug("REST request to delete Scholarship : {}", id);
        scholarshipService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
