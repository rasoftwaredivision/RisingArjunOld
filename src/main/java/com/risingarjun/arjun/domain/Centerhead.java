package com.risingarjun.arjun.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Centerhead.
 */
@Entity
@Table(name = "centerhead")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Centerhead implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Employee centerhead;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "centerhead_center",
               joinColumns = @JoinColumn(name = "centerhead_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "center_id", referencedColumnName = "id"))
    private Set<Center> centers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getCenterhead() {
        return centerhead;
    }

    public Centerhead centerhead(Employee employee) {
        this.centerhead = employee;
        return this;
    }

    public void setCenterhead(Employee employee) {
        this.centerhead = employee;
    }

    public Set<Center> getCenters() {
        return centers;
    }

    public Centerhead centers(Set<Center> centers) {
        this.centers = centers;
        return this;
    }

    public Centerhead addCenter(Center center) {
        this.centers.add(center);
        center.getCenterheads().add(this);
        return this;
    }

    public Centerhead removeCenter(Center center) {
        this.centers.remove(center);
        center.getCenterheads().remove(this);
        return this;
    }

    public void setCenters(Set<Center> centers) {
        this.centers = centers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Centerhead)) {
            return false;
        }
        return id != null && id.equals(((Centerhead) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Centerhead{" +
            "id=" + getId() +
            "}";
    }
}
