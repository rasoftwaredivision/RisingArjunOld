package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Center;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Center entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CenterRepository extends JpaRepository<Center, Long> {

}
