package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.EnterprisesettingsService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.EnterprisesettingsDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Enterprisesettings}.
 */
@RestController
@RequestMapping("/api")
public class EnterprisesettingsResource {

    private final Logger log = LoggerFactory.getLogger(EnterprisesettingsResource.class);

    private static final String ENTITY_NAME = "enterprisesettings";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnterprisesettingsService enterprisesettingsService;

    public EnterprisesettingsResource(EnterprisesettingsService enterprisesettingsService) {
        this.enterprisesettingsService = enterprisesettingsService;
    }

    /**
     * {@code POST  /enterprisesettings} : Create a new enterprisesettings.
     *
     * @param enterprisesettingsDTO the enterprisesettingsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new enterprisesettingsDTO, or with status {@code 400 (Bad Request)} if the enterprisesettings has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/enterprisesettings")
    public ResponseEntity<EnterprisesettingsDTO> createEnterprisesettings(@RequestBody EnterprisesettingsDTO enterprisesettingsDTO) throws URISyntaxException {
        log.debug("REST request to save Enterprisesettings : {}", enterprisesettingsDTO);
        if (enterprisesettingsDTO.getId() != null) {
            throw new BadRequestAlertException("A new enterprisesettings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EnterprisesettingsDTO result = enterprisesettingsService.save(enterprisesettingsDTO);
        return ResponseEntity.created(new URI("/api/enterprisesettings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /enterprisesettings} : Updates an existing enterprisesettings.
     *
     * @param enterprisesettingsDTO the enterprisesettingsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enterprisesettingsDTO,
     * or with status {@code 400 (Bad Request)} if the enterprisesettingsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the enterprisesettingsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/enterprisesettings")
    public ResponseEntity<EnterprisesettingsDTO> updateEnterprisesettings(@RequestBody EnterprisesettingsDTO enterprisesettingsDTO) throws URISyntaxException {
        log.debug("REST request to update Enterprisesettings : {}", enterprisesettingsDTO);
        if (enterprisesettingsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EnterprisesettingsDTO result = enterprisesettingsService.save(enterprisesettingsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, enterprisesettingsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /enterprisesettings} : get all the enterprisesettings.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of enterprisesettings in body.
     */
    @GetMapping("/enterprisesettings")
    public List<EnterprisesettingsDTO> getAllEnterprisesettings() {
        log.debug("REST request to get all Enterprisesettings");
        return enterprisesettingsService.findAll();
    }

    /**
     * {@code GET  /enterprisesettings/:id} : get the "id" enterprisesettings.
     *
     * @param id the id of the enterprisesettingsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the enterprisesettingsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/enterprisesettings/{id}")
    public ResponseEntity<EnterprisesettingsDTO> getEnterprisesettings(@PathVariable Long id) {
        log.debug("REST request to get Enterprisesettings : {}", id);
        Optional<EnterprisesettingsDTO> enterprisesettingsDTO = enterprisesettingsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(enterprisesettingsDTO);
    }

    /**
     * {@code DELETE  /enterprisesettings/:id} : delete the "id" enterprisesettings.
     *
     * @param id the id of the enterprisesettingsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/enterprisesettings/{id}")
    public ResponseEntity<Void> deleteEnterprisesettings(@PathVariable Long id) {
        log.debug("REST request to delete Enterprisesettings : {}", id);
        enterprisesettingsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
