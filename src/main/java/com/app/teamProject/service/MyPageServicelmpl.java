package com.app.teamProject.service;

import com.app.teamProject.dao.MyPageDAO;
import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.domain.adv.AdvVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.domain.together.TogetherVO;
import com.app.teamProject.domain.trade.TradeVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyPageServicelmpl implements MyPageService {
    private final MyPageDAO myPageDAO;
//    private final LoginDAO loginDAO;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public List<AdvVO> showAdResult(AdvVO advVO) {
        return myPageDAO.showMyAdv(advVO);
    }

    //    애는 대른데서 그래로 써도 될듯
    @Override
    public List<FeedVO> showMyFeed(FeedVO feedVO) {
        return myPageDAO.showMyFeed(feedVO);
    }

    //    팔로워 팔로잉 수 보기
    @Override
    public List<FollowVO> showMyFollowing(FollowVO followVO) {
        return myPageDAO.showFollowing(followVO);
    }

    @Override
    public List<FollowVO> showMyFollower(FollowVO followVO) {
        return myPageDAO.showFollower(followVO);
    }

    //    여기에 데이터를 모으는게 나을까?
    @Override
    public Optional<MemberVO> myPage(MemberVO memberVO) {
        return myPageDAO.loginStatus(memberVO);
    }

    @Override
    public void myInfoUpdate(MemberVO memberVO){myPageDAO.myInfoUpdate(memberVO);};
    @Override
    public List<TogetherVO> showMyTogether(TogetherVO togetherVO) {
        return myPageDAO.showMyTogether(togetherVO);
    }

    @Override
    public void deleteFolloing(FollowVO followVO){
        myPageDAO.delet(followVO);
    }



    @Override
    public List<TradeVO> showMyTrade(TradeVO tradeVO) {
        return myPageDAO.showMyTrade(tradeVO);
    }

    @Override
    public Optional<MemberVO> MySetting() {

        return Optional.empty();
    }

    @Override
    public Optional<MemberVO> showUserInfo() {

        return Optional.empty();
    }
}
