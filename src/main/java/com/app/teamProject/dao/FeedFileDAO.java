package com.app.teamProject.dao;

import com.app.teamProject.domain.feed.FeedFileVO;
import com.app.teamProject.mapper.FeedFileMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FeedFileDAO {
    private final FeedFileMapper feedFileMapper;

    //    파일 추가
    public void save(FeedFileVO feedFileVO){
        feedFileMapper.insert(feedFileVO);
    }

    //    파일 삭제
    public void delete(Long id){
        feedFileMapper.delete(id);
    }

    //    게시글의 파일 전체 삭제
    public void deleteAll(Long feedId){
        feedFileMapper.deleteAll(feedId);
    }

    //    파일 조회
    public List<FeedFileVO> findAll(Long feedId){
        return feedFileMapper.selectAll(feedId);
    }
}
