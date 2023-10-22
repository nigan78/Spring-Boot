package com.app.teamProject.service;


import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;

import java.util.List;
import java.util.Optional;

public interface TradeService {
//    교환해요 목록
    public List<TradeDTO> getList(Pagination pagination, String memberId);

//    게시글 전체 개수 조회
    public int getTotal();

//    피드 작성
    public int write(TradeDTO tradeDTO);

//    좋아요 추가
    public int insertLike(TradeLikeVO tradeLikeVO);

//    좋아요 삭제
    public int deleteLike(TradeLikeVO tradeLikeVO);

//    좋아요 검사
    public Optional<TradeLikeVO> checkLike(TradeLikeVO tradeLikeVO);

//    상세페이지
    public Optional<TradeDTO> read(Long id, String memberId, String fmemberId);

//    수정
    public int modify(TradeDTO tradeDTO);

//    신고 여부 검사
    public int checkReport(TradeReportVO tradeReportVO);

//    게시글신고
    public void createReport(TradeReportVO tradeReportVO);

//    게시글 삭제
    public void remove(Long id);

//    교환해요 마감
    public void modifyStatus(Long id);
}
