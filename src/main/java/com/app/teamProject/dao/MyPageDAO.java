package com.app.teamProject.dao;

import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.domain.adv.AdvVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.domain.together.TogetherVO;
import com.app.teamProject.domain.trade.TradeVO;
import com.app.teamProject.mapper.MyPageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MyPageDAO {
    private final MyPageMapper myPageMapper;

    //  로그인 확인용
    public Optional<MemberVO> loginStatus(MemberVO memberVO) {
        return myPageMapper.onLogin(memberVO);
    }
    public void myInfoUpdate(MemberVO memberVO){myPageMapper.update(memberVO);}

    //    광고 신청 내용
    public List<AdvVO> showMyAdv(AdvVO advVO) {
        return myPageMapper.adv(advVO);
    }


    //    팔로워
    public List<FollowVO> showFollower(FollowVO followVO) {
        return myPageMapper.follower(followVO);
    }

    //    팔로잉
    public List<FollowVO> showFollowing(FollowVO followVO) {
        return myPageMapper.following(followVO);
    }

    public void delet(FollowVO followVO) {myPageMapper.delete(followVO);}

    //    내가 작성한 피드
    public List<FeedVO> showMyFeed(FeedVO feedVO) {
        return myPageMapper.feed(feedVO);
    }
    public List<String> showMyFCout(FeedVO feedVO) {
        return myPageMapper.feedRCount(feedVO);
    }

    //    내가 작성한 함께해요
    public List<TogetherVO> showMyTogether(TogetherVO togetherVO) {
        return myPageMapper.together(togetherVO);
    }
    public  List<String> showRCount(TogetherVO togetherVO) {
        return myPageMapper.togetherRCount(togetherVO);
    }


    //    내가 작성한 교환해요
    public List<TradeVO> showMyTrade(TradeVO tradeVO) {
        return myPageMapper.trade(tradeVO);
    }

    //    설정 업데이트
    public void mySetting() {
        ;
    }

    //    팔로워 유저 정보 페이지
    public void userInfo() {
        ;
    }
}
