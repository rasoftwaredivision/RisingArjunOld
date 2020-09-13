package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Enterprise;
import com.risingarjun.arjun.repository.EnterpriseRepository;
import com.risingarjun.arjun.service.EnterpriseService;
import com.risingarjun.arjun.service.dto.EnterpriseDTO;
import com.risingarjun.arjun.service.mapper.EnterpriseMapper;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.risingarjun.arjun.domain.enumeration.Natureofbusiness;
import com.risingarjun.arjun.domain.enumeration.City;
import com.risingarjun.arjun.domain.enumeration.State;
import com.risingarjun.arjun.domain.enumeration.Country;
/**
 * Integration tests for the {@Link EnterpriseResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class EnterpriseResourceIT {

    private static final String DEFAULT_ABBREVATION = "AAAAAAAAAA";
    private static final String UPDATED_ABBREVATION = "BBBBBBBBBB";

    private static final String DEFAULT_ENTERPRISENAME = "AAAAAAAAAA";
    private static final String UPDATED_ENTERPRISENAME = "BBBBBBBBBB";

    private static final Natureofbusiness DEFAULT_NATUREOFBUSINESS = Natureofbusiness.COACHING;
    private static final Natureofbusiness UPDATED_NATUREOFBUSINESS = Natureofbusiness.COACHING;

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PUNCHLINE = "AAAAAAAAAA";
    private static final String UPDATED_PUNCHLINE = "BBBBBBBBBB";

    private static final String DEFAULT_MISSION = "AAAAAAAAAA";
    private static final String UPDATED_MISSION = "BBBBBBBBBB";

    private static final String DEFAULT_VISION = "AAAAAAAAAA";
    private static final String UPDATED_VISION = "BBBBBBBBBB";

    private static final String DEFAULT_PRINCIPLES = "AAAAAAAAAA";
    private static final String UPDATED_PRINCIPLES = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "V&@!2.FK";
    private static final String UPDATED_EMAIL = "(0@?.^^";

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    private static final String DEFAULT_LANDLINE = "AAAAAAAAAA";
    private static final String UPDATED_LANDLINE = "BBBBBBBBBB";

    private static final String DEFAULT_FAX = "AAAAAAAAAA";
    private static final String UPDATED_FAX = "BBBBBBBBBB";

    private static final String DEFAULT_PLOT_NO = "AAAAAAAAAA";
    private static final String UPDATED_PLOT_NO = "BBBBBBBBBB";

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
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private EnterpriseMapper enterpriseMapper;

    @Autowired
    private EnterpriseService enterpriseService;

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

    private MockMvc restEnterpriseMockMvc;

    private Enterprise enterprise;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnterpriseResource enterpriseResource = new EnterpriseResource(enterpriseService);
        this.restEnterpriseMockMvc = MockMvcBuilders.standaloneSetup(enterpriseResource)
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
    public static Enterprise createEntity(EntityManager em) {
        Enterprise enterprise = new Enterprise()
            .abbrevation(DEFAULT_ABBREVATION)
            .enterprisename(DEFAULT_ENTERPRISENAME)
            .natureofbusiness(DEFAULT_NATUREOFBUSINESS)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE)
            .punchline(DEFAULT_PUNCHLINE)
            .mission(DEFAULT_MISSION)
            .vision(DEFAULT_VISION)
            .principles(DEFAULT_PRINCIPLES)
            .email(DEFAULT_EMAIL)
            .mobile(DEFAULT_MOBILE)
            .landline(DEFAULT_LANDLINE)
            .fax(DEFAULT_FAX)
            .plotNo(DEFAULT_PLOT_NO)
            .street(DEFAULT_STREET)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .country(DEFAULT_COUNTRY)
            .pincode(DEFAULT_PINCODE);
        return enterprise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enterprise createUpdatedEntity(EntityManager em) {
        Enterprise enterprise = new Enterprise()
            .abbrevation(UPDATED_ABBREVATION)
            .enterprisename(UPDATED_ENTERPRISENAME)
            .natureofbusiness(UPDATED_NATUREOFBUSINESS)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .punchline(UPDATED_PUNCHLINE)
            .mission(UPDATED_MISSION)
            .vision(UPDATED_VISION)
            .principles(UPDATED_PRINCIPLES)
            .email(UPDATED_EMAIL)
            .mobile(UPDATED_MOBILE)
            .landline(UPDATED_LANDLINE)
            .fax(UPDATED_FAX)
            .plotNo(UPDATED_PLOT_NO)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .pincode(UPDATED_PINCODE);
        return enterprise;
    }

    @BeforeEach
    public void initTest() {
        enterprise = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnterprise() throws Exception {
        int databaseSizeBeforeCreate = enterpriseRepository.findAll().size();

        // Create the Enterprise
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);
        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isCreated());

        // Validate the Enterprise in the database
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeCreate + 1);
        Enterprise testEnterprise = enterpriseList.get(enterpriseList.size() - 1);
        assertThat(testEnterprise.getAbbrevation()).isEqualTo(DEFAULT_ABBREVATION);
        assertThat(testEnterprise.getEnterprisename()).isEqualTo(DEFAULT_ENTERPRISENAME);
        assertThat(testEnterprise.getNatureofbusiness()).isEqualTo(DEFAULT_NATUREOFBUSINESS);
        assertThat(testEnterprise.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testEnterprise.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
        assertThat(testEnterprise.getPunchline()).isEqualTo(DEFAULT_PUNCHLINE);
        assertThat(testEnterprise.getMission()).isEqualTo(DEFAULT_MISSION);
        assertThat(testEnterprise.getVision()).isEqualTo(DEFAULT_VISION);
        assertThat(testEnterprise.getPrinciples()).isEqualTo(DEFAULT_PRINCIPLES);
        assertThat(testEnterprise.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testEnterprise.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testEnterprise.getLandline()).isEqualTo(DEFAULT_LANDLINE);
        assertThat(testEnterprise.getFax()).isEqualTo(DEFAULT_FAX);
        assertThat(testEnterprise.getPlotNo()).isEqualTo(DEFAULT_PLOT_NO);
        assertThat(testEnterprise.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testEnterprise.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testEnterprise.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testEnterprise.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testEnterprise.getPincode()).isEqualTo(DEFAULT_PINCODE);
    }

    @Test
    @Transactional
    public void createEnterpriseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enterpriseRepository.findAll().size();

        // Create the Enterprise with an existing ID
        enterprise.setId(1L);
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Enterprise in the database
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkAbbrevationIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setAbbrevation(null);

        // Create the Enterprise, which fails.
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEnterprisenameIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setEnterprisename(null);

        // Create the Enterprise, which fails.
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNatureofbusinessIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setNatureofbusiness(null);

        // Create the Enterprise, which fails.
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMobileIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setMobile(null);

        // Create the Enterprise, which fails.
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlotNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setPlotNo(null);

        // Create the Enterprise, which fails.
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setCity(null);

        // Create the Enterprise, which fails.
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setState(null);

        // Create the Enterprise, which fails.
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = enterpriseRepository.findAll().size();
        // set the field null
        enterprise.setCountry(null);

        // Create the Enterprise, which fails.
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        restEnterpriseMockMvc.perform(post("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEnterprises() throws Exception {
        // Initialize the database
        enterpriseRepository.saveAndFlush(enterprise);

        // Get all the enterpriseList
        restEnterpriseMockMvc.perform(get("/api/enterprises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enterprise.getId().intValue())))
            .andExpect(jsonPath("$.[*].abbrevation").value(hasItem(DEFAULT_ABBREVATION.toString())))
            .andExpect(jsonPath("$.[*].enterprisename").value(hasItem(DEFAULT_ENTERPRISENAME.toString())))
            .andExpect(jsonPath("$.[*].natureofbusiness").value(hasItem(DEFAULT_NATUREOFBUSINESS.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))))
            .andExpect(jsonPath("$.[*].punchline").value(hasItem(DEFAULT_PUNCHLINE.toString())))
            .andExpect(jsonPath("$.[*].mission").value(hasItem(DEFAULT_MISSION.toString())))
            .andExpect(jsonPath("$.[*].vision").value(hasItem(DEFAULT_VISION.toString())))
            .andExpect(jsonPath("$.[*].principles").value(hasItem(DEFAULT_PRINCIPLES.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE.toString())))
            .andExpect(jsonPath("$.[*].landline").value(hasItem(DEFAULT_LANDLINE.toString())))
            .andExpect(jsonPath("$.[*].fax").value(hasItem(DEFAULT_FAX.toString())))
            .andExpect(jsonPath("$.[*].plotNo").value(hasItem(DEFAULT_PLOT_NO.toString())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE)));
    }
    
    @Test
    @Transactional
    public void getEnterprise() throws Exception {
        // Initialize the database
        enterpriseRepository.saveAndFlush(enterprise);

        // Get the enterprise
        restEnterpriseMockMvc.perform(get("/api/enterprises/{id}", enterprise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enterprise.getId().intValue()))
            .andExpect(jsonPath("$.abbrevation").value(DEFAULT_ABBREVATION.toString()))
            .andExpect(jsonPath("$.enterprisename").value(DEFAULT_ENTERPRISENAME.toString()))
            .andExpect(jsonPath("$.natureofbusiness").value(DEFAULT_NATUREOFBUSINESS.toString()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.punchline").value(DEFAULT_PUNCHLINE.toString()))
            .andExpect(jsonPath("$.mission").value(DEFAULT_MISSION.toString()))
            .andExpect(jsonPath("$.vision").value(DEFAULT_VISION.toString()))
            .andExpect(jsonPath("$.principles").value(DEFAULT_PRINCIPLES.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE.toString()))
            .andExpect(jsonPath("$.landline").value(DEFAULT_LANDLINE.toString()))
            .andExpect(jsonPath("$.fax").value(DEFAULT_FAX.toString()))
            .andExpect(jsonPath("$.plotNo").value(DEFAULT_PLOT_NO.toString()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE));
    }

    @Test
    @Transactional
    public void getNonExistingEnterprise() throws Exception {
        // Get the enterprise
        restEnterpriseMockMvc.perform(get("/api/enterprises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnterprise() throws Exception {
        // Initialize the database
        enterpriseRepository.saveAndFlush(enterprise);

        int databaseSizeBeforeUpdate = enterpriseRepository.findAll().size();

        // Update the enterprise
        Enterprise updatedEnterprise = enterpriseRepository.findById(enterprise.getId()).get();
        // Disconnect from session so that the updates on updatedEnterprise are not directly saved in db
        em.detach(updatedEnterprise);
        updatedEnterprise
            .abbrevation(UPDATED_ABBREVATION)
            .enterprisename(UPDATED_ENTERPRISENAME)
            .natureofbusiness(UPDATED_NATUREOFBUSINESS)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .punchline(UPDATED_PUNCHLINE)
            .mission(UPDATED_MISSION)
            .vision(UPDATED_VISION)
            .principles(UPDATED_PRINCIPLES)
            .email(UPDATED_EMAIL)
            .mobile(UPDATED_MOBILE)
            .landline(UPDATED_LANDLINE)
            .fax(UPDATED_FAX)
            .plotNo(UPDATED_PLOT_NO)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .pincode(UPDATED_PINCODE);
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(updatedEnterprise);

        restEnterpriseMockMvc.perform(put("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isOk());

        // Validate the Enterprise in the database
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeUpdate);
        Enterprise testEnterprise = enterpriseList.get(enterpriseList.size() - 1);
        assertThat(testEnterprise.getAbbrevation()).isEqualTo(UPDATED_ABBREVATION);
        assertThat(testEnterprise.getEnterprisename()).isEqualTo(UPDATED_ENTERPRISENAME);
        assertThat(testEnterprise.getNatureofbusiness()).isEqualTo(UPDATED_NATUREOFBUSINESS);
        assertThat(testEnterprise.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testEnterprise.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
        assertThat(testEnterprise.getPunchline()).isEqualTo(UPDATED_PUNCHLINE);
        assertThat(testEnterprise.getMission()).isEqualTo(UPDATED_MISSION);
        assertThat(testEnterprise.getVision()).isEqualTo(UPDATED_VISION);
        assertThat(testEnterprise.getPrinciples()).isEqualTo(UPDATED_PRINCIPLES);
        assertThat(testEnterprise.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testEnterprise.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testEnterprise.getLandline()).isEqualTo(UPDATED_LANDLINE);
        assertThat(testEnterprise.getFax()).isEqualTo(UPDATED_FAX);
        assertThat(testEnterprise.getPlotNo()).isEqualTo(UPDATED_PLOT_NO);
        assertThat(testEnterprise.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testEnterprise.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testEnterprise.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testEnterprise.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testEnterprise.getPincode()).isEqualTo(UPDATED_PINCODE);
    }

    @Test
    @Transactional
    public void updateNonExistingEnterprise() throws Exception {
        int databaseSizeBeforeUpdate = enterpriseRepository.findAll().size();

        // Create the Enterprise
        EnterpriseDTO enterpriseDTO = enterpriseMapper.toDto(enterprise);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnterpriseMockMvc.perform(put("/api/enterprises")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterpriseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Enterprise in the database
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnterprise() throws Exception {
        // Initialize the database
        enterpriseRepository.saveAndFlush(enterprise);

        int databaseSizeBeforeDelete = enterpriseRepository.findAll().size();

        // Delete the enterprise
        restEnterpriseMockMvc.perform(delete("/api/enterprises/{id}", enterprise.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Enterprise> enterpriseList = enterpriseRepository.findAll();
        assertThat(enterpriseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enterprise.class);
        Enterprise enterprise1 = new Enterprise();
        enterprise1.setId(1L);
        Enterprise enterprise2 = new Enterprise();
        enterprise2.setId(enterprise1.getId());
        assertThat(enterprise1).isEqualTo(enterprise2);
        enterprise2.setId(2L);
        assertThat(enterprise1).isNotEqualTo(enterprise2);
        enterprise1.setId(null);
        assertThat(enterprise1).isNotEqualTo(enterprise2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnterpriseDTO.class);
        EnterpriseDTO enterpriseDTO1 = new EnterpriseDTO();
        enterpriseDTO1.setId(1L);
        EnterpriseDTO enterpriseDTO2 = new EnterpriseDTO();
        assertThat(enterpriseDTO1).isNotEqualTo(enterpriseDTO2);
        enterpriseDTO2.setId(enterpriseDTO1.getId());
        assertThat(enterpriseDTO1).isEqualTo(enterpriseDTO2);
        enterpriseDTO2.setId(2L);
        assertThat(enterpriseDTO1).isNotEqualTo(enterpriseDTO2);
        enterpriseDTO1.setId(null);
        assertThat(enterpriseDTO1).isNotEqualTo(enterpriseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(enterpriseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(enterpriseMapper.fromId(null)).isNull();
    }
}
