package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.StudentsubjectService;
import com.risingarjun.arjun.domain.Studentsubject;
import com.risingarjun.arjun.repository.StudentsubjectRepository;
import com.risingarjun.arjun.service.dto.StudentsubjectDTO;
import com.risingarjun.arjun.service.mapper.StudentsubjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Studentsubject}.
 */
@Service
@Transactional
public class StudentsubjectServiceImpl implements StudentsubjectService {

    private final Logger log = LoggerFactory.getLogger(StudentsubjectServiceImpl.class);

    private final StudentsubjectRepository studentsubjectRepository;

    private final StudentsubjectMapper studentsubjectMapper;

    public StudentsubjectServiceImpl(StudentsubjectRepository studentsubjectRepository, StudentsubjectMapper studentsubjectMapper) {
        this.studentsubjectRepository = studentsubjectRepository;
        this.studentsubjectMapper = studentsubjectMapper;
    }

    /**
     * Save a studentsubject.
     *
     * @param studentsubjectDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StudentsubjectDTO save(StudentsubjectDTO studentsubjectDTO) {
        log.debug("Request to save Studentsubject : {}", studentsubjectDTO);
        Studentsubject studentsubject = studentsubjectMapper.toEntity(studentsubjectDTO);
        studentsubject = studentsubjectRepository.save(studentsubject);
        return studentsubjectMapper.toDto(studentsubject);
    }

    /**
     * Get all the studentsubjects.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<StudentsubjectDTO> findAll() {
        log.debug("Request to get all Studentsubjects");
        return studentsubjectRepository.findAllWithEagerRelationships().stream()
            .map(studentsubjectMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the studentsubjects with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<StudentsubjectDTO> findAllWithEagerRelationships(Pageable pageable) {
        return studentsubjectRepository.findAllWithEagerRelationships(pageable).map(studentsubjectMapper::toDto);
    }
    

    /**
     * Get one studentsubject by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StudentsubjectDTO> findOne(Long id) {
        log.debug("Request to get Studentsubject : {}", id);
        return studentsubjectRepository.findOneWithEagerRelationships(id)
            .map(studentsubjectMapper::toDto);
    }

    /**
     * Delete the studentsubject by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Studentsubject : {}", id);
        studentsubjectRepository.deleteById(id);
    }
}
