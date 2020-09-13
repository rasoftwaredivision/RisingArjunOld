package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.TeacherDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Teacher} and its DTO {@link TeacherDTO}.
 */
@Mapper(componentModel = "spring", uses = {EmployeeMapper.class, SubjectMapper.class, CourseMapper.class})
public interface TeacherMapper extends EntityMapper<TeacherDTO, Teacher> {

    @Mapping(source = "teacherId.id", target = "teacherIdId")
    @Mapping(source = "teacherId.employeeId", target = "teacherIdEmployeeId")
    TeacherDTO toDto(Teacher teacher);

    @Mapping(source = "teacherIdId", target = "teacherId")
    @Mapping(target = "removeSubjects", ignore = true)
    @Mapping(target = "removeCourses", ignore = true)
    Teacher toEntity(TeacherDTO teacherDTO);

    default Teacher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(id);
        return teacher;
    }
}
