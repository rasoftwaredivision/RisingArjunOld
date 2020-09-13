package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Discount.
 */
@Entity
@Table(name = "discount")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Discount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "subject_2")
    private Integer subject2;

    @Column(name = "subject_3")
    private Integer subject3;

    @Column(name = "subject_4")
    private Integer subject4;

    @Column(name = "subject_5")
    private Integer subject5;

    @Column(name = "subject_6")
    private Integer subject6;

    @Column(name = "subject_7")
    private Integer subject7;

    @Column(name = "subject_8")
    private Integer subject8;

    @Column(name = "quarterly")
    private Integer quarterly;

    @Column(name = "half_yearly")
    private Integer halfYearly;

    @Column(name = "annually")
    private Integer annually;

    @Column(name = "sibling")
    private Integer sibling;

    @Column(name = "referral")
    private Integer referral;

    @ManyToOne
    @JsonIgnoreProperties("discounts")
    private Enterprise enterprise;

    @ManyToOne
    @JsonIgnoreProperties("discounts")
    private Academicsession session;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSubject2() {
        return subject2;
    }

    public Discount subject2(Integer subject2) {
        this.subject2 = subject2;
        return this;
    }

    public void setSubject2(Integer subject2) {
        this.subject2 = subject2;
    }

    public Integer getSubject3() {
        return subject3;
    }

    public Discount subject3(Integer subject3) {
        this.subject3 = subject3;
        return this;
    }

    public void setSubject3(Integer subject3) {
        this.subject3 = subject3;
    }

    public Integer getSubject4() {
        return subject4;
    }

    public Discount subject4(Integer subject4) {
        this.subject4 = subject4;
        return this;
    }

    public void setSubject4(Integer subject4) {
        this.subject4 = subject4;
    }

    public Integer getSubject5() {
        return subject5;
    }

    public Discount subject5(Integer subject5) {
        this.subject5 = subject5;
        return this;
    }

    public void setSubject5(Integer subject5) {
        this.subject5 = subject5;
    }

    public Integer getSubject6() {
        return subject6;
    }

    public Discount subject6(Integer subject6) {
        this.subject6 = subject6;
        return this;
    }

    public void setSubject6(Integer subject6) {
        this.subject6 = subject6;
    }

    public Integer getSubject7() {
        return subject7;
    }

    public Discount subject7(Integer subject7) {
        this.subject7 = subject7;
        return this;
    }

    public void setSubject7(Integer subject7) {
        this.subject7 = subject7;
    }

    public Integer getSubject8() {
        return subject8;
    }

    public Discount subject8(Integer subject8) {
        this.subject8 = subject8;
        return this;
    }

    public void setSubject8(Integer subject8) {
        this.subject8 = subject8;
    }

    public Integer getQuarterly() {
        return quarterly;
    }

    public Discount quarterly(Integer quarterly) {
        this.quarterly = quarterly;
        return this;
    }

    public void setQuarterly(Integer quarterly) {
        this.quarterly = quarterly;
    }

    public Integer getHalfYearly() {
        return halfYearly;
    }

    public Discount halfYearly(Integer halfYearly) {
        this.halfYearly = halfYearly;
        return this;
    }

    public void setHalfYearly(Integer halfYearly) {
        this.halfYearly = halfYearly;
    }

    public Integer getAnnually() {
        return annually;
    }

    public Discount annually(Integer annually) {
        this.annually = annually;
        return this;
    }

    public void setAnnually(Integer annually) {
        this.annually = annually;
    }

    public Integer getSibling() {
        return sibling;
    }

    public Discount sibling(Integer sibling) {
        this.sibling = sibling;
        return this;
    }

    public void setSibling(Integer sibling) {
        this.sibling = sibling;
    }

    public Integer getReferral() {
        return referral;
    }

    public Discount referral(Integer referral) {
        this.referral = referral;
        return this;
    }

    public void setReferral(Integer referral) {
        this.referral = referral;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Discount enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }

    public Academicsession getSession() {
        return session;
    }

    public Discount session(Academicsession academicsession) {
        this.session = academicsession;
        return this;
    }

    public void setSession(Academicsession academicsession) {
        this.session = academicsession;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Discount)) {
            return false;
        }
        return id != null && id.equals(((Discount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Discount{" +
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
            "}";
    }
}
