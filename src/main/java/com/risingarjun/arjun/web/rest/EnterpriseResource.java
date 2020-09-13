package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.EnterpriseService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.EnterpriseDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Enterprise}.
 */
@RestController
@RequestMapping("/api")
public class EnterpriseResource {

    private final Logger log = LoggerFactory.getLogger(EnterpriseResource.class);

    private static final String ENTITY_NAME = "enterprise";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnterpriseService enterpriseService;

    public EnterpriseResource(EnterpriseService enterpriseService) {
        this.enterpriseService = enterpriseService;
    }

    /**
     * {@code POST  /enterprises} : Create a new enterprise.
     *
     * @param enterpriseDTO the enterpriseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new enterpriseDTO, or with status {@code 400 (Bad Request)} if the enterprise has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/enterprises")
    public ResponseEntity<EnterpriseDTO> createEnterprise(@Valid @RequestBody EnterpriseDTO enterpriseDTO) throws URISyntaxException {
        log.debug("REST request to save Enterprise : {}", enterpriseDTO);
        if (enterpriseDTO.getId() != null) {
            throw new BadRequestAlertException("A new enterprise cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EnterpriseDTO result = enterpriseService.save(enterpriseDTO);
        return ResponseEntity.created(new URI("/api/enterprises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /enterprises} : Updates an existing enterprise.
     *
     * @param enterpriseDTO the enterpriseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enterpriseDTO,
     * or with status {@code 400 (Bad Request)} if the enterpriseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the enterpriseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/enterprises")
    public ResponseEntity<EnterpriseDTO> updateEnterprise(@Valid @RequestBody EnterpriseDTO enterpriseDTO) throws URISyntaxException {
        log.debug("REST request to update Enterprise : {}", enterpriseDTO);
        if (enterpriseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EnterpriseDTO result = enterpriseService.save(enterpriseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, enterpriseDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /enterprises} : get all the enterprises.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of enterprises in body.
     */
    @GetMapping("/enterprises")
    public ResponseEntity<List<EnterpriseDTO>> getAllEnterprises(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Enterprises");
        Page<EnterpriseDTO> page = enterpriseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /enterprises/:id} : get the "id" enterprise.
     *
     * @param id the id of the enterpriseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the enterpriseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/enterprises/{id}")
    public ResponseEntity<EnterpriseDTO> getEnterprise(@PathVariable Long id) {
        log.debug("REST request to get Enterprise : {}", id);
        Optional<EnterpriseDTO> enterpriseDTO = enterpriseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(enterpriseDTO);
    }

    /**
     * {@code DELETE  /enterprises/:id} : delete the "id" enterprise.
     *
     * @param id the id of the enterpriseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/enterprises/{id}")
    public ResponseEntity<Void> deleteEnterprise(@PathVariable Long id) {
        log.debug("REST request to delete Enterprise : {}", id);
        enterpriseService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
