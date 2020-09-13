package com.risingarjun.arjun.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee teacherId;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "teacher_subjects",
               joinColumns = @JoinColumn(name = "teacher_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "subjects_id", referencedColumnName = "id"))
    private Set<Subject> subjects = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "teacher_courses",
               joinColumns = @JoinColumn(name = "teacher_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "courses_id", referencedColumnName = "id"))
    private Set<Course> courses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getTeacherId() {
        return teacherId;
    }

    public Teacher teacherId(Employee employee) {
        this.teacherId = employee;
        return this;
    }

    public void setTeacherId(Employee employee) {
        this.teacherId = employee;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Teacher subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Teacher addSubjects(Subject subject) {
        this.subjects.add(subject);
        subject.getTeachers().add(this);
        return this;
    }

    public Teacher removeSubjects(Subject subject) {
        this.subjects.remove(subject);
        subject.getTeachers().remove(this);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Set<Course> getCourses() {
        return courses;
    }

    public Teacher courses(Set<Course> courses) {
        this.courses = courses;
        return this;
    }

    public Teacher addCourses(Course course) {
        this.courses.add(course);
        course.getTeachers().add(this);
        return this;
    }

    public Teacher removeCourses(Course course) {
        this.courses.remove(course);
        course.getTeachers().remove(this);
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
        if (!(o instanceof Teacher)) {
            return false;
        }
        return id != null && id.equals(((Teacher) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            "}";
    }
}
