package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.UserdetailService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.UserdetailDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Userdetail}.
 */
@RestController
@RequestMapping("/api")
public class UserdetailResource {

    private final Logger log = LoggerFactory.getLogger(UserdetailResource.class);

    private static final String ENTITY_NAME = "userdetail";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserdetailService userdetailService;

    public UserdetailResource(UserdetailService userdetailService) {
        this.userdetailService = userdetailService;
    }

    /**
     * {@code POST  /userdetails} : Create a new userdetail.
     *
     * @param userdetailDTO the userdetailDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userdetailDTO, or with status {@code 400 (Bad Request)} if the userdetail has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/userdetails")
    public ResponseEntity<UserdetailDTO> createUserdetail(@Valid @RequestBody UserdetailDTO userdetailDTO) throws URISyntaxException {
        log.debug("REST request to save Userdetail : {}", userdetailDTO);
        if (userdetailDTO.getId() != null) {
            throw new BadRequestAlertException("A new userdetail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserdetailDTO result = userdetailService.save(userdetailDTO);
        return ResponseEntity.created(new URI("/api/userdetails/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /userdetails} : Updates an existing userdetail.
     *
     * @param userdetailDTO the userdetailDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userdetailDTO,
     * or with status {@code 400 (Bad Request)} if the userdetailDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userdetailDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/userdetails")
    public ResponseEntity<UserdetailDTO> updateUserdetail(@Valid @RequestBody UserdetailDTO userdetailDTO) throws URISyntaxException {
        log.debug("REST request to update Userdetail : {}", userdetailDTO);
        if (userdetailDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserdetailDTO result = userdetailService.save(userdetailDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userdetailDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /userdetails} : get all the userdetails.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userdetails in body.
     */
    @GetMapping("/userdetails")
    public ResponseEntity<List<UserdetailDTO>> getAllUserdetails(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Userdetails");
        Page<UserdetailDTO> page = userdetailService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /userdetails/:id} : get the "id" userdetail.
     *
     * @param id the id of the userdetailDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userdetailDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/userdetails/{id}")
    public ResponseEntity<UserdetailDTO> getUserdetail(@PathVariable Long id) {
        log.debug("REST request to get Userdetail : {}", id);
        Optional<UserdetailDTO> userdetailDTO = userdetailService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userdetailDTO);
    }

    /**
     * {@code DELETE  /userdetails/:id} : delete the "id" userdetail.
     *
     * @param id the id of the userdetailDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/userdetails/{id}")
    public ResponseEntity<Void> deleteUserdetail(@PathVariable Long id) {
        log.debug("REST request to delete Userdetail : {}", id);
        userdetailService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
