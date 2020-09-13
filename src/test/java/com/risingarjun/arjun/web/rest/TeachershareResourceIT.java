package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Teachershare;
import com.risingarjun.arjun.repository.TeachershareRepository;
import com.risingarjun.arjun.service.TeachershareService;
import com.risingarjun.arjun.service.dto.TeachershareDTO;
import com.risingarjun.arjun.service.mapper.TeachershareMapper;
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
 * Integration tests for the {@Link TeachershareResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class TeachershareResourceIT {

    private static final Integer DEFAULT_SHARE_PERCENT = 100;
    private static final Integer UPDATED_SHARE_PERCENT = 99;

    private static final Integer DEFAULT_PLANNED_CLASSES = 1;
    private static final Integer UPDATED_PLANNED_CLASSES = 2;

    private static final Integer DEFAULT_ACTUAL_CLASSES = 1;
    private static final Integer UPDATED_ACTUAL_CLASSES = 2;

    private static final Integer DEFAULT_SHARE_CORRECTION = 1;
    private static final Integer UPDATED_SHARE_CORRECTION = 2;

    private static final Integer DEFAULT_SHARE = 1;
    private static final Integer UPDATED_SHARE = 2;

    private static final Month DEFAULT_MONTH = Month.JAN;
    private static final Month UPDATED_MONTH = Month.FEB;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private TeachershareRepository teachershareRepository;

    @Autowired
    private TeachershareMapper teachershareMapper;

    @Autowired
    private TeachershareService teachershareService;

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

    private MockMvc restTeachershareMockMvc;

    private Teachershare teachershare;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeachershareResource teachershareResource = new TeachershareResource(teachershareService);
        this.restTeachershareMockMvc = MockMvcBuilders.standaloneSetup(teachershareResource)
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
    public static Teachershare createEntity(EntityManager em) {
        Teachershare teachershare = new Teachershare()
            .sharePercent(DEFAULT_SHARE_PERCENT)
            .plannedClasses(DEFAULT_PLANNED_CLASSES)
            .actualClasses(DEFAULT_ACTUAL_CLASSES)
            .shareCorrection(DEFAULT_SHARE_CORRECTION)
            .share(DEFAULT_SHARE)
            .month(DEFAULT_MONTH)
            .remarks(DEFAULT_REMARKS);
        return teachershare;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Teachershare createUpdatedEntity(EntityManager em) {
        Teachershare teachershare = new Teachershare()
            .sharePercent(UPDATED_SHARE_PERCENT)
            .plannedClasses(UPDATED_PLANNED_CLASSES)
            .actualClasses(UPDATED_ACTUAL_CLASSES)
            .shareCorrection(UPDATED_SHARE_CORRECTION)
            .share(UPDATED_SHARE)
            .month(UPDATED_MONTH)
            .remarks(UPDATED_REMARKS);
        return teachershare;
    }

    @BeforeEach
    public void initTest() {
        teachershare = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeachershare() throws Exception {
        int databaseSizeBeforeCreate = teachershareRepository.findAll().size();

        // Create the Teachershare
        TeachershareDTO teachershareDTO = teachershareMapper.toDto(teachershare);
        restTeachershareMockMvc.perform(post("/api/teachershares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachershareDTO)))
            .andExpect(status().isCreated());

        // Validate the Teachershare in the database
        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeCreate + 1);
        Teachershare testTeachershare = teachershareList.get(teachershareList.size() - 1);
        assertThat(testTeachershare.getSharePercent()).isEqualTo(DEFAULT_SHARE_PERCENT);
        assertThat(testTeachershare.getPlannedClasses()).isEqualTo(DEFAULT_PLANNED_CLASSES);
        assertThat(testTeachershare.getActualClasses()).isEqualTo(DEFAULT_ACTUAL_CLASSES);
        assertThat(testTeachershare.getShareCorrection()).isEqualTo(DEFAULT_SHARE_CORRECTION);
        assertThat(testTeachershare.getShare()).isEqualTo(DEFAULT_SHARE);
        assertThat(testTeachershare.getMonth()).isEqualTo(DEFAULT_MONTH);
        assertThat(testTeachershare.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createTeachershareWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teachershareRepository.findAll().size();

        // Create the Teachershare with an existing ID
        teachershare.setId(1L);
        TeachershareDTO teachershareDTO = teachershareMapper.toDto(teachershare);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeachershareMockMvc.perform(post("/api/teachershares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachershareDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Teachershare in the database
        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSharePercentIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachershareRepository.findAll().size();
        // set the field null
        teachershare.setSharePercent(null);

        // Create the Teachershare, which fails.
        TeachershareDTO teachershareDTO = teachershareMapper.toDto(teachershare);

        restTeachershareMockMvc.perform(post("/api/teachershares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachershareDTO)))
            .andExpect(status().isBadRequest());

        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlannedClassesIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachershareRepository.findAll().size();
        // set the field null
        teachershare.setPlannedClasses(null);

        // Create the Teachershare, which fails.
        TeachershareDTO teachershareDTO = teachershareMapper.toDto(teachershare);

        restTeachershareMockMvc.perform(post("/api/teachershares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachershareDTO)))
            .andExpect(status().isBadRequest());

        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActualClassesIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachershareRepository.findAll().size();
        // set the field null
        teachershare.setActualClasses(null);

        // Create the Teachershare, which fails.
        TeachershareDTO teachershareDTO = teachershareMapper.toDto(teachershare);

        restTeachershareMockMvc.perform(post("/api/teachershares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachershareDTO)))
            .andExpect(status().isBadRequest());

        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMonthIsRequired() throws Exception {
        int databaseSizeBeforeTest = teachershareRepository.findAll().size();
        // set the field null
        teachershare.setMonth(null);

        // Create the Teachershare, which fails.
        TeachershareDTO teachershareDTO = teachershareMapper.toDto(teachershare);

        restTeachershareMockMvc.perform(post("/api/teachershares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachershareDTO)))
            .andExpect(status().isBadRequest());

        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTeachershares() throws Exception {
        // Initialize the database
        teachershareRepository.saveAndFlush(teachershare);

        // Get all the teachershareList
        restTeachershareMockMvc.perform(get("/api/teachershares?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teachershare.getId().intValue())))
            .andExpect(jsonPath("$.[*].sharePercent").value(hasItem(DEFAULT_SHARE_PERCENT)))
            .andExpect(jsonPath("$.[*].plannedClasses").value(hasItem(DEFAULT_PLANNED_CLASSES)))
            .andExpect(jsonPath("$.[*].actualClasses").value(hasItem(DEFAULT_ACTUAL_CLASSES)))
            .andExpect(jsonPath("$.[*].shareCorrection").value(hasItem(DEFAULT_SHARE_CORRECTION)))
            .andExpect(jsonPath("$.[*].share").value(hasItem(DEFAULT_SHARE)))
            .andExpect(jsonPath("$.[*].month").value(hasItem(DEFAULT_MONTH.toString())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    
    @Test
    @Transactional
    public void getTeachershare() throws Exception {
        // Initialize the database
        teachershareRepository.saveAndFlush(teachershare);

        // Get the teachershare
        restTeachershareMockMvc.perform(get("/api/teachershares/{id}", teachershare.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teachershare.getId().intValue()))
            .andExpect(jsonPath("$.sharePercent").value(DEFAULT_SHARE_PERCENT))
            .andExpect(jsonPath("$.plannedClasses").value(DEFAULT_PLANNED_CLASSES))
            .andExpect(jsonPath("$.actualClasses").value(DEFAULT_ACTUAL_CLASSES))
            .andExpect(jsonPath("$.shareCorrection").value(DEFAULT_SHARE_CORRECTION))
            .andExpect(jsonPath("$.share").value(DEFAULT_SHARE))
            .andExpect(jsonPath("$.month").value(DEFAULT_MONTH.toString()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTeachershare() throws Exception {
        // Get the teachershare
        restTeachershareMockMvc.perform(get("/api/teachershares/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeachershare() throws Exception {
        // Initialize the database
        teachershareRepository.saveAndFlush(teachershare);

        int databaseSizeBeforeUpdate = teachershareRepository.findAll().size();

        // Update the teachershare
        Teachershare updatedTeachershare = teachershareRepository.findById(teachershare.getId()).get();
        // Disconnect from session so that the updates on updatedTeachershare are not directly saved in db
        em.detach(updatedTeachershare);
        updatedTeachershare
            .sharePercent(UPDATED_SHARE_PERCENT)
            .plannedClasses(UPDATED_PLANNED_CLASSES)
            .actualClasses(UPDATED_ACTUAL_CLASSES)
            .shareCorrection(UPDATED_SHARE_CORRECTION)
            .share(UPDATED_SHARE)
            .month(UPDATED_MONTH)
            .remarks(UPDATED_REMARKS);
        TeachershareDTO teachershareDTO = teachershareMapper.toDto(updatedTeachershare);

        restTeachershareMockMvc.perform(put("/api/teachershares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachershareDTO)))
            .andExpect(status().isOk());

        // Validate the Teachershare in the database
        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeUpdate);
        Teachershare testTeachershare = teachershareList.get(teachershareList.size() - 1);
        assertThat(testTeachershare.getSharePercent()).isEqualTo(UPDATED_SHARE_PERCENT);
        assertThat(testTeachershare.getPlannedClasses()).isEqualTo(UPDATED_PLANNED_CLASSES);
        assertThat(testTeachershare.getActualClasses()).isEqualTo(UPDATED_ACTUAL_CLASSES);
        assertThat(testTeachershare.getShareCorrection()).isEqualTo(UPDATED_SHARE_CORRECTION);
        assertThat(testTeachershare.getShare()).isEqualTo(UPDATED_SHARE);
        assertThat(testTeachershare.getMonth()).isEqualTo(UPDATED_MONTH);
        assertThat(testTeachershare.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingTeachershare() throws Exception {
        int databaseSizeBeforeUpdate = teachershareRepository.findAll().size();

        // Create the Teachershare
        TeachershareDTO teachershareDTO = teachershareMapper.toDto(teachershare);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeachershareMockMvc.perform(put("/api/teachershares")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teachershareDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Teachershare in the database
        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeachershare() throws Exception {
        // Initialize the database
        teachershareRepository.saveAndFlush(teachershare);

        int databaseSizeBeforeDelete = teachershareRepository.findAll().size();

        // Delete the teachershare
        restTeachershareMockMvc.perform(delete("/api/teachershares/{id}", teachershare.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Teachershare> teachershareList = teachershareRepository.findAll();
        assertThat(teachershareList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Teachershare.class);
        Teachershare teachershare1 = new Teachershare();
        teachershare1.setId(1L);
        Teachershare teachershare2 = new Teachershare();
        teachershare2.setId(teachershare1.getId());
        assertThat(teachershare1).isEqualTo(teachershare2);
        teachershare2.setId(2L);
        assertThat(teachershare1).isNotEqualTo(teachershare2);
        teachershare1.setId(null);
        assertThat(teachershare1).isNotEqualTo(teachershare2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeachershareDTO.class);
        TeachershareDTO teachershareDTO1 = new TeachershareDTO();
        teachershareDTO1.setId(1L);
        TeachershareDTO teachershareDTO2 = new TeachershareDTO();
        assertThat(teachershareDTO1).isNotEqualTo(teachershareDTO2);
        teachershareDTO2.setId(teachershareDTO1.getId());
        assertThat(teachershareDTO1).isEqualTo(teachershareDTO2);
        teachershareDTO2.setId(2L);
        assertThat(teachershareDTO1).isNotEqualTo(teachershareDTO2);
        teachershareDTO1.setId(null);
        assertThat(teachershareDTO1).isNotEqualTo(teachershareDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(teachershareMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(teachershareMapper.fromId(null)).isNull();
    }
}
