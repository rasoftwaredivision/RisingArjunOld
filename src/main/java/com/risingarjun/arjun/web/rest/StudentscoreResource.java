package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.StudentscoreService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.StudentscoreDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Studentscore}.
 */
@RestController
@RequestMapping("/api")
public class StudentscoreResource {

    private final Logger log = LoggerFactory.getLogger(StudentscoreResource.class);

    private static final String ENTITY_NAME = "studentscore";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentscoreService studentscoreService;

    public StudentscoreResource(StudentscoreService studentscoreService) {
        this.studentscoreService = studentscoreService;
    }

    /**
     * {@code POST  /studentscores} : Create a new studentscore.
     *
     * @param studentscoreDTO the studentscoreDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentscoreDTO, or with status {@code 400 (Bad Request)} if the studentscore has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/studentscores")
    public ResponseEntity<StudentscoreDTO> createStudentscore(@Valid @RequestBody StudentscoreDTO studentscoreDTO) throws URISyntaxException {
        log.debug("REST request to save Studentscore : {}", studentscoreDTO);
        if (studentscoreDTO.getId() != null) {
            throw new BadRequestAlertException("A new studentscore cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentscoreDTO result = studentscoreService.save(studentscoreDTO);
        return ResponseEntity.created(new URI("/api/studentscores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /studentscores} : Updates an existing studentscore.
     *
     * @param studentscoreDTO the studentscoreDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentscoreDTO,
     * or with status {@code 400 (Bad Request)} if the studentscoreDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentscoreDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/studentscores")
    public ResponseEntity<StudentscoreDTO> updateStudentscore(@Valid @RequestBody StudentscoreDTO studentscoreDTO) throws URISyntaxException {
        log.debug("REST request to update Studentscore : {}", studentscoreDTO);
        if (studentscoreDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentscoreDTO result = studentscoreService.save(studentscoreDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentscoreDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /studentscores} : get all the studentscores.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentscores in body.
     */
    @GetMapping("/studentscores")
    public ResponseEntity<List<StudentscoreDTO>> getAllStudentscores(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
        log.debug("REST request to get a page of Studentscores");
        Page<StudentscoreDTO> page = studentscoreService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /studentscores/:id} : get the "id" studentscore.
     *
     * @param id the id of the studentscoreDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentscoreDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/studentscores/{id}")
    public ResponseEntity<StudentscoreDTO> getStudentscore(@PathVariable Long id) {
        log.debug("REST request to get Studentscore : {}", id);
        Optional<StudentscoreDTO> studentscoreDTO = studentscoreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentscoreDTO);
    }

    /**
     * {@code DELETE  /studentscores/:id} : delete the "id" studentscore.
     *
     * @param id the id of the studentscoreDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/studentscores/{id}")
    public ResponseEntity<Void> deleteStudentscore(@PathVariable Long id) {
        log.debug("REST request to delete Studentscore : {}", id);
        studentscoreService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
