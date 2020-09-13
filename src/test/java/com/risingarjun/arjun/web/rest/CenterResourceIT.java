package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Center;
import com.risingarjun.arjun.repository.CenterRepository;
import com.risingarjun.arjun.service.CenterService;
import com.risingarjun.arjun.service.dto.CenterDTO;
import com.risingarjun.arjun.service.mapper.CenterMapper;
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

import com.risingarjun.arjun.domain.enumeration.City;
import com.risingarjun.arjun.domain.enumeration.State;
import com.risingarjun.arjun.domain.enumeration.Country;
/**
 * Integration tests for the {@Link CenterResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class CenterResourceIT {

    private static final String DEFAULT_CENTER_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CENTER_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CENTER_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_CENTER_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STREET = "BBBBBBBBBB";

    private static final City DEFAULT_CITY = City.DEHRADUN;
    private static final City UPDATED_CITY = City.DELHI;

    private static final State DEFAULT_STATE = State.DELHI;
    private static final State UPDATED_STATE = State.HARYANA;

    private static final Country DEFAULT_COUNTRY = Country.INDIA;
    private static final Country UPDATED_COUNTRY = Country.AUSTRALIA;

    private static final Integer DEFAULT_PINCODE = 1;
    private static final Integer UPDATED_PINCODE = 2;

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private CenterMapper centerMapper;

    @Autowired
    private CenterService centerService;

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

    private MockMvc restCenterMockMvc;

    private Center center;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CenterResource centerResource = new CenterResource(centerService);
        this.restCenterMockMvc = MockMvcBuilders.standaloneSetup(centerResource)
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
    public static Center createEntity(EntityManager em) {
        Center center = new Center()
            .centerCode(DEFAULT_CENTER_CODE)
            .centerTitle(DEFAULT_CENTER_TITLE)
            .street(DEFAULT_STREET)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .country(DEFAULT_COUNTRY)
            .pincode(DEFAULT_PINCODE);
        return center;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Center createUpdatedEntity(EntityManager em) {
        Center center = new Center()
            .centerCode(UPDATED_CENTER_CODE)
            .centerTitle(UPDATED_CENTER_TITLE)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .pincode(UPDATED_PINCODE);
        return center;
    }

    @BeforeEach
    public void initTest() {
        center = createEntity(em);
    }

    @Test
    @Transactional
    public void createCenter() throws Exception {
        int databaseSizeBeforeCreate = centerRepository.findAll().size();

        // Create the Center
        CenterDTO centerDTO = centerMapper.toDto(center);
        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isCreated());

        // Validate the Center in the database
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeCreate + 1);
        Center testCenter = centerList.get(centerList.size() - 1);
        assertThat(testCenter.getCenterCode()).isEqualTo(DEFAULT_CENTER_CODE);
        assertThat(testCenter.getCenterTitle()).isEqualTo(DEFAULT_CENTER_TITLE);
        assertThat(testCenter.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testCenter.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testCenter.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testCenter.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testCenter.getPincode()).isEqualTo(DEFAULT_PINCODE);
    }

    @Test
    @Transactional
    public void createCenterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = centerRepository.findAll().size();

        // Create the Center with an existing ID
        center.setId(1L);
        CenterDTO centerDTO = centerMapper.toDto(center);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Center in the database
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCenterCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = centerRepository.findAll().size();
        // set the field null
        center.setCenterCode(null);

        // Create the Center, which fails.
        CenterDTO centerDTO = centerMapper.toDto(center);

        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isBadRequest());

        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCenterTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = centerRepository.findAll().size();
        // set the field null
        center.setCenterTitle(null);

        // Create the Center, which fails.
        CenterDTO centerDTO = centerMapper.toDto(center);

        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isBadRequest());

        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = centerRepository.findAll().size();
        // set the field null
        center.setCity(null);

        // Create the Center, which fails.
        CenterDTO centerDTO = centerMapper.toDto(center);

        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isBadRequest());

        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = centerRepository.findAll().size();
        // set the field null
        center.setState(null);

        // Create the Center, which fails.
        CenterDTO centerDTO = centerMapper.toDto(center);

        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isBadRequest());

        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = centerRepository.findAll().size();
        // set the field null
        center.setCountry(null);

        // Create the Center, which fails.
        CenterDTO centerDTO = centerMapper.toDto(center);

        restCenterMockMvc.perform(post("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isBadRequest());

        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCenters() throws Exception {
        // Initialize the database
        centerRepository.saveAndFlush(center);

        // Get all the centerList
        restCenterMockMvc.perform(get("/api/centers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(center.getId().intValue())))
            .andExpect(jsonPath("$.[*].centerCode").value(hasItem(DEFAULT_CENTER_CODE.toString())))
            .andExpect(jsonPath("$.[*].centerTitle").value(hasItem(DEFAULT_CENTER_TITLE.toString())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE)));
    }
    
    @Test
    @Transactional
    public void getCenter() throws Exception {
        // Initialize the database
        centerRepository.saveAndFlush(center);

        // Get the center
        restCenterMockMvc.perform(get("/api/centers/{id}", center.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(center.getId().intValue()))
            .andExpect(jsonPath("$.centerCode").value(DEFAULT_CENTER_CODE.toString()))
            .andExpect(jsonPath("$.centerTitle").value(DEFAULT_CENTER_TITLE.toString()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE));
    }

    @Test
    @Transactional
    public void getNonExistingCenter() throws Exception {
        // Get the center
        restCenterMockMvc.perform(get("/api/centers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCenter() throws Exception {
        // Initialize the database
        centerRepository.saveAndFlush(center);

        int databaseSizeBeforeUpdate = centerRepository.findAll().size();

        // Update the center
        Center updatedCenter = centerRepository.findById(center.getId()).get();
        // Disconnect from session so that the updates on updatedCenter are not directly saved in db
        em.detach(updatedCenter);
        updatedCenter
            .centerCode(UPDATED_CENTER_CODE)
            .centerTitle(UPDATED_CENTER_TITLE)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .pincode(UPDATED_PINCODE);
        CenterDTO centerDTO = centerMapper.toDto(updatedCenter);

        restCenterMockMvc.perform(put("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isOk());

        // Validate the Center in the database
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeUpdate);
        Center testCenter = centerList.get(centerList.size() - 1);
        assertThat(testCenter.getCenterCode()).isEqualTo(UPDATED_CENTER_CODE);
        assertThat(testCenter.getCenterTitle()).isEqualTo(UPDATED_CENTER_TITLE);
        assertThat(testCenter.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testCenter.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testCenter.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testCenter.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testCenter.getPincode()).isEqualTo(UPDATED_PINCODE);
    }

    @Test
    @Transactional
    public void updateNonExistingCenter() throws Exception {
        int databaseSizeBeforeUpdate = centerRepository.findAll().size();

        // Create the Center
        CenterDTO centerDTO = centerMapper.toDto(center);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCenterMockMvc.perform(put("/api/centers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Center in the database
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCenter() throws Exception {
        // Initialize the database
        centerRepository.saveAndFlush(center);

        int databaseSizeBeforeDelete = centerRepository.findAll().size();

        // Delete the center
        restCenterMockMvc.perform(delete("/api/centers/{id}", center.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Center> centerList = centerRepository.findAll();
        assertThat(centerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Center.class);
        Center center1 = new Center();
        center1.setId(1L);
        Center center2 = new Center();
        center2.setId(center1.getId());
        assertThat(center1).isEqualTo(center2);
        center2.setId(2L);
        assertThat(center1).isNotEqualTo(center2);
        center1.setId(null);
        assertThat(center1).isNotEqualTo(center2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CenterDTO.class);
        CenterDTO centerDTO1 = new CenterDTO();
        centerDTO1.setId(1L);
        CenterDTO centerDTO2 = new CenterDTO();
        assertThat(centerDTO1).isNotEqualTo(centerDTO2);
        centerDTO2.setId(centerDTO1.getId());
        assertThat(centerDTO1).isEqualTo(centerDTO2);
        centerDTO2.setId(2L);
        assertThat(centerDTO1).isNotEqualTo(centerDTO2);
        centerDTO1.setId(null);
        assertThat(centerDTO1).isNotEqualTo(centerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(centerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(centerMapper.fromId(null)).isNull();
    }
}
