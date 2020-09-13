package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.UserpreferenceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Userpreference} and its DTO {@link UserpreferenceDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UserpreferenceMapper extends EntityMapper<UserpreferenceDTO, Userpreference> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    UserpreferenceDTO toDto(Userpreference userpreference);

    @Mapping(source = "userId", target = "user")
    Userpreference toEntity(UserpreferenceDTO userpreferenceDTO);

    default Userpreference fromId(Long id) {
        if (id == null) {
            return null;
        }
        Userpreference userpreference = new Userpreference();
        userpreference.setId(id);
        return userpreference;
    }
}
