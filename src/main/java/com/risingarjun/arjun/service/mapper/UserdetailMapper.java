package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.UserdetailDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Userdetail} and its DTO {@link UserdetailDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, EnterpriseMapper.class})
public interface UserdetailMapper extends EntityMapper<UserdetailDTO, Userdetail> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    UserdetailDTO toDto(Userdetail userdetail);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "enterpriseId", target = "enterprise")
    Userdetail toEntity(UserdetailDTO userdetailDTO);

    default Userdetail fromId(Long id) {
        if (id == null) {
            return null;
        }
        Userdetail userdetail = new Userdetail();
        userdetail.setId(id);
        return userdetail;
    }
}
