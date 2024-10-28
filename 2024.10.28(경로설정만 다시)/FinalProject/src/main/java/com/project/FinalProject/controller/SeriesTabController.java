package com.project.FinalProject.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus.Series;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.FinalProject.domain.ImageTab;
import com.project.FinalProject.domain.SeriesTab;
import com.project.FinalProject.service.ImageTabService;
import com.project.FinalProject.service.SeriesTabService;

import org.springframework.ui.Model;

@Controller
@RequestMapping
public class SeriesTabController {

	@Autowired
	private SeriesTabService seriesTabService;
	
	@Autowired
	private ImageTabService imageTabService;

	// studyKey를 기준으로 시리즈 목록을 조회하여 모델에 추가하고 페이지로 전달
	@GetMapping("/series")
    public String getSeriesPage(@RequestParam(name = "studyKey") Long studyKey, Model model) {
        List<SeriesTab> seriesList = seriesTabService.getSeriesByStudyKey(studyKey);

        // 각 시리즈에 대해 curSeqNum이 1인 이미지를 가져옵니다.
        Map<Long, String> seriesFirstImageMap = new HashMap<>();
        for (SeriesTab series : seriesList) {
            ImageTab firstImage = imageTabService.getFirstImageBySeries(series.getSeriesKey());
            if (firstImage != null) {
            	
                String imagePath = "wadouri:PACSStorage/" + firstImage.getPath() + firstImage.getFName();
                
                System.out.println("Generated Image Path: " + imagePath.replace("\\", "/")); // 이미지 경로 확인
                seriesFirstImageMap.put(series.getSeriesKey(), imagePath.replace("\\", "/"));
                
            }
        }

        model.addAttribute("seriesList", seriesList);
        model.addAttribute("seriesFirstImageMap", seriesFirstImageMap);
        return "seriesPage";
	}
}