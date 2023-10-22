package com.app.teamProject.service;


import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;

import java.util.List;
import java.util.Optional;

public interface FollowService {
//    팔로우 추가
    public int insert(FollowVO followVO);

//    팔로우 취소
    public int remove(FollowVO followVO);

//    팔로우 찾기
    public Optional<FollowVO> checkFollow(FollowVO followVO);

}
