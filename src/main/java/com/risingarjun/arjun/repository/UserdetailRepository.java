package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Userdetail;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Userdetail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserdetailRepository extends JpaRepository<Userdetail, Long> {

}
