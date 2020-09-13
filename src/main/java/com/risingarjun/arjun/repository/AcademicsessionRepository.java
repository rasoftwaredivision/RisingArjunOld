package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Academicsession;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Academicsession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcademicsessionRepository extends JpaRepository<Academicsession, Long> {

}
