package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Studentscore;
import com.risingarjun.arjun.repository.StudentscoreRepository;
import com.risingarjun.arjun.service.StudentscoreService;
import com.risingarjun.arjun.service.dto.StudentscoreDTO;
import com.risingarjun.arjun.service.mapper.StudentscoreMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link StudentscoreResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class StudentscoreResourceIT {

    private static final String DEFAULT_ANSWER = "AAAAAAAAAA";
    private static final String UPDATED_ANSWER = "BBBBBBBBBB";

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private StudentscoreRepository studentscoreRepository;

    @Autowired
    private StudentscoreMapper studentscoreMapper;

    @Autowired
    private StudentscoreService studentscoreService;

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

    private MockMvc restStudentscoreMockMvc;

    private Studentscore studentscore;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentscoreResource studentscoreResource = new StudentscoreResource(studentscoreService);
        this.restStudentscoreMockMvc = MockMvcBuilders.standaloneSetup(studentscoreResource)
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
    public static Studentscore createEntity(EntityManager em) {
        Studentscore studentscore = new Studentscore()
            .answer(DEFAULT_ANSWER)
            .score(DEFAULT_SCORE)
            .date(DEFAULT_DATE);
        return studentscore;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Studentscore createUpdatedEntity(EntityManager em) {
        Studentscore studentscore = new Studentscore()
            .answer(UPDATED_ANSWER)
            .score(UPDATED_SCORE)
            .date(UPDATED_DATE);
        return studentscore;
    }

    @BeforeEach
    public void initTest() {
        studentscore = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudentscore() throws Exception {
        int databaseSizeBeforeCreate = studentscoreRepository.findAll().size();

        // Create the Studentscore
        StudentscoreDTO studentscoreDTO = studentscoreMapper.toDto(studentscore);
        restStudentscoreMockMvc.perform(post("/api/studentscores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentscoreDTO)))
            .andExpect(status().isCreated());

        // Validate the Studentscore in the database
        List<Studentscore> studentscoreList = studentscoreRepository.findAll();
        assertThat(studentscoreList).hasSize(databaseSizeBeforeCreate + 1);
        Studentscore testStudentscore = studentscoreList.get(studentscoreList.size() - 1);
        assertThat(testStudentscore.getAnswer()).isEqualTo(DEFAULT_ANSWER);
        assertThat(testStudentscore.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testStudentscore.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createStudentscoreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentscoreRepository.findAll().size();

        // Create the Studentscore with an existing ID
        studentscore.setId(1L);
        StudentscoreDTO studentscoreDTO = studentscoreMapper.toDto(studentscore);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentscoreMockMvc.perform(post("/api/studentscores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentscoreDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Studentscore in the database
        List<Studentscore> studentscoreList = studentscoreRepository.findAll();
        assertThat(studentscoreList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAnswerIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentscoreRepository.findAll().size();
        // set the field null
        studentscore.setAnswer(null);

        // Create the Studentscore, which fails.
        StudentscoreDTO studentscoreDTO = studentscoreMapper.toDto(studentscore);

        restStudentscoreMockMvc.perform(post("/api/studentscores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentscoreDTO)))
            .andExpect(status().isBadRequest());

        List<Studentscore> studentscoreList = studentscoreRepository.findAll();
        assertThat(studentscoreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkScoreIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentscoreRepository.findAll().size();
        // set the field null
        studentscore.setScore(null);

        // Create the Studentscore, which fails.
        StudentscoreDTO studentscoreDTO = studentscoreMapper.toDto(studentscore);

        restStudentscoreMockMvc.perform(post("/api/studentscores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentscoreDTO)))
            .andExpect(status().isBadRequest());

        List<Studentscore> studentscoreList = studentscoreRepository.findAll();
        assertThat(studentscoreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentscoreRepository.findAll().size();
        // set the field null
        studentscore.setDate(null);

        // Create the Studentscore, which fails.
        StudentscoreDTO studentscoreDTO = studentscoreMapper.toDto(studentscore);

        restStudentscoreMockMvc.perform(post("/api/studentscores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentscoreDTO)))
            .andExpect(status().isBadRequest());

        List<Studentscore> studentscoreList = studentscoreRepository.findAll();
        assertThat(studentscoreList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStudentscores() throws Exception {
        // Initialize the database
        studentscoreRepository.saveAndFlush(studentscore);

        // Get all the studentscoreList
        restStudentscoreMockMvc.perform(get("/api/studentscores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentscore.getId().intValue())))
            .andExpect(jsonPath("$.[*].answer").value(hasItem(DEFAULT_ANSWER.toString())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getStudentscore() throws Exception {
        // Initialize the database
        studentscoreRepository.saveAndFlush(studentscore);

        // Get the studentscore
        restStudentscoreMockMvc.perform(get("/api/studentscores/{id}", studentscore.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studentscore.getId().intValue()))
            .andExpect(jsonPath("$.answer").value(DEFAULT_ANSWER.toString()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudentscore() throws Exception {
        // Get the studentscore
        restStudentscoreMockMvc.perform(get("/api/studentscores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudentscore() throws Exception {
        // Initialize the database
        studentscoreRepository.saveAndFlush(studentscore);

        int databaseSizeBeforeUpdate = studentscoreRepository.findAll().size();

        // Update the studentscore
        Studentscore updatedStudentscore = studentscoreRepository.findById(studentscore.getId()).get();
        // Disconnect from session so that the updates on updatedStudentscore are not directly saved in db
        em.detach(updatedStudentscore);
        updatedStudentscore
            .answer(UPDATED_ANSWER)
            .score(UPDATED_SCORE)
            .date(UPDATED_DATE);
        StudentscoreDTO studentscoreDTO = studentscoreMapper.toDto(updatedStudentscore);

        restStudentscoreMockMvc.perform(put("/api/studentscores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentscoreDTO)))
            .andExpect(status().isOk());

        // Validate the Studentscore in the database
        List<Studentscore> studentscoreList = studentscoreRepository.findAll();
        assertThat(studentscoreList).hasSize(databaseSizeBeforeUpdate);
        Studentscore testStudentscore = studentscoreList.get(studentscoreList.size() - 1);
        assertThat(testStudentscore.getAnswer()).isEqualTo(UPDATED_ANSWER);
        assertThat(testStudentscore.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testStudentscore.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingStudentscore() throws Exception {
        int databaseSizeBeforeUpdate = studentscoreRepository.findAll().size();

        // Create the Studentscore
        StudentscoreDTO studentscoreDTO = studentscoreMapper.toDto(studentscore);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentscoreMockMvc.perform(put("/api/studentscores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentscoreDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Studentscore in the database
        List<Studentscore> studentscoreList = studentscoreRepository.findAll();
        assertThat(studentscoreList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudentscore() throws Exception {
        // Initialize the database
        studentscoreRepository.saveAndFlush(studentscore);

        int databaseSizeBeforeDelete = studentscoreRepository.findAll().size();

        // Delete the studentscore
        restStudentscoreMockMvc.perform(delete("/api/studentscores/{id}", studentscore.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Studentscore> studentscoreList = studentscoreRepository.findAll();
        assertThat(studentscoreList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Studentscore.class);
        Studentscore studentscore1 = new Studentscore();
        studentscore1.setId(1L);
        Studentscore studentscore2 = new Studentscore();
        studentscore2.setId(studentscore1.getId());
        assertThat(studentscore1).isEqualTo(studentscore2);
        studentscore2.setId(2L);
        assertThat(studentscore1).isNotEqualTo(studentscore2);
        studentscore1.setId(null);
        assertThat(studentscore1).isNotEqualTo(studentscore2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentscoreDTO.class);
        StudentscoreDTO studentscoreDTO1 = new StudentscoreDTO();
        studentscoreDTO1.setId(1L);
        StudentscoreDTO studentscoreDTO2 = new StudentscoreDTO();
        assertThat(studentscoreDTO1).isNotEqualTo(studentscoreDTO2);
        studentscoreDTO2.setId(studentscoreDTO1.getId());
        assertThat(studentscoreDTO1).isEqualTo(studentscoreDTO2);
        studentscoreDTO2.setId(2L);
        assertThat(studentscoreDTO1).isNotEqualTo(studentscoreDTO2);
        studentscoreDTO1.setId(null);
        assertThat(studentscoreDTO1).isNotEqualTo(studentscoreDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(studentscoreMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(studentscoreMapper.fromId(null)).isNull();
    }
}
