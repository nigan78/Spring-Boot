package com.app.teamProject.mapper;

import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface FollowMapper {

//   팔로우 추가
    public int insert(FollowVO followVO);

//   팔로우 취서
    public int delete(FollowVO followVO);

//   팔로우 확인
    public Optional<FollowVO> findFollow(FollowVO followVO);

}
