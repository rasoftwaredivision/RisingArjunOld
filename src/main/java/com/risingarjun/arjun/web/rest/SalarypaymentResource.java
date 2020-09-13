package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.SalarypaymentService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.SalarypaymentDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.risingarjun.arjun.domain.Salarypayment}.
 */
@RestController
@RequestMapping("/api")
public class SalarypaymentResource {

    private final Logger log = LoggerFactory.getLogger(SalarypaymentResource.class);

    private static final String ENTITY_NAME = "salarypayment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SalarypaymentService salarypaymentService;

    public SalarypaymentResource(SalarypaymentService salarypaymentService) {
        this.salarypaymentService = salarypaymentService;
    }

    /**
     * {@code POST  /salarypayments} : Create a new salarypayment.
     *
     * @param salarypaymentDTO the salarypaymentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new salarypaymentDTO, or with status {@code 400 (Bad Request)} if the salarypayment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/salarypayments")
    public ResponseEntity<SalarypaymentDTO> createSalarypayment(@Valid @RequestBody SalarypaymentDTO salarypaymentDTO) throws URISyntaxException {
        log.debug("REST request to save Salarypayment : {}", salarypaymentDTO);
        if (salarypaymentDTO.getId() != null) {
            throw new BadRequestAlertException("A new salarypayment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalarypaymentDTO result = salarypaymentService.save(salarypaymentDTO);
        return ResponseEntity.created(new URI("/api/salarypayments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /salarypayments} : Updates an existing salarypayment.
     *
     * @param salarypaymentDTO the salarypaymentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated salarypaymentDTO,
     * or with status {@code 400 (Bad Request)} if the salarypaymentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the salarypaymentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/salarypayments")
    public ResponseEntity<SalarypaymentDTO> updateSalarypayment(@Valid @RequestBody SalarypaymentDTO salarypaymentDTO) throws URISyntaxException {
        log.debug("REST request to update Salarypayment : {}", salarypaymentDTO);
        if (salarypaymentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SalarypaymentDTO result = salarypaymentService.save(salarypaymentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, salarypaymentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /salarypayments} : get all the salarypayments.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of salarypayments in body.
     */
    @GetMapping("/salarypayments")
    public ResponseEntity<List<SalarypaymentDTO>> getAllSalarypayments(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Salarypayments");
        Page<SalarypaymentDTO> page = salarypaymentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /salarypayments/:id} : get the "id" salarypayment.
     *
     * @param id the id of the salarypaymentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the salarypaymentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/salarypayments/{id}")
    public ResponseEntity<SalarypaymentDTO> getSalarypayment(@PathVariable Long id) {
        log.debug("REST request to get Salarypayment : {}", id);
        Optional<SalarypaymentDTO> salarypaymentDTO = salarypaymentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(salarypaymentDTO);
    }

    /**
     * {@code DELETE  /salarypayments/:id} : delete the "id" salarypayment.
     *
     * @param id the id of the salarypaymentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/salarypayments/{id}")
    public ResponseEntity<Void> deleteSalarypayment(@PathVariable Long id) {
        log.debug("REST request to delete Salarypayment : {}", id);
        salarypaymentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
