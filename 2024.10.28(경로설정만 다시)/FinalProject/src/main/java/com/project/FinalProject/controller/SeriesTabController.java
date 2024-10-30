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
        List<String> imagePaths = new ArrayList<>();  // imagePaths 초기화
        
     // 첫 번째 이미지 가져오기 로직 추가
        Map<Long, String> seriesFirstImageMap = new HashMap<>();
        for (SeriesTab series : seriesList) {
            Optional<ImageTab> firstImageOpt = imageTabService.getFirstImageByStudyKeyAndSeriesKey(studyKey, series.getSeriesKey());
            if (firstImageOpt.isPresent()) {
                ImageTab firstImage = firstImageOpt.get();
                String imagePath = "wadouri:" + firstImage.getPath() + "/" + firstImage.getFName();
                seriesFirstImageMap.put(series.getSeriesKey(), imagePath);
            } else {
                seriesFirstImageMap.put(series.getSeriesKey(), "Image not available");
            }
        }

        model.addAttribute("seriesList", seriesList);
        model.addAttribute("imagePaths", imagePaths);
        return "seriesPage";
	}
}