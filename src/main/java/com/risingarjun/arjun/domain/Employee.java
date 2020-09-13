package com.risingarjun.arjun.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.risingarjun.arjun.domain.enumeration.Jobnature;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "employee_id", nullable = false, unique = true)
    private String employeeId;

    @Enumerated(EnumType.STRING)
    @Column(name = "job_nature")
    private Jobnature jobNature;

    @Column(name = "bgc")
    private Boolean bgc;

    @Lob
    @Column(name = "resume")
    private byte[] resume;

    @Column(name = "resume_content_type")
    private String resumeContentType;

    @Column(name = "pan")
    private String pan;

    @Column(name = "account_no")
    private String accountNo;

    @Column(name = "bank")
    private String bank;

    @Column(name = "ifsc")
    private String ifsc;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public Employee employeeId(String employeeId) {
        this.employeeId = employeeId;
        return this;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Jobnature getJobNature() {
        return jobNature;
    }

    public Employee jobNature(Jobnature jobNature) {
        this.jobNature = jobNature;
        return this;
    }

    public void setJobNature(Jobnature jobNature) {
        this.jobNature = jobNature;
    }

    public Boolean isBgc() {
        return bgc;
    }

    public Employee bgc(Boolean bgc) {
        this.bgc = bgc;
        return this;
    }

    public void setBgc(Boolean bgc) {
        this.bgc = bgc;
    }

    public byte[] getResume() {
        return resume;
    }

    public Employee resume(byte[] resume) {
        this.resume = resume;
        return this;
    }

    public void setResume(byte[] resume) {
        this.resume = resume;
    }

    public String getResumeContentType() {
        return resumeContentType;
    }

    public Employee resumeContentType(String resumeContentType) {
        this.resumeContentType = resumeContentType;
        return this;
    }

    public void setResumeContentType(String resumeContentType) {
        this.resumeContentType = resumeContentType;
    }

    public String getPan() {
        return pan;
    }

    public Employee pan(String pan) {
        this.pan = pan;
        return this;
    }

    public void setPan(String pan) {
        this.pan = pan;
    }

    public String getAccountNo() {
        return accountNo;
    }

    public Employee accountNo(String accountNo) {
        this.accountNo = accountNo;
        return this;
    }

    public void setAccountNo(String accountNo) {
        this.accountNo = accountNo;
    }

    public String getBank() {
        return bank;
    }

    public Employee bank(String bank) {
        this.bank = bank;
        return this;
    }

    public void setBank(String bank) {
        this.bank = bank;
    }

    public String getIfsc() {
        return ifsc;
    }

    public Employee ifsc(String ifsc) {
        this.ifsc = ifsc;
        return this;
    }

    public void setIfsc(String ifsc) {
        this.ifsc = ifsc;
    }

    public User getUser() {
        return user;
    }

    public Employee user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", employeeId='" + getEmployeeId() + "'" +
            ", jobNature='" + getJobNature() + "'" +
            ", bgc='" + isBgc() + "'" +
            ", resume='" + getResume() + "'" +
            ", resumeContentType='" + getResumeContentType() + "'" +
            ", pan='" + getPan() + "'" +
            ", accountNo='" + getAccountNo() + "'" +
            ", bank='" + getBank() + "'" +
            ", ifsc='" + getIfsc() + "'" +
            "}";
    }
}
