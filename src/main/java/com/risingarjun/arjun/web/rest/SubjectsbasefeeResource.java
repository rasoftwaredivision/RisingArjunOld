package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.SubjectsbasefeeService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.SubjectsbasefeeDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Subjectsbasefee}.
 */
@RestController
@RequestMapping("/api")
public class SubjectsbasefeeResource {

    private final Logger log = LoggerFactory.getLogger(SubjectsbasefeeResource.class);

    private static final String ENTITY_NAME = "subjectsbasefee";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubjectsbasefeeService subjectsbasefeeService;

    public SubjectsbasefeeResource(SubjectsbasefeeService subjectsbasefeeService) {
        this.subjectsbasefeeService = subjectsbasefeeService;
    }

    /**
     * {@code POST  /subjectsbasefees} : Create a new subjectsbasefee.
     *
     * @param subjectsbasefeeDTO the subjectsbasefeeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new subjectsbasefeeDTO, or with status {@code 400 (Bad Request)} if the subjectsbasefee has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/subjectsbasefees")
    public ResponseEntity<SubjectsbasefeeDTO> createSubjectsbasefee(@RequestBody SubjectsbasefeeDTO subjectsbasefeeDTO) throws URISyntaxException {
        log.debug("REST request to save Subjectsbasefee : {}", subjectsbasefeeDTO);
        if (subjectsbasefeeDTO.getId() != null) {
            throw new BadRequestAlertException("A new subjectsbasefee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubjectsbasefeeDTO result = subjectsbasefeeService.save(subjectsbasefeeDTO);
        return ResponseEntity.created(new URI("/api/subjectsbasefees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /subjectsbasefees} : Updates an existing subjectsbasefee.
     *
     * @param subjectsbasefeeDTO the subjectsbasefeeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subjectsbasefeeDTO,
     * or with status {@code 400 (Bad Request)} if the subjectsbasefeeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subjectsbasefeeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/subjectsbasefees")
    public ResponseEntity<SubjectsbasefeeDTO> updateSubjectsbasefee(@RequestBody SubjectsbasefeeDTO subjectsbasefeeDTO) throws URISyntaxException {
        log.debug("REST request to update Subjectsbasefee : {}", subjectsbasefeeDTO);
        if (subjectsbasefeeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubjectsbasefeeDTO result = subjectsbasefeeService.save(subjectsbasefeeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subjectsbasefeeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /subjectsbasefees} : get all the subjectsbasefees.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subjectsbasefees in body.
     */
    @GetMapping("/subjectsbasefees")
    public List<SubjectsbasefeeDTO> getAllSubjectsbasefees() {
        log.debug("REST request to get all Subjectsbasefees");
        return subjectsbasefeeService.findAll();
    }

    /**
     * {@code GET  /subjectsbasefees/:id} : get the "id" subjectsbasefee.
     *
     * @param id the id of the subjectsbasefeeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subjectsbasefeeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/subjectsbasefees/{id}")
    public ResponseEntity<SubjectsbasefeeDTO> getSubjectsbasefee(@PathVariable Long id) {
        log.debug("REST request to get Subjectsbasefee : {}", id);
        Optional<SubjectsbasefeeDTO> subjectsbasefeeDTO = subjectsbasefeeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subjectsbasefeeDTO);
    }

    /**
     * {@code DELETE  /subjectsbasefees/:id} : delete the "id" subjectsbasefee.
     *
     * @param id the id of the subjectsbasefeeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/subjectsbasefees/{id}")
    public ResponseEntity<Void> deleteSubjectsbasefee(@PathVariable Long id) {
        log.debug("REST request to delete Subjectsbasefee : {}", id);
        subjectsbasefeeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
