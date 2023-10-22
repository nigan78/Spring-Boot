package com.app.teamProject.dao;

import com.app.teamProject.domain.trade.TradeReplyVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeReplyDTO;
import com.app.teamProject.dto.trade.TradeReplyDTO2;
import com.app.teamProject.mapper.TradeReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TradeReplyDAO {
    private final TradeReplyMapper tradeReplyMapper;
    
//    댓글리스트
    public List<TradeReplyDTO> findReplies(Long tradeId, Pagination pagination){ return tradeReplyMapper.selectReplies(tradeId, pagination);}
    
//    대댓글리스트
    public List<TradeReplyDTO2> findRereplies(Long tradeId, int replyGroup){return tradeReplyMapper.selectRereplies(tradeId, replyGroup);}

//    댓글등록
    public void saveReply(TradeReplyVO tradeReplyVO){tradeReplyMapper.replyInsert(tradeReplyVO);}

//    대댓글등록
    public void saveRereply(TradeReplyVO tradeReplyVO){tradeReplyMapper.rereplyInsert(tradeReplyVO);}

//    댓글삭제
    public int delete(Long id){return tradeReplyMapper.delete(id);}

//    댓글 전체 삭제
    public int deleteAll(Long id){return tradeReplyMapper.deleteAll(id);}

//    댓글신고
    public void addReport(TradeReportVO tradeReportVO){tradeReplyMapper.report(tradeReportVO);}
}
