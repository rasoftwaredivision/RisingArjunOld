package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Roleaccess;
import com.risingarjun.arjun.repository.RoleaccessRepository;
import com.risingarjun.arjun.service.RoleaccessService;
import com.risingarjun.arjun.service.dto.RoleaccessDTO;
import com.risingarjun.arjun.service.mapper.RoleaccessMapper;
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
 * Integration tests for the {@Link RoleaccessResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class RoleaccessResourceIT {

    private static final Boolean DEFAULT_CREATE = false;
    private static final Boolean UPDATED_CREATE = true;

    private static final Boolean DEFAULT_READ = false;
    private static final Boolean UPDATED_READ = true;

    private static final Boolean DEFAULT_UPDATE = false;
    private static final Boolean UPDATED_UPDATE = true;

    private static final Boolean DEFAULT_DEL = false;
    private static final Boolean UPDATED_DEL = true;

    @Autowired
    private RoleaccessRepository roleaccessRepository;

    @Autowired
    private RoleaccessMapper roleaccessMapper;

    @Autowired
    private RoleaccessService roleaccessService;

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

    private MockMvc restRoleaccessMockMvc;

    private Roleaccess roleaccess;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RoleaccessResource roleaccessResource = new RoleaccessResource(roleaccessService);
        this.restRoleaccessMockMvc = MockMvcBuilders.standaloneSetup(roleaccessResource)
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
    public static Roleaccess createEntity(EntityManager em) {
        Roleaccess roleaccess = new Roleaccess()
            .create(DEFAULT_CREATE)
            .read(DEFAULT_READ)
            .update(DEFAULT_UPDATE)
            .del(DEFAULT_DEL);
        return roleaccess;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Roleaccess createUpdatedEntity(EntityManager em) {
        Roleaccess roleaccess = new Roleaccess()
            .create(UPDATED_CREATE)
            .read(UPDATED_READ)
            .update(UPDATED_UPDATE)
            .del(UPDATED_DEL);
        return roleaccess;
    }

    @BeforeEach
    public void initTest() {
        roleaccess = createEntity(em);
    }

    @Test
    @Transactional
    public void createRoleaccess() throws Exception {
        int databaseSizeBeforeCreate = roleaccessRepository.findAll().size();

        // Create the Roleaccess
        RoleaccessDTO roleaccessDTO = roleaccessMapper.toDto(roleaccess);
        restRoleaccessMockMvc.perform(post("/api/roleaccesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roleaccessDTO)))
            .andExpect(status().isCreated());

        // Validate the Roleaccess in the database
        List<Roleaccess> roleaccessList = roleaccessRepository.findAll();
        assertThat(roleaccessList).hasSize(databaseSizeBeforeCreate + 1);
        Roleaccess testRoleaccess = roleaccessList.get(roleaccessList.size() - 1);
        assertThat(testRoleaccess.isCreate()).isEqualTo(DEFAULT_CREATE);
        assertThat(testRoleaccess.isRead()).isEqualTo(DEFAULT_READ);
        assertThat(testRoleaccess.isUpdate()).isEqualTo(DEFAULT_UPDATE);
        assertThat(testRoleaccess.isDel()).isEqualTo(DEFAULT_DEL);
    }

    @Test
    @Transactional
    public void createRoleaccessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = roleaccessRepository.findAll().size();

        // Create the Roleaccess with an existing ID
        roleaccess.setId(1L);
        RoleaccessDTO roleaccessDTO = roleaccessMapper.toDto(roleaccess);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRoleaccessMockMvc.perform(post("/api/roleaccesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roleaccessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Roleaccess in the database
        List<Roleaccess> roleaccessList = roleaccessRepository.findAll();
        assertThat(roleaccessList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRoleaccesses() throws Exception {
        // Initialize the database
        roleaccessRepository.saveAndFlush(roleaccess);

        // Get all the roleaccessList
        restRoleaccessMockMvc.perform(get("/api/roleaccesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(roleaccess.getId().intValue())))
            .andExpect(jsonPath("$.[*].create").value(hasItem(DEFAULT_CREATE.booleanValue())))
            .andExpect(jsonPath("$.[*].read").value(hasItem(DEFAULT_READ.booleanValue())))
            .andExpect(jsonPath("$.[*].update").value(hasItem(DEFAULT_UPDATE.booleanValue())))
            .andExpect(jsonPath("$.[*].del").value(hasItem(DEFAULT_DEL.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getRoleaccess() throws Exception {
        // Initialize the database
        roleaccessRepository.saveAndFlush(roleaccess);

        // Get the roleaccess
        restRoleaccessMockMvc.perform(get("/api/roleaccesses/{id}", roleaccess.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(roleaccess.getId().intValue()))
            .andExpect(jsonPath("$.create").value(DEFAULT_CREATE.booleanValue()))
            .andExpect(jsonPath("$.read").value(DEFAULT_READ.booleanValue()))
            .andExpect(jsonPath("$.update").value(DEFAULT_UPDATE.booleanValue()))
            .andExpect(jsonPath("$.del").value(DEFAULT_DEL.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRoleaccess() throws Exception {
        // Get the roleaccess
        restRoleaccessMockMvc.perform(get("/api/roleaccesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRoleaccess() throws Exception {
        // Initialize the database
        roleaccessRepository.saveAndFlush(roleaccess);

        int databaseSizeBeforeUpdate = roleaccessRepository.findAll().size();

        // Update the roleaccess
        Roleaccess updatedRoleaccess = roleaccessRepository.findById(roleaccess.getId()).get();
        // Disconnect from session so that the updates on updatedRoleaccess are not directly saved in db
        em.detach(updatedRoleaccess);
        updatedRoleaccess
            .create(UPDATED_CREATE)
            .read(UPDATED_READ)
            .update(UPDATED_UPDATE)
            .del(UPDATED_DEL);
        RoleaccessDTO roleaccessDTO = roleaccessMapper.toDto(updatedRoleaccess);

        restRoleaccessMockMvc.perform(put("/api/roleaccesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roleaccessDTO)))
            .andExpect(status().isOk());

        // Validate the Roleaccess in the database
        List<Roleaccess> roleaccessList = roleaccessRepository.findAll();
        assertThat(roleaccessList).hasSize(databaseSizeBeforeUpdate);
        Roleaccess testRoleaccess = roleaccessList.get(roleaccessList.size() - 1);
        assertThat(testRoleaccess.isCreate()).isEqualTo(UPDATED_CREATE);
        assertThat(testRoleaccess.isRead()).isEqualTo(UPDATED_READ);
        assertThat(testRoleaccess.isUpdate()).isEqualTo(UPDATED_UPDATE);
        assertThat(testRoleaccess.isDel()).isEqualTo(UPDATED_DEL);
    }

    @Test
    @Transactional
    public void updateNonExistingRoleaccess() throws Exception {
        int databaseSizeBeforeUpdate = roleaccessRepository.findAll().size();

        // Create the Roleaccess
        RoleaccessDTO roleaccessDTO = roleaccessMapper.toDto(roleaccess);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRoleaccessMockMvc.perform(put("/api/roleaccesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(roleaccessDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Roleaccess in the database
        List<Roleaccess> roleaccessList = roleaccessRepository.findAll();
        assertThat(roleaccessList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRoleaccess() throws Exception {
        // Initialize the database
        roleaccessRepository.saveAndFlush(roleaccess);

        int databaseSizeBeforeDelete = roleaccessRepository.findAll().size();

        // Delete the roleaccess
        restRoleaccessMockMvc.perform(delete("/api/roleaccesses/{id}", roleaccess.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Roleaccess> roleaccessList = roleaccessRepository.findAll();
        assertThat(roleaccessList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Roleaccess.class);
        Roleaccess roleaccess1 = new Roleaccess();
        roleaccess1.setId(1L);
        Roleaccess roleaccess2 = new Roleaccess();
        roleaccess2.setId(roleaccess1.getId());
        assertThat(roleaccess1).isEqualTo(roleaccess2);
        roleaccess2.setId(2L);
        assertThat(roleaccess1).isNotEqualTo(roleaccess2);
        roleaccess1.setId(null);
        assertThat(roleaccess1).isNotEqualTo(roleaccess2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RoleaccessDTO.class);
        RoleaccessDTO roleaccessDTO1 = new RoleaccessDTO();
        roleaccessDTO1.setId(1L);
        RoleaccessDTO roleaccessDTO2 = new RoleaccessDTO();
        assertThat(roleaccessDTO1).isNotEqualTo(roleaccessDTO2);
        roleaccessDTO2.setId(roleaccessDTO1.getId());
        assertThat(roleaccessDTO1).isEqualTo(roleaccessDTO2);
        roleaccessDTO2.setId(2L);
        assertThat(roleaccessDTO1).isNotEqualTo(roleaccessDTO2);
        roleaccessDTO1.setId(null);
        assertThat(roleaccessDTO1).isNotEqualTo(roleaccessDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(roleaccessMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(roleaccessMapper.fromId(null)).isNull();
    }
}
