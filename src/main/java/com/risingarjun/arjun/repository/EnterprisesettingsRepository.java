package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Enterprisesettings;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Enterprisesettings entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnterprisesettingsRepository extends JpaRepository<Enterprisesettings, Long> {

}
