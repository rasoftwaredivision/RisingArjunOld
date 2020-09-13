package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Discount} entity.
 */
public class DiscountDTO implements Serializable {

    private Long id;

    private Integer subject2;

    private Integer subject3;

    private Integer subject4;

    private Integer subject5;

    private Integer subject6;

    private Integer subject7;

    private Integer subject8;

    private Integer quarterly;

    private Integer halfYearly;

    private Integer annually;

    private Integer sibling;

    private Integer referral;


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

    public Integer getSubject2() {
        return subject2;
    }

    public void setSubject2(Integer subject2) {
        this.subject2 = subject2;
    }

    public Integer getSubject3() {
        return subject3;
    }

    public void setSubject3(Integer subject3) {
        this.subject3 = subject3;
    }

    public Integer getSubject4() {
        return subject4;
    }

    public void setSubject4(Integer subject4) {
        this.subject4 = subject4;
    }

    public Integer getSubject5() {
        return subject5;
    }

    public void setSubject5(Integer subject5) {
        this.subject5 = subject5;
    }

    public Integer getSubject6() {
        return subject6;
    }

    public void setSubject6(Integer subject6) {
        this.subject6 = subject6;
    }

    public Integer getSubject7() {
        return subject7;
    }

    public void setSubject7(Integer subject7) {
        this.subject7 = subject7;
    }

    public Integer getSubject8() {
        return subject8;
    }

    public void setSubject8(Integer subject8) {
        this.subject8 = subject8;
    }

    public Integer getQuarterly() {
        return quarterly;
    }

    public void setQuarterly(Integer quarterly) {
        this.quarterly = quarterly;
    }

    public Integer getHalfYearly() {
        return halfYearly;
    }

    public void setHalfYearly(Integer halfYearly) {
        this.halfYearly = halfYearly;
    }

    public Integer getAnnually() {
        return annually;
    }

    public void setAnnually(Integer annually) {
        this.annually = annually;
    }

    public Integer getSibling() {
        return sibling;
    }

    public void setSibling(Integer sibling) {
        this.sibling = sibling;
    }

    public Integer getReferral() {
        return referral;
    }

    public void setReferral(Integer referral) {
        this.referral = referral;
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

        DiscountDTO discountDTO = (DiscountDTO) o;
        if (discountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), discountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DiscountDTO{" +
            "id=" + getId() +
            ", subject2=" + getSubject2() +
            ", subject3=" + getSubject3() +
            ", subject4=" + getSubject4() +
            ", subject5=" + getSubject5() +
            ", subject6=" + getSubject6() +
            ", subject7=" + getSubject7() +
            ", subject8=" + getSubject8() +
            ", quarterly=" + getQuarterly() +
            ", halfYearly=" + getHalfYearly() +
            ", annually=" + getAnnually() +
            ", sibling=" + getSibling() +
            ", referral=" + getReferral() +
            ", enterprise=" + getEnterpriseId() +
            ", enterprise='" + getEnterpriseEnterprisename() + "'" +
            ", session=" + getSessionId() +
            ", session='" + getSessionAcadSession() + "'" +
            "}";
    }
}
