package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.StudentfeeService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.StudentfeeDTO;

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

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.risingarjun.arjun.domain.Studentfee}.
 */
@RestController
@RequestMapping("/api")
public class StudentfeeResource {

    private final Logger log = LoggerFactory.getLogger(StudentfeeResource.class);

    private static final String ENTITY_NAME = "studentfee";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentfeeService studentfeeService;

    public StudentfeeResource(StudentfeeService studentfeeService) {
        this.studentfeeService = studentfeeService;
    }

    /**
     * {@code POST  /studentfees} : Create a new studentfee.
     *
     * @param studentfeeDTO the studentfeeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentfeeDTO, or with status {@code 400 (Bad Request)} if the studentfee has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/studentfees")
    public ResponseEntity<StudentfeeDTO> createStudentfee(@RequestBody StudentfeeDTO studentfeeDTO) throws URISyntaxException {
        log.debug("REST request to save Studentfee : {}", studentfeeDTO);
        if (studentfeeDTO.getId() != null) {
            throw new BadRequestAlertException("A new studentfee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentfeeDTO result = studentfeeService.save(studentfeeDTO);
        return ResponseEntity.created(new URI("/api/studentfees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /studentfees} : Updates an existing studentfee.
     *
     * @param studentfeeDTO the studentfeeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentfeeDTO,
     * or with status {@code 400 (Bad Request)} if the studentfeeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentfeeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/studentfees")
    public ResponseEntity<StudentfeeDTO> updateStudentfee(@RequestBody StudentfeeDTO studentfeeDTO) throws URISyntaxException {
        log.debug("REST request to update Studentfee : {}", studentfeeDTO);
        if (studentfeeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentfeeDTO result = studentfeeService.save(studentfeeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentfeeDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /studentfees} : get all the studentfees.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentfees in body.
     */
    @GetMapping("/studentfees")
    public ResponseEntity<List<StudentfeeDTO>> getAllStudentfees(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Studentfees");
        Page<StudentfeeDTO> page = studentfeeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /studentfees/:id} : get the "id" studentfee.
     *
     * @param id the id of the studentfeeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentfeeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/studentfees/{id}")
    public ResponseEntity<StudentfeeDTO> getStudentfee(@PathVariable Long id) {
        log.debug("REST request to get Studentfee : {}", id);
        Optional<StudentfeeDTO> studentfeeDTO = studentfeeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentfeeDTO);
    }

    /**
     * {@code DELETE  /studentfees/:id} : delete the "id" studentfee.
     *
     * @param id the id of the studentfeeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/studentfees/{id}")
    public ResponseEntity<Void> deleteStudentfee(@PathVariable Long id) {
        log.debug("REST request to delete Studentfee : {}", id);
        studentfeeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
