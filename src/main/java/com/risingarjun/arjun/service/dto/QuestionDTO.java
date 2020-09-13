package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.risingarjun.arjun.domain.enumeration.Questionlevel;
import com.risingarjun.arjun.domain.enumeration.Questionstatus;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Question} entity.
 */
public class QuestionDTO implements Serializable {

    private Long id;

    
    @Lob
    private String question;

    @Lob
    private byte[] diagram;

    private String diagramContentType;
    private String option1;

    private String option2;

    private String option3;

    private String option4;

    @NotNull
    private Boolean multiChoice;

    @NotNull
    private String answer;

    @NotNull
    private Integer maxMarks;

    private Integer negativeMarks;

    @NotNull
    private Integer durationMins;

    @NotNull
    private Questionlevel level;

    private String solution;

    private String video;

    @NotNull
    private Questionstatus status;


    private Long enterpriseId;

    private String enterpriseEnterprisename;

    private Long courseId;

    private String courseCourse;

    private Long subjectId;

    private String subjectSubjectTitle;

    private Long chapterId;

    private String chapterChapterTitle;

    private Long writerId;

    private String writerEmployeeId;

    private Long approverId;

    private String approverEmployeeId;

    private Set<FundamentaldetailDTO> fundamentals = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public byte[] getDiagram() {
        return diagram;
    }

    public void setDiagram(byte[] diagram) {
        this.diagram = diagram;
    }

    public String getDiagramContentType() {
        return diagramContentType;
    }

    public void setDiagramContentType(String diagramContentType) {
        this.diagramContentType = diagramContentType;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public Boolean isMultiChoice() {
        return multiChoice;
    }

    public void setMultiChoice(Boolean multiChoice) {
        this.multiChoice = multiChoice;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getMaxMarks() {
        return maxMarks;
    }

    public void setMaxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
    }

    public Integer getNegativeMarks() {
        return negativeMarks;
    }

    public void setNegativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
    }

    public Integer getDurationMins() {
        return durationMins;
    }

    public void setDurationMins(Integer durationMins) {
        this.durationMins = durationMins;
    }

    public Questionlevel getLevel() {
        return level;
    }

    public void setLevel(Questionlevel level) {
        this.level = level;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getVideo() {
        return video;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Questionstatus getStatus() {
        return status;
    }

    public void setStatus(Questionstatus status) {
        this.status = status;
    }

    public Long getEnterpriseId() {
        return enterpriseId;
    }

    public void setEnterpriseId(Long enterpriseId) {
        this.enterpriseId = enterpriseId;
    }

    public String getEnterpriseEnterprisename() {
        return enterpriseEnterprisename;
    }

    public void setEnterpriseEnterprisename(String enterpriseEnterprisename) {
        this.enterpriseEnterprisename = enterpriseEnterprisename;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseCourse() {
        return courseCourse;
    }

    public void setCourseCourse(String courseCourse) {
        this.courseCourse = courseCourse;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public String getSubjectSubjectTitle() {
        return subjectSubjectTitle;
    }

    public void setSubjectSubjectTitle(String subjectSubjectTitle) {
        this.subjectSubjectTitle = subjectSubjectTitle;
    }

    public Long getChapterId() {
        return chapterId;
    }

    public void setChapterId(Long chapterId) {
        this.chapterId = chapterId;
    }

    public String getChapterChapterTitle() {
        return chapterChapterTitle;
    }

    public void setChapterChapterTitle(String chapterChapterTitle) {
        this.chapterChapterTitle = chapterChapterTitle;
    }

    public Long getWriterId() {
        return writerId;
    }

    public void setWriterId(Long employeeId) {
        this.writerId = employeeId;
    }

    public String getWriterEmployeeId() {
        return writerEmployeeId;
    }

    public void setWriterEmployeeId(String employeeEmployeeId) {
        this.writerEmployeeId = employeeEmployeeId;
    }

    public Long getApproverId() {
        return approverId;
    }

    public void setApproverId(Long employeeId) {
        this.approverId = employeeId;
    }

    public String getApproverEmployeeId() {
        return approverEmployeeId;
    }

    public void setApproverEmployeeId(String employeeEmployeeId) {
        this.approverEmployeeId = employeeEmployeeId;
    }

    public Set<FundamentaldetailDTO> getFundamentals() {
        return fundamentals;
    }

    public void setFundamentals(Set<FundamentaldetailDTO> fundamentaldetails) {
        this.fundamentals = fundamentaldetails;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        QuestionDTO questionDTO = (QuestionDTO) o;
        if (questionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
            "id=" + getId() +
            ", question='" + getQuestion() + "'" +
            ", diagram='" + getDiagram() + "'" +
            ", option1='" + getOption1() + "'" +
            ", option2='" + getOption2() + "'" +
            ", option3='" + getOption3() + "'" +
            ", option4='" + getOption4() + "'" +
            ", multiChoice='" + isMultiChoice() + "'" +
            ", answer='" + getAnswer() + "'" +
            ", maxMarks=" + getMaxMarks() +
            ", negativeMarks=" + getNegativeMarks() +
            ", durationMins=" + getDurationMins() +
            ", level='" + getLevel() + "'" +
            ", solution='" + getSolution() + "'" +
            ", video='" + getVideo() + "'" +
            ", status='" + getStatus() + "'" +
            ", enterprise=" + getEnterpriseId() +
            ", enterprise='" + getEnterpriseEnterprisename() + "'" +
            ", course=" + getCourseId() +
            ", course='" + getCourseCourse() + "'" +
            ", subject=" + getSubjectId() +
            ", subject='" + getSubjectSubjectTitle() + "'" +
            ", chapter=" + getChapterId() +
            ", chapter='" + getChapterChapterTitle() + "'" +
            ", writer=" + getWriterId() +
            ", writer='" + getWriterEmployeeId() + "'" +
            ", approver=" + getApproverId() +
            ", approver='" + getApproverEmployeeId() + "'" +
            "}";
    }
}
