package com.project.FinalProject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.project.FinalProject.domain.StudyTab;
import com.project.FinalProject.repository.StudyTabRepository;

@Service
public class StudyTabService {
	
	@Autowired
	private StudyTabRepository studyTabRepository;
	
	// 기존 findAll 메소드
	public Page<StudyTab> findAll(PageRequest page) {
		return studyTabRepository.findAll(page);
		}
	
	// 새로운 pId로 검색하는 메소드 추가
    public List<StudyTab> findByPId(String pId) {
        return studyTabRepository.findByPId(pId);  // 리포지토리에서 pId로 검색
        }
    }

