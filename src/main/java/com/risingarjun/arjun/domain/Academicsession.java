package com.risingarjun.arjun.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Academicsession.
 */
@Entity
@Table(name = "academicsession")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Academicsession implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "acad_session_id", nullable = false, unique = true)
    private String acadSessionId;

    @NotNull
    @Column(name = "acad_session", nullable = false, unique = true)
    private String acadSession;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAcadSessionId() {
        return acadSessionId;
    }

    public Academicsession acadSessionId(String acadSessionId) {
        this.acadSessionId = acadSessionId;
        return this;
    }

    public void setAcadSessionId(String acadSessionId) {
        this.acadSessionId = acadSessionId;
    }

    public String getAcadSession() {
        return acadSession;
    }

    public Academicsession acadSession(String acadSession) {
        this.acadSession = acadSession;
        return this;
    }

    public void setAcadSession(String acadSession) {
        this.acadSession = acadSession;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Academicsession)) {
            return false;
        }
        return id != null && id.equals(((Academicsession) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Academicsession{" +
            "id=" + getId() +
            ", acadSessionId='" + getAcadSessionId() + "'" +
            ", acadSession='" + getAcadSession() + "'" +
            "}";
    }
}
