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
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "course_id", nullable = false, unique = true)
    private String courseId;

    @NotNull
    @Column(name = "course", nullable = false, unique = true)
    private String course;

    @ManyToMany(mappedBy = "courses")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

    @ManyToMany(mappedBy = "courses")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Studentsubject> studentsubjects = new HashSet<>();

    @ManyToMany(mappedBy = "courses")
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

    public String getCourseId() {
        return courseId;
    }

    public Course courseId(String courseId) {
        this.courseId = courseId;
        return this;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourse() {
        return course;
    }

    public Course course(String course) {
        this.course = course;
        return this;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Course students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Course addStudent(Student student) {
        this.students.add(student);
        student.getCourses().add(this);
        return this;
    }

    public Course removeStudent(Student student) {
        this.students.remove(student);
        student.getCourses().remove(this);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public Set<Studentsubject> getStudentsubjects() {
        return studentsubjects;
    }

    public Course studentsubjects(Set<Studentsubject> studentsubjects) {
        this.studentsubjects = studentsubjects;
        return this;
    }

    public Course addStudentsubjects(Studentsubject studentsubject) {
        this.studentsubjects.add(studentsubject);
        studentsubject.getCourses().add(this);
        return this;
    }

    public Course removeStudentsubjects(Studentsubject studentsubject) {
        this.studentsubjects.remove(studentsubject);
        studentsubject.getCourses().remove(this);
        return this;
    }

    public void setStudentsubjects(Set<Studentsubject> studentsubjects) {
        this.studentsubjects = studentsubjects;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Course teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Course addTeachers(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.getCourses().add(this);
        return this;
    }

    public Course removeTeachers(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.getCourses().remove(this);
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
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", courseId='" + getCourseId() + "'" +
            ", course='" + getCourse() + "'" +
            "}";
    }
}
