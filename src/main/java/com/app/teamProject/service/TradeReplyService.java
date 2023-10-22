package com.app.teamProject.service;

import com.app.teamProject.domain.trade.TradeReplyVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeReplyDTO;

import java.util.List;

public interface TradeReplyService {
//    댓글 목록
    public List<TradeReplyDTO> getReplies(Long tradeId, Pagination pagination);

//    댓글등록
    public void replyWrite(TradeReplyVO tradeReplyVO);

//    대댓글등록
    public void rereplyWrite(TradeReplyVO tradeReplyVO);

//    댓글삭제
    public int remove(Long id, String categoryName);

//    댓글전체삭제
    public int removeAll(Long id);

//    신고하기
    void createReport(TradeReportVO tradeReportVO);
}
