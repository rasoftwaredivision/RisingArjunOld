package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Academicsession} entity.
 */
public class AcademicsessionDTO implements Serializable {

    private Long id;

    @NotNull
    private String acadSessionId;

    @NotNull
    private String acadSession;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAcadSessionId() {
        return acadSessionId;
    }

    public void setAcadSessionId(String acadSessionId) {
        this.acadSessionId = acadSessionId;
    }

    public String getAcadSession() {
        return acadSession;
    }

    public void setAcadSession(String acadSession) {
        this.acadSession = acadSession;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AcademicsessionDTO academicsessionDTO = (AcademicsessionDTO) o;
        if (academicsessionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), academicsessionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AcademicsessionDTO{" +
            "id=" + getId() +
            ", acadSessionId='" + getAcadSessionId() + "'" +
            ", acadSession='" + getAcadSession() + "'" +
            "}";
    }
}
