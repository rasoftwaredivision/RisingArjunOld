package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.TeachershareDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Teachershare} and its DTO {@link TeachershareDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, SubjectMapper.class, AcademicsessionMapper.class})
public interface TeachershareMapper extends EntityMapper<TeachershareDTO, Teachershare> {

    @Mapping(source = "teacherId.id", target = "teacherIdId")
    @Mapping(source = "teacherId.employeeId", target = "teacherIdEmployeeId")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.subjectTitle", target = "subjectSubjectTitle")
    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.acadSessionId", target = "sessionAcadSessionId")
    TeachershareDTO toDto(Teachershare teachershare);

    @Mapping(source = "teacherIdId", target = "teacherId")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "sessionId", target = "session")
    Teachershare toEntity(TeachershareDTO teachershareDTO);

    default Teachershare fromId(Long id) {
        if (id == null) {
            return null;
        }
        Teachershare teachershare = new Teachershare();
        teachershare.setId(id);
        return teachershare;
    }
}
