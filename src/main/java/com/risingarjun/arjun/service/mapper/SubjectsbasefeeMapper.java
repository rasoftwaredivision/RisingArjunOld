package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.SubjectsbasefeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Subjectsbasefee} and its DTO {@link SubjectsbasefeeDTO}.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, EnterpriseMapper.class, AcademicsessionMapper.class})
public interface SubjectsbasefeeMapper extends EntityMapper<SubjectsbasefeeDTO, Subjectsbasefee> {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.course", target = "courseCourse")
    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    @Mapping(source = "session.id", target = "sessionId")
    @Mapping(source = "session.acadSession", target = "sessionAcadSession")
    SubjectsbasefeeDTO toDto(Subjectsbasefee subjectsbasefee);

    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "enterpriseId", target = "enterprise")
    @Mapping(source = "sessionId", target = "session")
    Subjectsbasefee toEntity(SubjectsbasefeeDTO subjectsbasefeeDTO);

    default Subjectsbasefee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Subjectsbasefee subjectsbasefee = new Subjectsbasefee();
        subjectsbasefee.setId(id);
        return subjectsbasefee;
    }
}
