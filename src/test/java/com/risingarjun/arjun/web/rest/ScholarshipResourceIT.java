package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Scholarship;
import com.risingarjun.arjun.repository.ScholarshipRepository;
import com.risingarjun.arjun.service.ScholarshipService;
import com.risingarjun.arjun.service.dto.ScholarshipDTO;
import com.risingarjun.arjun.service.mapper.ScholarshipMapper;
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

/**
 * Integration tests for the {@Link ScholarshipResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class ScholarshipResourceIT {

    private static final Integer DEFAULT_MIN_MARKS = 1;
    private static final Integer UPDATED_MIN_MARKS = 2;

    private static final Integer DEFAULT_PERCENT = 1;
    private static final Integer UPDATED_PERCENT = 2;

    @Autowired
    private ScholarshipRepository scholarshipRepository;

    @Autowired
    private ScholarshipMapper scholarshipMapper;

    @Autowired
    private ScholarshipService scholarshipService;

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

    private MockMvc restScholarshipMockMvc;

    private Scholarship scholarship;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScholarshipResource scholarshipResource = new ScholarshipResource(scholarshipService);
        this.restScholarshipMockMvc = MockMvcBuilders.standaloneSetup(scholarshipResource)
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
    public static Scholarship createEntity(EntityManager em) {
        Scholarship scholarship = new Scholarship()
            .minMarks(DEFAULT_MIN_MARKS)
            .percent(DEFAULT_PERCENT);
        return scholarship;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Scholarship createUpdatedEntity(EntityManager em) {
        Scholarship scholarship = new Scholarship()
            .minMarks(UPDATED_MIN_MARKS)
            .percent(UPDATED_PERCENT);
        return scholarship;
    }

    @BeforeEach
    public void initTest() {
        scholarship = createEntity(em);
    }

    @Test
    @Transactional
    public void createScholarship() throws Exception {
        int databaseSizeBeforeCreate = scholarshipRepository.findAll().size();

        // Create the Scholarship
        ScholarshipDTO scholarshipDTO = scholarshipMapper.toDto(scholarship);
        restScholarshipMockMvc.perform(post("/api/scholarships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDTO)))
            .andExpect(status().isCreated());

        // Validate the Scholarship in the database
        List<Scholarship> scholarshipList = scholarshipRepository.findAll();
        assertThat(scholarshipList).hasSize(databaseSizeBeforeCreate + 1);
        Scholarship testScholarship = scholarshipList.get(scholarshipList.size() - 1);
        assertThat(testScholarship.getMinMarks()).isEqualTo(DEFAULT_MIN_MARKS);
        assertThat(testScholarship.getPercent()).isEqualTo(DEFAULT_PERCENT);
    }

    @Test
    @Transactional
    public void createScholarshipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scholarshipRepository.findAll().size();

        // Create the Scholarship with an existing ID
        scholarship.setId(1L);
        ScholarshipDTO scholarshipDTO = scholarshipMapper.toDto(scholarship);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScholarshipMockMvc.perform(post("/api/scholarships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Scholarship in the database
        List<Scholarship> scholarshipList = scholarshipRepository.findAll();
        assertThat(scholarshipList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllScholarships() throws Exception {
        // Initialize the database
        scholarshipRepository.saveAndFlush(scholarship);

        // Get all the scholarshipList
        restScholarshipMockMvc.perform(get("/api/scholarships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scholarship.getId().intValue())))
            .andExpect(jsonPath("$.[*].minMarks").value(hasItem(DEFAULT_MIN_MARKS)))
            .andExpect(jsonPath("$.[*].percent").value(hasItem(DEFAULT_PERCENT)));
    }
    
    @Test
    @Transactional
    public void getScholarship() throws Exception {
        // Initialize the database
        scholarshipRepository.saveAndFlush(scholarship);

        // Get the scholarship
        restScholarshipMockMvc.perform(get("/api/scholarships/{id}", scholarship.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(scholarship.getId().intValue()))
            .andExpect(jsonPath("$.minMarks").value(DEFAULT_MIN_MARKS))
            .andExpect(jsonPath("$.percent").value(DEFAULT_PERCENT));
    }

    @Test
    @Transactional
    public void getNonExistingScholarship() throws Exception {
        // Get the scholarship
        restScholarshipMockMvc.perform(get("/api/scholarships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateScholarship() throws Exception {
        // Initialize the database
        scholarshipRepository.saveAndFlush(scholarship);

        int databaseSizeBeforeUpdate = scholarshipRepository.findAll().size();

        // Update the scholarship
        Scholarship updatedScholarship = scholarshipRepository.findById(scholarship.getId()).get();
        // Disconnect from session so that the updates on updatedScholarship are not directly saved in db
        em.detach(updatedScholarship);
        updatedScholarship
            .minMarks(UPDATED_MIN_MARKS)
            .percent(UPDATED_PERCENT);
        ScholarshipDTO scholarshipDTO = scholarshipMapper.toDto(updatedScholarship);

        restScholarshipMockMvc.perform(put("/api/scholarships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDTO)))
            .andExpect(status().isOk());

        // Validate the Scholarship in the database
        List<Scholarship> scholarshipList = scholarshipRepository.findAll();
        assertThat(scholarshipList).hasSize(databaseSizeBeforeUpdate);
        Scholarship testScholarship = scholarshipList.get(scholarshipList.size() - 1);
        assertThat(testScholarship.getMinMarks()).isEqualTo(UPDATED_MIN_MARKS);
        assertThat(testScholarship.getPercent()).isEqualTo(UPDATED_PERCENT);
    }

    @Test
    @Transactional
    public void updateNonExistingScholarship() throws Exception {
        int databaseSizeBeforeUpdate = scholarshipRepository.findAll().size();

        // Create the Scholarship
        ScholarshipDTO scholarshipDTO = scholarshipMapper.toDto(scholarship);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScholarshipMockMvc.perform(put("/api/scholarships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scholarshipDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Scholarship in the database
        List<Scholarship> scholarshipList = scholarshipRepository.findAll();
        assertThat(scholarshipList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteScholarship() throws Exception {
        // Initialize the database
        scholarshipRepository.saveAndFlush(scholarship);

        int databaseSizeBeforeDelete = scholarshipRepository.findAll().size();

        // Delete the scholarship
        restScholarshipMockMvc.perform(delete("/api/scholarships/{id}", scholarship.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Scholarship> scholarshipList = scholarshipRepository.findAll();
        assertThat(scholarshipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Scholarship.class);
        Scholarship scholarship1 = new Scholarship();
        scholarship1.setId(1L);
        Scholarship scholarship2 = new Scholarship();
        scholarship2.setId(scholarship1.getId());
        assertThat(scholarship1).isEqualTo(scholarship2);
        scholarship2.setId(2L);
        assertThat(scholarship1).isNotEqualTo(scholarship2);
        scholarship1.setId(null);
        assertThat(scholarship1).isNotEqualTo(scholarship2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ScholarshipDTO.class);
        ScholarshipDTO scholarshipDTO1 = new ScholarshipDTO();
        scholarshipDTO1.setId(1L);
        ScholarshipDTO scholarshipDTO2 = new ScholarshipDTO();
        assertThat(scholarshipDTO1).isNotEqualTo(scholarshipDTO2);
        scholarshipDTO2.setId(scholarshipDTO1.getId());
        assertThat(scholarshipDTO1).isEqualTo(scholarshipDTO2);
        scholarshipDTO2.setId(2L);
        assertThat(scholarshipDTO1).isNotEqualTo(scholarshipDTO2);
        scholarshipDTO1.setId(null);
        assertThat(scholarshipDTO1).isNotEqualTo(scholarshipDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(scholarshipMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(scholarshipMapper.fromId(null)).isNull();
    }
}
