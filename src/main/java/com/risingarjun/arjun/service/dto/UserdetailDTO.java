package com.risingarjun.arjun.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.City;
import com.risingarjun.arjun.domain.enumeration.State;
import com.risingarjun.arjun.domain.enumeration.Country;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Userdetail} entity.
 */
public class UserdetailDTO implements Serializable {

    private Long id;

    @NotNull
    private String mobileNo;

    @NotNull
    private LocalDate dob;

    @NotNull
    private String houseNo;

    private String street;

    @NotNull
    private City city;

    @NotNull
    private State state;

    @NotNull
    private Country country;

    private Integer pincode;


    private Long userId;

    private String userLogin;

    private Long enterpriseId;

    private String enterpriseEnterprisename;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
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

        UserdetailDTO userdetailDTO = (UserdetailDTO) o;
        if (userdetailDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userdetailDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserdetailDTO{" +
            "id=" + getId() +
            ", mobileNo='" + getMobileNo() + "'" +
            ", dob='" + getDob() + "'" +
            ", houseNo='" + getHouseNo() + "'" +
            ", street='" + getStreet() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", country='" + getCountry() + "'" +
            ", pincode=" + getPincode() +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            ", enterprise=" + getEnterpriseId() +
            ", enterprise='" + getEnterpriseEnterprisename() + "'" +
            "}";
    }
}
