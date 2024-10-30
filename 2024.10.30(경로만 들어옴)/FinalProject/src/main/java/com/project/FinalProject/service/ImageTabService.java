package com.project.FinalProject.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.FinalProject.domain.ImageTab;
import com.project.FinalProject.domain.StudyTab;
import com.project.FinalProject.repository.ImageTabRepository;

@Service
public class ImageTabService {

	@Autowired
	private ImageTabRepository imageTabRepository;

	// 수정된 메소드: curSeqNum으로 정렬하여 이미지 목록을 가져오기
	public List<ImageTab> getImagesByStudyKeyAndSeriesKey(Long studyKey, Long seriesKey) {
        return imageTabRepository.findByStudyKeyAndSeriesKeyOrderByCurSeqNumAsc(studyKey, seriesKey);
        
	}
	
	
	// studyKey와 seriesKey로 curSeqNum이 1인 첫 번째 이미지 조회
    public ImageTab getFirstImageBySeries(Long studyKey, Long seriesKey) {
    	return imageTabRepository.findFirstImageByStudyKeyAndSeriesKeyAndCurSeqNum(studyKey, seriesKey)
                                  .orElse(null);
    }
	
}
	
