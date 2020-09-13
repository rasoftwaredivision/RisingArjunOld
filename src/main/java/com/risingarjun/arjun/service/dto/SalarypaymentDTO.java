package com.risingarjun.arjun.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import com.risingarjun.arjun.domain.enumeration.Month;
import com.risingarjun.arjun.domain.enumeration.Mode;

/**
 * A DTO for the {@link com.risingarjun.arjun.domain.Salarypayment} entity.
 */
public class SalarypaymentDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 0)
    private Integer salary;

    @NotNull
    private Month month;

    @NotNull
    @Min(value = 0)
    private Integer paid;

    @NotNull
    @Min(value = 0)
    private Integer unpaid;

    @NotNull
    private LocalDate date;

    @NotNull
    private String transactionId;

    @NotNull
    private Mode paymentMode;

    private String remarks;


    private Long employeeIdId;

    private String employeeIdEmployeeId;

    private Long sessionId;

    private String sessionAcadSessionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public Month getMonth() {
        return month;
    }

    public void setMonth(Month month) {
        this.month = month;
    }

    public Integer getPaid() {
        return paid;
    }

    public void setPaid(Integer paid) {
        this.paid = paid;
    }

    public Integer getUnpaid() {
        return unpaid;
    }

    public void setUnpaid(Integer unpaid) {
        this.unpaid = unpaid;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Mode getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(Mode paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Long getEmployeeIdId() {
        return employeeIdId;
    }

    public void setEmployeeIdId(Long employeeId) {
        this.employeeIdId = employeeId;
    }

    public String getEmployeeIdEmployeeId() {
        return employeeIdEmployeeId;
    }

    public void setEmployeeIdEmployeeId(String employeeEmployeeId) {
        this.employeeIdEmployeeId = employeeEmployeeId;
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

        SalarypaymentDTO salarypaymentDTO = (SalarypaymentDTO) o;
        if (salarypaymentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salarypaymentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalarypaymentDTO{" +
            "id=" + getId() +
            ", salary=" + getSalary() +
            ", month='" + getMonth() + "'" +
            ", paid=" + getPaid() +
            ", unpaid=" + getUnpaid() +
            ", date='" + getDate() + "'" +
            ", transactionId='" + getTransactionId() + "'" +
            ", paymentMode='" + getPaymentMode() + "'" +
            ", remarks='" + getRemarks() + "'" +
            ", employeeId=" + getEmployeeIdId() +
            ", employeeId='" + getEmployeeIdEmployeeId() + "'" +
            ", session=" + getSessionId() +
            ", session='" + getSessionAcadSessionId() + "'" +
            "}";
    }
}
