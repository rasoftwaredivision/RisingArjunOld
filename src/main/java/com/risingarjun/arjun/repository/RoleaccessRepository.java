package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Roleaccess;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Roleaccess entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleaccessRepository extends JpaRepository<Roleaccess, Long> {

}
