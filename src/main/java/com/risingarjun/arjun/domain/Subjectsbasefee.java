package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Subjectsbasefee.
 */
@Entity
@Table(name = "subjectsbasefee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Subjectsbasefee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "base_fee")
    private Integer baseFee;

    @ManyToOne
    @JsonIgnoreProperties("subjectsbasefees")
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("subjectsbasefees")
    private Enterprise enterprise;

    @ManyToOne
    @JsonIgnoreProperties("subjectsbasefees")
    private Academicsession session;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBaseFee() {
        return baseFee;
    }

    public Subjectsbasefee baseFee(Integer baseFee) {
        this.baseFee = baseFee;
        return this;
    }

    public void setBaseFee(Integer baseFee) {
        this.baseFee = baseFee;
    }

    public Course getCourse() {
        return course;
    }

    public Subjectsbasefee course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Subjectsbasefee enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }

    public Academicsession getSession() {
        return session;
    }

    public Subjectsbasefee session(Academicsession academicsession) {
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
        if (!(o instanceof Subjectsbasefee)) {
            return false;
        }
        return id != null && id.equals(((Subjectsbasefee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Subjectsbasefee{" +
            "id=" + getId() +
            ", baseFee=" + getBaseFee() +
            "}";
    }
}
