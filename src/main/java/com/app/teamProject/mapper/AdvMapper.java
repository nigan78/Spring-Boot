package com.app.teamProject.mapper;

import com.app.teamProject.domain.adv.AdvFileVO;
import com.app.teamProject.dto.AdvDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdvMapper {
//    광고 신청
    public void insert(AdvDTO advDTO);
//    관리자용 광고 리스트
    public Long select(Long ID);
//    광고 수락
    public void permission(AdvDTO advDTO);
//    파일저장
    public void insertfile(AdvFileVO advFileVO);
//    베너 표출
    public List<AdvDTO> selectAdv(AdvDTO advDTO);
}
