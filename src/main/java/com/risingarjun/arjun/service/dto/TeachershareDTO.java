package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.Month;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Teachershare} entity.
 */
public class TeachershareDTO implements Serializable {

    private Long id;

    @NotNull
    @Max(value = 100)
    private Integer sharePercent;

    @NotNull
    private Integer plannedClasses;

    @NotNull
    private Integer actualClasses;

    private Integer shareCorrection;

    private Integer share;

    @NotNull
    private Month month;

    private String remarks;


    private Long teacherIdId;

    private String teacherIdEmployeeId;

    private Long subjectId;

    private String subjectSubjectTitle;

    private Long sessionId;

    private String sessionAcadSessionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSharePercent() {
        return sharePercent;
    }

    public void setSharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
    }

    public Integer getPlannedClasses() {
        return plannedClasses;
    }

    public void setPlannedClasses(Integer plannedClasses) {
        this.plannedClasses = plannedClasses;
    }

    public Integer getActualClasses() {
        return actualClasses;
    }

    public void setActualClasses(Integer actualClasses) {
        this.actualClasses = actualClasses;
    }

    public Integer getShareCorrection() {
        return shareCorrection;
    }

    public void setShareCorrection(Integer shareCorrection) {
        this.shareCorrection = shareCorrection;
    }

    public Integer getShare() {
        return share;
    }

    public void setShare(Integer share) {
        this.share = share;
    }

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Long getTeacherIdId() {
        return teacherIdId;
    }

    public void setTeacherIdId(Long employeeId) {
        this.teacherIdId = employeeId;
    }

    public String getTeacherIdEmployeeId() {
        return teacherIdEmployeeId;
    }

    public void setTeacherIdEmployeeId(String employeeEmployeeId) {
        this.teacherIdEmployeeId = employeeEmployeeId;
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

    public Long getSessionId() {
        return sessionId;
    }

    public void setSessionId(Long academicsessionId) {
        this.sessionId = academicsessionId;
    }

    public String getSessionAcadSessionId() {
        return sessionAcadSessionId;
    }

    public void setSessionAcadSessionId(String academicsessionAcadSessionId) {
        this.sessionAcadSessionId = academicsessionAcadSessionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeachershareDTO teachershareDTO = (TeachershareDTO) o;
        if (teachershareDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teachershareDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeachershareDTO{" +
            "id=" + getId() +
            ", sharePercent=" + getSharePercent() +
            ", plannedClasses=" + getPlannedClasses() +
            ", actualClasses=" + getActualClasses() +
            ", shareCorrection=" + getShareCorrection() +
            ", share=" + getShare() +
            ", month='" + getMonth() + "'" +
            ", remarks='" + getRemarks() + "'" +
            ", teacherId=" + getTeacherIdId() +
            ", teacherId='" + getTeacherIdEmployeeId() + "'" +
            ", subject=" + getSubjectId() +
            ", subject='" + getSubjectSubjectTitle() + "'" +
            ", session=" + getSessionId() +
            ", session='" + getSessionAcadSessionId() + "'" +
            "}";
    }
}
