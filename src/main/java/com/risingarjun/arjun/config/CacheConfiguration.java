package com.risingarjun.arjun.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.risingarjun.arjun.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.risingarjun.arjun.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.risingarjun.arjun.domain.User.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Authority.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.User.class.getName() + ".authorities");
            createCache(cm, com.risingarjun.arjun.domain.Blog.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Entry.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Entry.class.getName() + ".tags");
            createCache(cm, com.risingarjun.arjun.domain.Tag.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Tag.class.getName() + ".entries");
            createCache(cm, com.risingarjun.arjun.domain.Jhiauthority.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Feature.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Roleaccess.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Userdetail.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Userpreference.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Course.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Course.class.getName() + ".students");
            createCache(cm, com.risingarjun.arjun.domain.Course.class.getName() + ".studentsubjects");
            createCache(cm, com.risingarjun.arjun.domain.Course.class.getName() + ".teachers");
            createCache(cm, com.risingarjun.arjun.domain.Student.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Student.class.getName() + ".courses");
            createCache(cm, com.risingarjun.arjun.domain.Subject.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Subject.class.getName() + ".studentsubjects");
            createCache(cm, com.risingarjun.arjun.domain.Subject.class.getName() + ".teachers");
            createCache(cm, com.risingarjun.arjun.domain.Academicsession.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Studentsubject.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Studentsubject.class.getName() + ".subjects");
            createCache(cm, com.risingarjun.arjun.domain.Studentsubject.class.getName() + ".courses");
            createCache(cm, com.risingarjun.arjun.domain.Subjectsbasefee.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Discount.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Scholarship.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Studentfee.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Employee.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Center.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Center.class.getName() + ".centerheads");
            createCache(cm, com.risingarjun.arjun.domain.Centerhead.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Centerhead.class.getName() + ".centers");
            createCache(cm, com.risingarjun.arjun.domain.Teacher.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Teacher.class.getName() + ".subjects");
            createCache(cm, com.risingarjun.arjun.domain.Teacher.class.getName() + ".courses");
            createCache(cm, com.risingarjun.arjun.domain.Teachershare.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Salarypayment.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Expense.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Chapter.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Fundamentaldetail.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Fundamentaldetail.class.getName() + ".questions");
            createCache(cm, com.risingarjun.arjun.domain.Question.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Question.class.getName() + ".fundamentals");
            createCache(cm, com.risingarjun.arjun.domain.Studentscore.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Enterprise.class.getName());
            createCache(cm, com.risingarjun.arjun.domain.Enterprisesettings.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
