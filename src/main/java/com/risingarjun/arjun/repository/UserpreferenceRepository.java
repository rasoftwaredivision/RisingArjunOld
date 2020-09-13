package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Userpreference;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Userpreference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserpreferenceRepository extends JpaRepository<Userpreference, Long> {

}
