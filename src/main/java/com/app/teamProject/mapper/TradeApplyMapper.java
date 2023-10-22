package com.app.teamProject.mapper;

import com.app.teamProject.domain.trade.TradeApplyVO;
import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeApplyDTO;
import com.app.teamProject.dto.trade.TradeDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface TradeApplyMapper {
//    교환해요 목록
    public List<TradeApplyDTO> selectAll(@Param("pagination") Pagination pagination, @Param("tradeId") Long tradeId);

//    게시글 총 개수
    public int selectCountOfPost(Long tradeId);

//    교환하기 신청
    public int insert(TradeApplyDTO tradeApplyDTO);

//    교환하기 수락
    public int update(Long id);

//    교환신청 전체 삭제
    public int deleteAll(Long id);
    

}
