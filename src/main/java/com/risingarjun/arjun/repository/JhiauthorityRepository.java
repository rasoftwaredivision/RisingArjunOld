package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Jhiauthority;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Jhiauthority entity.
 */
@SuppressWarnings("unused")
@Repository
public interface JhiauthorityRepository extends JpaRepository<Jhiauthority, Long> {

}
