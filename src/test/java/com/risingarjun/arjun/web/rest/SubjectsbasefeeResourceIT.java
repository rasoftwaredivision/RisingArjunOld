package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Subjectsbasefee;
import com.risingarjun.arjun.repository.SubjectsbasefeeRepository;
import com.risingarjun.arjun.service.SubjectsbasefeeService;
import com.risingarjun.arjun.service.dto.SubjectsbasefeeDTO;
import com.risingarjun.arjun.service.mapper.SubjectsbasefeeMapper;
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
 * Integration tests for the {@Link SubjectsbasefeeResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class SubjectsbasefeeResourceIT {

    private static final Integer DEFAULT_BASE_FEE = 1;
    private static final Integer UPDATED_BASE_FEE = 2;

    @Autowired
    private SubjectsbasefeeRepository subjectsbasefeeRepository;

    @Autowired
    private SubjectsbasefeeMapper subjectsbasefeeMapper;

    @Autowired
    private SubjectsbasefeeService subjectsbasefeeService;

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

    private MockMvc restSubjectsbasefeeMockMvc;

    private Subjectsbasefee subjectsbasefee;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubjectsbasefeeResource subjectsbasefeeResource = new SubjectsbasefeeResource(subjectsbasefeeService);
        this.restSubjectsbasefeeMockMvc = MockMvcBuilders.standaloneSetup(subjectsbasefeeResource)
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
    public static Subjectsbasefee createEntity(EntityManager em) {
        Subjectsbasefee subjectsbasefee = new Subjectsbasefee()
            .baseFee(DEFAULT_BASE_FEE);
        return subjectsbasefee;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Subjectsbasefee createUpdatedEntity(EntityManager em) {
        Subjectsbasefee subjectsbasefee = new Subjectsbasefee()
            .baseFee(UPDATED_BASE_FEE);
        return subjectsbasefee;
    }

    @BeforeEach
    public void initTest() {
        subjectsbasefee = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubjectsbasefee() throws Exception {
        int databaseSizeBeforeCreate = subjectsbasefeeRepository.findAll().size();

        // Create the Subjectsbasefee
        SubjectsbasefeeDTO subjectsbasefeeDTO = subjectsbasefeeMapper.toDto(subjectsbasefee);
        restSubjectsbasefeeMockMvc.perform(post("/api/subjectsbasefees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectsbasefeeDTO)))
            .andExpect(status().isCreated());

        // Validate the Subjectsbasefee in the database
        List<Subjectsbasefee> subjectsbasefeeList = subjectsbasefeeRepository.findAll();
        assertThat(subjectsbasefeeList).hasSize(databaseSizeBeforeCreate + 1);
        Subjectsbasefee testSubjectsbasefee = subjectsbasefeeList.get(subjectsbasefeeList.size() - 1);
        assertThat(testSubjectsbasefee.getBaseFee()).isEqualTo(DEFAULT_BASE_FEE);
    }

    @Test
    @Transactional
    public void createSubjectsbasefeeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subjectsbasefeeRepository.findAll().size();

        // Create the Subjectsbasefee with an existing ID
        subjectsbasefee.setId(1L);
        SubjectsbasefeeDTO subjectsbasefeeDTO = subjectsbasefeeMapper.toDto(subjectsbasefee);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubjectsbasefeeMockMvc.perform(post("/api/subjectsbasefees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectsbasefeeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subjectsbasefee in the database
        List<Subjectsbasefee> subjectsbasefeeList = subjectsbasefeeRepository.findAll();
        assertThat(subjectsbasefeeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubjectsbasefees() throws Exception {
        // Initialize the database
        subjectsbasefeeRepository.saveAndFlush(subjectsbasefee);

        // Get all the subjectsbasefeeList
        restSubjectsbasefeeMockMvc.perform(get("/api/subjectsbasefees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subjectsbasefee.getId().intValue())))
            .andExpect(jsonPath("$.[*].baseFee").value(hasItem(DEFAULT_BASE_FEE)));
    }
    
    @Test
    @Transactional
    public void getSubjectsbasefee() throws Exception {
        // Initialize the database
        subjectsbasefeeRepository.saveAndFlush(subjectsbasefee);

        // Get the subjectsbasefee
        restSubjectsbasefeeMockMvc.perform(get("/api/subjectsbasefees/{id}", subjectsbasefee.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subjectsbasefee.getId().intValue()))
            .andExpect(jsonPath("$.baseFee").value(DEFAULT_BASE_FEE));
    }

    @Test
    @Transactional
    public void getNonExistingSubjectsbasefee() throws Exception {
        // Get the subjectsbasefee
        restSubjectsbasefeeMockMvc.perform(get("/api/subjectsbasefees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubjectsbasefee() throws Exception {
        // Initialize the database
        subjectsbasefeeRepository.saveAndFlush(subjectsbasefee);

        int databaseSizeBeforeUpdate = subjectsbasefeeRepository.findAll().size();

        // Update the subjectsbasefee
        Subjectsbasefee updatedSubjectsbasefee = subjectsbasefeeRepository.findById(subjectsbasefee.getId()).get();
        // Disconnect from session so that the updates on updatedSubjectsbasefee are not directly saved in db
        em.detach(updatedSubjectsbasefee);
        updatedSubjectsbasefee
            .baseFee(UPDATED_BASE_FEE);
        SubjectsbasefeeDTO subjectsbasefeeDTO = subjectsbasefeeMapper.toDto(updatedSubjectsbasefee);

        restSubjectsbasefeeMockMvc.perform(put("/api/subjectsbasefees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectsbasefeeDTO)))
            .andExpect(status().isOk());

        // Validate the Subjectsbasefee in the database
        List<Subjectsbasefee> subjectsbasefeeList = subjectsbasefeeRepository.findAll();
        assertThat(subjectsbasefeeList).hasSize(databaseSizeBeforeUpdate);
        Subjectsbasefee testSubjectsbasefee = subjectsbasefeeList.get(subjectsbasefeeList.size() - 1);
        assertThat(testSubjectsbasefee.getBaseFee()).isEqualTo(UPDATED_BASE_FEE);
    }

    @Test
    @Transactional
    public void updateNonExistingSubjectsbasefee() throws Exception {
        int databaseSizeBeforeUpdate = subjectsbasefeeRepository.findAll().size();

        // Create the Subjectsbasefee
        SubjectsbasefeeDTO subjectsbasefeeDTO = subjectsbasefeeMapper.toDto(subjectsbasefee);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubjectsbasefeeMockMvc.perform(put("/api/subjectsbasefees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subjectsbasefeeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subjectsbasefee in the database
        List<Subjectsbasefee> subjectsbasefeeList = subjectsbasefeeRepository.findAll();
        assertThat(subjectsbasefeeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubjectsbasefee() throws Exception {
        // Initialize the database
        subjectsbasefeeRepository.saveAndFlush(subjectsbasefee);

        int databaseSizeBeforeDelete = subjectsbasefeeRepository.findAll().size();

        // Delete the subjectsbasefee
        restSubjectsbasefeeMockMvc.perform(delete("/api/subjectsbasefees/{id}", subjectsbasefee.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Subjectsbasefee> subjectsbasefeeList = subjectsbasefeeRepository.findAll();
        assertThat(subjectsbasefeeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subjectsbasefee.class);
        Subjectsbasefee subjectsbasefee1 = new Subjectsbasefee();
        subjectsbasefee1.setId(1L);
        Subjectsbasefee subjectsbasefee2 = new Subjectsbasefee();
        subjectsbasefee2.setId(subjectsbasefee1.getId());
        assertThat(subjectsbasefee1).isEqualTo(subjectsbasefee2);
        subjectsbasefee2.setId(2L);
        assertThat(subjectsbasefee1).isNotEqualTo(subjectsbasefee2);
        subjectsbasefee1.setId(null);
        assertThat(subjectsbasefee1).isNotEqualTo(subjectsbasefee2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubjectsbasefeeDTO.class);
        SubjectsbasefeeDTO subjectsbasefeeDTO1 = new SubjectsbasefeeDTO();
        subjectsbasefeeDTO1.setId(1L);
        SubjectsbasefeeDTO subjectsbasefeeDTO2 = new SubjectsbasefeeDTO();
        assertThat(subjectsbasefeeDTO1).isNotEqualTo(subjectsbasefeeDTO2);
        subjectsbasefeeDTO2.setId(subjectsbasefeeDTO1.getId());
        assertThat(subjectsbasefeeDTO1).isEqualTo(subjectsbasefeeDTO2);
        subjectsbasefeeDTO2.setId(2L);
        assertThat(subjectsbasefeeDTO1).isNotEqualTo(subjectsbasefeeDTO2);
        subjectsbasefeeDTO1.setId(null);
        assertThat(subjectsbasefeeDTO1).isNotEqualTo(subjectsbasefeeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subjectsbasefeeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subjectsbasefeeMapper.fromId(null)).isNull();
    }
}
