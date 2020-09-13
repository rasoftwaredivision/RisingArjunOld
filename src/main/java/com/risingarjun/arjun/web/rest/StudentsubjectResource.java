package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.service.StudentsubjectService;
import com.risingarjun.arjun.web.rest.errors.BadRequestAlertException;
import com.risingarjun.arjun.service.dto.StudentsubjectDTO;

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
 * REST controller for managing {@link com.risingarjun.arjun.domain.Studentsubject}.
 */
@RestController
@RequestMapping("/api")
public class StudentsubjectResource {

    private final Logger log = LoggerFactory.getLogger(StudentsubjectResource.class);

    private static final String ENTITY_NAME = "studentsubject";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentsubjectService studentsubjectService;

    public StudentsubjectResource(StudentsubjectService studentsubjectService) {
        this.studentsubjectService = studentsubjectService;
    }

    /**
     * {@code POST  /studentsubjects} : Create a new studentsubject.
     *
     * @param studentsubjectDTO the studentsubjectDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentsubjectDTO, or with status {@code 400 (Bad Request)} if the studentsubject has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/studentsubjects")
    public ResponseEntity<StudentsubjectDTO> createStudentsubject(@Valid @RequestBody StudentsubjectDTO studentsubjectDTO) throws URISyntaxException {
        log.debug("REST request to save Studentsubject : {}", studentsubjectDTO);
        if (studentsubjectDTO.getId() != null) {
            throw new BadRequestAlertException("A new studentsubject cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentsubjectDTO result = studentsubjectService.save(studentsubjectDTO);
        return ResponseEntity.created(new URI("/api/studentsubjects/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /studentsubjects} : Updates an existing studentsubject.
     *
     * @param studentsubjectDTO the studentsubjectDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentsubjectDTO,
     * or with status {@code 400 (Bad Request)} if the studentsubjectDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentsubjectDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/studentsubjects")
    public ResponseEntity<StudentsubjectDTO> updateStudentsubject(@Valid @RequestBody StudentsubjectDTO studentsubjectDTO) throws URISyntaxException {
        log.debug("REST request to update Studentsubject : {}", studentsubjectDTO);
        if (studentsubjectDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentsubjectDTO result = studentsubjectService.save(studentsubjectDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentsubjectDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /studentsubjects} : get all the studentsubjects.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentsubjects in body.
     */
    @GetMapping("/studentsubjects")
    public List<StudentsubjectDTO> getAllStudentsubjects(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Studentsubjects");
        return studentsubjectService.findAll();
    }

    /**
     * {@code GET  /studentsubjects/:id} : get the "id" studentsubject.
     *
     * @param id the id of the studentsubjectDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentsubjectDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/studentsubjects/{id}")
    public ResponseEntity<StudentsubjectDTO> getStudentsubject(@PathVariable Long id) {
        log.debug("REST request to get Studentsubject : {}", id);
        Optional<StudentsubjectDTO> studentsubjectDTO = studentsubjectService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentsubjectDTO);
    }

    /**
     * {@code DELETE  /studentsubjects/:id} : delete the "id" studentsubject.
     *
     * @param id the id of the studentsubjectDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/studentsubjects/{id}")
    public ResponseEntity<Void> deleteStudentsubject(@PathVariable Long id) {
        log.debug("REST request to delete Studentsubject : {}", id);
        studentsubjectService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
