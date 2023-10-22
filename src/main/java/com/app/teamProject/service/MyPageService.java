package com.app.teamProject.service;

import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.domain.adv.AdvVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.domain.together.TogetherVO;
import com.app.teamProject.domain.trade.TradeVO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface MyPageService {
    //    광고 승인 결과 보여주기
    public List<AdvVO> showAdResult(AdvVO advVO);

    //    내가 작성한 피드 리스트 확인
    public List<FeedVO> showMyFeed(FeedVO feedVO);

    public List<FollowVO> showMyFollower(FollowVO followVO);

    public List<FollowVO> showMyFollowing(FollowVO followVO);
    public void deleteFolloing(FollowVO followVO);


    //    마이페이지 이동하게
    public Optional<MemberVO> myPage(MemberVO memberVO);
    public void myInfoUpdate(MemberVO memberVO);

    //    내가 작성한 함께해요
    public List<TogetherVO> showMyTogether(TogetherVO togetherVO);


    //    내가 작성한 교환해요
    public List<TradeVO> showMyTrade(TradeVO tradeVO);

    //    내 설정
    public Optional<MemberVO> MySetting();

    //    팔로잉 팔로워 정보보기
    public Optional<MemberVO> showUserInfo();

}
