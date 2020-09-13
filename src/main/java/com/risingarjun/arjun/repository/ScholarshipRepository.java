package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Scholarship;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Scholarship entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {

}
