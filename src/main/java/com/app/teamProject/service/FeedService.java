package com.app.teamProject.service;

import com.app.teamProject.domain.feed.FeedLikeVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;

import java.util.List;
import java.util.Optional;

public interface FeedService {
    //    피드 목록
    public List<FeedDTO> getList(String memberId, Pagination pagination);

    //    피드 작성
    public int write(FeedDTO feedDTO);

    //    좋아요 추가
    public int insertLike(FeedLikeVO feedLikeVO);

    //    좋아요 삭제
    public int deleteLike(FeedLikeVO feedLikeVO);

    //    좋아요 검사
    public Optional<FeedLikeVO> checkLike(FeedLikeVO feedLikeVO);

    //    신고 여부 검사
    public int checkReport(FeedReportVO feedReportVO);
    
    //    피드 수정
    public void modifyFeed(FeedDTO feedDTO);

    //    게시글 전체 개수 조회
    public int getTotal(String memberId);

    //    게시글신고
    public void createReport(FeedReportVO feedReportVO);
}
