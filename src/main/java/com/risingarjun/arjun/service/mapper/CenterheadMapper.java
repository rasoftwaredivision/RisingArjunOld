package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.CenterheadDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Centerhead} and its DTO {@link CenterheadDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, CenterMapper.class})
public interface CenterheadMapper extends EntityMapper<CenterheadDTO, Centerhead> {

    @Mapping(source = "centerhead.id", target = "centerheadId")
    @Mapping(source = "centerhead.employeeId", target = "centerheadEmployeeId")
    CenterheadDTO toDto(Centerhead centerhead);

    @Mapping(source = "centerheadId", target = "centerhead")
    @Mapping(target = "removeCenter", ignore = true)
    Centerhead toEntity(CenterheadDTO centerheadDTO);

    default Centerhead fromId(Long id) {
        if (id == null) {
            return null;
        }
        Centerhead centerhead = new Centerhead();
        centerhead.setId(id);
        return centerhead;
    }
}
