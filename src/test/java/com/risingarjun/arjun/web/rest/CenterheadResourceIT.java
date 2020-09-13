package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Centerhead;
import com.risingarjun.arjun.repository.CenterheadRepository;
import com.risingarjun.arjun.service.CenterheadService;
import com.risingarjun.arjun.service.dto.CenterheadDTO;
import com.risingarjun.arjun.service.mapper.CenterheadMapper;
import com.risingarjun.arjun.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CenterheadResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class CenterheadResourceIT {

    @Autowired
    private CenterheadRepository centerheadRepository;

    @Mock
    private CenterheadRepository centerheadRepositoryMock;

    @Autowired
    private CenterheadMapper centerheadMapper;

    @Mock
    private CenterheadService centerheadServiceMock;

    @Autowired
    private CenterheadService centerheadService;

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

    private MockMvc restCenterheadMockMvc;

    private Centerhead centerhead;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CenterheadResource centerheadResource = new CenterheadResource(centerheadService);
        this.restCenterheadMockMvc = MockMvcBuilders.standaloneSetup(centerheadResource)
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
    public static Centerhead createEntity(EntityManager em) {
        Centerhead centerhead = new Centerhead();
        return centerhead;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Centerhead createUpdatedEntity(EntityManager em) {
        Centerhead centerhead = new Centerhead();
        return centerhead;
    }

    @BeforeEach
    public void initTest() {
        centerhead = createEntity(em);
    }

    @Test
    @Transactional
    public void createCenterhead() throws Exception {
        int databaseSizeBeforeCreate = centerheadRepository.findAll().size();

        // Create the Centerhead
        CenterheadDTO centerheadDTO = centerheadMapper.toDto(centerhead);
        restCenterheadMockMvc.perform(post("/api/centerheads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerheadDTO)))
            .andExpect(status().isCreated());

        // Validate the Centerhead in the database
        List<Centerhead> centerheadList = centerheadRepository.findAll();
        assertThat(centerheadList).hasSize(databaseSizeBeforeCreate + 1);
        Centerhead testCenterhead = centerheadList.get(centerheadList.size() - 1);
    }

    @Test
    @Transactional
    public void createCenterheadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = centerheadRepository.findAll().size();

        // Create the Centerhead with an existing ID
        centerhead.setId(1L);
        CenterheadDTO centerheadDTO = centerheadMapper.toDto(centerhead);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCenterheadMockMvc.perform(post("/api/centerheads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerheadDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Centerhead in the database
        List<Centerhead> centerheadList = centerheadRepository.findAll();
        assertThat(centerheadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCenterheads() throws Exception {
        // Initialize the database
        centerheadRepository.saveAndFlush(centerhead);

        // Get all the centerheadList
        restCenterheadMockMvc.perform(get("/api/centerheads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(centerhead.getId().intValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCenterheadsWithEagerRelationshipsIsEnabled() throws Exception {
        CenterheadResource centerheadResource = new CenterheadResource(centerheadServiceMock);
        when(centerheadServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restCenterheadMockMvc = MockMvcBuilders.standaloneSetup(centerheadResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCenterheadMockMvc.perform(get("/api/centerheads?eagerload=true"))
        .andExpect(status().isOk());

        verify(centerheadServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCenterheadsWithEagerRelationshipsIsNotEnabled() throws Exception {
        CenterheadResource centerheadResource = new CenterheadResource(centerheadServiceMock);
            when(centerheadServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restCenterheadMockMvc = MockMvcBuilders.standaloneSetup(centerheadResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restCenterheadMockMvc.perform(get("/api/centerheads?eagerload=true"))
        .andExpect(status().isOk());

            verify(centerheadServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCenterhead() throws Exception {
        // Initialize the database
        centerheadRepository.saveAndFlush(centerhead);

        // Get the centerhead
        restCenterheadMockMvc.perform(get("/api/centerheads/{id}", centerhead.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(centerhead.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCenterhead() throws Exception {
        // Get the centerhead
        restCenterheadMockMvc.perform(get("/api/centerheads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCenterhead() throws Exception {
        // Initialize the database
        centerheadRepository.saveAndFlush(centerhead);

        int databaseSizeBeforeUpdate = centerheadRepository.findAll().size();

        // Update the centerhead
        Centerhead updatedCenterhead = centerheadRepository.findById(centerhead.getId()).get();
        // Disconnect from session so that the updates on updatedCenterhead are not directly saved in db
        em.detach(updatedCenterhead);
        CenterheadDTO centerheadDTO = centerheadMapper.toDto(updatedCenterhead);

        restCenterheadMockMvc.perform(put("/api/centerheads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerheadDTO)))
            .andExpect(status().isOk());

        // Validate the Centerhead in the database
        List<Centerhead> centerheadList = centerheadRepository.findAll();
        assertThat(centerheadList).hasSize(databaseSizeBeforeUpdate);
        Centerhead testCenterhead = centerheadList.get(centerheadList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCenterhead() throws Exception {
        int databaseSizeBeforeUpdate = centerheadRepository.findAll().size();

        // Create the Centerhead
        CenterheadDTO centerheadDTO = centerheadMapper.toDto(centerhead);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCenterheadMockMvc.perform(put("/api/centerheads")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(centerheadDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Centerhead in the database
        List<Centerhead> centerheadList = centerheadRepository.findAll();
        assertThat(centerheadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCenterhead() throws Exception {
        // Initialize the database
        centerheadRepository.saveAndFlush(centerhead);

        int databaseSizeBeforeDelete = centerheadRepository.findAll().size();

        // Delete the centerhead
        restCenterheadMockMvc.perform(delete("/api/centerheads/{id}", centerhead.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Centerhead> centerheadList = centerheadRepository.findAll();
        assertThat(centerheadList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Centerhead.class);
        Centerhead centerhead1 = new Centerhead();
        centerhead1.setId(1L);
        Centerhead centerhead2 = new Centerhead();
        centerhead2.setId(centerhead1.getId());
        assertThat(centerhead1).isEqualTo(centerhead2);
        centerhead2.setId(2L);
        assertThat(centerhead1).isNotEqualTo(centerhead2);
        centerhead1.setId(null);
        assertThat(centerhead1).isNotEqualTo(centerhead2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CenterheadDTO.class);
        CenterheadDTO centerheadDTO1 = new CenterheadDTO();
        centerheadDTO1.setId(1L);
        CenterheadDTO centerheadDTO2 = new CenterheadDTO();
        assertThat(centerheadDTO1).isNotEqualTo(centerheadDTO2);
        centerheadDTO2.setId(centerheadDTO1.getId());
        assertThat(centerheadDTO1).isEqualTo(centerheadDTO2);
        centerheadDTO2.setId(2L);
        assertThat(centerheadDTO1).isNotEqualTo(centerheadDTO2);
        centerheadDTO1.setId(null);
        assertThat(centerheadDTO1).isNotEqualTo(centerheadDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(centerheadMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(centerheadMapper.fromId(null)).isNull();
    }
}
