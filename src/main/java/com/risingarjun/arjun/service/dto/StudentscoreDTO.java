package com.risingarjun.arjun.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Studentscore} entity.
 */
public class StudentscoreDTO implements Serializable {

    private Long id;

    @NotNull
    private String answer;

    @NotNull
    private Integer score;

    @NotNull
    private LocalDate date;


    private Long studentId;

    private String studentStudentRegId;

    private Long questionId;

    private String questionQuestion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentStudentRegId() {
        return studentStudentRegId;
    }

    public void setStudentStudentRegId(String studentStudentRegId) {
        this.studentStudentRegId = studentStudentRegId;
    }

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public String getQuestionQuestion() {
        return questionQuestion;
    }

    public void setQuestionQuestion(String questionQuestion) {
        this.questionQuestion = questionQuestion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentscoreDTO studentscoreDTO = (StudentscoreDTO) o;
        if (studentscoreDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentscoreDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentscoreDTO{" +
            "id=" + getId() +
            ", answer='" + getAnswer() + "'" +
            ", score=" + getScore() +
            ", date='" + getDate() + "'" +
            ", student=" + getStudentId() +
            ", student='" + getStudentStudentRegId() + "'" +
            ", question=" + getQuestionId() +
            ", question='" + getQuestionQuestion() + "'" +
            "}";
    }
}
