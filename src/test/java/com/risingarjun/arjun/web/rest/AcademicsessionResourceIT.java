package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Academicsession;
import com.risingarjun.arjun.repository.AcademicsessionRepository;
import com.risingarjun.arjun.service.AcademicsessionService;
import com.risingarjun.arjun.service.dto.AcademicsessionDTO;
import com.risingarjun.arjun.service.mapper.AcademicsessionMapper;
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
 * Integration tests for the {@Link AcademicsessionResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class AcademicsessionResourceIT {

    private static final String DEFAULT_ACAD_SESSION_ID = "AAAAAAAAAA";
    private static final String UPDATED_ACAD_SESSION_ID = "BBBBBBBBBB";

    private static final String DEFAULT_ACAD_SESSION = "AAAAAAAAAA";
    private static final String UPDATED_ACAD_SESSION = "BBBBBBBBBB";

    @Autowired
    private AcademicsessionRepository academicsessionRepository;

    @Autowired
    private AcademicsessionMapper academicsessionMapper;

    @Autowired
    private AcademicsessionService academicsessionService;

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

    private MockMvc restAcademicsessionMockMvc;

    private Academicsession academicsession;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AcademicsessionResource academicsessionResource = new AcademicsessionResource(academicsessionService);
        this.restAcademicsessionMockMvc = MockMvcBuilders.standaloneSetup(academicsessionResource)
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
    public static Academicsession createEntity(EntityManager em) {
        Academicsession academicsession = new Academicsession()
            .acadSessionId(DEFAULT_ACAD_SESSION_ID)
            .acadSession(DEFAULT_ACAD_SESSION);
        return academicsession;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Academicsession createUpdatedEntity(EntityManager em) {
        Academicsession academicsession = new Academicsession()
            .acadSessionId(UPDATED_ACAD_SESSION_ID)
            .acadSession(UPDATED_ACAD_SESSION);
        return academicsession;
    }

    @BeforeEach
    public void initTest() {
        academicsession = createEntity(em);
    }

    @Test
    @Transactional
    public void createAcademicsession() throws Exception {
        int databaseSizeBeforeCreate = academicsessionRepository.findAll().size();

        // Create the Academicsession
        AcademicsessionDTO academicsessionDTO = academicsessionMapper.toDto(academicsession);
        restAcademicsessionMockMvc.perform(post("/api/academicsessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicsessionDTO)))
            .andExpect(status().isCreated());

        // Validate the Academicsession in the database
        List<Academicsession> academicsessionList = academicsessionRepository.findAll();
        assertThat(academicsessionList).hasSize(databaseSizeBeforeCreate + 1);
        Academicsession testAcademicsession = academicsessionList.get(academicsessionList.size() - 1);
        assertThat(testAcademicsession.getAcadSessionId()).isEqualTo(DEFAULT_ACAD_SESSION_ID);
        assertThat(testAcademicsession.getAcadSession()).isEqualTo(DEFAULT_ACAD_SESSION);
    }

    @Test
    @Transactional
    public void createAcademicsessionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = academicsessionRepository.findAll().size();

        // Create the Academicsession with an existing ID
        academicsession.setId(1L);
        AcademicsessionDTO academicsessionDTO = academicsessionMapper.toDto(academicsession);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAcademicsessionMockMvc.perform(post("/api/academicsessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicsessionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Academicsession in the database
        List<Academicsession> academicsessionList = academicsessionRepository.findAll();
        assertThat(academicsessionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAcadSessionIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = academicsessionRepository.findAll().size();
        // set the field null
        academicsession.setAcadSessionId(null);

        // Create the Academicsession, which fails.
        AcademicsessionDTO academicsessionDTO = academicsessionMapper.toDto(academicsession);

        restAcademicsessionMockMvc.perform(post("/api/academicsessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicsessionDTO)))
            .andExpect(status().isBadRequest());

        List<Academicsession> academicsessionList = academicsessionRepository.findAll();
        assertThat(academicsessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAcadSessionIsRequired() throws Exception {
        int databaseSizeBeforeTest = academicsessionRepository.findAll().size();
        // set the field null
        academicsession.setAcadSession(null);

        // Create the Academicsession, which fails.
        AcademicsessionDTO academicsessionDTO = academicsessionMapper.toDto(academicsession);

        restAcademicsessionMockMvc.perform(post("/api/academicsessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicsessionDTO)))
            .andExpect(status().isBadRequest());

        List<Academicsession> academicsessionList = academicsessionRepository.findAll();
        assertThat(academicsessionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAcademicsessions() throws Exception {
        // Initialize the database
        academicsessionRepository.saveAndFlush(academicsession);

        // Get all the academicsessionList
        restAcademicsessionMockMvc.perform(get("/api/academicsessions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(academicsession.getId().intValue())))
            .andExpect(jsonPath("$.[*].acadSessionId").value(hasItem(DEFAULT_ACAD_SESSION_ID.toString())))
            .andExpect(jsonPath("$.[*].acadSession").value(hasItem(DEFAULT_ACAD_SESSION.toString())));
    }
    
    @Test
    @Transactional
    public void getAcademicsession() throws Exception {
        // Initialize the database
        academicsessionRepository.saveAndFlush(academicsession);

        // Get the academicsession
        restAcademicsessionMockMvc.perform(get("/api/academicsessions/{id}", academicsession.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(academicsession.getId().intValue()))
            .andExpect(jsonPath("$.acadSessionId").value(DEFAULT_ACAD_SESSION_ID.toString()))
            .andExpect(jsonPath("$.acadSession").value(DEFAULT_ACAD_SESSION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAcademicsession() throws Exception {
        // Get the academicsession
        restAcademicsessionMockMvc.perform(get("/api/academicsessions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAcademicsession() throws Exception {
        // Initialize the database
        academicsessionRepository.saveAndFlush(academicsession);

        int databaseSizeBeforeUpdate = academicsessionRepository.findAll().size();

        // Update the academicsession
        Academicsession updatedAcademicsession = academicsessionRepository.findById(academicsession.getId()).get();
        // Disconnect from session so that the updates on updatedAcademicsession are not directly saved in db
        em.detach(updatedAcademicsession);
        updatedAcademicsession
            .acadSessionId(UPDATED_ACAD_SESSION_ID)
            .acadSession(UPDATED_ACAD_SESSION);
        AcademicsessionDTO academicsessionDTO = academicsessionMapper.toDto(updatedAcademicsession);

        restAcademicsessionMockMvc.perform(put("/api/academicsessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicsessionDTO)))
            .andExpect(status().isOk());

        // Validate the Academicsession in the database
        List<Academicsession> academicsessionList = academicsessionRepository.findAll();
        assertThat(academicsessionList).hasSize(databaseSizeBeforeUpdate);
        Academicsession testAcademicsession = academicsessionList.get(academicsessionList.size() - 1);
        assertThat(testAcademicsession.getAcadSessionId()).isEqualTo(UPDATED_ACAD_SESSION_ID);
        assertThat(testAcademicsession.getAcadSession()).isEqualTo(UPDATED_ACAD_SESSION);
    }

    @Test
    @Transactional
    public void updateNonExistingAcademicsession() throws Exception {
        int databaseSizeBeforeUpdate = academicsessionRepository.findAll().size();

        // Create the Academicsession
        AcademicsessionDTO academicsessionDTO = academicsessionMapper.toDto(academicsession);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAcademicsessionMockMvc.perform(put("/api/academicsessions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(academicsessionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Academicsession in the database
        List<Academicsession> academicsessionList = academicsessionRepository.findAll();
        assertThat(academicsessionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAcademicsession() throws Exception {
        // Initialize the database
        academicsessionRepository.saveAndFlush(academicsession);

        int databaseSizeBeforeDelete = academicsessionRepository.findAll().size();

        // Delete the academicsession
        restAcademicsessionMockMvc.perform(delete("/api/academicsessions/{id}", academicsession.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Academicsession> academicsessionList = academicsessionRepository.findAll();
        assertThat(academicsessionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Academicsession.class);
        Academicsession academicsession1 = new Academicsession();
        academicsession1.setId(1L);
        Academicsession academicsession2 = new Academicsession();
        academicsession2.setId(academicsession1.getId());
        assertThat(academicsession1).isEqualTo(academicsession2);
        academicsession2.setId(2L);
        assertThat(academicsession1).isNotEqualTo(academicsession2);
        academicsession1.setId(null);
        assertThat(academicsession1).isNotEqualTo(academicsession2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AcademicsessionDTO.class);
        AcademicsessionDTO academicsessionDTO1 = new AcademicsessionDTO();
        academicsessionDTO1.setId(1L);
        AcademicsessionDTO academicsessionDTO2 = new AcademicsessionDTO();
        assertThat(academicsessionDTO1).isNotEqualTo(academicsessionDTO2);
        academicsessionDTO2.setId(academicsessionDTO1.getId());
        assertThat(academicsessionDTO1).isEqualTo(academicsessionDTO2);
        academicsessionDTO2.setId(2L);
        assertThat(academicsessionDTO1).isNotEqualTo(academicsessionDTO2);
        academicsessionDTO1.setId(null);
        assertThat(academicsessionDTO1).isNotEqualTo(academicsessionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(academicsessionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(academicsessionMapper.fromId(null)).isNull();
    }
}
