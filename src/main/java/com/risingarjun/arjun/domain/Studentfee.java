package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.risingarjun.arjun.domain.enumeration.Month;

/**
 * A Studentfee.
 */
@Entity
@Table(name = "studentfee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Studentfee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fee")
    private Integer fee;

    @Column(name = "fee_correction")
    private Integer feeCorrection;

    @Enumerated(EnumType.STRING)
    @Column(name = "month")
    private Month month;

    @Column(name = "fee_status")
    private Boolean feeStatus;

    @Column(name = "remarks")
    private String remarks;

    @OneToOne
    @JoinColumn(unique = true)
    private Student registrationno;

    @ManyToOne
    @JsonIgnoreProperties("studentfees")
    private Subject subject;

    @ManyToOne
    @JsonIgnoreProperties("studentfees")
    private Academicsession session;

    @ManyToOne
    @JsonIgnoreProperties("studentfees")
    private Employee teacher;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getFee() {
        return fee;
    }

    public Studentfee fee(Integer fee) {
        this.fee = fee;
        return this;
    }

    public void setFee(Integer fee) {
        this.fee = fee;
    }

    public Integer getFeeCorrection() {
        return feeCorrection;
    }

    public Studentfee feeCorrection(Integer feeCorrection) {
        this.feeCorrection = feeCorrection;
        return this;
    }

    public void setFeeCorrection(Integer feeCorrection) {
        this.feeCorrection = feeCorrection;
    }

    public Month getMonth() {
        return month;
    }

    public Studentfee month(Month month) {
        this.month = month;
        return this;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public Boolean isFeeStatus() {
        return feeStatus;
    }

    public Studentfee feeStatus(Boolean feeStatus) {
        this.feeStatus = feeStatus;
        return this;
    }

    public void setFeeStatus(Boolean feeStatus) {
        this.feeStatus = feeStatus;
    }

    public String getRemarks() {
        return remarks;
    }

    public Studentfee remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Student getRegistrationno() {
        return registrationno;
    }

    public Studentfee registrationno(Student student) {
        this.registrationno = student;
        return this;
    }

    public void setRegistrationno(Student student) {
        this.registrationno = student;
    }

    public Subject getSubject() {
        return subject;
    }

    public Studentfee subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Academicsession getSession() {
        return session;
    }

    public Studentfee session(Academicsession academicsession) {
        this.session = academicsession;
        return this;
    }

    public void setSession(Academicsession academicsession) {
        this.session = academicsession;
    }

    public Employee getTeacher() {
        return teacher;
    }

    public Studentfee teacher(Employee employee) {
        this.teacher = employee;
        return this;
    }

    public void setTeacher(Employee employee) {
        this.teacher = employee;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Studentfee)) {
            return false;
        }
        return id != null && id.equals(((Studentfee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Studentfee{" +
            "id=" + getId() +
            ", fee=" + getFee() +
            ", feeCorrection=" + getFeeCorrection() +
            ", month='" + getMonth() + "'" +
            ", feeStatus='" + isFeeStatus() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
