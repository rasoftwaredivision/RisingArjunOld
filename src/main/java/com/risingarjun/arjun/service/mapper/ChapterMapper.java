package com.risingarjun.arjun.service.mapper;

import com.risingarjun.arjun.domain.*;
import com.risingarjun.arjun.service.dto.ChapterDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Chapter} and its DTO {@link ChapterDTO}.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, SubjectMapper.class})
public interface ChapterMapper extends EntityMapper<ChapterDTO, Chapter> {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "course.course", target = "courseCourse")
    @Mapping(source = "subject.id", target = "subjectId")
    @Mapping(source = "subject.subjectTitle", target = "subjectSubjectTitle")
    ChapterDTO toDto(Chapter chapter);

    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "subjectId", target = "subject")
    Chapter toEntity(ChapterDTO chapterDTO);

    default Chapter fromId(Long id) {
        if (id == null) {
            return null;
        }
        Chapter chapter = new Chapter();
        chapter.setId(id);
        return chapter;
    }
}
