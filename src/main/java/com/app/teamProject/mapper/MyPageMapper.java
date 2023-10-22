package com.app.teamProject.mapper;

import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.domain.adv.AdvVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.domain.together.TogetherVO;
import com.app.teamProject.domain.trade.TradeVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface MyPageMapper {
//    로그인 상태 확인용
    public Optional<MemberVO> onLogin(MemberVO memberVO);

//    내 광고 정보 가져오기
    public List<AdvVO> adv(AdvVO advVO);

//    팔로워 수
    public List<FollowVO> follower(FollowVO followVO);

//      팔로잉 수
    public List<FollowVO> following(FollowVO followVO);
    public void delete(FollowVO followVO);

    // feed 수
    public List<FeedVO> feed(FeedVO feedVO);
    public List<String> feedRCount(FeedVO feedVO);

    // together 수
    public List<TogetherVO> together(TogetherVO togetherVO);
    public List<String> togetherRCount(TogetherVO togetherVO);


    // trade 수
    public List<TradeVO> trade(TradeVO tradeVO);

    public void update(MemberVO memberVO);

}
