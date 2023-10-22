package com.app.teamProject.dao;

import com.app.teamProject.domain.feed.FeedReplyVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import com.app.teamProject.dto.feed.FeedReplyDTO2;
import com.app.teamProject.mapper.FeedReplyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FeedReplyDAO {
    private final FeedReplyMapper feedReplyMapper;
    
//    댓글리스트
    public List<FeedReplyDTO> findReplies(Long feedId, Pagination pagination){ return feedReplyMapper.selectReplies(feedId, pagination);}
    
//    대댓글리스트
    public List<FeedReplyDTO2> findRereplies(Long feedId, int replyGroup){return feedReplyMapper.selectRereplies(feedId, replyGroup);}

//    댓글등록
    public void saveReply(FeedReplyVO feedReplyVO){feedReplyMapper.replyInsert(feedReplyVO);}

//    대댓글등록
    public void saveRereply(FeedReplyVO feedReplyVO){feedReplyMapper.rereplyInsert(feedReplyVO);}

//    댓글삭제
    public int delete(Long id){return feedReplyMapper.delete(id);}

//    댓글신고
    public void addReport(FeedReportVO feedReportVO){feedReplyMapper.report(feedReportVO);}
}
