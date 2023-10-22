package com.app.teamProject.mapper;

import com.app.teamProject.domain.feed.FeedLikeVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface FeedMapper {
//    피드 목록
    public List<FeedDTO> selectAll(@Param("memberId") String memberId, Pagination pagination);

//    피드 작성
    public int insert(FeedDTO feedDTO);

//    피드 수정
    public void update(FeedDTO feedDTO);

//    피드 뷰
    public FeedDTO select(Long id);

//    좋아요 추가
    public int insertLike(FeedLikeVO feedLikeVO);

//    좋아요 삭제
    public int deleteLike(FeedLikeVO feedLikeVO);

//    좋아요 중복검사
    public Optional<FeedLikeVO> findLike(FeedLikeVO feedLikeVO);

//    신고여부 검사
    public int findReport(@Param("feedReportVO") FeedReportVO feedReportVO);

//    게시글 총 개수
    public int selectCountOfPost(@Param("memberId") String memberId);

//    게시글 신고
    public void report(FeedReportVO feedReportVO);

}
