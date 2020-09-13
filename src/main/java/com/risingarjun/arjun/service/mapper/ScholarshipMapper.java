package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.ScholarshipDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Scholarship} and its DTO {@link ScholarshipDTO}.
 */
@Mapper(componentModel = "spring", uses = {EnterpriseMapper.class, AcademicsessionMapper.class})
public interface ScholarshipMapper extends EntityMapper<ScholarshipDTO, Scholarship> {

    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.acadSession", target = "sessionAcadSession")
    ScholarshipDTO toDto(Scholarship scholarship);

    @Mapping(source = "enterpriseId", target = "enterprise")
    @Mapping(source = "sessionId", target = "session")
    Scholarship toEntity(ScholarshipDTO scholarshipDTO);

    default Scholarship fromId(Long id) {
        if (id == null) {
            return null;
        }
        Scholarship scholarship = new Scholarship();
        scholarship.setId(id);
        return scholarship;
    }
}
