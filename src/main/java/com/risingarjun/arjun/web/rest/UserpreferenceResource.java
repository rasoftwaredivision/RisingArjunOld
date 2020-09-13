package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.UserpreferenceService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.UserpreferenceDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Userpreference}.
 */
@RestController
@RequestMapping("/api")
public class UserpreferenceResource {

    private final Logger log = LoggerFactory.getLogger(UserpreferenceResource.class);

    private static final String ENTITY_NAME = "userpreference";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserpreferenceService userpreferenceService;

    public UserpreferenceResource(UserpreferenceService userpreferenceService) {
        this.userpreferenceService = userpreferenceService;
    }

    /**
     * {@code POST  /userpreferences} : Create a new userpreference.
     *
     * @param userpreferenceDTO the userpreferenceDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userpreferenceDTO, or with status {@code 400 (Bad Request)} if the userpreference has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/userpreferences")
    public ResponseEntity<UserpreferenceDTO> createUserpreference(@RequestBody UserpreferenceDTO userpreferenceDTO) throws URISyntaxException {
        log.debug("REST request to save Userpreference : {}", userpreferenceDTO);
        if (userpreferenceDTO.getId() != null) {
            throw new BadRequestAlertException("A new userpreference cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserpreferenceDTO result = userpreferenceService.save(userpreferenceDTO);
        return ResponseEntity.created(new URI("/api/userpreferences/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /userpreferences} : Updates an existing userpreference.
     *
     * @param userpreferenceDTO the userpreferenceDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userpreferenceDTO,
     * or with status {@code 400 (Bad Request)} if the userpreferenceDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userpreferenceDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/userpreferences")
    public ResponseEntity<UserpreferenceDTO> updateUserpreference(@RequestBody UserpreferenceDTO userpreferenceDTO) throws URISyntaxException {
        log.debug("REST request to update Userpreference : {}", userpreferenceDTO);
        if (userpreferenceDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserpreferenceDTO result = userpreferenceService.save(userpreferenceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userpreferenceDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /userpreferences} : get all the userpreferences.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userpreferences in body.
     */
    @GetMapping("/userpreferences")
    public List<UserpreferenceDTO> getAllUserpreferences() {
        log.debug("REST request to get all Userpreferences");
        return userpreferenceService.findAll();
    }

    /**
     * {@code GET  /userpreferences/:id} : get the "id" userpreference.
     *
     * @param id the id of the userpreferenceDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userpreferenceDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/userpreferences/{id}")
    public ResponseEntity<UserpreferenceDTO> getUserpreference(@PathVariable Long id) {
        log.debug("REST request to get Userpreference : {}", id);
        Optional<UserpreferenceDTO> userpreferenceDTO = userpreferenceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userpreferenceDTO);
    }

    /**
     * {@code DELETE  /userpreferences/:id} : delete the "id" userpreference.
     *
     * @param id the id of the userpreferenceDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/userpreferences/{id}")
    public ResponseEntity<Void> deleteUserpreference(@PathVariable Long id) {
        log.debug("REST request to delete Userpreference : {}", id);
        userpreferenceService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
