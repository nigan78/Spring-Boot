package com.app.teamProject.service;

import com.app.teamProject.domain.feed.FeedReplyVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import java.util.List;

public interface FeedReplyService {
    //    댓글 목록
    public List<FeedReplyDTO> getReplies(Long feedId, Pagination pagination);

    //    댓글등록
    public void replyWrite(FeedReplyVO feedReplyVO);

    //    대댓글등록
    public void rereplyWrite(FeedReplyVO feedReplyVO);

    //    댓글삭제
    public int remove(Long id, String categoryName);

    //    댓글신고
    public void createReport(FeedReportVO feedReportVO);
}
