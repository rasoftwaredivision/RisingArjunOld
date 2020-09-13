package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Userpreference;
import com.risingarjun.arjun.repository.UserpreferenceRepository;
import com.risingarjun.arjun.service.UserpreferenceService;
import com.risingarjun.arjun.service.dto.UserpreferenceDTO;
import com.risingarjun.arjun.service.mapper.UserpreferenceMapper;
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
 * Integration tests for the {@Link UserpreferenceResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class UserpreferenceResourceIT {

    private static final String DEFAULT_THEME = "AAAAAAAAAA";
    private static final String UPDATED_THEME = "BBBBBBBBBB";

    @Autowired
    private UserpreferenceRepository userpreferenceRepository;

    @Autowired
    private UserpreferenceMapper userpreferenceMapper;

    @Autowired
    private UserpreferenceService userpreferenceService;

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

    private MockMvc restUserpreferenceMockMvc;

    private Userpreference userpreference;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserpreferenceResource userpreferenceResource = new UserpreferenceResource(userpreferenceService);
        this.restUserpreferenceMockMvc = MockMvcBuilders.standaloneSetup(userpreferenceResource)
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
    public static Userpreference createEntity(EntityManager em) {
        Userpreference userpreference = new Userpreference()
            .theme(DEFAULT_THEME);
        return userpreference;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Userpreference createUpdatedEntity(EntityManager em) {
        Userpreference userpreference = new Userpreference()
            .theme(UPDATED_THEME);
        return userpreference;
    }

    @BeforeEach
    public void initTest() {
        userpreference = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserpreference() throws Exception {
        int databaseSizeBeforeCreate = userpreferenceRepository.findAll().size();

        // Create the Userpreference
        UserpreferenceDTO userpreferenceDTO = userpreferenceMapper.toDto(userpreference);
        restUserpreferenceMockMvc.perform(post("/api/userpreferences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userpreferenceDTO)))
            .andExpect(status().isCreated());

        // Validate the Userpreference in the database
        List<Userpreference> userpreferenceList = userpreferenceRepository.findAll();
        assertThat(userpreferenceList).hasSize(databaseSizeBeforeCreate + 1);
        Userpreference testUserpreference = userpreferenceList.get(userpreferenceList.size() - 1);
        assertThat(testUserpreference.getTheme()).isEqualTo(DEFAULT_THEME);
    }

    @Test
    @Transactional
    public void createUserpreferenceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userpreferenceRepository.findAll().size();

        // Create the Userpreference with an existing ID
        userpreference.setId(1L);
        UserpreferenceDTO userpreferenceDTO = userpreferenceMapper.toDto(userpreference);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserpreferenceMockMvc.perform(post("/api/userpreferences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userpreferenceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Userpreference in the database
        List<Userpreference> userpreferenceList = userpreferenceRepository.findAll();
        assertThat(userpreferenceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserpreferences() throws Exception {
        // Initialize the database
        userpreferenceRepository.saveAndFlush(userpreference);

        // Get all the userpreferenceList
        restUserpreferenceMockMvc.perform(get("/api/userpreferences?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userpreference.getId().intValue())))
            .andExpect(jsonPath("$.[*].theme").value(hasItem(DEFAULT_THEME.toString())));
    }
    
    @Test
    @Transactional
    public void getUserpreference() throws Exception {
        // Initialize the database
        userpreferenceRepository.saveAndFlush(userpreference);

        // Get the userpreference
        restUserpreferenceMockMvc.perform(get("/api/userpreferences/{id}", userpreference.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userpreference.getId().intValue()))
            .andExpect(jsonPath("$.theme").value(DEFAULT_THEME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUserpreference() throws Exception {
        // Get the userpreference
        restUserpreferenceMockMvc.perform(get("/api/userpreferences/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserpreference() throws Exception {
        // Initialize the database
        userpreferenceRepository.saveAndFlush(userpreference);

        int databaseSizeBeforeUpdate = userpreferenceRepository.findAll().size();

        // Update the userpreference
        Userpreference updatedUserpreference = userpreferenceRepository.findById(userpreference.getId()).get();
        // Disconnect from session so that the updates on updatedUserpreference are not directly saved in db
        em.detach(updatedUserpreference);
        updatedUserpreference
            .theme(UPDATED_THEME);
        UserpreferenceDTO userpreferenceDTO = userpreferenceMapper.toDto(updatedUserpreference);

        restUserpreferenceMockMvc.perform(put("/api/userpreferences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userpreferenceDTO)))
            .andExpect(status().isOk());

        // Validate the Userpreference in the database
        List<Userpreference> userpreferenceList = userpreferenceRepository.findAll();
        assertThat(userpreferenceList).hasSize(databaseSizeBeforeUpdate);
        Userpreference testUserpreference = userpreferenceList.get(userpreferenceList.size() - 1);
        assertThat(testUserpreference.getTheme()).isEqualTo(UPDATED_THEME);
    }

    @Test
    @Transactional
    public void updateNonExistingUserpreference() throws Exception {
        int databaseSizeBeforeUpdate = userpreferenceRepository.findAll().size();

        // Create the Userpreference
        UserpreferenceDTO userpreferenceDTO = userpreferenceMapper.toDto(userpreference);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserpreferenceMockMvc.perform(put("/api/userpreferences")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userpreferenceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Userpreference in the database
        List<Userpreference> userpreferenceList = userpreferenceRepository.findAll();
        assertThat(userpreferenceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserpreference() throws Exception {
        // Initialize the database
        userpreferenceRepository.saveAndFlush(userpreference);

        int databaseSizeBeforeDelete = userpreferenceRepository.findAll().size();

        // Delete the userpreference
        restUserpreferenceMockMvc.perform(delete("/api/userpreferences/{id}", userpreference.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Userpreference> userpreferenceList = userpreferenceRepository.findAll();
        assertThat(userpreferenceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Userpreference.class);
        Userpreference userpreference1 = new Userpreference();
        userpreference1.setId(1L);
        Userpreference userpreference2 = new Userpreference();
        userpreference2.setId(userpreference1.getId());
        assertThat(userpreference1).isEqualTo(userpreference2);
        userpreference2.setId(2L);
        assertThat(userpreference1).isNotEqualTo(userpreference2);
        userpreference1.setId(null);
        assertThat(userpreference1).isNotEqualTo(userpreference2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserpreferenceDTO.class);
        UserpreferenceDTO userpreferenceDTO1 = new UserpreferenceDTO();
        userpreferenceDTO1.setId(1L);
        UserpreferenceDTO userpreferenceDTO2 = new UserpreferenceDTO();
        assertThat(userpreferenceDTO1).isNotEqualTo(userpreferenceDTO2);
        userpreferenceDTO2.setId(userpreferenceDTO1.getId());
        assertThat(userpreferenceDTO1).isEqualTo(userpreferenceDTO2);
        userpreferenceDTO2.setId(2L);
        assertThat(userpreferenceDTO1).isNotEqualTo(userpreferenceDTO2);
        userpreferenceDTO1.setId(null);
        assertThat(userpreferenceDTO1).isNotEqualTo(userpreferenceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userpreferenceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userpreferenceMapper.fromId(null)).isNull();
    }
}
