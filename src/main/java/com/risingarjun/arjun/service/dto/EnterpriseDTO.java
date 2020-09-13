package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.risingarjun.arjun.domain.enumeration.Natureofbusiness;
import com.risingarjun.arjun.domain.enumeration.City;
import com.risingarjun.arjun.domain.enumeration.State;
import com.risingarjun.arjun.domain.enumeration.Country;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Enterprise} entity.
 */
public class EnterpriseDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 20)
    private String abbrevation;

    @NotNull
    @Size(min = 3, max = 64)
    private String enterprisename;

    @NotNull
    private Natureofbusiness natureofbusiness;

    @Lob
    private byte[] logo;

    private String logoContentType;
    private String punchline;

    private String mission;

    private String vision;

    private String principles;

    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    private String email;

    @NotNull
    private String mobile;

    private String landline;

    private String fax;

    @NotNull
    private String plotNo;

    private String street;

    @NotNull
    private City city;

    @NotNull
    private State state;

    @NotNull
    private Country country;

    private Integer pincode;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAbbrevation() {
        return abbrevation;
    }

    public void setAbbrevation(String abbrevation) {
        this.abbrevation = abbrevation;
    }

    public String getEnterprisename() {
        return enterprisename;
    }

    public void setEnterprisename(String enterprisename) {
        this.enterprisename = enterprisename;
    }

    public Natureofbusiness getNatureofbusiness() {
        return natureofbusiness;
    }

    public void setNatureofbusiness(Natureofbusiness natureofbusiness) {
        this.natureofbusiness = natureofbusiness;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public String getPunchline() {
        return punchline;
    }

    public void setPunchline(String punchline) {
        this.punchline = punchline;
    }

    public String getMission() {
        return mission;
    }

    public void setMission(String mission) {
        this.mission = mission;
    }

    public String getVision() {
        return vision;
    }

    public void setVision(String vision) {
        this.vision = vision;
    }

    public String getPrinciples() {
        return principles;
    }

    public void setPrinciples(String principles) {
        this.principles = principles;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLandline() {
        return landline;
    }

    public void setLandline(String landline) {
        this.landline = landline;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getPlotNo() {
        return plotNo;
    }

    public void setPlotNo(String plotNo) {
        this.plotNo = plotNo;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EnterpriseDTO enterpriseDTO = (EnterpriseDTO) o;
        if (enterpriseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enterpriseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EnterpriseDTO{" +
            "id=" + getId() +
            ", abbrevation='" + getAbbrevation() + "'" +
            ", enterprisename='" + getEnterprisename() + "'" +
            ", natureofbusiness='" + getNatureofbusiness() + "'" +
            ", logo='" + getLogo() + "'" +
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
