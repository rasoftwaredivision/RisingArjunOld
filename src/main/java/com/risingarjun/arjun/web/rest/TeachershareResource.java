package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.TeachershareService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.TeachershareDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Teachershare}.
 */
@RestController
@RequestMapping("/api")
public class TeachershareResource {

    private final Logger log = LoggerFactory.getLogger(TeachershareResource.class);

    private static final String ENTITY_NAME = "teachershare";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TeachershareService teachershareService;

    public TeachershareResource(TeachershareService teachershareService) {
        this.teachershareService = teachershareService;
    }

    /**
     * {@code POST  /teachershares} : Create a new teachershare.
     *
     * @param teachershareDTO the teachershareDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new teachershareDTO, or with status {@code 400 (Bad Request)} if the teachershare has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/teachershares")
    public ResponseEntity<TeachershareDTO> createTeachershare(@Valid @RequestBody TeachershareDTO teachershareDTO) throws URISyntaxException {
        log.debug("REST request to save Teachershare : {}", teachershareDTO);
        if (teachershareDTO.getId() != null) {
            throw new BadRequestAlertException("A new teachershare cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeachershareDTO result = teachershareService.save(teachershareDTO);
        return ResponseEntity.created(new URI("/api/teachershares/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /teachershares} : Updates an existing teachershare.
     *
     * @param teachershareDTO the teachershareDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated teachershareDTO,
     * or with status {@code 400 (Bad Request)} if the teachershareDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the teachershareDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/teachershares")
    public ResponseEntity<TeachershareDTO> updateTeachershare(@Valid @RequestBody TeachershareDTO teachershareDTO) throws URISyntaxException {
        log.debug("REST request to update Teachershare : {}", teachershareDTO);
        if (teachershareDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TeachershareDTO result = teachershareService.save(teachershareDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, teachershareDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /teachershares} : get all the teachershares.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of teachershares in body.
     */
    @GetMapping("/teachershares")
    public ResponseEntity<List<TeachershareDTO>> getAllTeachershares(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Teachershares");
        Page<TeachershareDTO> page = teachershareService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /teachershares/:id} : get the "id" teachershare.
     *
     * @param id the id of the teachershareDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the teachershareDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/teachershares/{id}")
    public ResponseEntity<TeachershareDTO> getTeachershare(@PathVariable Long id) {
        log.debug("REST request to get Teachershare : {}", id);
        Optional<TeachershareDTO> teachershareDTO = teachershareService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teachershareDTO);
    }

    /**
     * {@code DELETE  /teachershares/:id} : delete the "id" teachershare.
     *
     * @param id the id of the teachershareDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/teachershares/{id}")
    public ResponseEntity<Void> deleteTeachershare(@PathVariable Long id) {
        log.debug("REST request to delete Teachershare : {}", id);
        teachershareService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
