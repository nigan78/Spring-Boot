package com.app.teamProject.controller;

import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.domain.adv.AdvVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.domain.together.TogetherVO;
import com.app.teamProject.domain.trade.TradeVO;
import com.app.teamProject.mapper.MyPageMapper;
import com.app.teamProject.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("mypage/*")
public class MypageController {
    private final MyPageService myPageService;
    private final MyPageMapper myPageMapper;
    //    로그인 정보 찾을 때 사용하면 좋을 듯
//    private final LoginService loginService;


    //    광고 승인 상태 확인 페이지로 이동
    @GetMapping("adAllow")
    public String adAllow(AdvVO advVO, Model model, HttpSession session) {
        String memberId = (String) session.getAttribute("memberId");

        if (memberId != null) {
            advVO.setMemberId(memberId);
            List<AdvVO> advList = myPageService.showAdResult(advVO);
            model.addAttribute("advList", advList);
            return null;
        } else {
            return "/login/login";
        }
    }

    //    내가 쓴 피드 페이지
    @GetMapping("feedList")
    public String feedList(MemberVO memberVO, FeedVO feedVO, Model model, HttpSession session) {
//        memberVO.setPw("1234");
        String memberId = (String) session.getAttribute("memberId");

        if (memberId != null) {
            memberVO.setId(memberId);
            feedVO.setMemberId(memberId);

            List<FeedVO> feed = myPageService.showMyFeed(feedVO);
            List<String> feedComment = myPageMapper.feedRCount(feedVO);
            Optional<MemberVO> member = myPageService.myPage(memberVO);

            model.addAttribute("feed", feed);
            model.addAttribute("comment", feedComment);
            model.addAttribute("member", member.get().getName());
            return null;

        } else {
            return "/login/login";
        }
    }

    //    팔로워, 팔로잉 페이지
    @GetMapping("follow")
    public String follow(FollowVO followVO, Model model, HttpSession session) {
        String memberId= (String) session.getAttribute("memberId");

        if (memberId != null) {
            followVO.setMemberId(memberId);
            followVO.setFwId(memberId);

            List<FollowVO> folloing = myPageService.showMyFollowing(followVO);
            List<FollowVO> folloer = myPageService.showMyFollower(followVO);

            model.addAttribute("followeing", folloing);
            model.addAttribute("follower", folloer);
            return null;
        } else {
            return "/login/login";
        }
    }

    @DeleteMapping("{me}/{memberId}")
    public void remove(@PathVariable String me,@PathVariable String memberId,FollowVO followVO){
        followVO.setMemberId(memberId);


        followVO.setFwId(me);
        log.info("{}W@@@@",followVO);
        myPageService.deleteFolloing(followVO);
    }

    //    마이페이지 이동
    @GetMapping("mypage")
    public RedirectView gomypage(MemberVO memberVO, FollowVO followVO, FeedVO feedVO, TradeVO tradeVO, TogetherVO togetherVO, Model model, HttpSession session) {
        String memberId = (String) session.getAttribute("memberId");

        //        로그인 확인 되있는지 확인
//        ********* 이거 세션 받아서 이동하게 바꾸기, 강사님app 참조******
        if (memberId != null) {
            memberVO.setId(memberId);
            String name = myPageService.myPage(memberVO).get().getName();
            followVO.setFwId(memberId);
            followVO.setMemberId(memberId);
            feedVO.setMemberId(memberId);
            togetherVO.setMemberId(memberId);
            tradeVO.setMemberId(memberId);

            model.addAttribute("id",name);
            model.addAttribute("fercount", myPageService.showMyFollower(followVO).size());
            model.addAttribute("fingcount", myPageService.showMyFollowing(followVO).size());
            model.addAttribute("feedcount", myPageService.showMyFeed(feedVO).size());
            model.addAttribute("together", myPageService.showMyTogether(togetherVO).size());
            model.addAttribute("trade", myPageService.showMyTrade(tradeVO).size());
            return null;
        } else {
            return new RedirectView("/login/login");
        }
    }

    //    내가 쓴 함께해요
    @GetMapping("myTogetherList")
    public String myTogetherList(MemberVO memberVO,TogetherVO togetherVO,Model model, HttpSession session) {
        String memberId = (String) session.getAttribute("memberId");

        if (memberId != null) {
            memberVO.setId(memberId);
            String member = myPageService.myPage(memberVO).get().getName();
            togetherVO.setMemberId(memberId);
            List<TogetherVO> list = myPageService.showMyTogether(togetherVO);
            List<String> commentCount=myPageMapper.togetherRCount(togetherVO);

            model.addAttribute("name", member);
            model.addAttribute("list", list);
            model.addAttribute("cCount", commentCount);
            return null;
        } else {
            return "/login/login";
        }
    }

    //    내가 쓴 교환해요
    @GetMapping("myTradeList")
    public void myTradeList() {
        ;
    }

    //    개인정보 설정 페이지
    @GetMapping("myupdate")
    public String myupdate(MemberVO memberVO, Model model, HttpSession session) {
        String memberId = (String) session.getAttribute("memberId");

        if (memberId != null) {
            memberVO.setId(memberId);
            Optional<MemberVO> aVO=myPageService.myPage(memberVO);
            model.addAttribute("Id", aVO.get().getId());
            model.addAttribute("Pw", aVO.get().getPw());
            model.addAttribute("Hp", aVO.get().getHp());
            model.addAttribute("Name", aVO.get().getName());
//            model.addAllAttributes("memberVo",aVO);
            return null;
        } else {
            return "/login/login";
        }
    }


    @PostMapping("myupdate")
    public RedirectView updateMyInfo(HttpSession session,MemberVO memberVO,
                                     @RequestParam("phoneNumber") String phoneNumber,
                                     @RequestParam("password") String password) {
        String memberId = (String) session.getAttribute("memberId");

        memberVO.setId(memberId);
        memberVO.setHp(phoneNumber);
        memberVO.setPw(password);

        myPageService.myInfoUpdate(memberVO);
        // 업데이트 후 리디렉션할 페이지로 이동하거나, 다른 처리를 수행할 수 있습니다.
        return new RedirectView("/mypage/myupdate");
    }

    //    이건 나한테 필요한건가? 알림페이지
    @GetMapping("notice")
    public void notice() {
        ;
    }

    //    팔로워 보는 페이지
    @GetMapping("userInfo")
    public void userInfo() {
        ;
    }
}
