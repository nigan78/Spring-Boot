package com.app.teamProject.dao;


import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;
import com.app.teamProject.mapper.TradeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class TradeDAO {
    private final TradeMapper tradeMapper;

//    교환해요 리스트
public List<TradeDTO> findAll(Pagination pagination, String memberId){return tradeMapper.selectAll(pagination, memberId);}

//    게시글 총 개수
    public int findCountOfPost(){return tradeMapper.selectCountOfPost();}

//    피드 작성
    public int save(TradeDTO tradeDTO){return tradeMapper.insert(tradeDTO); }

//    좋아요 추가
    public int addLike(TradeLikeVO tradeLikeVO){return tradeMapper.insertLike(tradeLikeVO);}

//    좋아요 삭제
    public int removeLike(TradeLikeVO tradeLikeVO){return tradeMapper.deleteLike(tradeLikeVO);}

//    좋아요 전체 삭제
    public int removeLikeAll(Long tradeId){return tradeMapper.deleteLikeAll(tradeId);}

//    좋아요 중복 검사
    public Optional<TradeLikeVO> findByLike(TradeLikeVO tradeLikeVO){return tradeMapper.findLike(tradeLikeVO);}

//    상세페이지
    public Optional<TradeDTO> findById(Long id, String memberId, String fmemberId){return tradeMapper.selectById(id, memberId, fmemberId);}

//    수정
    public int setTrade(TradeDTO tradeDTO){return tradeMapper.update(tradeDTO);}

//    신고 여부 검사
    public int findByReport(TradeReportVO tradeReportVO){return tradeMapper.findReport(tradeReportVO);}

//    게시글 신고
    public void addReport(TradeReportVO tradeReportVO){tradeMapper.report(tradeReportVO);}

//    신고 전체 삭제
    public void removeReportAll(Long tradeId){tradeMapper.deleteReportAll(tradeId);}
    
//    게시글 삭제
    public void deltete(Long id){tradeMapper.delete(id);}

//    교환해요 마감
    public void setStatus(Long id){tradeMapper.updateStatus(id);}


}
