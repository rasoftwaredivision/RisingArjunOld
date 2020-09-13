package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Roleaccess} entity.
 */
public class RoleaccessDTO implements Serializable {

    private Long id;

    private Boolean create;

    private Boolean read;

    private Boolean update;

    private Boolean del;


    private Long roleId;

    private String roleName;

    private Long featureId;

    private String featureFeatureDetail;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isCreate() {
        return create;
    }

    public void setCreate(Boolean create) {
        this.create = create;
    }

    public Boolean isRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public Boolean isUpdate() {
        return update;
    }

    public void setUpdate(Boolean update) {
        this.update = update;
    }

    public Boolean isDel() {
        return del;
    }

    public void setDel(Boolean del) {
        this.del = del;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long jhiauthorityId) {
        this.roleId = jhiauthorityId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String jhiauthorityName) {
        this.roleName = jhiauthorityName;
    }

    public Long getFeatureId() {
        return featureId;
    }

    public void setFeatureId(Long featureId) {
        this.featureId = featureId;
    }

    public String getFeatureFeatureDetail() {
        return featureFeatureDetail;
    }

    public void setFeatureFeatureDetail(String featureFeatureDetail) {
        this.featureFeatureDetail = featureFeatureDetail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RoleaccessDTO roleaccessDTO = (RoleaccessDTO) o;
        if (roleaccessDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), roleaccessDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RoleaccessDTO{" +
            "id=" + getId() +
            ", create='" + isCreate() + "'" +
            ", read='" + isRead() + "'" +
            ", update='" + isUpdate() + "'" +
            ", del='" + isDel() + "'" +
            ", role=" + getRoleId() +
            ", role='" + getRoleName() + "'" +
            ", feature=" + getFeatureId() +
            ", feature='" + getFeatureFeatureDetail() + "'" +
            "}";
    }
}
