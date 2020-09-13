package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.StudentscoreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Studentscore} and its DTO {@link StudentscoreDTO}.
 */
@Mapper(componentModel = "spring", uses = {StudentMapper.class, QuestionMapper.class})
public interface StudentscoreMapper extends EntityMapper<StudentscoreDTO, Studentscore> {

    @Mapping(source = "student.id", target = "studentId")
    @Mapping(source = "student.studentRegId", target = "studentStudentRegId")
    @Mapping(source = "question.id", target = "questionId")
    @Mapping(source = "question.question", target = "questionQuestion")
    StudentscoreDTO toDto(Studentscore studentscore);

    @Mapping(source = "studentId", target = "student")
    @Mapping(source = "questionId", target = "question")
    Studentscore toEntity(StudentscoreDTO studentscoreDTO);

    default Studentscore fromId(Long id) {
        if (id == null) {
            return null;
        }
        Studentscore studentscore = new Studentscore();
        studentscore.setId(id);
        return studentscore;
    }
}
