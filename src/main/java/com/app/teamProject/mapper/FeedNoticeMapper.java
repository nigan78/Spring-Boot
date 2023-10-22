package com.app.teamProject.mapper;

import com.app.teamProject.domain.feed.FeedNoticeVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FeedNoticeMapper {
//    피드 알림 추가
    public void insert(FeedNoticeVO feedNoticeVO);
}
