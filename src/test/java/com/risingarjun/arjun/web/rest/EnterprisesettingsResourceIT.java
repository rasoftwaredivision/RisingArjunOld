package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Enterprisesettings;
import com.risingarjun.arjun.repository.EnterprisesettingsRepository;
import com.risingarjun.arjun.service.EnterprisesettingsService;
import com.risingarjun.arjun.service.dto.EnterprisesettingsDTO;
import com.risingarjun.arjun.service.mapper.EnterprisesettingsMapper;
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
 * Integration tests for the {@Link EnterprisesettingsResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class EnterprisesettingsResourceIT {

    private static final String DEFAULT_THEME = "AAAAAAAAAA";
    private static final String UPDATED_THEME = "BBBBBBBBBB";

    private static final String DEFAULT_FOREGROUND = "AAAAAAAAAA";
    private static final String UPDATED_FOREGROUND = "BBBBBBBBBB";

    private static final String DEFAULT_BACKGROUND = "AAAAAAAAAA";
    private static final String UPDATED_BACKGROUND = "BBBBBBBBBB";

    private static final String DEFAULT_DISCLAIMER = "AAAAAAAAAA";
    private static final String UPDATED_DISCLAIMER = "BBBBBBBBBB";

    private static final String DEFAULT_POLICY = "AAAAAAAAAA";
    private static final String UPDATED_POLICY = "BBBBBBBBBB";

    private static final String DEFAULT_COPYRIGHTS = "AAAAAAAAAA";
    private static final String UPDATED_COPYRIGHTS = "BBBBBBBBBB";

    private static final String DEFAULT_TERMS_OF_USAGE = "AAAAAAAAAA";
    private static final String UPDATED_TERMS_OF_USAGE = "BBBBBBBBBB";

    @Autowired
    private EnterprisesettingsRepository enterprisesettingsRepository;

    @Autowired
    private EnterprisesettingsMapper enterprisesettingsMapper;

    @Autowired
    private EnterprisesettingsService enterprisesettingsService;

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

    private MockMvc restEnterprisesettingsMockMvc;

    private Enterprisesettings enterprisesettings;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EnterprisesettingsResource enterprisesettingsResource = new EnterprisesettingsResource(enterprisesettingsService);
        this.restEnterprisesettingsMockMvc = MockMvcBuilders.standaloneSetup(enterprisesettingsResource)
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
    public static Enterprisesettings createEntity(EntityManager em) {
        Enterprisesettings enterprisesettings = new Enterprisesettings()
            .theme(DEFAULT_THEME)
            .foreground(DEFAULT_FOREGROUND)
            .background(DEFAULT_BACKGROUND)
            .disclaimer(DEFAULT_DISCLAIMER)
            .policy(DEFAULT_POLICY)
            .copyrights(DEFAULT_COPYRIGHTS)
            .termsOfUsage(DEFAULT_TERMS_OF_USAGE);
        return enterprisesettings;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enterprisesettings createUpdatedEntity(EntityManager em) {
        Enterprisesettings enterprisesettings = new Enterprisesettings()
            .theme(UPDATED_THEME)
            .foreground(UPDATED_FOREGROUND)
            .background(UPDATED_BACKGROUND)
            .disclaimer(UPDATED_DISCLAIMER)
            .policy(UPDATED_POLICY)
            .copyrights(UPDATED_COPYRIGHTS)
            .termsOfUsage(UPDATED_TERMS_OF_USAGE);
        return enterprisesettings;
    }

    @BeforeEach
    public void initTest() {
        enterprisesettings = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnterprisesettings() throws Exception {
        int databaseSizeBeforeCreate = enterprisesettingsRepository.findAll().size();

        // Create the Enterprisesettings
        EnterprisesettingsDTO enterprisesettingsDTO = enterprisesettingsMapper.toDto(enterprisesettings);
        restEnterprisesettingsMockMvc.perform(post("/api/enterprisesettings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterprisesettingsDTO)))
            .andExpect(status().isCreated());

        // Validate the Enterprisesettings in the database
        List<Enterprisesettings> enterprisesettingsList = enterprisesettingsRepository.findAll();
        assertThat(enterprisesettingsList).hasSize(databaseSizeBeforeCreate + 1);
        Enterprisesettings testEnterprisesettings = enterprisesettingsList.get(enterprisesettingsList.size() - 1);
        assertThat(testEnterprisesettings.getTheme()).isEqualTo(DEFAULT_THEME);
        assertThat(testEnterprisesettings.getForeground()).isEqualTo(DEFAULT_FOREGROUND);
        assertThat(testEnterprisesettings.getBackground()).isEqualTo(DEFAULT_BACKGROUND);
        assertThat(testEnterprisesettings.getDisclaimer()).isEqualTo(DEFAULT_DISCLAIMER);
        assertThat(testEnterprisesettings.getPolicy()).isEqualTo(DEFAULT_POLICY);
        assertThat(testEnterprisesettings.getCopyrights()).isEqualTo(DEFAULT_COPYRIGHTS);
        assertThat(testEnterprisesettings.getTermsOfUsage()).isEqualTo(DEFAULT_TERMS_OF_USAGE);
    }

    @Test
    @Transactional
    public void createEnterprisesettingsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enterprisesettingsRepository.findAll().size();

        // Create the Enterprisesettings with an existing ID
        enterprisesettings.setId(1L);
        EnterprisesettingsDTO enterprisesettingsDTO = enterprisesettingsMapper.toDto(enterprisesettings);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnterprisesettingsMockMvc.perform(post("/api/enterprisesettings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterprisesettingsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Enterprisesettings in the database
        List<Enterprisesettings> enterprisesettingsList = enterprisesettingsRepository.findAll();
        assertThat(enterprisesettingsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEnterprisesettings() throws Exception {
        // Initialize the database
        enterprisesettingsRepository.saveAndFlush(enterprisesettings);

        // Get all the enterprisesettingsList
        restEnterprisesettingsMockMvc.perform(get("/api/enterprisesettings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enterprisesettings.getId().intValue())))
            .andExpect(jsonPath("$.[*].theme").value(hasItem(DEFAULT_THEME.toString())))
            .andExpect(jsonPath("$.[*].foreground").value(hasItem(DEFAULT_FOREGROUND.toString())))
            .andExpect(jsonPath("$.[*].background").value(hasItem(DEFAULT_BACKGROUND.toString())))
            .andExpect(jsonPath("$.[*].disclaimer").value(hasItem(DEFAULT_DISCLAIMER.toString())))
            .andExpect(jsonPath("$.[*].policy").value(hasItem(DEFAULT_POLICY.toString())))
            .andExpect(jsonPath("$.[*].copyrights").value(hasItem(DEFAULT_COPYRIGHTS.toString())))
            .andExpect(jsonPath("$.[*].termsOfUsage").value(hasItem(DEFAULT_TERMS_OF_USAGE.toString())));
    }
    
    @Test
    @Transactional
    public void getEnterprisesettings() throws Exception {
        // Initialize the database
        enterprisesettingsRepository.saveAndFlush(enterprisesettings);

        // Get the enterprisesettings
        restEnterprisesettingsMockMvc.perform(get("/api/enterprisesettings/{id}", enterprisesettings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(enterprisesettings.getId().intValue()))
            .andExpect(jsonPath("$.theme").value(DEFAULT_THEME.toString()))
            .andExpect(jsonPath("$.foreground").value(DEFAULT_FOREGROUND.toString()))
            .andExpect(jsonPath("$.background").value(DEFAULT_BACKGROUND.toString()))
            .andExpect(jsonPath("$.disclaimer").value(DEFAULT_DISCLAIMER.toString()))
            .andExpect(jsonPath("$.policy").value(DEFAULT_POLICY.toString()))
            .andExpect(jsonPath("$.copyrights").value(DEFAULT_COPYRIGHTS.toString()))
            .andExpect(jsonPath("$.termsOfUsage").value(DEFAULT_TERMS_OF_USAGE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEnterprisesettings() throws Exception {
        // Get the enterprisesettings
        restEnterprisesettingsMockMvc.perform(get("/api/enterprisesettings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnterprisesettings() throws Exception {
        // Initialize the database
        enterprisesettingsRepository.saveAndFlush(enterprisesettings);

        int databaseSizeBeforeUpdate = enterprisesettingsRepository.findAll().size();

        // Update the enterprisesettings
        Enterprisesettings updatedEnterprisesettings = enterprisesettingsRepository.findById(enterprisesettings.getId()).get();
        // Disconnect from session so that the updates on updatedEnterprisesettings are not directly saved in db
        em.detach(updatedEnterprisesettings);
        updatedEnterprisesettings
            .theme(UPDATED_THEME)
            .foreground(UPDATED_FOREGROUND)
            .background(UPDATED_BACKGROUND)
            .disclaimer(UPDATED_DISCLAIMER)
            .policy(UPDATED_POLICY)
            .copyrights(UPDATED_COPYRIGHTS)
            .termsOfUsage(UPDATED_TERMS_OF_USAGE);
        EnterprisesettingsDTO enterprisesettingsDTO = enterprisesettingsMapper.toDto(updatedEnterprisesettings);

        restEnterprisesettingsMockMvc.perform(put("/api/enterprisesettings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterprisesettingsDTO)))
            .andExpect(status().isOk());

        // Validate the Enterprisesettings in the database
        List<Enterprisesettings> enterprisesettingsList = enterprisesettingsRepository.findAll();
        assertThat(enterprisesettingsList).hasSize(databaseSizeBeforeUpdate);
        Enterprisesettings testEnterprisesettings = enterprisesettingsList.get(enterprisesettingsList.size() - 1);
        assertThat(testEnterprisesettings.getTheme()).isEqualTo(UPDATED_THEME);
        assertThat(testEnterprisesettings.getForeground()).isEqualTo(UPDATED_FOREGROUND);
        assertThat(testEnterprisesettings.getBackground()).isEqualTo(UPDATED_BACKGROUND);
        assertThat(testEnterprisesettings.getDisclaimer()).isEqualTo(UPDATED_DISCLAIMER);
        assertThat(testEnterprisesettings.getPolicy()).isEqualTo(UPDATED_POLICY);
        assertThat(testEnterprisesettings.getCopyrights()).isEqualTo(UPDATED_COPYRIGHTS);
        assertThat(testEnterprisesettings.getTermsOfUsage()).isEqualTo(UPDATED_TERMS_OF_USAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingEnterprisesettings() throws Exception {
        int databaseSizeBeforeUpdate = enterprisesettingsRepository.findAll().size();

        // Create the Enterprisesettings
        EnterprisesettingsDTO enterprisesettingsDTO = enterprisesettingsMapper.toDto(enterprisesettings);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnterprisesettingsMockMvc.perform(put("/api/enterprisesettings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(enterprisesettingsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Enterprisesettings in the database
        List<Enterprisesettings> enterprisesettingsList = enterprisesettingsRepository.findAll();
        assertThat(enterprisesettingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnterprisesettings() throws Exception {
        // Initialize the database
        enterprisesettingsRepository.saveAndFlush(enterprisesettings);

        int databaseSizeBeforeDelete = enterprisesettingsRepository.findAll().size();

        // Delete the enterprisesettings
        restEnterprisesettingsMockMvc.perform(delete("/api/enterprisesettings/{id}", enterprisesettings.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Enterprisesettings> enterprisesettingsList = enterprisesettingsRepository.findAll();
        assertThat(enterprisesettingsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Enterprisesettings.class);
        Enterprisesettings enterprisesettings1 = new Enterprisesettings();
        enterprisesettings1.setId(1L);
        Enterprisesettings enterprisesettings2 = new Enterprisesettings();
        enterprisesettings2.setId(enterprisesettings1.getId());
        assertThat(enterprisesettings1).isEqualTo(enterprisesettings2);
        enterprisesettings2.setId(2L);
        assertThat(enterprisesettings1).isNotEqualTo(enterprisesettings2);
        enterprisesettings1.setId(null);
        assertThat(enterprisesettings1).isNotEqualTo(enterprisesettings2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EnterprisesettingsDTO.class);
        EnterprisesettingsDTO enterprisesettingsDTO1 = new EnterprisesettingsDTO();
        enterprisesettingsDTO1.setId(1L);
        EnterprisesettingsDTO enterprisesettingsDTO2 = new EnterprisesettingsDTO();
        assertThat(enterprisesettingsDTO1).isNotEqualTo(enterprisesettingsDTO2);
        enterprisesettingsDTO2.setId(enterprisesettingsDTO1.getId());
        assertThat(enterprisesettingsDTO1).isEqualTo(enterprisesettingsDTO2);
        enterprisesettingsDTO2.setId(2L);
        assertThat(enterprisesettingsDTO1).isNotEqualTo(enterprisesettingsDTO2);
        enterprisesettingsDTO1.setId(null);
        assertThat(enterprisesettingsDTO1).isNotEqualTo(enterprisesettingsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(enterprisesettingsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(enterprisesettingsMapper.fromId(null)).isNull();
    }
}
