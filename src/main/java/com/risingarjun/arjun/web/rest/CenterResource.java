package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.CenterService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.CenterDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Center}.
 */
@RestController
@RequestMapping("/api")
public class CenterResource {

    private final Logger log = LoggerFactory.getLogger(CenterResource.class);

    private static final String ENTITY_NAME = "center";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CenterService centerService;

    public CenterResource(CenterService centerService) {
        this.centerService = centerService;
    }

    /**
     * {@code POST  /centers} : Create a new center.
     *
     * @param centerDTO the centerDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new centerDTO, or with status {@code 400 (Bad Request)} if the center has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/centers")
    public ResponseEntity<CenterDTO> createCenter(@Valid @RequestBody CenterDTO centerDTO) throws URISyntaxException {
        log.debug("REST request to save Center : {}", centerDTO);
        if (centerDTO.getId() != null) {
            throw new BadRequestAlertException("A new center cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CenterDTO result = centerService.save(centerDTO);
        return ResponseEntity.created(new URI("/api/centers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /centers} : Updates an existing center.
     *
     * @param centerDTO the centerDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated centerDTO,
     * or with status {@code 400 (Bad Request)} if the centerDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the centerDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/centers")
    public ResponseEntity<CenterDTO> updateCenter(@Valid @RequestBody CenterDTO centerDTO) throws URISyntaxException {
        log.debug("REST request to update Center : {}", centerDTO);
        if (centerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CenterDTO result = centerService.save(centerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, centerDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /centers} : get all the centers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of centers in body.
     */
    @GetMapping("/centers")
    public List<CenterDTO> getAllCenters() {
        log.debug("REST request to get all Centers");
        return centerService.findAll();
    }

    /**
     * {@code GET  /centers/:id} : get the "id" center.
     *
     * @param id the id of the centerDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the centerDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/centers/{id}")
    public ResponseEntity<CenterDTO> getCenter(@PathVariable Long id) {
        log.debug("REST request to get Center : {}", id);
        Optional<CenterDTO> centerDTO = centerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(centerDTO);
    }

    /**
     * {@code DELETE  /centers/:id} : delete the "id" center.
     *
     * @param id the id of the centerDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/centers/{id}")
    public ResponseEntity<Void> deleteCenter(@PathVariable Long id) {
        log.debug("REST request to delete Center : {}", id);
        centerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
