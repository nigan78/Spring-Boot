package com.app.teamProject.dao;


import com.app.teamProject.domain.trade.TradeApplyVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeApplyDTO;
import com.app.teamProject.mapper.TradeApplyMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class TradeApplyDAO {
    private final TradeApplyMapper tradeApplyMapper;

//    교환해요 리스트
    public List<TradeApplyDTO> findAll(Pagination pagination, Long tradeId){return tradeApplyMapper.selectAll(pagination, tradeId);}

//    게시글 총 개수
    public int findCountOfPost(Long TradeId){return tradeApplyMapper.selectCountOfPost(TradeId);}

//    교환해요 신청
    public int save(TradeApplyDTO tradeApplyDTO){ return tradeApplyMapper.insert(tradeApplyDTO); }

//    교환해요 수락
    public int setApply(Long id){return tradeApplyMapper.update(id);}

//    교환해요 전체 삭제
    public int deleteAll(Long id){return tradeApplyMapper.deleteAll(id);}


}
