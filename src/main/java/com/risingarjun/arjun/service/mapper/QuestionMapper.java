package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.QuestionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Question} and its DTO {@link QuestionDTO}.
 */
@Mapper(componentModel = "spring", uses = {EnterpriseMapper.class, CourseMapper.class, SubjectMapper.class, ChapterMapper.class, EmployeeMapper.class, FundamentaldetailMapper.class})
public interface QuestionMapper extends EntityMapper<QuestionDTO, Question> {

    @Mapping(source = "enterprise.id", target = "enterpriseId")
    @Mapping(source = "enterprise.enterprisename", target = "enterpriseEnterprisename")
    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.course", target = "courseCourse")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.subjectTitle", target = "subjectSubjectTitle")
    @Mapping(source = "chapter.id", target = "chapterId")
    @Mapping(source = "chapter.chapterTitle", target = "chapterChapterTitle")
    @Mapping(source = "writer.id", target = "writerId")
    @Mapping(source = "writer.employeeId", target = "writerEmployeeId")
    @Mapping(source = "approver.id", target = "approverId")
    @Mapping(source = "approver.employeeId", target = "approverEmployeeId")
    QuestionDTO toDto(Question question);

    @Mapping(source = "enterpriseId", target = "enterprise")
    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "subjectId", target = "subject")
    @Mapping(source = "chapterId", target = "chapter")
    @Mapping(source = "writerId", target = "writer")
    @Mapping(source = "approverId", target = "approver")
    @Mapping(target = "removeFundamentals", ignore = true)
    Question toEntity(QuestionDTO questionDTO);

    default Question fromId(Long id) {
        if (id == null) {
            return null;
        }
        Question question = new Question();
        question.setId(id);
        return question;
    }
}
