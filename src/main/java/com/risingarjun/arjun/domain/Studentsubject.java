package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.risingarjun.arjun.domain.enumeration.Month;

/**
 * A Studentsubject.
 */
@Entity
@Table(name = "studentsubject")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Studentsubject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "month", nullable = false)
    private Month month;

    @ManyToOne
    @JsonIgnoreProperties("studentsubjects")
    private Student registrationno;

    @ManyToOne
    @JsonIgnoreProperties("studentsubjects")
    private Academicsession session;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "studentsubject_subjects",
               joinColumns = @JoinColumn(name = "studentsubject_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "subjects_id", referencedColumnName = "id"))
    private Set<Subject> subjects = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "studentsubject_course",
               joinColumns = @JoinColumn(name = "studentsubject_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"))
    private Set<Course> courses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Month getMonth() {
        return month;
    }

    public Studentsubject month(Month month) {
        this.month = month;
        return this;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public Student getRegistrationno() {
        return registrationno;
    }

    public Studentsubject registrationno(Student student) {
        this.registrationno = student;
        return this;
    }

    public void setRegistrationno(Student student) {
        this.registrationno = student;
    }

    public Academicsession getSession() {
        return session;
    }

    public Studentsubject session(Academicsession academicsession) {
        this.session = academicsession;
        return this;
    }

    public void setSession(Academicsession academicsession) {
        this.session = academicsession;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Studentsubject subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Studentsubject addSubjects(Subject subject) {
        this.subjects.add(subject);
        subject.getStudentsubjects().add(this);
        return this;
    }

    public Studentsubject removeSubjects(Subject subject) {
        this.subjects.remove(subject);
        subject.getStudentsubjects().remove(this);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Studentsubject courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Studentsubject addCourse(Course course) {
        this.courses.add(course);
        course.getStudentsubjects().add(this);
        return this;
    }

    public Studentsubject removeCourse(Course course) {
        this.courses.remove(course);
        course.getStudentsubjects().remove(this);
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
        if (!(o instanceof Studentsubject)) {
            return false;
        }
        return id != null && id.equals(((Studentsubject) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Studentsubject{" +
            "id=" + getId() +
            ", month='" + getMonth() + "'" +
            "}";
    }
}
