package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Centerhead;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Centerhead entity.
 */
@Repository
public interface CenterheadRepository extends JpaRepository<Centerhead, Long> {

    @Query(value = "select distinct centerhead from Centerhead centerhead left join fetch centerhead.centers",
        countQuery = "select count(distinct centerhead) from Centerhead centerhead")
    Page<Centerhead> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct centerhead from Centerhead centerhead left join fetch centerhead.centers")
    List<Centerhead> findAllWithEagerRelationships();

    @Query("select centerhead from Centerhead centerhead left join fetch centerhead.centers where centerhead.id =:id")
    Optional<Centerhead> findOneWithEagerRelationships(@Param("id") Long id);

}
