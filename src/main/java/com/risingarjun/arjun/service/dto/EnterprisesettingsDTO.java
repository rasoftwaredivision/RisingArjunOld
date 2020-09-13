package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Enterprisesettings} entity.
 */
public class EnterprisesettingsDTO implements Serializable {

    private Long id;

    private String theme;

    private String foreground;

    private String background;

    private String disclaimer;

    private String policy;

    private String copyrights;

    private String termsOfUsage;


    private Long adminId;

    private String adminLogin;

    private Long enterpriseId;

    private String enterpriseEnterprisename;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getForeground() {
        return foreground;
    }

    public void setForeground(String foreground) {
        this.foreground = foreground;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public String getDisclaimer() {
        return disclaimer;
    }

    public void setDisclaimer(String disclaimer) {
        this.disclaimer = disclaimer;
    }

    public String getPolicy() {
        return policy;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public String getCopyrights() {
        return copyrights;
    }

    public void setCopyrights(String copyrights) {
        this.copyrights = copyrights;
    }

    public String getTermsOfUsage() {
        return termsOfUsage;
    }

    public void setTermsOfUsage(String termsOfUsage) {
        this.termsOfUsage = termsOfUsage;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long userId) {
        this.adminId = userId;
    }

    public String getAdminLogin() {
        return adminLogin;
    }

    public void setAdminLogin(String userLogin) {
        this.adminLogin = userLogin;
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

        EnterprisesettingsDTO enterprisesettingsDTO = (EnterprisesettingsDTO) o;
        if (enterprisesettingsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), enterprisesettingsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EnterprisesettingsDTO{" +
            "id=" + getId() +
            ", theme='" + getTheme() + "'" +
            ", foreground='" + getForeground() + "'" +
            ", background='" + getBackground() + "'" +
            ", disclaimer='" + getDisclaimer() + "'" +
            ", policy='" + getPolicy() + "'" +
            ", copyrights='" + getCopyrights() + "'" +
            ", termsOfUsage='" + getTermsOfUsage() + "'" +
            ", admin=" + getAdminId() +
            ", admin='" + getAdminLogin() + "'" +
            ", enterprise=" + getEnterpriseId() +
            ", enterprise='" + getEnterpriseEnterprisename() + "'" +
            "}";
    }
}
