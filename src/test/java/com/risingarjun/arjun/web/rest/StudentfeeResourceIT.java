package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Studentfee;
import com.risingarjun.arjun.repository.StudentfeeRepository;
import com.risingarjun.arjun.service.StudentfeeService;
import com.risingarjun.arjun.service.dto.StudentfeeDTO;
import com.risingarjun.arjun.service.mapper.StudentfeeMapper;
import com.risingarjun.arjun.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.risingarjun.arjun.domain.enumeration.Month;
/**
 * Integration tests for the {@Link StudentfeeResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class StudentfeeResourceIT {

    private static final Integer DEFAULT_FEE = 1;
    private static final Integer UPDATED_FEE = 2;

    private static final Integer DEFAULT_FEE_CORRECTION = 1;
    private static final Integer UPDATED_FEE_CORRECTION = 2;

    private static final Month DEFAULT_MONTH = Month.JAN;
    private static final Month UPDATED_MONTH = Month.FEB;

    private static final Boolean DEFAULT_FEE_STATUS = false;
    private static final Boolean UPDATED_FEE_STATUS = true;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private StudentfeeRepository studentfeeRepository;

    @Autowired
    private StudentfeeMapper studentfeeMapper;

    @Autowired
    private StudentfeeService studentfeeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restStudentfeeMockMvc;

    private Studentfee studentfee;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentfeeResource studentfeeResource = new StudentfeeResource(studentfeeService);
        this.restStudentfeeMockMvc = MockMvcBuilders.standaloneSetup(studentfeeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Studentfee createEntity(EntityManager em) {
        Studentfee studentfee = new Studentfee()
            .fee(DEFAULT_FEE)
            .feeCorrection(DEFAULT_FEE_CORRECTION)
            .month(DEFAULT_MONTH)
            .feeStatus(DEFAULT_FEE_STATUS)
            .remarks(DEFAULT_REMARKS);
        return studentfee;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Studentfee createUpdatedEntity(EntityManager em) {
        Studentfee studentfee = new Studentfee()
            .fee(UPDATED_FEE)
            .feeCorrection(UPDATED_FEE_CORRECTION)
            .month(UPDATED_MONTH)
            .feeStatus(UPDATED_FEE_STATUS)
            .remarks(UPDATED_REMARKS);
        return studentfee;
    }

    @BeforeEach
    public void initTest() {
        studentfee = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudentfee() throws Exception {
        int databaseSizeBeforeCreate = studentfeeRepository.findAll().size();

        // Create the Studentfee
        StudentfeeDTO studentfeeDTO = studentfeeMapper.toDto(studentfee);
        restStudentfeeMockMvc.perform(post("/api/studentfees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentfeeDTO)))
            .andExpect(status().isCreated());

        // Validate the Studentfee in the database
        List<Studentfee> studentfeeList = studentfeeRepository.findAll();
        assertThat(studentfeeList).hasSize(databaseSizeBeforeCreate + 1);
        Studentfee testStudentfee = studentfeeList.get(studentfeeList.size() - 1);
        assertThat(testStudentfee.getFee()).isEqualTo(DEFAULT_FEE);
        assertThat(testStudentfee.getFeeCorrection()).isEqualTo(DEFAULT_FEE_CORRECTION);
        assertThat(testStudentfee.getMonth()).isEqualTo(DEFAULT_MONTH);
        assertThat(testStudentfee.isFeeStatus()).isEqualTo(DEFAULT_FEE_STATUS);
        assertThat(testStudentfee.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createStudentfeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentfeeRepository.findAll().size();

        // Create the Studentfee with an existing ID
        studentfee.setId(1L);
        StudentfeeDTO studentfeeDTO = studentfeeMapper.toDto(studentfee);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentfeeMockMvc.perform(post("/api/studentfees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentfeeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Studentfee in the database
        List<Studentfee> studentfeeList = studentfeeRepository.findAll();
        assertThat(studentfeeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStudentfees() throws Exception {
        // Initialize the database
        studentfeeRepository.saveAndFlush(studentfee);

        // Get all the studentfeeList
        restStudentfeeMockMvc.perform(get("/api/studentfees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentfee.getId().intValue())))
            .andExpect(jsonPath("$.[*].fee").value(hasItem(DEFAULT_FEE)))
            .andExpect(jsonPath("$.[*].feeCorrection").value(hasItem(DEFAULT_FEE_CORRECTION)))
            .andExpect(jsonPath("$.[*].month").value(hasItem(DEFAULT_MONTH.toString())))
            .andExpect(jsonPath("$.[*].feeStatus").value(hasItem(DEFAULT_FEE_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    
    @Test
    @Transactional
    public void getStudentfee() throws Exception {
        // Initialize the database
        studentfeeRepository.saveAndFlush(studentfee);

        // Get the studentfee
        restStudentfeeMockMvc.perform(get("/api/studentfees/{id}", studentfee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studentfee.getId().intValue()))
            .andExpect(jsonPath("$.fee").value(DEFAULT_FEE))
            .andExpect(jsonPath("$.feeCorrection").value(DEFAULT_FEE_CORRECTION))
            .andExpect(jsonPath("$.month").value(DEFAULT_MONTH.toString()))
            .andExpect(jsonPath("$.feeStatus").value(DEFAULT_FEE_STATUS.booleanValue()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudentfee() throws Exception {
        // Get the studentfee
        restStudentfeeMockMvc.perform(get("/api/studentfees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudentfee() throws Exception {
        // Initialize the database
        studentfeeRepository.saveAndFlush(studentfee);

        int databaseSizeBeforeUpdate = studentfeeRepository.findAll().size();

        // Update the studentfee
        Studentfee updatedStudentfee = studentfeeRepository.findById(studentfee.getId()).get();
        // Disconnect from session so that the updates on updatedStudentfee are not directly saved in db
        em.detach(updatedStudentfee);
        updatedStudentfee
            .fee(UPDATED_FEE)
            .feeCorrection(UPDATED_FEE_CORRECTION)
            .month(UPDATED_MONTH)
            .feeStatus(UPDATED_FEE_STATUS)
            .remarks(UPDATED_REMARKS);
        StudentfeeDTO studentfeeDTO = studentfeeMapper.toDto(updatedStudentfee);

        restStudentfeeMockMvc.perform(put("/api/studentfees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentfeeDTO)))
            .andExpect(status().isOk());

        // Validate the Studentfee in the database
        List<Studentfee> studentfeeList = studentfeeRepository.findAll();
        assertThat(studentfeeList).hasSize(databaseSizeBeforeUpdate);
        Studentfee testStudentfee = studentfeeList.get(studentfeeList.size() - 1);
        assertThat(testStudentfee.getFee()).isEqualTo(UPDATED_FEE);
        assertThat(testStudentfee.getFeeCorrection()).isEqualTo(UPDATED_FEE_CORRECTION);
        assertThat(testStudentfee.getMonth()).isEqualTo(UPDATED_MONTH);
        assertThat(testStudentfee.isFeeStatus()).isEqualTo(UPDATED_FEE_STATUS);
        assertThat(testStudentfee.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingStudentfee() throws Exception {
        int databaseSizeBeforeUpdate = studentfeeRepository.findAll().size();

        // Create the Studentfee
        StudentfeeDTO studentfeeDTO = studentfeeMapper.toDto(studentfee);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentfeeMockMvc.perform(put("/api/studentfees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentfeeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Studentfee in the database
        List<Studentfee> studentfeeList = studentfeeRepository.findAll();
        assertThat(studentfeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudentfee() throws Exception {
        // Initialize the database
        studentfeeRepository.saveAndFlush(studentfee);

        int databaseSizeBeforeDelete = studentfeeRepository.findAll().size();

        // Delete the studentfee
        restStudentfeeMockMvc.perform(delete("/api/studentfees/{id}", studentfee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Studentfee> studentfeeList = studentfeeRepository.findAll();
        assertThat(studentfeeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Studentfee.class);
        Studentfee studentfee1 = new Studentfee();
        studentfee1.setId(1L);
        Studentfee studentfee2 = new Studentfee();
        studentfee2.setId(studentfee1.getId());
        assertThat(studentfee1).isEqualTo(studentfee2);
        studentfee2.setId(2L);
        assertThat(studentfee1).isNotEqualTo(studentfee2);
        studentfee1.setId(null);
        assertThat(studentfee1).isNotEqualTo(studentfee2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentfeeDTO.class);
        StudentfeeDTO studentfeeDTO1 = new StudentfeeDTO();
        studentfeeDTO1.setId(1L);
        StudentfeeDTO studentfeeDTO2 = new StudentfeeDTO();
        assertThat(studentfeeDTO1).isNotEqualTo(studentfeeDTO2);
        studentfeeDTO2.setId(studentfeeDTO1.getId());
        assertThat(studentfeeDTO1).isEqualTo(studentfeeDTO2);
        studentfeeDTO2.setId(2L);
        assertThat(studentfeeDTO1).isNotEqualTo(studentfeeDTO2);
        studentfeeDTO1.setId(null);
        assertThat(studentfeeDTO1).isNotEqualTo(studentfeeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(studentfeeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(studentfeeMapper.fromId(null)).isNull();
    }
}
