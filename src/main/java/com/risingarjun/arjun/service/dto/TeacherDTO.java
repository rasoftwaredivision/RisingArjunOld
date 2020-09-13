package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Teacher} entity.
 */
public class TeacherDTO implements Serializable {

    private Long id;


    private Long teacherIdId;

    private String teacherIdEmployeeId;

    private Set<SubjectDTO> subjects = new HashSet<>();

    private Set<CourseDTO> courses = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTeacherIdId() {
        return teacherIdId;
    }

    public void setTeacherIdId(Long employeeId) {
        this.teacherIdId = employeeId;
    }

    public String getTeacherIdEmployeeId() {
        return teacherIdEmployeeId;
    }

    public void setTeacherIdEmployeeId(String employeeEmployeeId) {
        this.teacherIdEmployeeId = employeeEmployeeId;
    }

    public Set<SubjectDTO> getSubjects() {
        return subjects;
    }

    public void setSubjects(Set<SubjectDTO> subjects) {
        this.subjects = subjects;
    }

    public Set<CourseDTO> getCourses() {
        return courses;
    }

    public void setCourses(Set<CourseDTO> courses) {
        this.courses = courses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeacherDTO teacherDTO = (TeacherDTO) o;
        if (teacherDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacherDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeacherDTO{" +
            "id=" + getId() +
            ", teacherId=" + getTeacherIdId() +
            ", teacherId='" + getTeacherIdEmployeeId() + "'" +
            "}";
    }
}
