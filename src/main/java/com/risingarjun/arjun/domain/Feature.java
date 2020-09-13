package com.risingarjun.arjun.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Feature.
 */
@Entity
@Table(name = "feature")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Feature implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "feature_id", nullable = false, unique = true)
    private String featureId;

    @NotNull
    @Column(name = "feature_detail", nullable = false, unique = true)
    private String featureDetail;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeatureId() {
        return featureId;
    }

    public Feature featureId(String featureId) {
        this.featureId = featureId;
        return this;
    }

    public void setFeatureId(String featureId) {
        this.featureId = featureId;
    }

    public String getFeatureDetail() {
        return featureDetail;
    }

    public Feature featureDetail(String featureDetail) {
        this.featureDetail = featureDetail;
        return this;
    }

    public void setFeatureDetail(String featureDetail) {
        this.featureDetail = featureDetail;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Feature)) {
            return false;
        }
        return id != null && id.equals(((Feature) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Feature{" +
            "id=" + getId() +
            ", featureId='" + getFeatureId() + "'" +
            ", featureDetail='" + getFeatureDetail() + "'" +
            "}";
    }
}
