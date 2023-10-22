package com.app.teamProject.mapper;

import com.app.teamProject.domain.trade.TradeReplyVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeReplyDTO;
import com.app.teamProject.dto.trade.TradeReplyDTO2;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TradeReplyMapper {
//    댓글 출력
    public List<TradeReplyDTO> selectReplies(@Param("tradeId")Long tradeId, @Param("pagination")Pagination pagination);
    public List<TradeReplyDTO2> selectRereplies(Long tradeId, int replyGroup);

//    댓글 등록
    public void replyInsert(TradeReplyVO tradeReplyVO);

//    대댓글 등록
    public void rereplyInsert(TradeReplyVO tradeReplyVO);

//    댓글 삭제
    public int delete(Long id);

//    댓글 전체 삭제
    public int deleteAll(Long id);

//    댓글 신고
    public void report(TradeReportVO tradeReportVO);
}
