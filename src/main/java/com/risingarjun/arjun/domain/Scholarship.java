package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Scholarship.
 */
@Entity
@Table(name = "scholarship")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Scholarship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "min_marks")
    private Integer minMarks;

    @Column(name = "percent")
    private Integer percent;

    @ManyToOne
    @JsonIgnoreProperties("scholarships")
    private Enterprise enterprise;

    @ManyToOne
    @JsonIgnoreProperties("scholarships")
    private Academicsession session;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMinMarks() {
        return minMarks;
    }

    public Scholarship minMarks(Integer minMarks) {
        this.minMarks = minMarks;
        return this;
    }

    public void setMinMarks(Integer minMarks) {
        this.minMarks = minMarks;
    }

    public Integer getPercent() {
        return percent;
    }

    public Scholarship percent(Integer percent) {
        this.percent = percent;
        return this;
    }

    public void setPercent(Integer percent) {
        this.percent = percent;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Scholarship enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }

    public Academicsession getSession() {
        return session;
    }

    public Scholarship session(Academicsession academicsession) {
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
        if (!(o instanceof Scholarship)) {
            return false;
        }
        return id != null && id.equals(((Scholarship) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Scholarship{" +
            "id=" + getId() +
            ", minMarks=" + getMinMarks() +
            ", percent=" + getPercent() +
            "}";
    }
}
