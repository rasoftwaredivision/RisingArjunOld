package com.risingarjun.arjun.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Enterprisesettings.
 */
@Entity
@Table(name = "enterprisesettings")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Enterprisesettings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "theme")
    private String theme;

    @Column(name = "foreground")
    private String foreground;

    @Column(name = "background")
    private String background;

    @Column(name = "disclaimer")
    private String disclaimer;

    @Column(name = "policy")
    private String policy;

    @Column(name = "copyrights")
    private String copyrights;

    @Column(name = "terms_of_usage")
    private String termsOfUsage;

    @OneToOne
    @JoinColumn(unique = true)
    private User admin;

    @ManyToOne
    @JsonIgnoreProperties("enterprisesettings")
    private Enterprise enterprise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTheme() {
        return theme;
    }

    public Enterprisesettings theme(String theme) {
        this.theme = theme;
        return this;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public String getForeground() {
        return foreground;
    }

    public Enterprisesettings foreground(String foreground) {
        this.foreground = foreground;
        return this;
    }

    public void setForeground(String foreground) {
        this.foreground = foreground;
    }

    public String getBackground() {
        return background;
    }

    public Enterprisesettings background(String background) {
        this.background = background;
        return this;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public String getDisclaimer() {
        return disclaimer;
    }

    public Enterprisesettings disclaimer(String disclaimer) {
        this.disclaimer = disclaimer;
        return this;
    }

    public void setDisclaimer(String disclaimer) {
        this.disclaimer = disclaimer;
    }

    public String getPolicy() {
        return policy;
    }

    public Enterprisesettings policy(String policy) {
        this.policy = policy;
        return this;
    }

    public void setPolicy(String policy) {
        this.policy = policy;
    }

    public String getCopyrights() {
        return copyrights;
    }

    public Enterprisesettings copyrights(String copyrights) {
        this.copyrights = copyrights;
        return this;
    }

    public void setCopyrights(String copyrights) {
        this.copyrights = copyrights;
    }

    public String getTermsOfUsage() {
        return termsOfUsage;
    }

    public Enterprisesettings termsOfUsage(String termsOfUsage) {
        this.termsOfUsage = termsOfUsage;
        return this;
    }

    public void setTermsOfUsage(String termsOfUsage) {
        this.termsOfUsage = termsOfUsage;
    }

    public User getAdmin() {
        return admin;
    }

    public Enterprisesettings admin(User user) {
        this.admin = user;
        return this;
    }

    public void setAdmin(User user) {
        this.admin = user;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public Enterprisesettings enterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
        return this;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Enterprisesettings)) {
            return false;
        }
        return id != null && id.equals(((Enterprisesettings) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Enterprisesettings{" +
            "id=" + getId() +
            ", theme='" + getTheme() + "'" +
            ", foreground='" + getForeground() + "'" +
            ", background='" + getBackground() + "'" +
            ", disclaimer='" + getDisclaimer() + "'" +
            ", policy='" + getPolicy() + "'" +
            ", copyrights='" + getCopyrights() + "'" +
            ", termsOfUsage='" + getTermsOfUsage() + "'" +
            "}";
    }
}
