package com.app.teamProject.mapper;

import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface TradeMapper {
//    교환해요 목록
    public List<TradeDTO> selectAll(@Param("pagination") Pagination pagination, @Param("memberId") String memberId);

//    게시글 총 개수
    public int selectCountOfPost();

//    피드 작성
    public int insert(TradeDTO tradeDTO);

//    좋아요 추가
    public int insertLike(TradeLikeVO tradeLikeVO);

//    좋아요 삭제
    public int deleteLike(TradeLikeVO tradeLikeVO);

//    좋아요 전체 삭제
    public int deleteLikeAll(Long tradeId);

//    좋아요 중복검사
    public Optional<TradeLikeVO> findLike(TradeLikeVO tradeLikeVO);

//    디테일 페이지
    public Optional<TradeDTO> selectById(Long id, String memberId, String fmemberId);

//    수정
    public int update(TradeDTO tradeDTO);

//    신고여부 검사
    public int findReport(@Param("tradeReportVO") TradeReportVO tradeReportVO);

//    게시글 신고
    public void report(TradeReportVO tradeReportVO);

//    신고 전체 삭제
    public void deleteReportAll(Long tradeId);

//    게시물 삭제
    public void delete(Long id);

//    교환해요 마감
    public void updateStatus(Long id);

}
