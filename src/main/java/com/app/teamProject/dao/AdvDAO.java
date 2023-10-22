package com.app.teamProject.dao;

import com.app.teamProject.domain.adv.AdvFileVO;
import com.app.teamProject.dto.AdvDTO;
import com.app.teamProject.mapper.AdvMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class AdvDAO {
    private final AdvMapper advMapper;
    //    광고신청
    public void insert(AdvDTO advDTO){
        advMapper.insert(advDTO);
    }
//    파일 저장용 마지막 인서트 확인
    public Long select(Long ID){
        return advMapper.select(ID);
    }

    public void insertfile(AdvFileVO advFileVO){
        advMapper.insertfile(advFileVO);
    }

    public List<AdvDTO> findAdv(AdvDTO advDTO){
        return advMapper.selectAdv(advDTO);
    }
}
