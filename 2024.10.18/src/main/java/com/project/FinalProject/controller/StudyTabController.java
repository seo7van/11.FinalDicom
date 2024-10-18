package com.project.FinalProject.controller;

import java.util.List;
import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.FinalProject.domain.StudyTab;
import com.project.FinalProject.service.StudyTabService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Controller
public class StudyTabController {

	@Autowired
	StudyTabService studyTabService; 
	
	// 리스트로 나열하기
	@RequestMapping("/index")
	private String root(Model model) {
		org.springframework.data.domain.Page<StudyTab> pageList =studyTabService.findAll(PageRequest.of(0, 28, Sort.by(Sort.Direction.ASC,"studyKey")));
		model.addAttribute("pageList", pageList);
		System.out.println("pageList : " + pageList);
		return "index";
	}
	
	// 검색 기능 추가
	@GetMapping("/search")
	public String searchStudyByPId(@RequestParam(value = "pId", required = false) String pId, Model model) {
		// pId가 전달되는지 확인
	    System.out.println("Received pId: " + pId);
		
		// pId가 비어있을 때 에러 메시지 반환
	    if (pId == null || pId.isEmpty()) {
	        model.addAttribute("error", "Study ID is required");
	        return "searchResult"; // ID가 없을 때 에러 메시지 반환
	    }
	    
	    // pId로 StudyTab 검색
	    List<StudyTab> studies = studyTabService.findByPId(pId);
	    if (!studies.isEmpty()) {
	        model.addAttribute("studyTabs", studies);  // 검색된 Study 리스트 추가
	    } else {
	        model.addAttribute("error", "No study found with the given ID");
	    }

	    return "searchResult"; // 검색 결과 페이지 반환
	}
}