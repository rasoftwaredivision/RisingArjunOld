package com.risingarjun.arjun.web.rest;

import com.risingarjun.arjun.RisingArjunApp;
import com.risingarjun.arjun.domain.Student;
import com.risingarjun.arjun.repository.StudentRepository;
import com.risingarjun.arjun.service.StudentService;
import com.risingarjun.arjun.service.dto.StudentDTO;
import com.risingarjun.arjun.service.mapper.StudentMapper;
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
import org.springframework.util.Base64Utils;
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

import com.risingarjun.arjun.domain.enumeration.Studentstatus;
import com.risingarjun.arjun.domain.enumeration.Leavingreason;
import com.risingarjun.arjun.domain.enumeration.Infosource;
/**
 * Integration tests for the {@Link StudentResource} REST controller.
 */
@SpringBootTest(classes = RisingArjunApp.class)
public class StudentResourceIT {

    private static final String DEFAULT_STUDENT_REG_ID = "AAAAAAAAAA";
    private static final String UPDATED_STUDENT_REG_ID = "BBBBBBBBBB";

    private static final byte[] DEFAULT_REGISTRATION_FORM = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_REGISTRATION_FORM = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_REGISTRATION_FORM_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_REGISTRATION_FORM_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PARENT_MOB_NO_1 = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_MOB_NO_1 = "BBBBBBBBBB";

    private static final String DEFAULT_PARENT_MOB_NO_2 = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_MOB_NO_2 = "BBBBBBBBBB";

    private static final String DEFAULT_PARENT_EMAIL_ID = "AAAAAAAAAA";
    private static final String UPDATED_PARENT_EMAIL_ID = "BBBBBBBBBB";

    private static final Studentstatus DEFAULT_STUDENT_STATUS = Studentstatus.GRADUATED;
    private static final Studentstatus UPDATED_STUDENT_STATUS = Studentstatus.JOINED;

    private static final Leavingreason DEFAULT_LEAVING_REASON = Leavingreason.NA;
    private static final Leavingreason UPDATED_LEAVING_REASON = Leavingreason.DISTANCEFACTOR;

    private static final Infosource DEFAULT_INFO_SOURCE = Infosource.LOCATIONDIRECTLY;
    private static final Infosource UPDATED_INFO_SOURCE = Infosource.FRIENDS;

    @Autowired
    private StudentRepository studentRepository;

    @Mock
    private StudentRepository studentRepositoryMock;

    @Autowired
    private StudentMapper studentMapper;

    @Mock
    private StudentService studentServiceMock;

    @Autowired
    private StudentService studentService;

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

    private MockMvc restStudentMockMvc;

    private Student student;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentResource studentResource = new StudentResource(studentService);
        this.restStudentMockMvc = MockMvcBuilders.standaloneSetup(studentResource)
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
    public static Student createEntity(EntityManager em) {
        Student student = new Student()
            .studentRegId(DEFAULT_STUDENT_REG_ID)
            .registrationForm(DEFAULT_REGISTRATION_FORM)
            .registrationFormContentType(DEFAULT_REGISTRATION_FORM_CONTENT_TYPE)
            .parentMobNo1(DEFAULT_PARENT_MOB_NO_1)
            .parentMobNo2(DEFAULT_PARENT_MOB_NO_2)
            .parentEmailId(DEFAULT_PARENT_EMAIL_ID)
            .studentStatus(DEFAULT_STUDENT_STATUS)
            .leavingReason(DEFAULT_LEAVING_REASON)
            .infoSource(DEFAULT_INFO_SOURCE);
        return student;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Student createUpdatedEntity(EntityManager em) {
        Student student = new Student()
            .studentRegId(UPDATED_STUDENT_REG_ID)
            .registrationForm(UPDATED_REGISTRATION_FORM)
            .registrationFormContentType(UPDATED_REGISTRATION_FORM_CONTENT_TYPE)
            .parentMobNo1(UPDATED_PARENT_MOB_NO_1)
            .parentMobNo2(UPDATED_PARENT_MOB_NO_2)
            .parentEmailId(UPDATED_PARENT_EMAIL_ID)
            .studentStatus(UPDATED_STUDENT_STATUS)
            .leavingReason(UPDATED_LEAVING_REASON)
            .infoSource(UPDATED_INFO_SOURCE);
        return student;
    }

    @BeforeEach
    public void initTest() {
        student = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudent() throws Exception {
        int databaseSizeBeforeCreate = studentRepository.findAll().size();

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(student);
        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isCreated());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeCreate + 1);
        Student testStudent = studentList.get(studentList.size() - 1);
        assertThat(testStudent.getStudentRegId()).isEqualTo(DEFAULT_STUDENT_REG_ID);
        assertThat(testStudent.getRegistrationForm()).isEqualTo(DEFAULT_REGISTRATION_FORM);
        assertThat(testStudent.getRegistrationFormContentType()).isEqualTo(DEFAULT_REGISTRATION_FORM_CONTENT_TYPE);
        assertThat(testStudent.getParentMobNo1()).isEqualTo(DEFAULT_PARENT_MOB_NO_1);
        assertThat(testStudent.getParentMobNo2()).isEqualTo(DEFAULT_PARENT_MOB_NO_2);
        assertThat(testStudent.getParentEmailId()).isEqualTo(DEFAULT_PARENT_EMAIL_ID);
        assertThat(testStudent.getStudentStatus()).isEqualTo(DEFAULT_STUDENT_STATUS);
        assertThat(testStudent.getLeavingReason()).isEqualTo(DEFAULT_LEAVING_REASON);
        assertThat(testStudent.getInfoSource()).isEqualTo(DEFAULT_INFO_SOURCE);
    }

    @Test
    @Transactional
    public void createStudentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentRepository.findAll().size();

        // Create the Student with an existing ID
        student.setId(1L);
        StudentDTO studentDTO = studentMapper.toDto(student);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkStudentRegIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = studentRepository.findAll().size();
        // set the field null
        student.setStudentRegId(null);

        // Create the Student, which fails.
        StudentDTO studentDTO = studentMapper.toDto(student);

        restStudentMockMvc.perform(post("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStudents() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);

        // Get all the studentList
        restStudentMockMvc.perform(get("/api/students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(student.getId().intValue())))
            .andExpect(jsonPath("$.[*].studentRegId").value(hasItem(DEFAULT_STUDENT_REG_ID.toString())))
            .andExpect(jsonPath("$.[*].registrationFormContentType").value(hasItem(DEFAULT_REGISTRATION_FORM_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].registrationForm").value(hasItem(Base64Utils.encodeToString(DEFAULT_REGISTRATION_FORM))))
            .andExpect(jsonPath("$.[*].parentMobNo1").value(hasItem(DEFAULT_PARENT_MOB_NO_1.toString())))
            .andExpect(jsonPath("$.[*].parentMobNo2").value(hasItem(DEFAULT_PARENT_MOB_NO_2.toString())))
            .andExpect(jsonPath("$.[*].parentEmailId").value(hasItem(DEFAULT_PARENT_EMAIL_ID.toString())))
            .andExpect(jsonPath("$.[*].studentStatus").value(hasItem(DEFAULT_STUDENT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].leavingReason").value(hasItem(DEFAULT_LEAVING_REASON.toString())))
            .andExpect(jsonPath("$.[*].infoSource").value(hasItem(DEFAULT_INFO_SOURCE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllStudentsWithEagerRelationshipsIsEnabled() throws Exception {
        StudentResource studentResource = new StudentResource(studentServiceMock);
        when(studentServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restStudentMockMvc = MockMvcBuilders.standaloneSetup(studentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStudentMockMvc.perform(get("/api/students?eagerload=true"))
        .andExpect(status().isOk());

        verify(studentServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllStudentsWithEagerRelationshipsIsNotEnabled() throws Exception {
        StudentResource studentResource = new StudentResource(studentServiceMock);
            when(studentServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restStudentMockMvc = MockMvcBuilders.standaloneSetup(studentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restStudentMockMvc.perform(get("/api/students?eagerload=true"))
        .andExpect(status().isOk());

            verify(studentServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getStudent() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);

        // Get the student
        restStudentMockMvc.perform(get("/api/students/{id}", student.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(student.getId().intValue()))
            .andExpect(jsonPath("$.studentRegId").value(DEFAULT_STUDENT_REG_ID.toString()))
            .andExpect(jsonPath("$.registrationFormContentType").value(DEFAULT_REGISTRATION_FORM_CONTENT_TYPE))
            .andExpect(jsonPath("$.registrationForm").value(Base64Utils.encodeToString(DEFAULT_REGISTRATION_FORM)))
            .andExpect(jsonPath("$.parentMobNo1").value(DEFAULT_PARENT_MOB_NO_1.toString()))
            .andExpect(jsonPath("$.parentMobNo2").value(DEFAULT_PARENT_MOB_NO_2.toString()))
            .andExpect(jsonPath("$.parentEmailId").value(DEFAULT_PARENT_EMAIL_ID.toString()))
            .andExpect(jsonPath("$.studentStatus").value(DEFAULT_STUDENT_STATUS.toString()))
            .andExpect(jsonPath("$.leavingReason").value(DEFAULT_LEAVING_REASON.toString()))
            .andExpect(jsonPath("$.infoSource").value(DEFAULT_INFO_SOURCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudent() throws Exception {
        // Get the student
        restStudentMockMvc.perform(get("/api/students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudent() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);

        int databaseSizeBeforeUpdate = studentRepository.findAll().size();

        // Update the student
        Student updatedStudent = studentRepository.findById(student.getId()).get();
        // Disconnect from session so that the updates on updatedStudent are not directly saved in db
        em.detach(updatedStudent);
        updatedStudent
            .studentRegId(UPDATED_STUDENT_REG_ID)
            .registrationForm(UPDATED_REGISTRATION_FORM)
            .registrationFormContentType(UPDATED_REGISTRATION_FORM_CONTENT_TYPE)
            .parentMobNo1(UPDATED_PARENT_MOB_NO_1)
            .parentMobNo2(UPDATED_PARENT_MOB_NO_2)
            .parentEmailId(UPDATED_PARENT_EMAIL_ID)
            .studentStatus(UPDATED_STUDENT_STATUS)
            .leavingReason(UPDATED_LEAVING_REASON)
            .infoSource(UPDATED_INFO_SOURCE);
        StudentDTO studentDTO = studentMapper.toDto(updatedStudent);

        restStudentMockMvc.perform(put("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isOk());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeUpdate);
        Student testStudent = studentList.get(studentList.size() - 1);
        assertThat(testStudent.getStudentRegId()).isEqualTo(UPDATED_STUDENT_REG_ID);
        assertThat(testStudent.getRegistrationForm()).isEqualTo(UPDATED_REGISTRATION_FORM);
        assertThat(testStudent.getRegistrationFormContentType()).isEqualTo(UPDATED_REGISTRATION_FORM_CONTENT_TYPE);
        assertThat(testStudent.getParentMobNo1()).isEqualTo(UPDATED_PARENT_MOB_NO_1);
        assertThat(testStudent.getParentMobNo2()).isEqualTo(UPDATED_PARENT_MOB_NO_2);
        assertThat(testStudent.getParentEmailId()).isEqualTo(UPDATED_PARENT_EMAIL_ID);
        assertThat(testStudent.getStudentStatus()).isEqualTo(UPDATED_STUDENT_STATUS);
        assertThat(testStudent.getLeavingReason()).isEqualTo(UPDATED_LEAVING_REASON);
        assertThat(testStudent.getInfoSource()).isEqualTo(UPDATED_INFO_SOURCE);
    }

    @Test
    @Transactional
    public void updateNonExistingStudent() throws Exception {
        int databaseSizeBeforeUpdate = studentRepository.findAll().size();

        // Create the Student
        StudentDTO studentDTO = studentMapper.toDto(student);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentMockMvc.perform(put("/api/students")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Student in the database
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudent() throws Exception {
        // Initialize the database
        studentRepository.saveAndFlush(student);

        int databaseSizeBeforeDelete = studentRepository.findAll().size();

        // Delete the student
        restStudentMockMvc.perform(delete("/api/students/{id}", student.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Student> studentList = studentRepository.findAll();
        assertThat(studentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Student.class);
        Student student1 = new Student();
        student1.setId(1L);
        Student student2 = new Student();
        student2.setId(student1.getId());
        assertThat(student1).isEqualTo(student2);
        student2.setId(2L);
        assertThat(student1).isNotEqualTo(student2);
        student1.setId(null);
        assertThat(student1).isNotEqualTo(student2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentDTO.class);
        StudentDTO studentDTO1 = new StudentDTO();
        studentDTO1.setId(1L);
        StudentDTO studentDTO2 = new StudentDTO();
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
        studentDTO2.setId(studentDTO1.getId());
        assertThat(studentDTO1).isEqualTo(studentDTO2);
        studentDTO2.setId(2L);
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
        studentDTO1.setId(null);
        assertThat(studentDTO1).isNotEqualTo(studentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(studentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(studentMapper.fromId(null)).isNull();
    }
}
