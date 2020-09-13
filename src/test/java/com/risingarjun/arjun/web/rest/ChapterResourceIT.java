package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Chapter;
import com.risingarjun.arjun.repository.ChapterRepository;
import com.risingarjun.arjun.service.ChapterService;
import com.risingarjun.arjun.service.dto.ChapterDTO;
import com.risingarjun.arjun.service.mapper.ChapterMapper;
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
 * Integration tests for the {@Link ChapterResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class ChapterResourceIT {

    private static final String DEFAULT_CHAPTER_ID = "AAAAAAAAAA";
    private static final String UPDATED_CHAPTER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_CHAPTER_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_CHAPTER_TITLE = "BBBBBBBBBB";

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private ChapterMapper chapterMapper;

    @Autowired
    private ChapterService chapterService;

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

    private MockMvc restChapterMockMvc;

    private Chapter chapter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChapterResource chapterResource = new ChapterResource(chapterService);
        this.restChapterMockMvc = MockMvcBuilders.standaloneSetup(chapterResource)
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
    public static Chapter createEntity(EntityManager em) {
        Chapter chapter = new Chapter()
            .chapterId(DEFAULT_CHAPTER_ID)
            .chapterTitle(DEFAULT_CHAPTER_TITLE);
        return chapter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chapter createUpdatedEntity(EntityManager em) {
        Chapter chapter = new Chapter()
            .chapterId(UPDATED_CHAPTER_ID)
            .chapterTitle(UPDATED_CHAPTER_TITLE);
        return chapter;
    }

    @BeforeEach
    public void initTest() {
        chapter = createEntity(em);
    }

    @Test
    @Transactional
    public void createChapter() throws Exception {
        int databaseSizeBeforeCreate = chapterRepository.findAll().size();

        // Create the Chapter
        ChapterDTO chapterDTO = chapterMapper.toDto(chapter);
        restChapterMockMvc.perform(post("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chapterDTO)))
            .andExpect(status().isCreated());

        // Validate the Chapter in the database
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeCreate + 1);
        Chapter testChapter = chapterList.get(chapterList.size() - 1);
        assertThat(testChapter.getChapterId()).isEqualTo(DEFAULT_CHAPTER_ID);
        assertThat(testChapter.getChapterTitle()).isEqualTo(DEFAULT_CHAPTER_TITLE);
    }

    @Test
    @Transactional
    public void createChapterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chapterRepository.findAll().size();

        // Create the Chapter with an existing ID
        chapter.setId(1L);
        ChapterDTO chapterDTO = chapterMapper.toDto(chapter);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChapterMockMvc.perform(post("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chapterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Chapter in the database
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkChapterIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = chapterRepository.findAll().size();
        // set the field null
        chapter.setChapterId(null);

        // Create the Chapter, which fails.
        ChapterDTO chapterDTO = chapterMapper.toDto(chapter);

        restChapterMockMvc.perform(post("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chapterDTO)))
            .andExpect(status().isBadRequest());

        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllChapters() throws Exception {
        // Initialize the database
        chapterRepository.saveAndFlush(chapter);

        // Get all the chapterList
        restChapterMockMvc.perform(get("/api/chapters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chapter.getId().intValue())))
            .andExpect(jsonPath("$.[*].chapterId").value(hasItem(DEFAULT_CHAPTER_ID.toString())))
            .andExpect(jsonPath("$.[*].chapterTitle").value(hasItem(DEFAULT_CHAPTER_TITLE.toString())));
    }
    
    @Test
    @Transactional
    public void getChapter() throws Exception {
        // Initialize the database
        chapterRepository.saveAndFlush(chapter);

        // Get the chapter
        restChapterMockMvc.perform(get("/api/chapters/{id}", chapter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chapter.getId().intValue()))
            .andExpect(jsonPath("$.chapterId").value(DEFAULT_CHAPTER_ID.toString()))
            .andExpect(jsonPath("$.chapterTitle").value(DEFAULT_CHAPTER_TITLE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingChapter() throws Exception {
        // Get the chapter
        restChapterMockMvc.perform(get("/api/chapters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChapter() throws Exception {
        // Initialize the database
        chapterRepository.saveAndFlush(chapter);

        int databaseSizeBeforeUpdate = chapterRepository.findAll().size();

        // Update the chapter
        Chapter updatedChapter = chapterRepository.findById(chapter.getId()).get();
        // Disconnect from session so that the updates on updatedChapter are not directly saved in db
        em.detach(updatedChapter);
        updatedChapter
            .chapterId(UPDATED_CHAPTER_ID)
            .chapterTitle(UPDATED_CHAPTER_TITLE);
        ChapterDTO chapterDTO = chapterMapper.toDto(updatedChapter);

        restChapterMockMvc.perform(put("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chapterDTO)))
            .andExpect(status().isOk());

        // Validate the Chapter in the database
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeUpdate);
        Chapter testChapter = chapterList.get(chapterList.size() - 1);
        assertThat(testChapter.getChapterId()).isEqualTo(UPDATED_CHAPTER_ID);
        assertThat(testChapter.getChapterTitle()).isEqualTo(UPDATED_CHAPTER_TITLE);
    }

    @Test
    @Transactional
    public void updateNonExistingChapter() throws Exception {
        int databaseSizeBeforeUpdate = chapterRepository.findAll().size();

        // Create the Chapter
        ChapterDTO chapterDTO = chapterMapper.toDto(chapter);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChapterMockMvc.perform(put("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chapterDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Chapter in the database
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChapter() throws Exception {
        // Initialize the database
        chapterRepository.saveAndFlush(chapter);

        int databaseSizeBeforeDelete = chapterRepository.findAll().size();

        // Delete the chapter
        restChapterMockMvc.perform(delete("/api/chapters/{id}", chapter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Chapter.class);
        Chapter chapter1 = new Chapter();
        chapter1.setId(1L);
        Chapter chapter2 = new Chapter();
        chapter2.setId(chapter1.getId());
        assertThat(chapter1).isEqualTo(chapter2);
        chapter2.setId(2L);
        assertThat(chapter1).isNotEqualTo(chapter2);
        chapter1.setId(null);
        assertThat(chapter1).isNotEqualTo(chapter2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ChapterDTO.class);
        ChapterDTO chapterDTO1 = new ChapterDTO();
        chapterDTO1.setId(1L);
        ChapterDTO chapterDTO2 = new ChapterDTO();
        assertThat(chapterDTO1).isNotEqualTo(chapterDTO2);
        chapterDTO2.setId(chapterDTO1.getId());
        assertThat(chapterDTO1).isEqualTo(chapterDTO2);
        chapterDTO2.setId(2L);
        assertThat(chapterDTO1).isNotEqualTo(chapterDTO2);
        chapterDTO1.setId(null);
        assertThat(chapterDTO1).isNotEqualTo(chapterDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(chapterMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(chapterMapper.fromId(null)).isNull();
    }
}
