package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Studentsubject;
import com.risingarjun.arjun.repository.StudentsubjectRepository;
import com.risingarjun.arjun.service.StudentsubjectService;
import com.risingarjun.arjun.service.dto.StudentsubjectDTO;
import com.risingarjun.arjun.service.mapper.StudentsubjectMapper;
import com.risingarjun.arjun.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.risingarjun.arjun.domain.enumeration.Month;
/**
 * Integration tests for the {@Link StudentsubjectResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class StudentsubjectResourceIT {

    private static final Month DEFAULT_MONTH = Month.JAN;
    private static final Month UPDATED_MONTH = Month.FEB;

    @Autowired
    private StudentsubjectRepository studentsubjectRepository;

    @Mock
    private StudentsubjectRepository studentsubjectRepositoryMock;

    @Autowired
    private StudentsubjectMapper studentsubjectMapper;

    @Mock
    private StudentsubjectService studentsubjectServiceMock;

    @Autowired
    private StudentsubjectService studentsubjectService;

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

    private MockMvc restStudentsubjectMockMvc;

    private Studentsubject studentsubject;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentsubjectResource studentsubjectResource = new StudentsubjectResource(studentsubjectService);
        this.restStudentsubjectMockMvc = MockMvcBuilders.standaloneSetup(studentsubjectResource)
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
    public static Studentsubject createEntity(EntityManager em) {
        Studentsubject studentsubject = new Studentsubject()
            .month(DEFAULT_MONTH);
        return studentsubject;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Studentsubject createUpdatedEntity(EntityManager em) {
        Studentsubject studentsubject = new Studentsubject()
            .month(UPDATED_MONTH);
        return studentsubject;
    }

    @BeforeEach
    public void initTest() {
        studentsubject = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudentsubject() throws Exception {
        int databaseSizeBeforeCreate = studentsubjectRepository.findAll().size();

        // Create the Studentsubject
        StudentsubjectDTO studentsubjectDTO = studentsubjectMapper.toDto(studentsubject);
        restStudentsubjectMockMvc.perform(post("/api/studentsubjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentsubjectDTO)))
            .andExpect(status().isCreated());

        // Validate the Studentsubject in the database
        List<Studentsubject> studentsubjectList = studentsubjectRepository.findAll();
        assertThat(studentsubjectList).hasSize(databaseSizeBeforeCreate + 1);
        Studentsubject testStudentsubject = studentsubjectList.get(studentsubjectList.size() - 1);
        assertThat(testStudentsubject.getMonth()).isEqualTo(DEFAULT_MONTH);
    }

    @Test
    @Transactional
    public void createStudentsubjectWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentsubjectRepository.findAll().size();

        // Create the Studentsubject with an existing ID
        studentsubject.setId(1L);
        StudentsubjectDTO studentsubjectDTO = studentsubjectMapper.toDto(studentsubject);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentsubjectMockMvc.perform(post("/api/studentsubjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentsubjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Studentsubject in the database
        List<Studentsubject> studentsubjectList = studentsubjectRepository.findAll();
        assertThat(studentsubjectList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMonthIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentsubjectRepository.findAll().size();
        // set the field null
        studentsubject.setMonth(null);

        // Create the Studentsubject, which fails.
        StudentsubjectDTO studentsubjectDTO = studentsubjectMapper.toDto(studentsubject);

        restStudentsubjectMockMvc.perform(post("/api/studentsubjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentsubjectDTO)))
            .andExpect(status().isBadRequest());

        List<Studentsubject> studentsubjectList = studentsubjectRepository.findAll();
        assertThat(studentsubjectList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStudentsubjects() throws Exception {
        // Initialize the database
        studentsubjectRepository.saveAndFlush(studentsubject);

        // Get all the studentsubjectList
        restStudentsubjectMockMvc.perform(get("/api/studentsubjects?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentsubject.getId().intValue())))
            .andExpect(jsonPath("$.[*].month").value(hasItem(DEFAULT_MONTH.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllStudentsubjectsWithEagerRelationshipsIsEnabled() throws Exception {
        StudentsubjectResource studentsubjectResource = new StudentsubjectResource(studentsubjectServiceMock);
        when(studentsubjectServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restStudentsubjectMockMvc = MockMvcBuilders.standaloneSetup(studentsubjectResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStudentsubjectMockMvc.perform(get("/api/studentsubjects?eagerload=true"))
        .andExpect(status().isOk());

        verify(studentsubjectServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllStudentsubjectsWithEagerRelationshipsIsNotEnabled() throws Exception {
        StudentsubjectResource studentsubjectResource = new StudentsubjectResource(studentsubjectServiceMock);
            when(studentsubjectServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restStudentsubjectMockMvc = MockMvcBuilders.standaloneSetup(studentsubjectResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStudentsubjectMockMvc.perform(get("/api/studentsubjects?eagerload=true"))
        .andExpect(status().isOk());

            verify(studentsubjectServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getStudentsubject() throws Exception {
        // Initialize the database
        studentsubjectRepository.saveAndFlush(studentsubject);

        // Get the studentsubject
        restStudentsubjectMockMvc.perform(get("/api/studentsubjects/{id}", studentsubject.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studentsubject.getId().intValue()))
            .andExpect(jsonPath("$.month").value(DEFAULT_MONTH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudentsubject() throws Exception {
        // Get the studentsubject
        restStudentsubjectMockMvc.perform(get("/api/studentsubjects/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudentsubject() throws Exception {
        // Initialize the database
        studentsubjectRepository.saveAndFlush(studentsubject);

        int databaseSizeBeforeUpdate = studentsubjectRepository.findAll().size();

        // Update the studentsubject
        Studentsubject updatedStudentsubject = studentsubjectRepository.findById(studentsubject.getId()).get();
        // Disconnect from session so that the updates on updatedStudentsubject are not directly saved in db
        em.detach(updatedStudentsubject);
        updatedStudentsubject
            .month(UPDATED_MONTH);
        StudentsubjectDTO studentsubjectDTO = studentsubjectMapper.toDto(updatedStudentsubject);

        restStudentsubjectMockMvc.perform(put("/api/studentsubjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentsubjectDTO)))
            .andExpect(status().isOk());

        // Validate the Studentsubject in the database
        List<Studentsubject> studentsubjectList = studentsubjectRepository.findAll();
        assertThat(studentsubjectList).hasSize(databaseSizeBeforeUpdate);
        Studentsubject testStudentsubject = studentsubjectList.get(studentsubjectList.size() - 1);
        assertThat(testStudentsubject.getMonth()).isEqualTo(UPDATED_MONTH);
    }

    @Test
    @Transactional
    public void updateNonExistingStudentsubject() throws Exception {
        int databaseSizeBeforeUpdate = studentsubjectRepository.findAll().size();

        // Create the Studentsubject
        StudentsubjectDTO studentsubjectDTO = studentsubjectMapper.toDto(studentsubject);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentsubjectMockMvc.perform(put("/api/studentsubjects")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentsubjectDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Studentsubject in the database
        List<Studentsubject> studentsubjectList = studentsubjectRepository.findAll();
        assertThat(studentsubjectList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudentsubject() throws Exception {
        // Initialize the database
        studentsubjectRepository.saveAndFlush(studentsubject);

        int databaseSizeBeforeDelete = studentsubjectRepository.findAll().size();

        // Delete the studentsubject
        restStudentsubjectMockMvc.perform(delete("/api/studentsubjects/{id}", studentsubject.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Studentsubject> studentsubjectList = studentsubjectRepository.findAll();
        assertThat(studentsubjectList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Studentsubject.class);
        Studentsubject studentsubject1 = new Studentsubject();
        studentsubject1.setId(1L);
        Studentsubject studentsubject2 = new Studentsubject();
        studentsubject2.setId(studentsubject1.getId());
        assertThat(studentsubject1).isEqualTo(studentsubject2);
        studentsubject2.setId(2L);
        assertThat(studentsubject1).isNotEqualTo(studentsubject2);
        studentsubject1.setId(null);
        assertThat(studentsubject1).isNotEqualTo(studentsubject2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentsubjectDTO.class);
        StudentsubjectDTO studentsubjectDTO1 = new StudentsubjectDTO();
        studentsubjectDTO1.setId(1L);
        StudentsubjectDTO studentsubjectDTO2 = new StudentsubjectDTO();
        assertThat(studentsubjectDTO1).isNotEqualTo(studentsubjectDTO2);
        studentsubjectDTO2.setId(studentsubjectDTO1.getId());
        assertThat(studentsubjectDTO1).isEqualTo(studentsubjectDTO2);
        studentsubjectDTO2.setId(2L);
        assertThat(studentsubjectDTO1).isNotEqualTo(studentsubjectDTO2);
        studentsubjectDTO1.setId(null);
        assertThat(studentsubjectDTO1).isNotEqualTo(studentsubjectDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(studentsubjectMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(studentsubjectMapper.fromId(null)).isNull();
    }
}
