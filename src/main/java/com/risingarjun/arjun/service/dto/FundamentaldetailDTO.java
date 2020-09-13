package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.Fundamental;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Fundamentaldetail} entity.
 */
public class FundamentaldetailDTO implements Serializable {

    private Long id;

    private Fundamental concept;

    private String details;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Fundamental getConcept() {
        return concept;
    }

    public void setConcept(Fundamental concept) {
        this.concept = concept;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FundamentaldetailDTO fundamentaldetailDTO = (FundamentaldetailDTO) o;
        if (fundamentaldetailDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fundamentaldetailDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FundamentaldetailDTO{" +
            "id=" + getId() +
            ", concept='" + getConcept() + "'" +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
