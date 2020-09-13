package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.risingarjun.arjun.domain.enumeration.City;

import com.risingarjun.arjun.domain.enumeration.State;

import com.risingarjun.arjun.domain.enumeration.Country;

/**
 * A Center.
 */
@Entity
@Table(name = "center")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Center implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "center_code", nullable = false, unique = true)
    private String centerCode;

    @NotNull
    @Column(name = "center_title", nullable = false, unique = true)
    private String centerTitle;

    @Column(name = "street")
    private String street;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "city", nullable = false)
    private City city;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private State state;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "country", nullable = false)
    private Country country;

    @Column(name = "pincode")
    private Integer pincode;

    @ManyToOne
    @JsonIgnoreProperties("centers")
    private Enterprise enterprise;

    @ManyToMany(mappedBy = "centers")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Centerhead> centerheads = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCenterCode() {
        return centerCode;
    }

    public Center centerCode(String centerCode) {
        this.centerCode = centerCode;
        return this;
    }

    public void setCenterCode(String centerCode) {
        this.centerCode = centerCode;
    }

    public String getCenterTitle() {
        return centerTitle;
    }

    public Center centerTitle(String centerTitle) {
        this.centerTitle = centerTitle;
        return this;
    }

    public void setCenterTitle(String centerTitle) {
        this.centerTitle = centerTitle;
    }

    public String getStreet() {
        return street;
    }

    public Center street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public City getCity() {
        return city;
    }

    public Center city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public State getState() {
        return state;
    }

    public Center state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Country getCountry() {
        return country;
    }

    public Center country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Integer getPincode() {
        return pincode;
    }

    public Center pincode(Integer pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(Integer pincode) {
        this.pincode = pincode;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Center enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }

    public Set<Centerhead> getCenterheads() {
        return centerheads;
    }

    public Center centerheads(Set<Centerhead> centerheads) {
        this.centerheads = centerheads;
        return this;
    }

    public Center addCenterhead(Centerhead centerhead) {
        this.centerheads.add(centerhead);
        centerhead.getCenters().add(this);
        return this;
    }

    public Center removeCenterhead(Centerhead centerhead) {
        this.centerheads.remove(centerhead);
        centerhead.getCenters().remove(this);
        return this;
    }

    public void setCenterheads(Set<Centerhead> centerheads) {
        this.centerheads = centerheads;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Center)) {
            return false;
        }
        return id != null && id.equals(((Center) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Center{" +
            "id=" + getId() +
            ", centerCode='" + getCenterCode() + "'" +
            ", centerTitle='" + getCenterTitle() + "'" +
            ", street='" + getStreet() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            ", pincode=" + getPincode() +
            "}";
    }
}
