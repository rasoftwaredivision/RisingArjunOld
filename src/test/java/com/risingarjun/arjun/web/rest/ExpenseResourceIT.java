package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Expense;
import com.risingarjun.arjun.repository.ExpenseRepository;
import com.risingarjun.arjun.service.ExpenseService;
import com.risingarjun.arjun.service.dto.ExpenseDTO;
import com.risingarjun.arjun.service.mapper.ExpenseMapper;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.risingarjun.arjun.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.risingarjun.arjun.domain.enumeration.Mode;
import com.risingarjun.arjun.domain.enumeration.Expensetype;
/**
 * Integration tests for the {@Link ExpenseResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class ExpenseResourceIT {

    private static final String DEFAULT_ITEM = "AAAAAAAAAA";
    private static final String UPDATED_ITEM = "BBBBBBBBBB";

    private static final Integer DEFAULT_QUANTITY = 0;
    private static final Integer UPDATED_QUANTITY = 1;

    private static final Integer DEFAULT_RATE = 0;
    private static final Integer UPDATED_RATE = 1;

    private static final Integer DEFAULT_LABOR_COST = 0;
    private static final Integer UPDATED_LABOR_COST = 1;

    private static final Integer DEFAULT_OTHER_EXPENSE = 1;
    private static final Integer UPDATED_OTHER_EXPENSE = 2;

    private static final Integer DEFAULT_TOTAL = 1;
    private static final Integer UPDATED_TOTAL = 2;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TRANSACTION_ID = "AAAAAAAAAA";
    private static final String UPDATED_TRANSACTION_ID = "BBBBBBBBBB";

    private static final Mode DEFAULT_EXPENSE_MODE = Mode.NEFT;
    private static final Mode UPDATED_EXPENSE_MODE = Mode.UPI;

    private static final Expensetype DEFAULT_TYPE = Expensetype.FIXASSET;
    private static final Expensetype UPDATED_TYPE = Expensetype.MARKETING;

    private static final byte[] DEFAULT_BILL = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_BILL = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_BILL_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_BILL_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_REMARKS = "AAAAAAAAAA";
    private static final String UPDATED_REMARKS = "BBBBBBBBBB";

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private ExpenseMapper expenseMapper;

    @Autowired
    private ExpenseService expenseService;

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

    private MockMvc restExpenseMockMvc;

    private Expense expense;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ExpenseResource expenseResource = new ExpenseResource(expenseService);
        this.restExpenseMockMvc = MockMvcBuilders.standaloneSetup(expenseResource)
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
    public static Expense createEntity(EntityManager em) {
        Expense expense = new Expense()
            .item(DEFAULT_ITEM)
            .quantity(DEFAULT_QUANTITY)
            .rate(DEFAULT_RATE)
            .laborCost(DEFAULT_LABOR_COST)
            .otherExpense(DEFAULT_OTHER_EXPENSE)
            .total(DEFAULT_TOTAL)
            .date(DEFAULT_DATE)
            .transactionId(DEFAULT_TRANSACTION_ID)
            .expenseMode(DEFAULT_EXPENSE_MODE)
            .type(DEFAULT_TYPE)
            .bill(DEFAULT_BILL)
            .billContentType(DEFAULT_BILL_CONTENT_TYPE)
            .remarks(DEFAULT_REMARKS);
        return expense;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Expense createUpdatedEntity(EntityManager em) {
        Expense expense = new Expense()
            .item(UPDATED_ITEM)
            .quantity(UPDATED_QUANTITY)
            .rate(UPDATED_RATE)
            .laborCost(UPDATED_LABOR_COST)
            .otherExpense(UPDATED_OTHER_EXPENSE)
            .total(UPDATED_TOTAL)
            .date(UPDATED_DATE)
            .transactionId(UPDATED_TRANSACTION_ID)
            .expenseMode(UPDATED_EXPENSE_MODE)
            .type(UPDATED_TYPE)
            .bill(UPDATED_BILL)
            .billContentType(UPDATED_BILL_CONTENT_TYPE)
            .remarks(UPDATED_REMARKS);
        return expense;
    }

    @BeforeEach
    public void initTest() {
        expense = createEntity(em);
    }

    @Test
    @Transactional
    public void createExpense() throws Exception {
        int databaseSizeBeforeCreate = expenseRepository.findAll().size();

        // Create the Expense
        ExpenseDTO expenseDTO = expenseMapper.toDto(expense);
        restExpenseMockMvc.perform(post("/api/expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseDTO)))
            .andExpect(status().isCreated());

        // Validate the Expense in the database
        List<Expense> expenseList = expenseRepository.findAll();
        assertThat(expenseList).hasSize(databaseSizeBeforeCreate + 1);
        Expense testExpense = expenseList.get(expenseList.size() - 1);
        assertThat(testExpense.getItem()).isEqualTo(DEFAULT_ITEM);
        assertThat(testExpense.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testExpense.getRate()).isEqualTo(DEFAULT_RATE);
        assertThat(testExpense.getLaborCost()).isEqualTo(DEFAULT_LABOR_COST);
        assertThat(testExpense.getOtherExpense()).isEqualTo(DEFAULT_OTHER_EXPENSE);
        assertThat(testExpense.getTotal()).isEqualTo(DEFAULT_TOTAL);
        assertThat(testExpense.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testExpense.getTransactionId()).isEqualTo(DEFAULT_TRANSACTION_ID);
        assertThat(testExpense.getExpenseMode()).isEqualTo(DEFAULT_EXPENSE_MODE);
        assertThat(testExpense.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testExpense.getBill()).isEqualTo(DEFAULT_BILL);
        assertThat(testExpense.getBillContentType()).isEqualTo(DEFAULT_BILL_CONTENT_TYPE);
        assertThat(testExpense.getRemarks()).isEqualTo(DEFAULT_REMARKS);
    }

    @Test
    @Transactional
    public void createExpenseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = expenseRepository.findAll().size();

        // Create the Expense with an existing ID
        expense.setId(1L);
        ExpenseDTO expenseDTO = expenseMapper.toDto(expense);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExpenseMockMvc.perform(post("/api/expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Expense in the database
        List<Expense> expenseList = expenseRepository.findAll();
        assertThat(expenseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkItemIsRequired() throws Exception {
        int databaseSizeBeforeTest = expenseRepository.findAll().size();
        // set the field null
        expense.setItem(null);

        // Create the Expense, which fails.
        ExpenseDTO expenseDTO = expenseMapper.toDto(expense);

        restExpenseMockMvc.perform(post("/api/expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseDTO)))
            .andExpect(status().isBadRequest());

        List<Expense> expenseList = expenseRepository.findAll();
        assertThat(expenseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTotalIsRequired() throws Exception {
        int databaseSizeBeforeTest = expenseRepository.findAll().size();
        // set the field null
        expense.setTotal(null);

        // Create the Expense, which fails.
        ExpenseDTO expenseDTO = expenseMapper.toDto(expense);

        restExpenseMockMvc.perform(post("/api/expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseDTO)))
            .andExpect(status().isBadRequest());

        List<Expense> expenseList = expenseRepository.findAll();
        assertThat(expenseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTransactionIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = expenseRepository.findAll().size();
        // set the field null
        expense.setTransactionId(null);

        // Create the Expense, which fails.
        ExpenseDTO expenseDTO = expenseMapper.toDto(expense);

        restExpenseMockMvc.perform(post("/api/expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseDTO)))
            .andExpect(status().isBadRequest());

        List<Expense> expenseList = expenseRepository.findAll();
        assertThat(expenseList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExpenses() throws Exception {
        // Initialize the database
        expenseRepository.saveAndFlush(expense);

        // Get all the expenseList
        restExpenseMockMvc.perform(get("/api/expenses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(expense.getId().intValue())))
            .andExpect(jsonPath("$.[*].item").value(hasItem(DEFAULT_ITEM.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].rate").value(hasItem(DEFAULT_RATE)))
            .andExpect(jsonPath("$.[*].laborCost").value(hasItem(DEFAULT_LABOR_COST)))
            .andExpect(jsonPath("$.[*].otherExpense").value(hasItem(DEFAULT_OTHER_EXPENSE)))
            .andExpect(jsonPath("$.[*].total").value(hasItem(DEFAULT_TOTAL)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionId").value(hasItem(DEFAULT_TRANSACTION_ID.toString())))
            .andExpect(jsonPath("$.[*].expenseMode").value(hasItem(DEFAULT_EXPENSE_MODE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].billContentType").value(hasItem(DEFAULT_BILL_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].bill").value(hasItem(Base64Utils.encodeToString(DEFAULT_BILL))))
            .andExpect(jsonPath("$.[*].remarks").value(hasItem(DEFAULT_REMARKS.toString())));
    }
    
    @Test
    @Transactional
    public void getExpense() throws Exception {
        // Initialize the database
        expenseRepository.saveAndFlush(expense);

        // Get the expense
        restExpenseMockMvc.perform(get("/api/expenses/{id}", expense.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(expense.getId().intValue()))
            .andExpect(jsonPath("$.item").value(DEFAULT_ITEM.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.rate").value(DEFAULT_RATE))
            .andExpect(jsonPath("$.laborCost").value(DEFAULT_LABOR_COST))
            .andExpect(jsonPath("$.otherExpense").value(DEFAULT_OTHER_EXPENSE))
            .andExpect(jsonPath("$.total").value(DEFAULT_TOTAL))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.transactionId").value(DEFAULT_TRANSACTION_ID.toString()))
            .andExpect(jsonPath("$.expenseMode").value(DEFAULT_EXPENSE_MODE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.billContentType").value(DEFAULT_BILL_CONTENT_TYPE))
            .andExpect(jsonPath("$.bill").value(Base64Utils.encodeToString(DEFAULT_BILL)))
            .andExpect(jsonPath("$.remarks").value(DEFAULT_REMARKS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExpense() throws Exception {
        // Get the expense
        restExpenseMockMvc.perform(get("/api/expenses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExpense() throws Exception {
        // Initialize the database
        expenseRepository.saveAndFlush(expense);

        int databaseSizeBeforeUpdate = expenseRepository.findAll().size();

        // Update the expense
        Expense updatedExpense = expenseRepository.findById(expense.getId()).get();
        // Disconnect from session so that the updates on updatedExpense are not directly saved in db
        em.detach(updatedExpense);
        updatedExpense
            .item(UPDATED_ITEM)
            .quantity(UPDATED_QUANTITY)
            .rate(UPDATED_RATE)
            .laborCost(UPDATED_LABOR_COST)
            .otherExpense(UPDATED_OTHER_EXPENSE)
            .total(UPDATED_TOTAL)
            .date(UPDATED_DATE)
            .transactionId(UPDATED_TRANSACTION_ID)
            .expenseMode(UPDATED_EXPENSE_MODE)
            .type(UPDATED_TYPE)
            .bill(UPDATED_BILL)
            .billContentType(UPDATED_BILL_CONTENT_TYPE)
            .remarks(UPDATED_REMARKS);
        ExpenseDTO expenseDTO = expenseMapper.toDto(updatedExpense);

        restExpenseMockMvc.perform(put("/api/expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseDTO)))
            .andExpect(status().isOk());

        // Validate the Expense in the database
        List<Expense> expenseList = expenseRepository.findAll();
        assertThat(expenseList).hasSize(databaseSizeBeforeUpdate);
        Expense testExpense = expenseList.get(expenseList.size() - 1);
        assertThat(testExpense.getItem()).isEqualTo(UPDATED_ITEM);
        assertThat(testExpense.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testExpense.getRate()).isEqualTo(UPDATED_RATE);
        assertThat(testExpense.getLaborCost()).isEqualTo(UPDATED_LABOR_COST);
        assertThat(testExpense.getOtherExpense()).isEqualTo(UPDATED_OTHER_EXPENSE);
        assertThat(testExpense.getTotal()).isEqualTo(UPDATED_TOTAL);
        assertThat(testExpense.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testExpense.getTransactionId()).isEqualTo(UPDATED_TRANSACTION_ID);
        assertThat(testExpense.getExpenseMode()).isEqualTo(UPDATED_EXPENSE_MODE);
        assertThat(testExpense.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testExpense.getBill()).isEqualTo(UPDATED_BILL);
        assertThat(testExpense.getBillContentType()).isEqualTo(UPDATED_BILL_CONTENT_TYPE);
        assertThat(testExpense.getRemarks()).isEqualTo(UPDATED_REMARKS);
    }

    @Test
    @Transactional
    public void updateNonExistingExpense() throws Exception {
        int databaseSizeBeforeUpdate = expenseRepository.findAll().size();

        // Create the Expense
        ExpenseDTO expenseDTO = expenseMapper.toDto(expense);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExpenseMockMvc.perform(put("/api/expenses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(expenseDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Expense in the database
        List<Expense> expenseList = expenseRepository.findAll();
        assertThat(expenseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExpense() throws Exception {
        // Initialize the database
        expenseRepository.saveAndFlush(expense);

        int databaseSizeBeforeDelete = expenseRepository.findAll().size();

        // Delete the expense
        restExpenseMockMvc.perform(delete("/api/expenses/{id}", expense.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Expense> expenseList = expenseRepository.findAll();
        assertThat(expenseList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Expense.class);
        Expense expense1 = new Expense();
        expense1.setId(1L);
        Expense expense2 = new Expense();
        expense2.setId(expense1.getId());
        assertThat(expense1).isEqualTo(expense2);
        expense2.setId(2L);
        assertThat(expense1).isNotEqualTo(expense2);
        expense1.setId(null);
        assertThat(expense1).isNotEqualTo(expense2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ExpenseDTO.class);
        ExpenseDTO expenseDTO1 = new ExpenseDTO();
        expenseDTO1.setId(1L);
        ExpenseDTO expenseDTO2 = new ExpenseDTO();
        assertThat(expenseDTO1).isNotEqualTo(expenseDTO2);
        expenseDTO2.setId(expenseDTO1.getId());
        assertThat(expenseDTO1).isEqualTo(expenseDTO2);
        expenseDTO2.setId(2L);
        assertThat(expenseDTO1).isNotEqualTo(expenseDTO2);
        expenseDTO1.setId(null);
        assertThat(expenseDTO1).isNotEqualTo(expenseDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(expenseMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(expenseMapper.fromId(null)).isNull();
    }
}
