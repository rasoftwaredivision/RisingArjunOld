package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.CourseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Course} and its DTO {@link CourseDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CourseMapper extends EntityMapper<CourseDTO, Course> {


    @Mapping(target = "students", ignore = true)
    @Mapping(target = "removeStudent", ignore = true)
    @Mapping(target = "studentsubjects", ignore = true)
    @Mapping(target = "removeStudentsubjects", ignore = true)
    @Mapping(target = "teachers", ignore = true)
    @Mapping(target = "removeTeachers", ignore = true)
    Course toEntity(CourseDTO courseDTO);

    default Course fromId(Long id) {
        if (id == null) {
            return null;
        }
        Course course = new Course();
        course.setId(id);
        return course;
    }
}
