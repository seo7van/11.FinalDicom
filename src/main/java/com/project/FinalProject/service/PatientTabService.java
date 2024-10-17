package com.project.FinalProject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

import com.project.FinalProject.domain.PatientTab;
import com.project.FinalProject.repository.PatientTabRepository;

@Service
public class PatientTabService {

	
	@Autowired
	private PatientTabRepository patientTabRepository;
	
	// 환자 ID로 환자 정보를 검색
    public Optional<PatientTab> findPatientById(String pId) {
        return patientTabRepository.findByPId(pId);
    }
}
	
