package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.CenterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Center} and its DTO {@link CenterDTO}.
 */
@Mapper(componentModel = "spring", uses = {EnterpriseMapper.class})
public interface CenterMapper extends EntityMapper<CenterDTO, Center> {

    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    CenterDTO toDto(Center center);

    @Mapping(source = "enterpriseId", target = "enterprise")
    @Mapping(target = "centerheads", ignore = true)
    @Mapping(target = "removeCenterhead", ignore = true)
    Center toEntity(CenterDTO centerDTO);

    default Center fromId(Long id) {
        if (id == null) {
            return null;
        }
        Center center = new Center();
        center.setId(id);
        return center;
    }
}
