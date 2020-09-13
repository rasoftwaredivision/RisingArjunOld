package com.risingarjun.arjun.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import com.risingarjun.arjun.domain.enumeration.Natureofbusiness;

import com.risingarjun.arjun.domain.enumeration.City;

import com.risingarjun.arjun.domain.enumeration.State;

import com.risingarjun.arjun.domain.enumeration.Country;

/**
 * A Enterprise.
 */
@Entity
@Table(name = "enterprise")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Enterprise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 20)
    @Column(name = "abbrevation", length = 20, nullable = false)
    private String abbrevation;

    @NotNull
    @Size(min = 3, max = 64)
    @Column(name = "enterprisename", length = 64, nullable = false)
    private String enterprisename;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "natureofbusiness", nullable = false)
    private Natureofbusiness natureofbusiness;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @Column(name = "punchline")
    private String punchline;

    @Column(name = "mission")
    private String mission;

    @Column(name = "vision")
    private String vision;

    @Column(name = "principles")
    private String principles;

    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "email")
    private String email;

    @NotNull
    @Column(name = "mobile", nullable = false)
    private String mobile;

    @Column(name = "landline")
    private String landline;

    @Column(name = "fax")
    private String fax;

    @NotNull
    @Column(name = "plot_no", nullable = false)
    private String plotNo;

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

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAbbrevation() {
        return abbrevation;
    }

    public Enterprise abbrevation(String abbrevation) {
        this.abbrevation = abbrevation;
        return this;
    }

    public void setAbbrevation(String abbrevation) {
        this.abbrevation = abbrevation;
    }

    public String getEnterprisename() {
        return enterprisename;
    }

    public Enterprise enterprisename(String enterprisename) {
        this.enterprisename = enterprisename;
        return this;
    }

    public void setEnterprisename(String enterprisename) {
        this.enterprisename = enterprisename;
    }

    public Natureofbusiness getNatureofbusiness() {
        return natureofbusiness;
    }

    public Enterprise natureofbusiness(Natureofbusiness natureofbusiness) {
        this.natureofbusiness = natureofbusiness;
        return this;
    }

    public void setNatureofbusiness(Natureofbusiness natureofbusiness) {
        this.natureofbusiness = natureofbusiness;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Enterprise logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Enterprise logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public String getPunchline() {
        return punchline;
    }

    public Enterprise punchline(String punchline) {
        this.punchline = punchline;
        return this;
    }

    public void setPunchline(String punchline) {
        this.punchline = punchline;
    }

    public String getMission() {
        return mission;
    }

    public Enterprise mission(String mission) {
        this.mission = mission;
        return this;
    }

    public void setMission(String mission) {
        this.mission = mission;
    }

    public String getVision() {
        return vision;
    }

    public Enterprise vision(String vision) {
        this.vision = vision;
        return this;
    }

    public void setVision(String vision) {
        this.vision = vision;
    }

    public String getPrinciples() {
        return principles;
    }

    public Enterprise principles(String principles) {
        this.principles = principles;
        return this;
    }

    public void setPrinciples(String principles) {
        this.principles = principles;
    }

    public String getEmail() {
        return email;
    }

    public Enterprise email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public Enterprise mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLandline() {
        return landline;
    }

    public Enterprise landline(String landline) {
        this.landline = landline;
        return this;
    }

    public void setLandline(String landline) {
        this.landline = landline;
    }

    public String getFax() {
        return fax;
    }

    public Enterprise fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getPlotNo() {
        return plotNo;
    }

    public Enterprise plotNo(String plotNo) {
        this.plotNo = plotNo;
        return this;
    }

    public void setPlotNo(String plotNo) {
        this.plotNo = plotNo;
    }

    public String getStreet() {
        return street;
    }

    public Enterprise street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public City getCity() {
        return city;
    }

    public Enterprise city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public State getState() {
        return state;
    }

    public Enterprise state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Country getCountry() {
        return country;
    }

    public Enterprise country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Integer getPincode() {
        return pincode;
    }

    public Enterprise pincode(Integer pincode) {
        this.pincode = pincode;
        return this;
    }

    public void setPincode(Integer pincode) {
        this.pincode = pincode;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Enterprise)) {
            return false;
        }
        return id != null && id.equals(((Enterprise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Enterprise{" +
            "id=" + getId() +
            ", abbrevation='" + getAbbrevation() + "'" +
            ", enterprisename='" + getEnterprisename() + "'" +
            ", natureofbusiness='" + getNatureofbusiness() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            ", punchline='" + getPunchline() + "'" +
            ", mission='" + getMission() + "'" +
            ", vision='" + getVision() + "'" +
            ", principles='" + getPrinciples() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", landline='" + getLandline() + "'" +
            ", fax='" + getFax() + "'" +
            ", plotNo='" + getPlotNo() + "'" +
            ", street='" + getStreet() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            ", pincode=" + getPincode() +
            "}";
    }
}
