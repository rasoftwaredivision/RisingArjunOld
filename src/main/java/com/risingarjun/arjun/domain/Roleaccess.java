package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Roleaccess.
 */
@Entity
@Table(name = "roleaccess")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Roleaccess implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_create")
    private Boolean create;

    @Column(name = "jhi_read")
    private Boolean read;

    @Column(name = "jhi_update")
    private Boolean update;

    @Column(name = "del")
    private Boolean del;

    @ManyToOne
    @JsonIgnoreProperties("roleaccesses")
    private Jhiauthority role;

    @ManyToOne
    @JsonIgnoreProperties("roleaccesses")
    private Feature feature;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isCreate() {
        return create;
    }

    public Roleaccess create(Boolean create) {
        this.create = create;
        return this;
    }

    public void setCreate(Boolean create) {
        this.create = create;
    }

    public Boolean isRead() {
        return read;
    }

    public Roleaccess read(Boolean read) {
        this.read = read;
        return this;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public Boolean isUpdate() {
        return update;
    }

    public Roleaccess update(Boolean update) {
        this.update = update;
        return this;
    }

    public void setUpdate(Boolean update) {
        this.update = update;
    }

    public Boolean isDel() {
        return del;
    }

    public Roleaccess del(Boolean del) {
        this.del = del;
        return this;
    }

    public void setDel(Boolean del) {
        this.del = del;
    }

    public Jhiauthority getRole() {
        return role;
    }

    public Roleaccess role(Jhiauthority jhiauthority) {
        this.role = jhiauthority;
        return this;
    }

    public void setRole(Jhiauthority jhiauthority) {
        this.role = jhiauthority;
    }

    public Feature getFeature() {
        return feature;
    }

    public Roleaccess feature(Feature feature) {
        this.feature = feature;
        return this;
    }

    public void setFeature(Feature feature) {
        this.feature = feature;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Roleaccess)) {
            return false;
        }
        return id != null && id.equals(((Roleaccess) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Roleaccess{" +
            "id=" + getId() +
            ", create='" + isCreate() + "'" +
            ", read='" + isRead() + "'" +
            ", update='" + isUpdate() + "'" +
            ", del='" + isDel() + "'" +
            "}";
    }
}
