package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Salarypayment;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Salarypayment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalarypaymentRepository extends JpaRepository<Salarypayment, Long> {

}
