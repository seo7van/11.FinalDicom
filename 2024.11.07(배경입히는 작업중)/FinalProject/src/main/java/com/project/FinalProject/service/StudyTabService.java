package com.project.FinalProject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.project.FinalProject.domain.StudyTab;
import com.project.FinalProject.dto.SearchCondition;
import com.project.FinalProject.repository.StudyTabRepository;

@Service
public class StudyTabService {
	
	@Autowired
	StudyTabRepository studyTabRepository;

    // SearchCondition을 사용한 검색 메서드
    public List<StudyTab> searchStudies(SearchCondition searchCondition) {
        return studyTabRepository.searchStudies(
            searchCondition.getPId(),
            searchCondition.getPName(),
            searchCondition.getModality(),
            searchCondition.getStartDate(),
            searchCondition.getEndDate(),
            searchCondition.getReportStatus(),
            searchCondition.getVerifyFlag()
        );
    }

    public StudyTab getStudyByStudyKey(Long studyKey) {
		return studyTabRepository.findById(studyKey).orElse(null);
	}
    
    // patientKey로 과거 연구 데이터 가져오기 메서드
    public List<StudyTab> getPastStudies(Long patientKey) {
        return studyTabRepository.findByPatientKey(patientKey);
    }
}