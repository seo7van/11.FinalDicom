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

	// 스터디키를 기준으로 시리즈 목록을 조회하여 모델에 추가하고 페이지로 전달
	@GetMapping("/series")
    public String getSeriesPage(@RequestParam(name = "studyKey") Long studyKey, Model model) {
        List<SeriesTab> seriesList = seriesTabService.getSeriesByStudyKey(studyKey);
        List<String> imagePaths = new ArrayList<>();  // 이미지 경로 리스트 초기화
        Map<Long, String> seriesFirstImageMap = new HashMap<>(); // 시리즈와 첫 번째 이미지의 맵 초기화

        // 각 시리즈에 대해 curSeqNum이 1인 이미지를 가져옵니다.
        for (SeriesTab series : seriesList) {
            ImageTab firstImage = imageTabService.getFirstImageBySeries(studyKey, series.getSeriesKey());
            if (firstImage != null) {
                // 경로를 `wadouri` 형식으로 변환하여 사용
                String imagePath = "wadouri:PACSStorage/" + firstImage.getPath() + firstImage.getFName();
                System.out.println("Generated Image Path: " + imagePath.replace("\\", "/")); // 이미지 경로 확인

                // imagePaths와 seriesFirstImageMap 모두에 추가
                imagePaths.add(imagePath.replace("\\", "/"));
                seriesFirstImageMap.put(series.getSeriesKey(), imagePath.replace("\\", "/"));
            }
        }

        model.addAttribute("seriesList", seriesList);
        model.addAttribute("imagePaths", imagePaths); // `imagePaths` 모델에 추가
        model.addAttribute("seriesFirstImageMap", seriesFirstImageMap); // `seriesFirstImageMap` 모델에 추가
        return "seriesPage";
	}
}