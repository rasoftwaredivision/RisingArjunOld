package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Teachershare;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Teachershare entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeachershareRepository extends JpaRepository<Teachershare, Long> {

}
