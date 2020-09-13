package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.StudentsubjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Studentsubject} and its DTO {@link StudentsubjectDTO}.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, AcademicsessionMapper.class, SubjectMapper.class, CourseMapper.class})
public interface StudentsubjectMapper extends EntityMapper<StudentsubjectDTO, Studentsubject> {

    @Mapping(source = "registrationno.id", target = "registrationnoId")
    @Mapping(source = "registrationno.studentRegId", target = "registrationnoStudentRegId")
    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.acadSession", target = "sessionAcadSession")
    StudentsubjectDTO toDto(Studentsubject studentsubject);

    @Mapping(source = "registrationnoId", target = "registrationno")
    @Mapping(source = "sessionId", target = "session")
    @Mapping(target = "removeSubjects", ignore = true)
    @Mapping(target = "removeCourse", ignore = true)
    Studentsubject toEntity(StudentsubjectDTO studentsubjectDTO);

    default Studentsubject fromId(Long id) {
        if (id == null) {
            return null;
        }
        Studentsubject studentsubject = new Studentsubject();
        studentsubject.setId(id);
        return studentsubject;
    }
}
