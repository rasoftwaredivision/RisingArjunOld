package com.risingarjun.arjun.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.risingarjun.arjun.domain.enumeration.Studentstatus;
import com.risingarjun.arjun.domain.enumeration.Leavingreason;
import com.risingarjun.arjun.domain.enumeration.Infosource;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Student} entity.
 */
public class StudentDTO implements Serializable {

    private Long id;

    @NotNull
    private String studentRegId;

    @Lob
    private byte[] registrationForm;

    private String registrationFormContentType;
    private String parentMobNo1;

    private String parentMobNo2;

    private String parentEmailId;

    private Studentstatus studentStatus;

    private Leavingreason leavingReason;

    private Infosource infoSource;


    private Long userId;

    private String userLogin;

    private Set<CourseDTO> courses = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentRegId() {
        return studentRegId;
    }

    public void setStudentRegId(String studentRegId) {
        this.studentRegId = studentRegId;
    }

    public byte[] getRegistrationForm() {
        return registrationForm;
    }

    public void setRegistrationForm(byte[] registrationForm) {
        this.registrationForm = registrationForm;
    }

    public String getRegistrationFormContentType() {
        return registrationFormContentType;
    }

    public void setRegistrationFormContentType(String registrationFormContentType) {
        this.registrationFormContentType = registrationFormContentType;
    }

    public String getParentMobNo1() {
        return parentMobNo1;
    }

    public void setParentMobNo1(String parentMobNo1) {
        this.parentMobNo1 = parentMobNo1;
    }

    public String getParentMobNo2() {
        return parentMobNo2;
    }

    public void setParentMobNo2(String parentMobNo2) {
        this.parentMobNo2 = parentMobNo2;
    }

    public String getParentEmailId() {
        return parentEmailId;
    }

    public void setParentEmailId(String parentEmailId) {
        this.parentEmailId = parentEmailId;
    }

    public Studentstatus getStudentStatus() {
        return studentStatus;
    }

    public void setStudentStatus(Studentstatus studentStatus) {
        this.studentStatus = studentStatus;
    }

    public Leavingreason getLeavingReason() {
        return leavingReason;
    }

    public void setLeavingReason(Leavingreason leavingReason) {
        this.leavingReason = leavingReason;
    }

    public Infosource getInfoSource() {
        return infoSource;
    }

    public void setInfoSource(Infosource infoSource) {
        this.infoSource = infoSource;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Set<CourseDTO> getCourses() {
        return courses;
    }

    public void setCourses(Set<CourseDTO> courses) {
        this.courses = courses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudentDTO studentDTO = (StudentDTO) o;
        if (studentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentDTO{" +
            "id=" + getId() +
            ", studentRegId='" + getStudentRegId() + "'" +
            ", registrationForm='" + getRegistrationForm() + "'" +
            ", parentMobNo1='" + getParentMobNo1() + "'" +
            ", parentMobNo2='" + getParentMobNo2() + "'" +
            ", parentEmailId='" + getParentEmailId() + "'" +
            ", studentStatus='" + getStudentStatus() + "'" +
            ", leavingReason='" + getLeavingReason() + "'" +
            ", infoSource='" + getInfoSource() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
