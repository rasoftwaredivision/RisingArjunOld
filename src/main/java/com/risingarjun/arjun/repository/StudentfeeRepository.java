package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Studentfee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Studentfee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentfeeRepository extends JpaRepository<Studentfee, Long> {

}
