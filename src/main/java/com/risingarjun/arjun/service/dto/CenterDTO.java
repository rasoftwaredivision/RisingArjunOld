package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.City;
import com.risingarjun.arjun.domain.enumeration.State;
import com.risingarjun.arjun.domain.enumeration.Country;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Center} entity.
 */
public class CenterDTO implements Serializable {

    private Long id;

    @NotNull
    private String centerCode;

    @NotNull
    private String centerTitle;

    private String street;

    @NotNull
    private City city;

    @NotNull
    private State state;

    @NotNull
    private Country country;

    private Integer pincode;


    private Long enterpriseId;

    private String enterpriseEnterprisename;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCenterCode() {
        return centerCode;
    }

    public void setCenterCode(String centerCode) {
        this.centerCode = centerCode;
    }

    public String getCenterTitle() {
        return centerTitle;
    }

    public void setCenterTitle(String centerTitle) {
        this.centerTitle = centerTitle;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Integer getPincode() {
        return pincode;
    }

    public void setPincode(Integer pincode) {
        this.pincode = pincode;
    }

    public Long getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(Long enterpriseId) {
        this.enterpriseId = enterpriseId;
    }

    public String getEnterpriseEnterprisename() {
        return enterpriseEnterprisename;
    }

    public void setEnterpriseEnterprisename(String enterpriseEnterprisename) {
        this.enterpriseEnterprisename = enterpriseEnterprisename;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CenterDTO centerDTO = (CenterDTO) o;
        if (centerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), centerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CenterDTO{" +
            "id=" + getId() +
            ", centerCode='" + getCenterCode() + "'" +
            ", centerTitle='" + getCenterTitle() + "'" +
            ", street='" + getStreet() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            ", pincode=" + getPincode() +
            ", enterprise=" + getEnterpriseId() +
            ", enterprise='" + getEnterpriseEnterprisename() + "'" +
            "}";
    }
}
