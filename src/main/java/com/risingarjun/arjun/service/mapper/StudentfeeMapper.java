package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.StudentfeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Studentfee} and its DTO {@link StudentfeeDTO}.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, SubjectMapper.class, AcademicsessionMapper.class, EmployeeMapper.class})
public interface StudentfeeMapper extends EntityMapper<StudentfeeDTO, Studentfee> {

    @Mapping(source = "registrationno.id", target = "registrationnoId")
    @Mapping(source = "registrationno.studentRegId", target = "registrationnoStudentRegId")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.subjectTitle", target = "subjectSubjectTitle")
    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.acadSession", target = "sessionAcadSession")
    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "teacher.employeeId", target = "teacherEmployeeId")
    StudentfeeDTO toDto(Studentfee studentfee);

    @Mapping(source = "registrationnoId", target = "registrationno")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "sessionId", target = "session")
    @Mapping(source = "teacherId", target = "teacher")
    Studentfee toEntity(StudentfeeDTO studentfeeDTO);

    default Studentfee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Studentfee studentfee = new Studentfee();
        studentfee.setId(id);
        return studentfee;
    }
}
