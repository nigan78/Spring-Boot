package com.app.teamProject.mapper;

import com.app.teamProject.domain.feed.FeedFileVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FeedFileMapper {
    //    파일 추가
    public void insert(FeedFileVO feedFileVO);

    //    파일 삭제
    public void delete(Long id);

    //    게시글의 파일 전체 삭제
    public void deleteAll(Long feedId);

    //    파일 조회
    public List<FeedFileVO> selectAll(Long feedId);

    //    어제 날짜 파일 조회
    public List<FeedFileVO> selectYesterday();
}
