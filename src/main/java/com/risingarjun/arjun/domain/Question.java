package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.risingarjun.arjun.domain.enumeration.Questionlevel;

import com.risingarjun.arjun.domain.enumeration.Questionstatus;

/**
 * A Question.
 */
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Lob
    @Column(name = "question", nullable = false)
    private String question;

    @Lob
    @Column(name = "diagram")
    private byte[] diagram;

    @Column(name = "diagram_content_type")
    private String diagramContentType;

    @Column(name = "option_1")
    private String option1;

    @Column(name = "option_2")
    private String option2;

    @Column(name = "option_3")
    private String option3;

    @Column(name = "option_4")
    private String option4;

    @NotNull
    @Column(name = "multi_choice", nullable = false)
    private Boolean multiChoice;

    @NotNull
    @Column(name = "answer", nullable = false)
    private String answer;

    @NotNull
    @Column(name = "max_marks", nullable = false)
    private Integer maxMarks;

    @Column(name = "negative_marks")
    private Integer negativeMarks;

    @NotNull
    @Column(name = "duration_mins", nullable = false)
    private Integer durationMins;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private Questionlevel level;

    @Column(name = "solution")
    private String solution;

    @Column(name = "video")
    private String video;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Questionstatus status;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Enterprise enterprise;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Subject subject;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Chapter chapter;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Employee writer;

    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Employee approver;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "question_fundamentals",
               joinColumns = @JoinColumn(name = "question_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "fundamentals_id", referencedColumnName = "id"))
    private Set<Fundamentaldetail> fundamentals = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public Question question(String question) {
        this.question = question;
        return this;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public byte[] getDiagram() {
        return diagram;
    }

    public Question diagram(byte[] diagram) {
        this.diagram = diagram;
        return this;
    }

    public void setDiagram(byte[] diagram) {
        this.diagram = diagram;
    }

    public String getDiagramContentType() {
        return diagramContentType;
    }

    public Question diagramContentType(String diagramContentType) {
        this.diagramContentType = diagramContentType;
        return this;
    }

    public void setDiagramContentType(String diagramContentType) {
        this.diagramContentType = diagramContentType;
    }

    public String getOption1() {
        return option1;
    }

    public Question option1(String option1) {
        this.option1 = option1;
        return this;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public Question option2(String option2) {
        this.option2 = option2;
        return this;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public Question option3(String option3) {
        this.option3 = option3;
        return this;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public Question option4(String option4) {
        this.option4 = option4;
        return this;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public Boolean isMultiChoice() {
        return multiChoice;
    }

    public Question multiChoice(Boolean multiChoice) {
        this.multiChoice = multiChoice;
        return this;
    }

    public void setMultiChoice(Boolean multiChoice) {
        this.multiChoice = multiChoice;
    }

    public String getAnswer() {
        return answer;
    }

    public Question answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Integer getMaxMarks() {
        return maxMarks;
    }

    public Question maxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
        return this;
    }

    public void setMaxMarks(Integer maxMarks) {
        this.maxMarks = maxMarks;
    }

    public Integer getNegativeMarks() {
        return negativeMarks;
    }

    public Question negativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
        return this;
    }

    public void setNegativeMarks(Integer negativeMarks) {
        this.negativeMarks = negativeMarks;
    }

    public Integer getDurationMins() {
        return durationMins;
    }

    public Question durationMins(Integer durationMins) {
        this.durationMins = durationMins;
        return this;
    }

    public void setDurationMins(Integer durationMins) {
        this.durationMins = durationMins;
    }

    public Questionlevel getLevel() {
        return level;
    }

    public Question level(Questionlevel level) {
        this.level = level;
        return this;
    }

    public void setLevel(Questionlevel level) {
        this.level = level;
    }

    public String getSolution() {
        return solution;
    }

    public Question solution(String solution) {
        this.solution = solution;
        return this;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getVideo() {
        return video;
    }

    public Question video(String video) {
        this.video = video;
        return this;
    }

    public void setVideo(String video) {
        this.video = video;
    }

    public Questionstatus getStatus() {
        return status;
    }

    public Question status(Questionstatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(Questionstatus status) {
        this.status = status;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Question enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }

    public Course getCourse() {
        return course;
    }

    public Question course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Subject getSubject() {
        return subject;
    }

    public Question subject(Subject subject) {
        this.subject = subject;
        return this;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Chapter getChapter() {
        return chapter;
    }

    public Question chapter(Chapter chapter) {
        this.chapter = chapter;
        return this;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }

    public Employee getWriter() {
        return writer;
    }

    public Question writer(Employee employee) {
        this.writer = employee;
        return this;
    }

    public void setWriter(Employee employee) {
        this.writer = employee;
    }

    public Employee getApprover() {
        return approver;
    }

    public Question approver(Employee employee) {
        this.approver = employee;
        return this;
    }

    public void setApprover(Employee employee) {
        this.approver = employee;
    }

    public Set<Fundamentaldetail> getFundamentals() {
        return fundamentals;
    }

    public Question fundamentals(Set<Fundamentaldetail> fundamentaldetails) {
        this.fundamentals = fundamentaldetails;
        return this;
    }

    public Question addFundamentals(Fundamentaldetail fundamentaldetail) {
        this.fundamentals.add(fundamentaldetail);
        fundamentaldetail.getQuestions().add(this);
        return this;
    }

    public Question removeFundamentals(Fundamentaldetail fundamentaldetail) {
        this.fundamentals.remove(fundamentaldetail);
        fundamentaldetail.getQuestions().remove(this);
        return this;
    }

    public void setFundamentals(Set<Fundamentaldetail> fundamentaldetails) {
        this.fundamentals = fundamentaldetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Question)) {
            return false;
        }
        return id != null && id.equals(((Question) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + getId() +
            ", question='" + getQuestion() + "'" +
            ", diagram='" + getDiagram() + "'" +
            ", diagramContentType='" + getDiagramContentType() + "'" +
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
            "}";
    }
}
