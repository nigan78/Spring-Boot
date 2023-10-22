package com.app.teamProject.service;

import com.app.teamProject.domain.adv.AdvFileVO;
import com.app.teamProject.dto.AdvDTO;

import java.util.List;

public interface AdvSerivce {
//    광고신청
    public void insert(AdvDTO advDTO);
//    마지막 광고신청 조회 (파일 저장 용)
    public Long select(Long ID);
//    파일 업로드
    public void insertfile(AdvFileVO advFileVO);
//    배너 출력
    public List<AdvDTO> selectAdv(AdvDTO advDTO);
}
