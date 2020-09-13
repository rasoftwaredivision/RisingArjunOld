package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.EnterprisesettingsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Enterprisesettings} and its DTO {@link EnterprisesettingsDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, EnterpriseMapper.class})
public interface EnterprisesettingsMapper extends EntityMapper<EnterprisesettingsDTO, Enterprisesettings> {

    @Mapping(source = "admin.id", target = "adminId")
    @Mapping(source = "admin.login", target = "adminLogin")
    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    EnterprisesettingsDTO toDto(Enterprisesettings enterprisesettings);

    @Mapping(source = "adminId", target = "admin")
    @Mapping(source = "enterpriseId", target = "enterprise")
    Enterprisesettings toEntity(EnterprisesettingsDTO enterprisesettingsDTO);

    default Enterprisesettings fromId(Long id) {
        if (id == null) {
            return null;
        }
        Enterprisesettings enterprisesettings = new Enterprisesettings();
        enterprisesettings.setId(id);
        return enterprisesettings;
    }
}
