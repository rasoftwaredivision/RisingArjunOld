package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Subjectsbasefee;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Subjectsbasefee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubjectsbasefeeRepository extends JpaRepository<Subjectsbasefee, Long> {

}
