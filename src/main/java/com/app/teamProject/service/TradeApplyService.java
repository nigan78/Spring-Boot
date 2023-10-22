package com.app.teamProject.service;

import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;
import com.app.teamProject.dto.trade.TradeApplyDTO;

import java.util.List;
import java.util.Optional;

public interface TradeApplyService  {
//    교환해요 목록
    public List<TradeApplyDTO> getList(Pagination pagination, Long tradeId);

//    게시글 전체 개수 조회
    public int getTotal(Long tradeId);

//    교환해요 신청
    public int write(TradeApplyDTO tradeApplyDTO);
    
//    교환해요 수락
    public int modify(Long id);

//    교환해요 전체 삭제
    public int removeAll(Long id);

}
