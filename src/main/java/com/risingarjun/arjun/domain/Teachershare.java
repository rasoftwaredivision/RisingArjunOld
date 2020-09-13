package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.risingarjun.arjun.domain.enumeration.Month;

/**
 * A Teachershare.
 */
@Entity
@Table(name = "teachershare")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Teachershare implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Max(value = 100)
    @Column(name = "share_percent", nullable = false)
    private Integer sharePercent;

    @NotNull
    @Column(name = "planned_classes", nullable = false)
    private Integer plannedClasses;

    @NotNull
    @Column(name = "actual_classes", nullable = false)
    private Integer actualClasses;

    @Column(name = "share_correction")
    private Integer shareCorrection;

    @Column(name = "share")
    private Integer share;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "month", nullable = false)
    private Month month;

    @Column(name = "remarks")
    private String remarks;

    @ManyToOne
    @JsonIgnoreProperties("teachershares")
    private Employee teacherId;

    @ManyToOne
    @JsonIgnoreProperties("teachershares")
    private Subject subject;

    @ManyToOne
    @JsonIgnoreProperties("teachershares")
    private Academicsession session;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSharePercent() {
        return sharePercent;
    }

    public Teachershare sharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
        return this;
    }

    public void setSharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
    }

    public Integer getPlannedClasses() {
        return plannedClasses;
    }

    public Teachershare plannedClasses(Integer plannedClasses) {
        this.plannedClasses = plannedClasses;
        return this;
    }

    public void setPlannedClasses(Integer plannedClasses) {
        this.plannedClasses = plannedClasses;
    }

    public Integer getActualClasses() {
        return actualClasses;
    }

    public Teachershare actualClasses(Integer actualClasses) {
        this.actualClasses = actualClasses;
        return this;
    }

    public void setActualClasses(Integer actualClasses) {
        this.actualClasses = actualClasses;
    }

    public Integer getShareCorrection() {
        return shareCorrection;
    }

    public Teachershare shareCorrection(Integer shareCorrection) {
        this.shareCorrection = shareCorrection;
        return this;
    }

    public void setShareCorrection(Integer shareCorrection) {
        this.shareCorrection = shareCorrection;
    }

    public Integer getShare() {
        return share;
    }

    public Teachershare share(Integer share) {
        this.share = share;
        return this;
    }

    public void setShare(Integer share) {
        this.share = share;
    }

    public Month getMonth() {
        return month;
    }

    public Teachershare month(Month month) {
        this.month = month;
        return this;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public String getRemarks() {
        return remarks;
    }

    public Teachershare remarks(String remarks) {
        this.remarks = remarks;
        return this;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Employee getTeacherId() {
        return teacherId;
    }

    public Teachershare teacherId(Employee employee) {
        this.teacherId = employee;
        return this;
    }

    public void setTeacherId(Employee employee) {
        this.teacherId = employee;
    }

    public Subject getSubject() {
        return subject;
    }

    public Teachershare subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Academicsession getSession() {
        return session;
    }

    public Teachershare session(Academicsession academicsession) {
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
        if (!(o instanceof Teachershare)) {
            return false;
        }
        return id != null && id.equals(((Teachershare) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Teachershare{" +
            "id=" + getId() +
            ", sharePercent=" + getSharePercent() +
            ", plannedClasses=" + getPlannedClasses() +
            ", actualClasses=" + getActualClasses() +
            ", shareCorrection=" + getShareCorrection() +
            ", share=" + getShare() +
            ", month='" + getMonth() + "'" +
            ", remarks='" + getRemarks() + "'" +
            "}";
    }
}
