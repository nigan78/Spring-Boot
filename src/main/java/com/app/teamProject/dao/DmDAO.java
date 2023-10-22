package com.app.teamProject.dao;

import com.app.teamProject.dto.DmDTO;
import com.app.teamProject.dto.DmDTO2;
import com.app.teamProject.mapper.DmMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class DmDAO {
    private final DmMapper dmMapper;

//    디엠 리스트
    public List<DmDTO> findAll(String memberId){return dmMapper.selectAll(memberId);}

//    디엠 내 글
    public List<DmDTO> findMemberId(String memberId){return dmMapper.selectMemberId(memberId);}

//    디엠 상대방 글
    public List<DmDTO2> findSendId(String sendId){return dmMapper.selelctSendId(sendId);}
}
