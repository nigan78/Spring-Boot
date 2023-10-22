package com.app.teamProject.dao;

import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;
import com.app.teamProject.mapper.FollowMapper;
import com.app.teamProject.mapper.TradeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class FollowDAO {
    private final FollowMapper followMapper;

//    팔로우 추가
    public int save(FollowVO followVO){return followMapper.insert(followVO);}

//    팔로우 삭제
    public int remove(FollowVO followVO){return followMapper.delete(followVO);}

//    팔로우 확인
    public Optional<FollowVO> findByfollow(FollowVO followVO){return followMapper.findFollow(followVO);}
}
