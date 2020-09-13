package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Studentscore;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Studentscore entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentscoreRepository extends JpaRepository<Studentscore, Long> {

}
