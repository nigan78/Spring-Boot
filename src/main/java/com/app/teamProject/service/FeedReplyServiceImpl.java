package com.app.teamProject.service;

import com.app.teamProject.dao.FeedDAO;
import com.app.teamProject.dao.FeedFileDAO;
import com.app.teamProject.dao.FeedReplyDAO;
import com.app.teamProject.domain.feed.FeedReplyVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import com.app.teamProject.dto.feed.FeedReplyDTO2;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FeedReplyServiceImpl implements FeedReplyService {
    private final FeedReplyDAO feedReplyDAO;
    private final FeedDAO feedDAO;
    private final HttpSession session;
    @Override
    public List<FeedReplyDTO> getReplies(Long feedId, Pagination pagination) {
        List<FeedReplyDTO> replies = feedReplyDAO.findReplies(feedId, pagination);
        replies.forEach(reply -> reply.setRereplies(feedReplyDAO.findRereplies(reply.getFeedId(), reply.getReplyGroup())));

        return replies;
    }

//    댓글작성
    @Override
    public void replyWrite(FeedReplyVO feedReplyVO){
        feedReplyVO.setMemberId((String) session.getAttribute("memberId"));
        feedReplyDAO.saveReply(feedReplyVO);
    }

//    대댓글작성
    @Override
    public void rereplyWrite(FeedReplyVO feedReplyVO){
        feedReplyVO.setMemberId((String) session.getAttribute("memberId"));

        feedReplyDAO.saveRereply(feedReplyVO);
    }

//    댓글삭제
    @Override
    public int remove(Long id, String categoryName){
        int result = 0;
        FeedReportVO feedReportVO = new FeedReportVO();
        feedReportVO.setCategoryName(categoryName);
        feedReportVO.setFeedReplyId(id);
        int check = feedDAO.findByReport(feedReportVO);
        if(check == 0){
            result = feedReplyDAO.delete(id);
        }
        log.info("{}..댓글 삭제",result);
        return result;
    }


//    신고하기
    @Override
    public void createReport(FeedReportVO feedReportVO){
        feedReportVO.setReporterId((String)session.getAttribute("memberId"));
        feedReplyDAO.addReport(feedReportVO);
    }

}
