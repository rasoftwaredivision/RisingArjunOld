package com.risingarjun.arjun.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.risingarjun.arjun.domain.enumeration.Studentstatus;

import com.risingarjun.arjun.domain.enumeration.Leavingreason;

import com.risingarjun.arjun.domain.enumeration.Infosource;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "student_reg_id", nullable = false, unique = true)
    private String studentRegId;

    @Lob
    @Column(name = "registration_form")
    private byte[] registrationForm;

    @Column(name = "registration_form_content_type")
    private String registrationFormContentType;

    @Column(name = "parent_mob_no_1")
    private String parentMobNo1;

    @Column(name = "parent_mob_no_2")
    private String parentMobNo2;

    @Column(name = "parent_email_id")
    private String parentEmailId;

    @Enumerated(EnumType.STRING)
    @Column(name = "student_status")
    private Studentstatus studentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "leaving_reason")
    private Leavingreason leavingReason;

    @Enumerated(EnumType.STRING)
    @Column(name = "info_source")
    private Infosource infoSource;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "student_course",
               joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"))
    private Set<Course> courses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentRegId() {
        return studentRegId;
    }

    public Student studentRegId(String studentRegId) {
        this.studentRegId = studentRegId;
        return this;
    }

    public void setStudentRegId(String studentRegId) {
        this.studentRegId = studentRegId;
    }

    public byte[] getRegistrationForm() {
        return registrationForm;
    }

    public Student registrationForm(byte[] registrationForm) {
        this.registrationForm = registrationForm;
        return this;
    }

    public void setRegistrationForm(byte[] registrationForm) {
        this.registrationForm = registrationForm;
    }

    public String getRegistrationFormContentType() {
        return registrationFormContentType;
    }

    public Student registrationFormContentType(String registrationFormContentType) {
        this.registrationFormContentType = registrationFormContentType;
        return this;
    }

    public void setRegistrationFormContentType(String registrationFormContentType) {
        this.registrationFormContentType = registrationFormContentType;
    }

    public String getParentMobNo1() {
        return parentMobNo1;
    }

    public Student parentMobNo1(String parentMobNo1) {
        this.parentMobNo1 = parentMobNo1;
        return this;
    }

    public void setParentMobNo1(String parentMobNo1) {
        this.parentMobNo1 = parentMobNo1;
    }

    public String getParentMobNo2() {
        return parentMobNo2;
    }

    public Student parentMobNo2(String parentMobNo2) {
        this.parentMobNo2 = parentMobNo2;
        return this;
    }

    public void setParentMobNo2(String parentMobNo2) {
        this.parentMobNo2 = parentMobNo2;
    }

    public String getParentEmailId() {
        return parentEmailId;
    }

    public Student parentEmailId(String parentEmailId) {
        this.parentEmailId = parentEmailId;
        return this;
    }

    public void setParentEmailId(String parentEmailId) {
        this.parentEmailId = parentEmailId;
    }

    public Studentstatus getStudentStatus() {
        return studentStatus;
    }

    public Student studentStatus(Studentstatus studentStatus) {
        this.studentStatus = studentStatus;
        return this;
    }

    public void setStudentStatus(Studentstatus studentStatus) {
        this.studentStatus = studentStatus;
    }

    public Leavingreason getLeavingReason() {
        return leavingReason;
    }

    public Student leavingReason(Leavingreason leavingReason) {
        this.leavingReason = leavingReason;
        return this;
    }

    public void setLeavingReason(Leavingreason leavingReason) {
        this.leavingReason = leavingReason;
    }

    public Infosource getInfoSource() {
        return infoSource;
    }

    public Student infoSource(Infosource infoSource) {
        this.infoSource = infoSource;
        return this;
    }

    public void setInfoSource(Infosource infoSource) {
        this.infoSource = infoSource;
    }

    public User getUser() {
        return user;
    }

    public Student user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Student courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Student addCourse(Course course) {
        this.courses.add(course);
        course.getStudents().add(this);
        return this;
    }

    public Student removeCourse(Course course) {
        this.courses.remove(course);
        course.getStudents().remove(this);
        return this;
    }

    public void setCourses(Set<Course> courses) {
        this.courses = courses;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Student)) {
            return false;
        }
        return id != null && id.equals(((Student) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", studentRegId='" + getStudentRegId() + "'" +
            ", registrationForm='" + getRegistrationForm() + "'" +
            ", registrationFormContentType='" + getRegistrationFormContentType() + "'" +
            ", parentMobNo1='" + getParentMobNo1() + "'" +
            ", parentMobNo2='" + getParentMobNo2() + "'" +
            ", parentEmailId='" + getParentEmailId() + "'" +
            ", studentStatus='" + getStudentStatus() + "'" +
            ", leavingReason='" + getLeavingReason() + "'" +
            ", infoSource='" + getInfoSource() + "'" +
            "}";
    }
}
