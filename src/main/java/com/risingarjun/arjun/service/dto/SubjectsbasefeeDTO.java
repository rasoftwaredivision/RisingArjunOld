package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Subjectsbasefee} entity.
 */
public class SubjectsbasefeeDTO implements Serializable {

    private Long id;

    private Integer baseFee;


    private Long courseId;

    private String courseCourse;

    private Long enterpriseId;

    private String enterpriseEnterprisename;

    private Long sessionId;

    private String sessionAcadSession;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBaseFee() {
        return baseFee;
    }

    public void setBaseFee(Integer baseFee) {
        this.baseFee = baseFee;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseCourse() {
        return courseCourse;
    }

    public void setCourseCourse(String courseCourse) {
        this.courseCourse = courseCourse;
    }

    public Long getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(Long enterpriseId) {
        this.enterpriseId = enterpriseId;
    }

    public String getEnterpriseEnterprisename() {
        return enterpriseEnterprisename;
    }

    public void setEnterpriseEnterprisename(String enterpriseEnterprisename) {
        this.enterpriseEnterprisename = enterpriseEnterprisename;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SubjectsbasefeeDTO subjectsbasefeeDTO = (SubjectsbasefeeDTO) o;
        if (subjectsbasefeeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subjectsbasefeeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubjectsbasefeeDTO{" +
            "id=" + getId() +
            ", baseFee=" + getBaseFee() +
            ", course=" + getCourseId() +
            ", course='" + getCourseCourse() + "'" +
            ", enterprise=" + getEnterpriseId() +
            ", enterprise='" + getEnterpriseEnterprisename() + "'" +
            ", session=" + getSessionId() +
            ", session='" + getSessionAcadSession() + "'" +
            "}";
    }
}
