package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.StudentfeeService;
import com.risingarjun.arjun.domain.Studentfee;
import com.risingarjun.arjun.repository.StudentfeeRepository;
import com.risingarjun.arjun.service.dto.StudentfeeDTO;
import com.risingarjun.arjun.service.mapper.StudentfeeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Studentfee}.
 */
@Service
@Transactional
public class StudentfeeServiceImpl implements StudentfeeService {

    private final Logger log = LoggerFactory.getLogger(StudentfeeServiceImpl.class);

    private final StudentfeeRepository studentfeeRepository;

    private final StudentfeeMapper studentfeeMapper;

    public StudentfeeServiceImpl(StudentfeeRepository studentfeeRepository, StudentfeeMapper studentfeeMapper) {
        this.studentfeeRepository = studentfeeRepository;
        this.studentfeeMapper = studentfeeMapper;
    }

    /**
     * Save a studentfee.
     *
     * @param studentfeeDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StudentfeeDTO save(StudentfeeDTO studentfeeDTO) {
        log.debug("Request to save Studentfee : {}", studentfeeDTO);
        Studentfee studentfee = studentfeeMapper.toEntity(studentfeeDTO);
        studentfee = studentfeeRepository.save(studentfee);
        return studentfeeMapper.toDto(studentfee);
    }

    /**
     * Get all the studentfees.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StudentfeeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Studentfees");
        return studentfeeRepository.findAll(pageable)
            .map(studentfeeMapper::toDto);
    }


    /**
     * Get one studentfee by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StudentfeeDTO> findOne(Long id) {
        log.debug("Request to get Studentfee : {}", id);
        return studentfeeRepository.findById(id)
            .map(studentfeeMapper::toDto);
    }

    /**
     * Delete the studentfee by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Studentfee : {}", id);
        studentfeeRepository.deleteById(id);
    }
}
