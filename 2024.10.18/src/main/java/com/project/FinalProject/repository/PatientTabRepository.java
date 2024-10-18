package com.project.FinalProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.FinalProject.domain.PatientTab;

import java.util.Optional;

public interface PatientTabRepository extends JpaRepository<PatientTab, String> {
	@Query("SELECT p FROM PatientTab p WHERE p.pId = :pId")
    Optional<PatientTab> findByPId(@Param("pId") String pId);
}