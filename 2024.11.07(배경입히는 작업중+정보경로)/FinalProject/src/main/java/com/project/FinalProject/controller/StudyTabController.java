package com.project.FinalProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.project.FinalProject.domain.StudyTab;
import com.project.FinalProject.dto.SearchCondition;
import com.project.FinalProject.service.StudyTabService;

@Controller
public class StudyTabController {

	@Autowired
	StudyTabService studyTabService;

	// 중첩된 검색 가능
		@PostMapping("/search")
		@ResponseBody
		public List<StudyTab> searchStudies(@RequestBody SearchCondition searchCondition) {
			// searchCondition 객체 자체를 전달합니다.
			List<StudyTab> studies = studyTabService.searchStudies(searchCondition);
		    return studies;
		}
	
	@GetMapping("/study/{studykey}")
	public String getStudeyKey(@PathVariable("studykey") Long studyKey, Model model) {
		StudyTab studyTab = studyTabService.getStudyByStudyKey(studyKey);
		model.addAttribute("study", studyTab);
		// 과거 검사 내역 가져오기 (patientKey 기준)
		if (studyTab != null && studyTab.getPatientKey() != null) {
			List<StudyTab> pastStudies = studyTabService.getPastStudies(studyTab.getPatientKey());
			model.addAttribute("pastStudies", pastStudies);
			model.addAttribute("studyKey", studyKey); // 모델에 study 추가
		}
		return "Picdetail";
	}
}
