package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "subject_code", nullable = false, unique = true)
    private String subjectCode;

    @NotNull
    @Column(name = "subject_title", nullable = false, unique = true)
    private String subjectTitle;

    @ManyToMany(mappedBy = "subjects")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Studentsubject> studentsubjects = new HashSet<>();

    @ManyToMany(mappedBy = "subjects")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Teacher> teachers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public Subject subjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
        return this;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSubjectTitle() {
        return subjectTitle;
    }

    public Subject subjectTitle(String subjectTitle) {
        this.subjectTitle = subjectTitle;
        return this;
    }

    public void setSubjectTitle(String subjectTitle) {
        this.subjectTitle = subjectTitle;
    }

    public Set<Studentsubject> getStudentsubjects() {
        return studentsubjects;
    }

    public Subject studentsubjects(Set<Studentsubject> studentsubjects) {
        this.studentsubjects = studentsubjects;
        return this;
    }

    public Subject addStudentsubject(Studentsubject studentsubject) {
        this.studentsubjects.add(studentsubject);
        studentsubject.getSubjects().add(this);
        return this;
    }

    public Subject removeStudentsubject(Studentsubject studentsubject) {
        this.studentsubjects.remove(studentsubject);
        studentsubject.getSubjects().remove(this);
        return this;
    }

    public void setStudentsubjects(Set<Studentsubject> studentsubjects) {
        this.studentsubjects = studentsubjects;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Subject teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Subject addTeachers(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.getSubjects().add(this);
        return this;
    }

    public Subject removeTeachers(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.getSubjects().remove(this);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Subject)) {
            return false;
        }
        return id != null && id.equals(((Subject) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", subjectCode='" + getSubjectCode() + "'" +
            ", subjectTitle='" + getSubjectTitle() + "'" +
            "}";
    }
}
