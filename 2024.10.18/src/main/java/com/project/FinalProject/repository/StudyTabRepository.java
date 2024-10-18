package com.project.FinalProject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.FinalProject.domain.StudyTab;

@Repository
public interface StudyTabRepository extends JpaRepository<StudyTab, Long> {
	// 명시적인 JPQL 쿼리
    @Query("SELECT s FROM StudyTab s WHERE s.pId = :pId")
	// pId로 StudyTab 검색
    List<StudyTab> findByPId(@Param("pId") String pId);
	

}
