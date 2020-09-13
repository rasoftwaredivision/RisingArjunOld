package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Scholarship} entity.
 */
public class ScholarshipDTO implements Serializable {

    private Long id;

    private Integer minMarks;

    private Integer percent;


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

    public Integer getMinMarks() {
        return minMarks;
    }

    public void setMinMarks(Integer minMarks) {
        this.minMarks = minMarks;
    }

    public Integer getPercent() {
        return percent;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
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

        ScholarshipDTO scholarshipDTO = (ScholarshipDTO) o;
        if (scholarshipDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scholarshipDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ScholarshipDTO{" +
            "id=" + getId() +
            ", minMarks=" + getMinMarks() +
            ", percent=" + getPercent() +
            ", enterprise=" + getEnterpriseId() +
            ", enterprise='" + getEnterpriseEnterprisename() + "'" +
            ", session=" + getSessionId() +
            ", session='" + getSessionAcadSession() + "'" +
            "}";
    }
}
