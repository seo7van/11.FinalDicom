package com.project.FinalProject.controller;

import java.util.List;
import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.FinalProject.domain.PatientTab;
import com.project.FinalProject.service.PatientTabService;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;


@Controller
public class PatientTabController {
	@Autowired
    private PatientTabService patientTabService;

    // 환자 ID로 검색하는 메소드
    @GetMapping("/search")
    public String searchPatient(@RequestParam(value = "pId", required = false) String pId, Model model) {
        if (pId == null || pId.isEmpty()) {
            model.addAttribute("error", "Patient ID is required");
            return "searchResult"; // ID가 없을 때 에러 메시지 반환
        }
        var patient = patientTabService.findPatientById(pId);
        if (patient.isPresent()) {
            model.addAttribute("patient", patient.get());
        } else {
            model.addAttribute("error", "Patient not found");
        }
        return "searchResult";
    }
}