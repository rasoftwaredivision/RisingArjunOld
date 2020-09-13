package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Salarypayment;
import com.risingarjun.arjun.repository.SalarypaymentRepository;
import com.risingarjun.arjun.service.SalarypaymentService;
import com.risingarjun.arjun.service.dto.SalarypaymentDTO;
import com.risingarjun.arjun.service.mapper.SalarypaymentMapper;
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

import com.risingarjun.arjun.domain.enumeration.Month;
import com.risingarjun.arjun.domain.enumeration.Mode;
/**
 * Integration tests for the {@Link SalarypaymentResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class SalarypaymentResourceIT {

    private static final Integer DEFAULT_SALARY = 0;
    private static final Integer UPDATED_SALARY = 1;

    private static final Month DEFAULT_MONTH = Month.JAN;
    private static final Month UPDATED_MONTH = Month.FEB;

    private static final Integer DEFAULT_PAID = 0;
    private static final Integer UPDATED_PAID = 1;

    private static final Integer DEFAULT_UNPAID = 0;
    private static final Integer UPDATED_UNPAID = 1;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TRANSACTION_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_ID = "BBBBBBBBBB";

    private static final Mode DEFAULT_PAYMENT_MODE = Mode.NEFT;
    private static final Mode UPDATED_PAYMENT_MODE = Mode.UPI;

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private SalarypaymentRepository salarypaymentRepository;

    @Autowired
    private SalarypaymentMapper salarypaymentMapper;

    @Autowired
    private SalarypaymentService salarypaymentService;

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

    private MockMvc restSalarypaymentMockMvc;

    private Salarypayment salarypayment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SalarypaymentResource salarypaymentResource = new SalarypaymentResource(salarypaymentService);
        this.restSalarypaymentMockMvc = MockMvcBuilders.standaloneSetup(salarypaymentResource)
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
    public static Salarypayment createEntity(EntityManager em) {
        Salarypayment salarypayment = new Salarypayment()
            .salary(DEFAULT_SALARY)
            .month(DEFAULT_MONTH)
            .paid(DEFAULT_PAID)
            .unpaid(DEFAULT_UNPAID)
            .date(DEFAULT_DATE)
            .transactionId(DEFAULT_TRANSACTION_ID)
            .paymentMode(DEFAULT_PAYMENT_MODE)
            .remarks(DEFAULT_REMARKS);
        return salarypayment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Salarypayment createUpdatedEntity(EntityManager em) {
        Salarypayment salarypayment = new Salarypayment()
            .salary(UPDATED_SALARY)
            .month(UPDATED_MONTH)
            .paid(UPDATED_PAID)
            .unpaid(UPDATED_UNPAID)
            .date(UPDATED_DATE)
            .transactionId(UPDATED_TRANSACTION_ID)
            .paymentMode(UPDATED_PAYMENT_MODE)
            .remarks(UPDATED_REMARKS);
        return salarypayment;
    }

    @BeforeEach
    public void initTest() {
        salarypayment = createEntity(em);
    }

    @Test
    @Transactional
    public void createSalarypayment() throws Exception {
        int databaseSizeBeforeCreate = salarypaymentRepository.findAll().size();

        // Create the Salarypayment
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);
        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isCreated());

        // Validate the Salarypayment in the database
        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeCreate + 1);
        Salarypayment testSalarypayment = salarypaymentList.get(salarypaymentList.size() - 1);
        assertThat(testSalarypayment.getSalary()).isEqualTo(DEFAULT_SALARY);
        assertThat(testSalarypayment.getMonth()).isEqualTo(DEFAULT_MONTH);
        assertThat(testSalarypayment.getPaid()).isEqualTo(DEFAULT_PAID);
        assertThat(testSalarypayment.getUnpaid()).isEqualTo(DEFAULT_UNPAID);
        assertThat(testSalarypayment.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSalarypayment.getTransactionId()).isEqualTo(DEFAULT_TRANSACTION_ID);
        assertThat(testSalarypayment.getPaymentMode()).isEqualTo(DEFAULT_PAYMENT_MODE);
        assertThat(testSalarypayment.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createSalarypaymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = salarypaymentRepository.findAll().size();

        // Create the Salarypayment with an existing ID
        salarypayment.setId(1L);
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Salarypayment in the database
        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkSalaryIsRequired() throws Exception {
        int databaseSizeBeforeTest = salarypaymentRepository.findAll().size();
        // set the field null
        salarypayment.setSalary(null);

        // Create the Salarypayment, which fails.
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMonthIsRequired() throws Exception {
        int databaseSizeBeforeTest = salarypaymentRepository.findAll().size();
        // set the field null
        salarypayment.setMonth(null);

        // Create the Salarypayment, which fails.
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaidIsRequired() throws Exception {
        int databaseSizeBeforeTest = salarypaymentRepository.findAll().size();
        // set the field null
        salarypayment.setPaid(null);

        // Create the Salarypayment, which fails.
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUnpaidIsRequired() throws Exception {
        int databaseSizeBeforeTest = salarypaymentRepository.findAll().size();
        // set the field null
        salarypayment.setUnpaid(null);

        // Create the Salarypayment, which fails.
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = salarypaymentRepository.findAll().size();
        // set the field null
        salarypayment.setDate(null);

        // Create the Salarypayment, which fails.
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = salarypaymentRepository.findAll().size();
        // set the field null
        salarypayment.setTransactionId(null);

        // Create the Salarypayment, which fails.
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPaymentModeIsRequired() throws Exception {
        int databaseSizeBeforeTest = salarypaymentRepository.findAll().size();
        // set the field null
        salarypayment.setPaymentMode(null);

        // Create the Salarypayment, which fails.
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        restSalarypaymentMockMvc.perform(post("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSalarypayments() throws Exception {
        // Initialize the database
        salarypaymentRepository.saveAndFlush(salarypayment);

        // Get all the salarypaymentList
        restSalarypaymentMockMvc.perform(get("/api/salarypayments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(salarypayment.getId().intValue())))
            .andExpect(jsonPath("$.[*].salary").value(hasItem(DEFAULT_SALARY)))
            .andExpect(jsonPath("$.[*].month").value(hasItem(DEFAULT_MONTH.toString())))
            .andExpect(jsonPath("$.[*].paid").value(hasItem(DEFAULT_PAID)))
            .andExpect(jsonPath("$.[*].unpaid").value(hasItem(DEFAULT_UNPAID)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID.toString())))
            .andExpect(jsonPath("$.[*].paymentMode").value(hasItem(DEFAULT_PAYMENT_MODE.toString())))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    
    @Test
    @Transactional
    public void getSalarypayment() throws Exception {
        // Initialize the database
        salarypaymentRepository.saveAndFlush(salarypayment);

        // Get the salarypayment
        restSalarypaymentMockMvc.perform(get("/api/salarypayments/{id}", salarypayment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(salarypayment.getId().intValue()))
            .andExpect(jsonPath("$.salary").value(DEFAULT_SALARY))
            .andExpect(jsonPath("$.month").value(DEFAULT_MONTH.toString()))
            .andExpect(jsonPath("$.paid").value(DEFAULT_PAID))
            .andExpect(jsonPath("$.unpaid").value(DEFAULT_UNPAID))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.transactionId").value(DEFAULT_TRANSACTION_ID.toString()))
            .andExpect(jsonPath("$.paymentMode").value(DEFAULT_PAYMENT_MODE.toString()))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSalarypayment() throws Exception {
        // Get the salarypayment
        restSalarypaymentMockMvc.perform(get("/api/salarypayments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSalarypayment() throws Exception {
        // Initialize the database
        salarypaymentRepository.saveAndFlush(salarypayment);

        int databaseSizeBeforeUpdate = salarypaymentRepository.findAll().size();

        // Update the salarypayment
        Salarypayment updatedSalarypayment = salarypaymentRepository.findById(salarypayment.getId()).get();
        // Disconnect from session so that the updates on updatedSalarypayment are not directly saved in db
        em.detach(updatedSalarypayment);
        updatedSalarypayment
            .salary(UPDATED_SALARY)
            .month(UPDATED_MONTH)
            .paid(UPDATED_PAID)
            .unpaid(UPDATED_UNPAID)
            .date(UPDATED_DATE)
            .transactionId(UPDATED_TRANSACTION_ID)
            .paymentMode(UPDATED_PAYMENT_MODE)
            .remarks(UPDATED_REMARKS);
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(updatedSalarypayment);

        restSalarypaymentMockMvc.perform(put("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isOk());

        // Validate the Salarypayment in the database
        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeUpdate);
        Salarypayment testSalarypayment = salarypaymentList.get(salarypaymentList.size() - 1);
        assertThat(testSalarypayment.getSalary()).isEqualTo(UPDATED_SALARY);
        assertThat(testSalarypayment.getMonth()).isEqualTo(UPDATED_MONTH);
        assertThat(testSalarypayment.getPaid()).isEqualTo(UPDATED_PAID);
        assertThat(testSalarypayment.getUnpaid()).isEqualTo(UPDATED_UNPAID);
        assertThat(testSalarypayment.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSalarypayment.getTransactionId()).isEqualTo(UPDATED_TRANSACTION_ID);
        assertThat(testSalarypayment.getPaymentMode()).isEqualTo(UPDATED_PAYMENT_MODE);
        assertThat(testSalarypayment.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingSalarypayment() throws Exception {
        int databaseSizeBeforeUpdate = salarypaymentRepository.findAll().size();

        // Create the Salarypayment
        SalarypaymentDTO salarypaymentDTO = salarypaymentMapper.toDto(salarypayment);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSalarypaymentMockMvc.perform(put("/api/salarypayments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(salarypaymentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Salarypayment in the database
        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSalarypayment() throws Exception {
        // Initialize the database
        salarypaymentRepository.saveAndFlush(salarypayment);

        int databaseSizeBeforeDelete = salarypaymentRepository.findAll().size();

        // Delete the salarypayment
        restSalarypaymentMockMvc.perform(delete("/api/salarypayments/{id}", salarypayment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Salarypayment> salarypaymentList = salarypaymentRepository.findAll();
        assertThat(salarypaymentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Salarypayment.class);
        Salarypayment salarypayment1 = new Salarypayment();
        salarypayment1.setId(1L);
        Salarypayment salarypayment2 = new Salarypayment();
        salarypayment2.setId(salarypayment1.getId());
        assertThat(salarypayment1).isEqualTo(salarypayment2);
        salarypayment2.setId(2L);
        assertThat(salarypayment1).isNotEqualTo(salarypayment2);
        salarypayment1.setId(null);
        assertThat(salarypayment1).isNotEqualTo(salarypayment2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SalarypaymentDTO.class);
        SalarypaymentDTO salarypaymentDTO1 = new SalarypaymentDTO();
        salarypaymentDTO1.setId(1L);
        SalarypaymentDTO salarypaymentDTO2 = new SalarypaymentDTO();
        assertThat(salarypaymentDTO1).isNotEqualTo(salarypaymentDTO2);
        salarypaymentDTO2.setId(salarypaymentDTO1.getId());
        assertThat(salarypaymentDTO1).isEqualTo(salarypaymentDTO2);
        salarypaymentDTO2.setId(2L);
        assertThat(salarypaymentDTO1).isNotEqualTo(salarypaymentDTO2);
        salarypaymentDTO1.setId(null);
        assertThat(salarypaymentDTO1).isNotEqualTo(salarypaymentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(salarypaymentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(salarypaymentMapper.fromId(null)).isNull();
    }
}
