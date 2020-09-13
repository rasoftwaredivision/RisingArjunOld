package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Userdetail;
import com.risingarjun.arjun.repository.UserdetailRepository;
import com.risingarjun.arjun.service.UserdetailService;
import com.risingarjun.arjun.service.dto.UserdetailDTO;
import com.risingarjun.arjun.service.mapper.UserdetailMapper;
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

import com.risingarjun.arjun.domain.enumeration.City;
import com.risingarjun.arjun.domain.enumeration.State;
import com.risingarjun.arjun.domain.enumeration.Country;
/**
 * Integration tests for the {@Link UserdetailResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class UserdetailResourceIT {

    private static final String DEFAULT_MOBILE_NO = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE_NO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DOB = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DOB = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_HOUSE_NO = "AAAAAAAAAA";
    private static final String UPDATED_HOUSE_NO = "BBBBBBBBBB";

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
    private UserdetailRepository userdetailRepository;

    @Autowired
    private UserdetailMapper userdetailMapper;

    @Autowired
    private UserdetailService userdetailService;

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

    private MockMvc restUserdetailMockMvc;

    private Userdetail userdetail;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserdetailResource userdetailResource = new UserdetailResource(userdetailService);
        this.restUserdetailMockMvc = MockMvcBuilders.standaloneSetup(userdetailResource)
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
    public static Userdetail createEntity(EntityManager em) {
        Userdetail userdetail = new Userdetail()
            .mobileNo(DEFAULT_MOBILE_NO)
            .dob(DEFAULT_DOB)
            .houseNo(DEFAULT_HOUSE_NO)
            .street(DEFAULT_STREET)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .country(DEFAULT_COUNTRY)
            .pincode(DEFAULT_PINCODE);
        return userdetail;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Userdetail createUpdatedEntity(EntityManager em) {
        Userdetail userdetail = new Userdetail()
            .mobileNo(UPDATED_MOBILE_NO)
            .dob(UPDATED_DOB)
            .houseNo(UPDATED_HOUSE_NO)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .pincode(UPDATED_PINCODE);
        return userdetail;
    }

    @BeforeEach
    public void initTest() {
        userdetail = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserdetail() throws Exception {
        int databaseSizeBeforeCreate = userdetailRepository.findAll().size();

        // Create the Userdetail
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);
        restUserdetailMockMvc.perform(post("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isCreated());

        // Validate the Userdetail in the database
        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeCreate + 1);
        Userdetail testUserdetail = userdetailList.get(userdetailList.size() - 1);
        assertThat(testUserdetail.getMobileNo()).isEqualTo(DEFAULT_MOBILE_NO);
        assertThat(testUserdetail.getDob()).isEqualTo(DEFAULT_DOB);
        assertThat(testUserdetail.getHouseNo()).isEqualTo(DEFAULT_HOUSE_NO);
        assertThat(testUserdetail.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testUserdetail.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testUserdetail.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testUserdetail.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testUserdetail.getPincode()).isEqualTo(DEFAULT_PINCODE);
    }

    @Test
    @Transactional
    public void createUserdetailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userdetailRepository.findAll().size();

        // Create the Userdetail with an existing ID
        userdetail.setId(1L);
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserdetailMockMvc.perform(post("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Userdetail in the database
        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMobileNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = userdetailRepository.findAll().size();
        // set the field null
        userdetail.setMobileNo(null);

        // Create the Userdetail, which fails.
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);

        restUserdetailMockMvc.perform(post("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isBadRequest());

        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDobIsRequired() throws Exception {
        int databaseSizeBeforeTest = userdetailRepository.findAll().size();
        // set the field null
        userdetail.setDob(null);

        // Create the Userdetail, which fails.
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);

        restUserdetailMockMvc.perform(post("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isBadRequest());

        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHouseNoIsRequired() throws Exception {
        int databaseSizeBeforeTest = userdetailRepository.findAll().size();
        // set the field null
        userdetail.setHouseNo(null);

        // Create the Userdetail, which fails.
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);

        restUserdetailMockMvc.perform(post("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isBadRequest());

        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = userdetailRepository.findAll().size();
        // set the field null
        userdetail.setCity(null);

        // Create the Userdetail, which fails.
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);

        restUserdetailMockMvc.perform(post("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isBadRequest());

        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = userdetailRepository.findAll().size();
        // set the field null
        userdetail.setState(null);

        // Create the Userdetail, which fails.
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);

        restUserdetailMockMvc.perform(post("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isBadRequest());

        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = userdetailRepository.findAll().size();
        // set the field null
        userdetail.setCountry(null);

        // Create the Userdetail, which fails.
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);

        restUserdetailMockMvc.perform(post("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isBadRequest());

        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUserdetails() throws Exception {
        // Initialize the database
        userdetailRepository.saveAndFlush(userdetail);

        // Get all the userdetailList
        restUserdetailMockMvc.perform(get("/api/userdetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userdetail.getId().intValue())))
            .andExpect(jsonPath("$.[*].mobileNo").value(hasItem(DEFAULT_MOBILE_NO.toString())))
            .andExpect(jsonPath("$.[*].dob").value(hasItem(DEFAULT_DOB.toString())))
            .andExpect(jsonPath("$.[*].houseNo").value(hasItem(DEFAULT_HOUSE_NO.toString())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].pincode").value(hasItem(DEFAULT_PINCODE)));
    }
    
    @Test
    @Transactional
    public void getUserdetail() throws Exception {
        // Initialize the database
        userdetailRepository.saveAndFlush(userdetail);

        // Get the userdetail
        restUserdetailMockMvc.perform(get("/api/userdetails/{id}", userdetail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userdetail.getId().intValue()))
            .andExpect(jsonPath("$.mobileNo").value(DEFAULT_MOBILE_NO.toString()))
            .andExpect(jsonPath("$.dob").value(DEFAULT_DOB.toString()))
            .andExpect(jsonPath("$.houseNo").value(DEFAULT_HOUSE_NO.toString()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.pincode").value(DEFAULT_PINCODE));
    }

    @Test
    @Transactional
    public void getNonExistingUserdetail() throws Exception {
        // Get the userdetail
        restUserdetailMockMvc.perform(get("/api/userdetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserdetail() throws Exception {
        // Initialize the database
        userdetailRepository.saveAndFlush(userdetail);

        int databaseSizeBeforeUpdate = userdetailRepository.findAll().size();

        // Update the userdetail
        Userdetail updatedUserdetail = userdetailRepository.findById(userdetail.getId()).get();
        // Disconnect from session so that the updates on updatedUserdetail are not directly saved in db
        em.detach(updatedUserdetail);
        updatedUserdetail
            .mobileNo(UPDATED_MOBILE_NO)
            .dob(UPDATED_DOB)
            .houseNo(UPDATED_HOUSE_NO)
            .street(UPDATED_STREET)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .country(UPDATED_COUNTRY)
            .pincode(UPDATED_PINCODE);
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(updatedUserdetail);

        restUserdetailMockMvc.perform(put("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isOk());

        // Validate the Userdetail in the database
        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeUpdate);
        Userdetail testUserdetail = userdetailList.get(userdetailList.size() - 1);
        assertThat(testUserdetail.getMobileNo()).isEqualTo(UPDATED_MOBILE_NO);
        assertThat(testUserdetail.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testUserdetail.getHouseNo()).isEqualTo(UPDATED_HOUSE_NO);
        assertThat(testUserdetail.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testUserdetail.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testUserdetail.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testUserdetail.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testUserdetail.getPincode()).isEqualTo(UPDATED_PINCODE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserdetail() throws Exception {
        int databaseSizeBeforeUpdate = userdetailRepository.findAll().size();

        // Create the Userdetail
        UserdetailDTO userdetailDTO = userdetailMapper.toDto(userdetail);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserdetailMockMvc.perform(put("/api/userdetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userdetailDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Userdetail in the database
        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserdetail() throws Exception {
        // Initialize the database
        userdetailRepository.saveAndFlush(userdetail);

        int databaseSizeBeforeDelete = userdetailRepository.findAll().size();

        // Delete the userdetail
        restUserdetailMockMvc.perform(delete("/api/userdetails/{id}", userdetail.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Userdetail> userdetailList = userdetailRepository.findAll();
        assertThat(userdetailList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Userdetail.class);
        Userdetail userdetail1 = new Userdetail();
        userdetail1.setId(1L);
        Userdetail userdetail2 = new Userdetail();
        userdetail2.setId(userdetail1.getId());
        assertThat(userdetail1).isEqualTo(userdetail2);
        userdetail2.setId(2L);
        assertThat(userdetail1).isNotEqualTo(userdetail2);
        userdetail1.setId(null);
        assertThat(userdetail1).isNotEqualTo(userdetail2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserdetailDTO.class);
        UserdetailDTO userdetailDTO1 = new UserdetailDTO();
        userdetailDTO1.setId(1L);
        UserdetailDTO userdetailDTO2 = new UserdetailDTO();
        assertThat(userdetailDTO1).isNotEqualTo(userdetailDTO2);
        userdetailDTO2.setId(userdetailDTO1.getId());
        assertThat(userdetailDTO1).isEqualTo(userdetailDTO2);
        userdetailDTO2.setId(2L);
        assertThat(userdetailDTO1).isNotEqualTo(userdetailDTO2);
        userdetailDTO1.setId(null);
        assertThat(userdetailDTO1).isNotEqualTo(userdetailDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userdetailMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userdetailMapper.fromId(null)).isNull();
    }
}
