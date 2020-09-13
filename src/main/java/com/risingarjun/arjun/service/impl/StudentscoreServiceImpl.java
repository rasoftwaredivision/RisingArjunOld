package com.risingarjun.arjun.service.impl;

import com.risingarjun.arjun.service.StudentscoreService;
import com.risingarjun.arjun.domain.Studentscore;
import com.risingarjun.arjun.repository.StudentscoreRepository;
import com.risingarjun.arjun.service.dto.StudentscoreDTO;
import com.risingarjun.arjun.service.mapper.StudentscoreMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Studentscore}.
 */
@Service
@Transactional
public class StudentscoreServiceImpl implements StudentscoreService {

    private final Logger log = LoggerFactory.getLogger(StudentscoreServiceImpl.class);

    private final StudentscoreRepository studentscoreRepository;

    private final StudentscoreMapper studentscoreMapper;

    public StudentscoreServiceImpl(StudentscoreRepository studentscoreRepository, StudentscoreMapper studentscoreMapper) {
        this.studentscoreRepository = studentscoreRepository;
        this.studentscoreMapper = studentscoreMapper;
    }

    /**
     * Save a studentscore.
     *
     * @param studentscoreDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public StudentscoreDTO save(StudentscoreDTO studentscoreDTO) {
        log.debug("Request to save Studentscore : {}", studentscoreDTO);
        Studentscore studentscore = studentscoreMapper.toEntity(studentscoreDTO);
        studentscore = studentscoreRepository.save(studentscore);
        return studentscoreMapper.toDto(studentscore);
    }

    /**
     * Get all the studentscores.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<StudentscoreDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Studentscores");
        return studentscoreRepository.findAll(pageable)
            .map(studentscoreMapper::toDto);
    }


    /**
     * Get one studentscore by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<StudentscoreDTO> findOne(Long id) {
        log.debug("Request to get Studentscore : {}", id);
        return studentscoreRepository.findById(id)
            .map(studentscoreMapper::toDto);
    }

    /**
     * Delete the studentscore by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Studentscore : {}", id);
        studentscoreRepository.deleteById(id);
    }
}
