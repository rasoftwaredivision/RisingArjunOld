package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Fundamentaldetail;
import com.risingarjun.arjun.repository.FundamentaldetailRepository;
import com.risingarjun.arjun.service.FundamentaldetailService;
import com.risingarjun.arjun.service.dto.FundamentaldetailDTO;
import com.risingarjun.arjun.service.mapper.FundamentaldetailMapper;
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

import com.risingarjun.arjun.domain.enumeration.Fundamental;
/**
 * Integration tests for the {@Link FundamentaldetailResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class FundamentaldetailResourceIT {

    private static final Fundamental DEFAULT_CONCEPT = Fundamental.BASICPROPOTIONALITYTHEROEM;
    private static final Fundamental UPDATED_CONCEPT = Fundamental.SECTIONFORMULA;

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    @Autowired
    private FundamentaldetailRepository fundamentaldetailRepository;

    @Autowired
    private FundamentaldetailMapper fundamentaldetailMapper;

    @Autowired
    private FundamentaldetailService fundamentaldetailService;

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

    private MockMvc restFundamentaldetailMockMvc;

    private Fundamentaldetail fundamentaldetail;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FundamentaldetailResource fundamentaldetailResource = new FundamentaldetailResource(fundamentaldetailService);
        this.restFundamentaldetailMockMvc = MockMvcBuilders.standaloneSetup(fundamentaldetailResource)
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
    public static Fundamentaldetail createEntity(EntityManager em) {
        Fundamentaldetail fundamentaldetail = new Fundamentaldetail()
            .concept(DEFAULT_CONCEPT)
            .details(DEFAULT_DETAILS);
        return fundamentaldetail;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fundamentaldetail createUpdatedEntity(EntityManager em) {
        Fundamentaldetail fundamentaldetail = new Fundamentaldetail()
            .concept(UPDATED_CONCEPT)
            .details(UPDATED_DETAILS);
        return fundamentaldetail;
    }

    @BeforeEach
    public void initTest() {
        fundamentaldetail = createEntity(em);
    }

    @Test
    @Transactional
    public void createFundamentaldetail() throws Exception {
        int databaseSizeBeforeCreate = fundamentaldetailRepository.findAll().size();

        // Create the Fundamentaldetail
        FundamentaldetailDTO fundamentaldetailDTO = fundamentaldetailMapper.toDto(fundamentaldetail);
        restFundamentaldetailMockMvc.perform(post("/api/fundamentaldetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fundamentaldetailDTO)))
            .andExpect(status().isCreated());

        // Validate the Fundamentaldetail in the database
        List<Fundamentaldetail> fundamentaldetailList = fundamentaldetailRepository.findAll();
        assertThat(fundamentaldetailList).hasSize(databaseSizeBeforeCreate + 1);
        Fundamentaldetail testFundamentaldetail = fundamentaldetailList.get(fundamentaldetailList.size() - 1);
        assertThat(testFundamentaldetail.getConcept()).isEqualTo(DEFAULT_CONCEPT);
        assertThat(testFundamentaldetail.getDetails()).isEqualTo(DEFAULT_DETAILS);
    }

    @Test
    @Transactional
    public void createFundamentaldetailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fundamentaldetailRepository.findAll().size();

        // Create the Fundamentaldetail with an existing ID
        fundamentaldetail.setId(1L);
        FundamentaldetailDTO fundamentaldetailDTO = fundamentaldetailMapper.toDto(fundamentaldetail);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFundamentaldetailMockMvc.perform(post("/api/fundamentaldetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fundamentaldetailDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Fundamentaldetail in the database
        List<Fundamentaldetail> fundamentaldetailList = fundamentaldetailRepository.findAll();
        assertThat(fundamentaldetailList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFundamentaldetails() throws Exception {
        // Initialize the database
        fundamentaldetailRepository.saveAndFlush(fundamentaldetail);

        // Get all the fundamentaldetailList
        restFundamentaldetailMockMvc.perform(get("/api/fundamentaldetails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fundamentaldetail.getId().intValue())))
            .andExpect(jsonPath("$.[*].concept").value(hasItem(DEFAULT_CONCEPT.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS.toString())));
    }
    
    @Test
    @Transactional
    public void getFundamentaldetail() throws Exception {
        // Initialize the database
        fundamentaldetailRepository.saveAndFlush(fundamentaldetail);

        // Get the fundamentaldetail
        restFundamentaldetailMockMvc.perform(get("/api/fundamentaldetails/{id}", fundamentaldetail.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fundamentaldetail.getId().intValue()))
            .andExpect(jsonPath("$.concept").value(DEFAULT_CONCEPT.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFundamentaldetail() throws Exception {
        // Get the fundamentaldetail
        restFundamentaldetailMockMvc.perform(get("/api/fundamentaldetails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFundamentaldetail() throws Exception {
        // Initialize the database
        fundamentaldetailRepository.saveAndFlush(fundamentaldetail);

        int databaseSizeBeforeUpdate = fundamentaldetailRepository.findAll().size();

        // Update the fundamentaldetail
        Fundamentaldetail updatedFundamentaldetail = fundamentaldetailRepository.findById(fundamentaldetail.getId()).get();
        // Disconnect from session so that the updates on updatedFundamentaldetail are not directly saved in db
        em.detach(updatedFundamentaldetail);
        updatedFundamentaldetail
            .concept(UPDATED_CONCEPT)
            .details(UPDATED_DETAILS);
        FundamentaldetailDTO fundamentaldetailDTO = fundamentaldetailMapper.toDto(updatedFundamentaldetail);

        restFundamentaldetailMockMvc.perform(put("/api/fundamentaldetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fundamentaldetailDTO)))
            .andExpect(status().isOk());

        // Validate the Fundamentaldetail in the database
        List<Fundamentaldetail> fundamentaldetailList = fundamentaldetailRepository.findAll();
        assertThat(fundamentaldetailList).hasSize(databaseSizeBeforeUpdate);
        Fundamentaldetail testFundamentaldetail = fundamentaldetailList.get(fundamentaldetailList.size() - 1);
        assertThat(testFundamentaldetail.getConcept()).isEqualTo(UPDATED_CONCEPT);
        assertThat(testFundamentaldetail.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingFundamentaldetail() throws Exception {
        int databaseSizeBeforeUpdate = fundamentaldetailRepository.findAll().size();

        // Create the Fundamentaldetail
        FundamentaldetailDTO fundamentaldetailDTO = fundamentaldetailMapper.toDto(fundamentaldetail);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFundamentaldetailMockMvc.perform(put("/api/fundamentaldetails")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fundamentaldetailDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Fundamentaldetail in the database
        List<Fundamentaldetail> fundamentaldetailList = fundamentaldetailRepository.findAll();
        assertThat(fundamentaldetailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFundamentaldetail() throws Exception {
        // Initialize the database
        fundamentaldetailRepository.saveAndFlush(fundamentaldetail);

        int databaseSizeBeforeDelete = fundamentaldetailRepository.findAll().size();

        // Delete the fundamentaldetail
        restFundamentaldetailMockMvc.perform(delete("/api/fundamentaldetails/{id}", fundamentaldetail.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fundamentaldetail> fundamentaldetailList = fundamentaldetailRepository.findAll();
        assertThat(fundamentaldetailList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fundamentaldetail.class);
        Fundamentaldetail fundamentaldetail1 = new Fundamentaldetail();
        fundamentaldetail1.setId(1L);
        Fundamentaldetail fundamentaldetail2 = new Fundamentaldetail();
        fundamentaldetail2.setId(fundamentaldetail1.getId());
        assertThat(fundamentaldetail1).isEqualTo(fundamentaldetail2);
        fundamentaldetail2.setId(2L);
        assertThat(fundamentaldetail1).isNotEqualTo(fundamentaldetail2);
        fundamentaldetail1.setId(null);
        assertThat(fundamentaldetail1).isNotEqualTo(fundamentaldetail2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FundamentaldetailDTO.class);
        FundamentaldetailDTO fundamentaldetailDTO1 = new FundamentaldetailDTO();
        fundamentaldetailDTO1.setId(1L);
        FundamentaldetailDTO fundamentaldetailDTO2 = new FundamentaldetailDTO();
        assertThat(fundamentaldetailDTO1).isNotEqualTo(fundamentaldetailDTO2);
        fundamentaldetailDTO2.setId(fundamentaldetailDTO1.getId());
        assertThat(fundamentaldetailDTO1).isEqualTo(fundamentaldetailDTO2);
        fundamentaldetailDTO2.setId(2L);
        assertThat(fundamentaldetailDTO1).isNotEqualTo(fundamentaldetailDTO2);
        fundamentaldetailDTO1.setId(null);
        assertThat(fundamentaldetailDTO1).isNotEqualTo(fundamentaldetailDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(fundamentaldetailMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(fundamentaldetailMapper.fromId(null)).isNull();
    }
}
