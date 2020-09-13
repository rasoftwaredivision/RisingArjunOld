package com.risingarjun.arjun.repository;

import com.risingarjun.arjun.domain.Studentsubject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Studentsubject entity.
 */
@Repository
public interface StudentsubjectRepository extends JpaRepository<Studentsubject, Long> {

    @Query(value = "select distinct studentsubject from Studentsubject studentsubject left join fetch studentsubject.subjects left join fetch studentsubject.courses",
        countQuery = "select count(distinct studentsubject) from Studentsubject studentsubject")
    Page<Studentsubject> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct studentsubject from Studentsubject studentsubject left join fetch studentsubject.subjects left join fetch studentsubject.courses")
    List<Studentsubject> findAllWithEagerRelationships();

    @Query("select studentsubject from Studentsubject studentsubject left join fetch studentsubject.subjects left join fetch studentsubject.courses where studentsubject.id =:id")
    Optional<Studentsubject> findOneWithEagerRelationships(@Param("id") Long id);

}
