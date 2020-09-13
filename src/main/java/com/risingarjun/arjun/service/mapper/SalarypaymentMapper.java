package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.SalarypaymentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Salarypayment} and its DTO {@link SalarypaymentDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, AcademicsessionMapper.class})
public interface SalarypaymentMapper extends EntityMapper<SalarypaymentDTO, Salarypayment> {

    @Mapping(source = "employeeId.id", target = "employeeIdId")
    @Mapping(source = "employeeId.employeeId", target = "employeeIdEmployeeId")
    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.acadSessionId", target = "sessionAcadSessionId")
    SalarypaymentDTO toDto(Salarypayment salarypayment);

    @Mapping(source = "employeeIdId", target = "employeeId")
    @Mapping(source = "sessionId", target = "session")
    Salarypayment toEntity(SalarypaymentDTO salarypaymentDTO);

    default Salarypayment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Salarypayment salarypayment = new Salarypayment();
        salarypayment.setId(id);
        return salarypayment;
    }
}
