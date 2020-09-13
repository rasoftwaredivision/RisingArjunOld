package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Jhiauthority;
import com.risingarjun.arjun.repository.JhiauthorityRepository;
import com.risingarjun.arjun.service.JhiauthorityService;
import com.risingarjun.arjun.service.dto.JhiauthorityDTO;
import com.risingarjun.arjun.service.mapper.JhiauthorityMapper;
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
 * Integration tests for the {@Link JhiauthorityResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class JhiauthorityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private JhiauthorityRepository jhiauthorityRepository;

    @Autowired
    private JhiauthorityMapper jhiauthorityMapper;

    @Autowired
    private JhiauthorityService jhiauthorityService;

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

    private MockMvc restJhiauthorityMockMvc;

    private Jhiauthority jhiauthority;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final JhiauthorityResource jhiauthorityResource = new JhiauthorityResource(jhiauthorityService);
        this.restJhiauthorityMockMvc = MockMvcBuilders.standaloneSetup(jhiauthorityResource)
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
    public static Jhiauthority createEntity(EntityManager em) {
        Jhiauthority jhiauthority = new Jhiauthority()
            .name(DEFAULT_NAME);
        return jhiauthority;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Jhiauthority createUpdatedEntity(EntityManager em) {
        Jhiauthority jhiauthority = new Jhiauthority()
            .name(UPDATED_NAME);
        return jhiauthority;
    }

    @BeforeEach
    public void initTest() {
        jhiauthority = createEntity(em);
    }

    @Test
    @Transactional
    public void createJhiauthority() throws Exception {
        int databaseSizeBeforeCreate = jhiauthorityRepository.findAll().size();

        // Create the Jhiauthority
        JhiauthorityDTO jhiauthorityDTO = jhiauthorityMapper.toDto(jhiauthority);
        restJhiauthorityMockMvc.perform(post("/api/jhiauthorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jhiauthorityDTO)))
            .andExpect(status().isCreated());

        // Validate the Jhiauthority in the database
        List<Jhiauthority> jhiauthorityList = jhiauthorityRepository.findAll();
        assertThat(jhiauthorityList).hasSize(databaseSizeBeforeCreate + 1);
        Jhiauthority testJhiauthority = jhiauthorityList.get(jhiauthorityList.size() - 1);
        assertThat(testJhiauthority.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createJhiauthorityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = jhiauthorityRepository.findAll().size();

        // Create the Jhiauthority with an existing ID
        jhiauthority.setId(1L);
        JhiauthorityDTO jhiauthorityDTO = jhiauthorityMapper.toDto(jhiauthority);

        // An entity with an existing ID cannot be created, so this API call must fail
        restJhiauthorityMockMvc.perform(post("/api/jhiauthorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jhiauthorityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Jhiauthority in the database
        List<Jhiauthority> jhiauthorityList = jhiauthorityRepository.findAll();
        assertThat(jhiauthorityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = jhiauthorityRepository.findAll().size();
        // set the field null
        jhiauthority.setName(null);

        // Create the Jhiauthority, which fails.
        JhiauthorityDTO jhiauthorityDTO = jhiauthorityMapper.toDto(jhiauthority);

        restJhiauthorityMockMvc.perform(post("/api/jhiauthorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jhiauthorityDTO)))
            .andExpect(status().isBadRequest());

        List<Jhiauthority> jhiauthorityList = jhiauthorityRepository.findAll();
        assertThat(jhiauthorityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllJhiauthorities() throws Exception {
        // Initialize the database
        jhiauthorityRepository.saveAndFlush(jhiauthority);

        // Get all the jhiauthorityList
        restJhiauthorityMockMvc.perform(get("/api/jhiauthorities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(jhiauthority.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getJhiauthority() throws Exception {
        // Initialize the database
        jhiauthorityRepository.saveAndFlush(jhiauthority);

        // Get the jhiauthority
        restJhiauthorityMockMvc.perform(get("/api/jhiauthorities/{id}", jhiauthority.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(jhiauthority.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingJhiauthority() throws Exception {
        // Get the jhiauthority
        restJhiauthorityMockMvc.perform(get("/api/jhiauthorities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateJhiauthority() throws Exception {
        // Initialize the database
        jhiauthorityRepository.saveAndFlush(jhiauthority);

        int databaseSizeBeforeUpdate = jhiauthorityRepository.findAll().size();

        // Update the jhiauthority
        Jhiauthority updatedJhiauthority = jhiauthorityRepository.findById(jhiauthority.getId()).get();
        // Disconnect from session so that the updates on updatedJhiauthority are not directly saved in db
        em.detach(updatedJhiauthority);
        updatedJhiauthority
            .name(UPDATED_NAME);
        JhiauthorityDTO jhiauthorityDTO = jhiauthorityMapper.toDto(updatedJhiauthority);

        restJhiauthorityMockMvc.perform(put("/api/jhiauthorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jhiauthorityDTO)))
            .andExpect(status().isOk());

        // Validate the Jhiauthority in the database
        List<Jhiauthority> jhiauthorityList = jhiauthorityRepository.findAll();
        assertThat(jhiauthorityList).hasSize(databaseSizeBeforeUpdate);
        Jhiauthority testJhiauthority = jhiauthorityList.get(jhiauthorityList.size() - 1);
        assertThat(testJhiauthority.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingJhiauthority() throws Exception {
        int databaseSizeBeforeUpdate = jhiauthorityRepository.findAll().size();

        // Create the Jhiauthority
        JhiauthorityDTO jhiauthorityDTO = jhiauthorityMapper.toDto(jhiauthority);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restJhiauthorityMockMvc.perform(put("/api/jhiauthorities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(jhiauthorityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Jhiauthority in the database
        List<Jhiauthority> jhiauthorityList = jhiauthorityRepository.findAll();
        assertThat(jhiauthorityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteJhiauthority() throws Exception {
        // Initialize the database
        jhiauthorityRepository.saveAndFlush(jhiauthority);

        int databaseSizeBeforeDelete = jhiauthorityRepository.findAll().size();

        // Delete the jhiauthority
        restJhiauthorityMockMvc.perform(delete("/api/jhiauthorities/{id}", jhiauthority.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Jhiauthority> jhiauthorityList = jhiauthorityRepository.findAll();
        assertThat(jhiauthorityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Jhiauthority.class);
        Jhiauthority jhiauthority1 = new Jhiauthority();
        jhiauthority1.setId(1L);
        Jhiauthority jhiauthority2 = new Jhiauthority();
        jhiauthority2.setId(jhiauthority1.getId());
        assertThat(jhiauthority1).isEqualTo(jhiauthority2);
        jhiauthority2.setId(2L);
        assertThat(jhiauthority1).isNotEqualTo(jhiauthority2);
        jhiauthority1.setId(null);
        assertThat(jhiauthority1).isNotEqualTo(jhiauthority2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(JhiauthorityDTO.class);
        JhiauthorityDTO jhiauthorityDTO1 = new JhiauthorityDTO();
        jhiauthorityDTO1.setId(1L);
        JhiauthorityDTO jhiauthorityDTO2 = new JhiauthorityDTO();
        assertThat(jhiauthorityDTO1).isNotEqualTo(jhiauthorityDTO2);
        jhiauthorityDTO2.setId(jhiauthorityDTO1.getId());
        assertThat(jhiauthorityDTO1).isEqualTo(jhiauthorityDTO2);
        jhiauthorityDTO2.setId(2L);
        assertThat(jhiauthorityDTO1).isNotEqualTo(jhiauthorityDTO2);
        jhiauthorityDTO1.setId(null);
        assertThat(jhiauthorityDTO1).isNotEqualTo(jhiauthorityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(jhiauthorityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(jhiauthorityMapper.fromId(null)).isNull();
    }
}
