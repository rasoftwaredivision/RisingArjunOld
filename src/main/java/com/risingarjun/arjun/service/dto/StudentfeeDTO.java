package com.risingarjun.arjun.service.dto;
import java.io.Serializable;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.Month;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Studentfee} entity.
 */
public class StudentfeeDTO implements Serializable {

    private Long id;

    private Integer fee;

    private Integer feeCorrection;

    private Month month;

    private Boolean feeStatus;

    private String remarks;


    private Long registrationnoId;

    private String registrationnoStudentRegId;

    private Long subjectId;

    private String subjectSubjectTitle;

    private Long sessionId;

    private String sessionAcadSession;

    private Long teacherId;

    private String teacherEmployeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getFee() {
        return fee;
    }

    public void setFee(Integer fee) {
        this.fee = fee;
    }

    public Integer getFeeCorrection() {
        return feeCorrection;
    }

    public void setFeeCorrection(Integer feeCorrection) {
        this.feeCorrection = feeCorrection;
    }

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public Boolean isFeeStatus() {
        return feeStatus;
    }

    public void setFeeStatus(Boolean feeStatus) {
        this.feeStatus = feeStatus;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Long getRegistrationnoId() {
        return registrationnoId;
    }

    public void setRegistrationnoId(Long studentId) {
        this.registrationnoId = studentId;
    }

    public String getRegistrationnoStudentRegId() {
        return registrationnoStudentRegId;
    }

    public void setRegistrationnoStudentRegId(String studentStudentRegId) {
        this.registrationnoStudentRegId = studentStudentRegId;
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

    public String getSessionAcadSession() {
        return sessionAcadSession;
    }

    public void setSessionAcadSession(String academicsessionAcadSession) {
        this.sessionAcadSession = academicsessionAcadSession;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long employeeId) {
        this.teacherId = employeeId;
    }

    public String getTeacherEmployeeId() {
        return teacherEmployeeId;
    }

    public void setTeacherEmployeeId(String employeeEmployeeId) {
        this.teacherEmployeeId = employeeEmployeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentfeeDTO studentfeeDTO = (StudentfeeDTO) o;
        if (studentfeeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentfeeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentfeeDTO{" +
            "id=" + getId() +
            ", fee=" + getFee() +
            ", feeCorrection=" + getFeeCorrection() +
            ", month='" + getMonth() + "'" +
            ", feeStatus='" + isFeeStatus() + "'" +
            ", remarks='" + getRemarks() + "'" +
            ", registrationno=" + getRegistrationnoId() +
            ", registrationno='" + getRegistrationnoStudentRegId() + "'" +
            ", subject=" + getSubjectId() +
            ", subject='" + getSubjectSubjectTitle() + "'" +
            ", session=" + getSessionId() +
            ", session='" + getSessionAcadSession() + "'" +
            ", teacher=" + getTeacherId() +
            ", teacher='" + getTeacherEmployeeId() + "'" +
            "}";
    }
}
