package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.Month;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Studentsubject} entity.
 */
public class StudentsubjectDTO implements Serializable {

    private Long id;

    @NotNull
    private Month month;


    private Long registrationnoId;

    private String registrationnoStudentRegId;

    private Long sessionId;

    private String sessionAcadSession;

    private Set<SubjectDTO> subjects = new HashSet<>();

    private Set<CourseDTO> courses = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public Long getRegistrationnoId() {
        return registrationnoId;
    }

    public void setRegistrationnoId(Long studentId) {
        this.registrationnoId = studentId;
    }

    public String getRegistrationnoStudentRegId() {
        return registrationnoStudentRegId;
    }

    public void setRegistrationnoStudentRegId(String studentStudentRegId) {
        this.registrationnoStudentRegId = studentStudentRegId;
    }

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long academicsessionId) {
        this.sessionId = academicsessionId;
    }

    public String getSessionAcadSession() {
        return sessionAcadSession;
    }

    public void setSessionAcadSession(String academicsessionAcadSession) {
        this.sessionAcadSession = academicsessionAcadSession;
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

        StudentsubjectDTO studentsubjectDTO = (StudentsubjectDTO) o;
        if (studentsubjectDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentsubjectDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentsubjectDTO{" +
            "id=" + getId() +
            ", month='" + getMonth() + "'" +
            ", registrationno=" + getRegistrationnoId() +
            ", registrationno='" + getRegistrationnoStudentRegId() + "'" +
            ", session=" + getSessionId() +
            ", session='" + getSessionAcadSession() + "'" +
            "}";
    }
}
