package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.RoleaccessService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.RoleaccessDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Roleaccess}.
 */
@RestController
@RequestMapping("/api")
public class RoleaccessResource {

    private final Logger log = LoggerFactory.getLogger(RoleaccessResource.class);

    private static final String ENTITY_NAME = "roleaccess";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RoleaccessService roleaccessService;

    public RoleaccessResource(RoleaccessService roleaccessService) {
        this.roleaccessService = roleaccessService;
    }

    /**
     * {@code POST  /roleaccesses} : Create a new roleaccess.
     *
     * @param roleaccessDTO the roleaccessDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new roleaccessDTO, or with status {@code 400 (Bad Request)} if the roleaccess has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/roleaccesses")
    public ResponseEntity<RoleaccessDTO> createRoleaccess(@RequestBody RoleaccessDTO roleaccessDTO) throws URISyntaxException {
        log.debug("REST request to save Roleaccess : {}", roleaccessDTO);
        if (roleaccessDTO.getId() != null) {
            throw new BadRequestAlertException("A new roleaccess cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoleaccessDTO result = roleaccessService.save(roleaccessDTO);
        return ResponseEntity.created(new URI("/api/roleaccesses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /roleaccesses} : Updates an existing roleaccess.
     *
     * @param roleaccessDTO the roleaccessDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated roleaccessDTO,
     * or with status {@code 400 (Bad Request)} if the roleaccessDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the roleaccessDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/roleaccesses")
    public ResponseEntity<RoleaccessDTO> updateRoleaccess(@RequestBody RoleaccessDTO roleaccessDTO) throws URISyntaxException {
        log.debug("REST request to update Roleaccess : {}", roleaccessDTO);
        if (roleaccessDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        RoleaccessDTO result = roleaccessService.save(roleaccessDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, roleaccessDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /roleaccesses} : get all the roleaccesses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of roleaccesses in body.
     */
    @GetMapping("/roleaccesses")
    public List<RoleaccessDTO> getAllRoleaccesses() {
        log.debug("REST request to get all Roleaccesses");
        return roleaccessService.findAll();
    }

    /**
     * {@code GET  /roleaccesses/:id} : get the "id" roleaccess.
     *
     * @param id the id of the roleaccessDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the roleaccessDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/roleaccesses/{id}")
    public ResponseEntity<RoleaccessDTO> getRoleaccess(@PathVariable Long id) {
        log.debug("REST request to get Roleaccess : {}", id);
        Optional<RoleaccessDTO> roleaccessDTO = roleaccessService.findOne(id);
        return ResponseUtil.wrapOrNotFound(roleaccessDTO);
    }

    /**
     * {@code DELETE  /roleaccesses/:id} : delete the "id" roleaccess.
     *
     * @param id the id of the roleaccessDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/roleaccesses/{id}")
    public ResponseEntity<Void> deleteRoleaccess(@PathVariable Long id) {
        log.debug("REST request to delete Roleaccess : {}", id);
        roleaccessService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
