package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.RoleaccessDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Roleaccess} and its DTO {@link RoleaccessDTO}.
 */
@Mapper(componentModel = "spring", uses = {JhiauthorityMapper.class, FeatureMapper.class})
public interface RoleaccessMapper extends EntityMapper<RoleaccessDTO, Roleaccess> {

    @Mapping(source = "role.id", target = "roleId")
    @Mapping(source = "role.name", target = "roleName")
    @Mapping(source = "feature.id", target = "featureId")
    @Mapping(source = "feature.featureDetail", target = "featureFeatureDetail")
    RoleaccessDTO toDto(Roleaccess roleaccess);

    @Mapping(source = "roleId", target = "role")
    @Mapping(source = "featureId", target = "feature")
    Roleaccess toEntity(RoleaccessDTO roleaccessDTO);

    default Roleaccess fromId(Long id) {
        if (id == null) {
            return null;
        }
        Roleaccess roleaccess = new Roleaccess();
        roleaccess.setId(id);
        return roleaccess;
    }
}
