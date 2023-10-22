package com.app.teamProject.mapper;

import com.app.teamProject.domain.feed.FeedReplyVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import com.app.teamProject.dto.feed.FeedReplyDTO2;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FeedReplyMapper {
//    댓글 출력
    public List<FeedReplyDTO> selectReplies(@Param("feedId")Long feedId, @Param("pagination")Pagination pagination);
    public List<FeedReplyDTO2> selectRereplies(Long feedId, int replyGroup);

//    댓글 등록
    public void replyInsert(FeedReplyVO feedReplyVO);

//    대댓글 등록
    public void rereplyInsert(FeedReplyVO feedReplyVO);

//    댓글 삭제
    public int delete(Long id);

//    댓글 신고
    public void report(FeedReportVO feedReportVO);
}
