package com.app.teamProject.dao;

import com.app.teamProject.domain.feed.FeedLikeVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;
import com.app.teamProject.mapper.FeedMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class FeedDAO {
    private final FeedMapper feedMapper;
    
//    피드 리스트
    public List<FeedDTO> findAll(String memberId, Pagination pagination){return feedMapper.selectAll(memberId, pagination);}

//    피드 작성
    public int save(FeedDTO feedDTO){
        return feedMapper.insert(feedDTO);
    }

//    좋아요 추가
    public int addLike(FeedLikeVO feedLikeVO){return feedMapper.insertLike(feedLikeVO);}

//    좋아요 삭제
    public int removeLike(FeedLikeVO feedLikeVO){return feedMapper.deleteLike(feedLikeVO);}

//    좋아요 중복 검사
    public Optional<FeedLikeVO> findByLike(FeedLikeVO feedLikeVO){return feedMapper.findLike(feedLikeVO);}

//    신고 여부 검사
    public int findByReport(FeedReportVO feedReportVO){return feedMapper.findReport(feedReportVO);}

//    피드 수정
    public void setFeed(FeedDTO feedDTO){feedMapper.update(feedDTO);}

//    게시글 총 개수
    public int findCountOfPost(String memberId){return feedMapper.selectCountOfPost(memberId);}

//    게시글 신고
    public void addReport(FeedReportVO feedReportVO){feedMapper.report(feedReportVO);}

}
