package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Fundamentaldetail;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Fundamentaldetail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FundamentaldetailRepository extends JpaRepository<Fundamentaldetail, Long> {

}
