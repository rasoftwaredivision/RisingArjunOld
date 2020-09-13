package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Discount;
import com.risingarjun.arjun.repository.DiscountRepository;
import com.risingarjun.arjun.service.DiscountService;
import com.risingarjun.arjun.service.dto.DiscountDTO;
import com.risingarjun.arjun.service.mapper.DiscountMapper;
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
 * Integration tests for the {@Link DiscountResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class DiscountResourceIT {

    private static final Integer DEFAULT_SUBJECT_2 = 1;
    private static final Integer UPDATED_SUBJECT_2 = 2;

    private static final Integer DEFAULT_SUBJECT_3 = 1;
    private static final Integer UPDATED_SUBJECT_3 = 2;

    private static final Integer DEFAULT_SUBJECT_4 = 1;
    private static final Integer UPDATED_SUBJECT_4 = 2;

    private static final Integer DEFAULT_SUBJECT_5 = 1;
    private static final Integer UPDATED_SUBJECT_5 = 2;

    private static final Integer DEFAULT_SUBJECT_6 = 1;
    private static final Integer UPDATED_SUBJECT_6 = 2;

    private static final Integer DEFAULT_SUBJECT_7 = 1;
    private static final Integer UPDATED_SUBJECT_7 = 2;

    private static final Integer DEFAULT_SUBJECT_8 = 1;
    private static final Integer UPDATED_SUBJECT_8 = 2;

    private static final Integer DEFAULT_QUARTERLY = 1;
    private static final Integer UPDATED_QUARTERLY = 2;

    private static final Integer DEFAULT_HALF_YEARLY = 1;
    private static final Integer UPDATED_HALF_YEARLY = 2;

    private static final Integer DEFAULT_ANNUALLY = 1;
    private static final Integer UPDATED_ANNUALLY = 2;

    private static final Integer DEFAULT_SIBLING = 1;
    private static final Integer UPDATED_SIBLING = 2;

    private static final Integer DEFAULT_REFERRAL = 1;
    private static final Integer UPDATED_REFERRAL = 2;

    @Autowired
    private DiscountRepository discountRepository;

    @Autowired
    private DiscountMapper discountMapper;

    @Autowired
    private DiscountService discountService;

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

    private MockMvc restDiscountMockMvc;

    private Discount discount;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiscountResource discountResource = new DiscountResource(discountService);
        this.restDiscountMockMvc = MockMvcBuilders.standaloneSetup(discountResource)
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
    public static Discount createEntity(EntityManager em) {
        Discount discount = new Discount()
            .subject2(DEFAULT_SUBJECT_2)
            .subject3(DEFAULT_SUBJECT_3)
            .subject4(DEFAULT_SUBJECT_4)
            .subject5(DEFAULT_SUBJECT_5)
            .subject6(DEFAULT_SUBJECT_6)
            .subject7(DEFAULT_SUBJECT_7)
            .subject8(DEFAULT_SUBJECT_8)
            .quarterly(DEFAULT_QUARTERLY)
            .halfYearly(DEFAULT_HALF_YEARLY)
            .annually(DEFAULT_ANNUALLY)
            .sibling(DEFAULT_SIBLING)
            .referral(DEFAULT_REFERRAL);
        return discount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Discount createUpdatedEntity(EntityManager em) {
        Discount discount = new Discount()
            .subject2(UPDATED_SUBJECT_2)
            .subject3(UPDATED_SUBJECT_3)
            .subject4(UPDATED_SUBJECT_4)
            .subject5(UPDATED_SUBJECT_5)
            .subject6(UPDATED_SUBJECT_6)
            .subject7(UPDATED_SUBJECT_7)
            .subject8(UPDATED_SUBJECT_8)
            .quarterly(UPDATED_QUARTERLY)
            .halfYearly(UPDATED_HALF_YEARLY)
            .annually(UPDATED_ANNUALLY)
            .sibling(UPDATED_SIBLING)
            .referral(UPDATED_REFERRAL);
        return discount;
    }

    @BeforeEach
    public void initTest() {
        discount = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiscount() throws Exception {
        int databaseSizeBeforeCreate = discountRepository.findAll().size();

        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);
        restDiscountMockMvc.perform(post("/api/discounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discountDTO)))
            .andExpect(status().isCreated());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeCreate + 1);
        Discount testDiscount = discountList.get(discountList.size() - 1);
        assertThat(testDiscount.getSubject2()).isEqualTo(DEFAULT_SUBJECT_2);
        assertThat(testDiscount.getSubject3()).isEqualTo(DEFAULT_SUBJECT_3);
        assertThat(testDiscount.getSubject4()).isEqualTo(DEFAULT_SUBJECT_4);
        assertThat(testDiscount.getSubject5()).isEqualTo(DEFAULT_SUBJECT_5);
        assertThat(testDiscount.getSubject6()).isEqualTo(DEFAULT_SUBJECT_6);
        assertThat(testDiscount.getSubject7()).isEqualTo(DEFAULT_SUBJECT_7);
        assertThat(testDiscount.getSubject8()).isEqualTo(DEFAULT_SUBJECT_8);
        assertThat(testDiscount.getQuarterly()).isEqualTo(DEFAULT_QUARTERLY);
        assertThat(testDiscount.getHalfYearly()).isEqualTo(DEFAULT_HALF_YEARLY);
        assertThat(testDiscount.getAnnually()).isEqualTo(DEFAULT_ANNUALLY);
        assertThat(testDiscount.getSibling()).isEqualTo(DEFAULT_SIBLING);
        assertThat(testDiscount.getReferral()).isEqualTo(DEFAULT_REFERRAL);
    }

    @Test
    @Transactional
    public void createDiscountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = discountRepository.findAll().size();

        // Create the Discount with an existing ID
        discount.setId(1L);
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiscountMockMvc.perform(post("/api/discounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiscounts() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        // Get all the discountList
        restDiscountMockMvc.perform(get("/api/discounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(discount.getId().intValue())))
            .andExpect(jsonPath("$.[*].subject2").value(hasItem(DEFAULT_SUBJECT_2)))
            .andExpect(jsonPath("$.[*].subject3").value(hasItem(DEFAULT_SUBJECT_3)))
            .andExpect(jsonPath("$.[*].subject4").value(hasItem(DEFAULT_SUBJECT_4)))
            .andExpect(jsonPath("$.[*].subject5").value(hasItem(DEFAULT_SUBJECT_5)))
            .andExpect(jsonPath("$.[*].subject6").value(hasItem(DEFAULT_SUBJECT_6)))
            .andExpect(jsonPath("$.[*].subject7").value(hasItem(DEFAULT_SUBJECT_7)))
            .andExpect(jsonPath("$.[*].subject8").value(hasItem(DEFAULT_SUBJECT_8)))
            .andExpect(jsonPath("$.[*].quarterly").value(hasItem(DEFAULT_QUARTERLY)))
            .andExpect(jsonPath("$.[*].halfYearly").value(hasItem(DEFAULT_HALF_YEARLY)))
            .andExpect(jsonPath("$.[*].annually").value(hasItem(DEFAULT_ANNUALLY)))
            .andExpect(jsonPath("$.[*].sibling").value(hasItem(DEFAULT_SIBLING)))
            .andExpect(jsonPath("$.[*].referral").value(hasItem(DEFAULT_REFERRAL)));
    }
    
    @Test
    @Transactional
    public void getDiscount() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        // Get the discount
        restDiscountMockMvc.perform(get("/api/discounts/{id}", discount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(discount.getId().intValue()))
            .andExpect(jsonPath("$.subject2").value(DEFAULT_SUBJECT_2))
            .andExpect(jsonPath("$.subject3").value(DEFAULT_SUBJECT_3))
            .andExpect(jsonPath("$.subject4").value(DEFAULT_SUBJECT_4))
            .andExpect(jsonPath("$.subject5").value(DEFAULT_SUBJECT_5))
            .andExpect(jsonPath("$.subject6").value(DEFAULT_SUBJECT_6))
            .andExpect(jsonPath("$.subject7").value(DEFAULT_SUBJECT_7))
            .andExpect(jsonPath("$.subject8").value(DEFAULT_SUBJECT_8))
            .andExpect(jsonPath("$.quarterly").value(DEFAULT_QUARTERLY))
            .andExpect(jsonPath("$.halfYearly").value(DEFAULT_HALF_YEARLY))
            .andExpect(jsonPath("$.annually").value(DEFAULT_ANNUALLY))
            .andExpect(jsonPath("$.sibling").value(DEFAULT_SIBLING))
            .andExpect(jsonPath("$.referral").value(DEFAULT_REFERRAL));
    }

    @Test
    @Transactional
    public void getNonExistingDiscount() throws Exception {
        // Get the discount
        restDiscountMockMvc.perform(get("/api/discounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiscount() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        int databaseSizeBeforeUpdate = discountRepository.findAll().size();

        // Update the discount
        Discount updatedDiscount = discountRepository.findById(discount.getId()).get();
        // Disconnect from session so that the updates on updatedDiscount are not directly saved in db
        em.detach(updatedDiscount);
        updatedDiscount
            .subject2(UPDATED_SUBJECT_2)
            .subject3(UPDATED_SUBJECT_3)
            .subject4(UPDATED_SUBJECT_4)
            .subject5(UPDATED_SUBJECT_5)
            .subject6(UPDATED_SUBJECT_6)
            .subject7(UPDATED_SUBJECT_7)
            .subject8(UPDATED_SUBJECT_8)
            .quarterly(UPDATED_QUARTERLY)
            .halfYearly(UPDATED_HALF_YEARLY)
            .annually(UPDATED_ANNUALLY)
            .sibling(UPDATED_SIBLING)
            .referral(UPDATED_REFERRAL);
        DiscountDTO discountDTO = discountMapper.toDto(updatedDiscount);

        restDiscountMockMvc.perform(put("/api/discounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discountDTO)))
            .andExpect(status().isOk());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
        Discount testDiscount = discountList.get(discountList.size() - 1);
        assertThat(testDiscount.getSubject2()).isEqualTo(UPDATED_SUBJECT_2);
        assertThat(testDiscount.getSubject3()).isEqualTo(UPDATED_SUBJECT_3);
        assertThat(testDiscount.getSubject4()).isEqualTo(UPDATED_SUBJECT_4);
        assertThat(testDiscount.getSubject5()).isEqualTo(UPDATED_SUBJECT_5);
        assertThat(testDiscount.getSubject6()).isEqualTo(UPDATED_SUBJECT_6);
        assertThat(testDiscount.getSubject7()).isEqualTo(UPDATED_SUBJECT_7);
        assertThat(testDiscount.getSubject8()).isEqualTo(UPDATED_SUBJECT_8);
        assertThat(testDiscount.getQuarterly()).isEqualTo(UPDATED_QUARTERLY);
        assertThat(testDiscount.getHalfYearly()).isEqualTo(UPDATED_HALF_YEARLY);
        assertThat(testDiscount.getAnnually()).isEqualTo(UPDATED_ANNUALLY);
        assertThat(testDiscount.getSibling()).isEqualTo(UPDATED_SIBLING);
        assertThat(testDiscount.getReferral()).isEqualTo(UPDATED_REFERRAL);
    }

    @Test
    @Transactional
    public void updateNonExistingDiscount() throws Exception {
        int databaseSizeBeforeUpdate = discountRepository.findAll().size();

        // Create the Discount
        DiscountDTO discountDTO = discountMapper.toDto(discount);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiscountMockMvc.perform(put("/api/discounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(discountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Discount in the database
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiscount() throws Exception {
        // Initialize the database
        discountRepository.saveAndFlush(discount);

        int databaseSizeBeforeDelete = discountRepository.findAll().size();

        // Delete the discount
        restDiscountMockMvc.perform(delete("/api/discounts/{id}", discount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Discount> discountList = discountRepository.findAll();
        assertThat(discountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Discount.class);
        Discount discount1 = new Discount();
        discount1.setId(1L);
        Discount discount2 = new Discount();
        discount2.setId(discount1.getId());
        assertThat(discount1).isEqualTo(discount2);
        discount2.setId(2L);
        assertThat(discount1).isNotEqualTo(discount2);
        discount1.setId(null);
        assertThat(discount1).isNotEqualTo(discount2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiscountDTO.class);
        DiscountDTO discountDTO1 = new DiscountDTO();
        discountDTO1.setId(1L);
        DiscountDTO discountDTO2 = new DiscountDTO();
        assertThat(discountDTO1).isNotEqualTo(discountDTO2);
        discountDTO2.setId(discountDTO1.getId());
        assertThat(discountDTO1).isEqualTo(discountDTO2);
        discountDTO2.setId(2L);
        assertThat(discountDTO1).isNotEqualTo(discountDTO2);
        discountDTO1.setId(null);
        assertThat(discountDTO1).isNotEqualTo(discountDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(discountMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(discountMapper.fromId(null)).isNull();
    }
}
