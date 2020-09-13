package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.risingarjun.arjun.domain.enumeration.Fundamental;

/**
 * A Fundamentaldetail.
 */
@Entity
@Table(name = "fundamentaldetail")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fundamentaldetail implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "concept")
    private Fundamental concept;

    @Column(name = "details")
    private String details;

    @ManyToMany(mappedBy = "fundamentals")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Question> questions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Fundamental getConcept() {
        return concept;
    }

    public Fundamentaldetail concept(Fundamental concept) {
        this.concept = concept;
        return this;
    }

    public void setConcept(Fundamental concept) {
        this.concept = concept;
    }

    public String getDetails() {
        return details;
    }

    public Fundamentaldetail details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Fundamentaldetail questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Fundamentaldetail addQuestion(Question question) {
        this.questions.add(question);
        question.getFundamentals().add(this);
        return this;
    }

    public Fundamentaldetail removeQuestion(Question question) {
        this.questions.remove(question);
        question.getFundamentals().remove(this);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fundamentaldetail)) {
            return false;
        }
        return id != null && id.equals(((Fundamentaldetail) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Fundamentaldetail{" +
            "id=" + getId() +
            ", concept='" + getConcept() + "'" +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
