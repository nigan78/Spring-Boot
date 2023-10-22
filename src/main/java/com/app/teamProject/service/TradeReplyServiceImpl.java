package com.app.teamProject.service;

import com.app.teamProject.dao.TradeDAO;
import com.app.teamProject.dao.TradeNoticeDAO;
import com.app.teamProject.dao.TradeReplyDAO;
import com.app.teamProject.domain.trade.TradeNoticeVO;
import com.app.teamProject.domain.trade.TradeReplyVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeReplyDTO;
import lombok.Lombok;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TradeReplyServiceImpl implements TradeReplyService {
    private final TradeReplyDAO tradeReplyDAO;
    private final TradeDAO tradeDAO;
    private final TradeNoticeDAO tradeNoticeDAO;
    private final HttpSession session;

//    댓글&대댓글 리스트 출력
    @Override
    public List<TradeReplyDTO> getReplies(Long tradeId, Pagination pagination) {
        List<TradeReplyDTO> replies = tradeReplyDAO.findReplies(tradeId, pagination);
        replies.forEach(reply -> reply.setRereplies(tradeReplyDAO.findRereplies(reply.getTradeId(), reply.getReplyGroup())));

        return replies;
    }

//    댓글 작성
    @Override
    public void replyWrite(TradeReplyVO tradeReplyVO){
        TradeNoticeVO tradeNoticeVO = new TradeNoticeVO();
        String sessionId = (String) session.getAttribute("memberId");
        tradeReplyVO.setMemberId(sessionId);
        tradeReplyDAO.saveReply(tradeReplyVO);

//        알림
        tradeNoticeVO.setNoticeId(tradeReplyVO.getMemberId());
        tradeNoticeVO.setTradeReplyId(tradeReplyVO.getId());
        tradeNoticeVO.setSendId(sessionId);
        tradeNoticeVO.setTradeId(tradeReplyVO.getTradeId());
        tradeNoticeDAO.setReplyNotice(tradeNoticeVO);

    }

//    대댓글 작성
    @Override
    public void rereplyWrite(TradeReplyVO tradeReplyVO){
        TradeNoticeVO tradeNoticeVO = new TradeNoticeVO();
        String sessionId = (String) session.getAttribute("memberId");
        tradeReplyVO.setMemberId(sessionId);

        tradeReplyDAO.saveRereply(tradeReplyVO);

//        알림
        tradeNoticeVO.setNoticeId(tradeReplyVO.getMemberId());
        tradeNoticeVO.setTradeReplyId(tradeReplyVO.getId());
        tradeNoticeVO.setSendId(sessionId);
        tradeNoticeVO.setTradeId(tradeReplyVO.getTradeId());
        tradeNoticeDAO.setReplyNotice(tradeNoticeVO);
    }

//    신고하기
    @Override
    public void createReport(TradeReportVO tradeReportVO){
        tradeReportVO.setReporterId((String)session.getAttribute("memberId"));
        tradeReplyDAO.addReport(tradeReportVO);
    }

//    댓글삭제
    @Override
    public int remove(Long id, String categoryName){
        int result = 0;
        TradeReportVO tradeReportVO = new TradeReportVO();
        tradeReportVO.setCategoryName(categoryName);
        tradeReportVO.setTradeReplyId(id);
        int check = tradeDAO.findByReport(tradeReportVO);
        if(check == 0){
            tradeNoticeDAO.removeReply(id);
            result = tradeReplyDAO.delete(id);
        }
        log.info("{}..댓글 삭제",result);

        return result;
    }

//   댓글 전체 삭제
    @Override
    public int removeAll(Long id){
        return tradeReplyDAO.deleteAll(id);
    }
}
