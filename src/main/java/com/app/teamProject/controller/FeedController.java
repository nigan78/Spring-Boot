package com.app.teamProject.controller;

import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.domain.feed.FeedLikeVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import com.app.teamProject.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.Session;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("feed/*")
@Slf4j
public class FeedController {
    private final FeedService feedService;
    private final HttpSession session;

//    리스트
    @GetMapping("list")
    public String list(Pagination pagination, String memberId, Model model){
        memberId = (String)session.getAttribute("memberId");
        pagination.setTotal(feedService.getTotal(memberId));
        pagination.progress();

//        log.info("{}",pagination);


        model.addAttribute("feeds",feedService.getList(memberId, pagination));

        return "/feed/feedList";
    }

//    리스트 페이징
    @GetMapping("list/{page}")
    @ResponseBody
    public List<FeedDTO> list(@PathVariable int page, String memberId){
        final Pagination pagination = new Pagination();
        memberId = (String)session.getAttribute("memberId");
        pagination.setPage(page);
        pagination.setTotal(feedService.getTotal(memberId));
        pagination.progress();



        List<FeedDTO> feeds = feedService.getList(memberId, pagination);

        return feeds;
    }

    @GetMapping("write")
    public void feedForm(FeedDTO feedDTO, Model model){;}

//  피드작성
    @PostMapping("write")
    public RedirectView write(FeedDTO feedDTO){
        feedDTO.setMemberId((String)session.getAttribute("memberId"));
        int result = feedService.write(feedDTO);

        return new RedirectView("/feed/list");
    }

//   좋아요 추가
    @PostMapping("addLike")
    public void addLike(@RequestBody FeedLikeVO feedLikeVO){
        feedLikeVO.setMemberId((String)session.getAttribute("memberId"));
        feedService.insertLike(feedLikeVO);
    }

// 좋아요 삭제
    @PostMapping("removeLike")
    public void removeLike(@RequestBody FeedLikeVO feedLikeVO){
        feedLikeVO.setMemberId((String)session.getAttribute("memberId"));
        feedService.deleteLike(feedLikeVO);
    }

//   좋아요 유무 검사
    @PostMapping("checkLike")
    @ResponseBody
    public boolean checkLike(@RequestBody FeedLikeVO feedLikeVO){
        feedLikeVO.setMemberId((String)session.getAttribute("memberId"));
        log.info("{}고유번호",feedLikeVO.getId());
        log.info("{}피드 아이디", feedLikeVO.getFeedId());
        return feedService.checkLike(feedLikeVO).isPresent();
    }

//    피드 수정
    @PostMapping("modify")
    public RedirectView modify(FeedDTO feedDTO, RedirectAttributes redirectAttributes){
        log.info(feedDTO.toString());
        feedService.modifyFeed(feedDTO);
        redirectAttributes.addAttribute("id", feedDTO.getId());
        return new RedirectView("/feed/list");
    }


//    댓글 신고
    @PostMapping("report")
    @ResponseBody
    public void createReport(@RequestBody FeedReportVO feedReportVO){
        feedReportVO.setReporterId((String)session.getAttribute("memberId"));
        log.info("{}..........신고",feedReportVO);
        feedService.createReport(feedReportVO);

    }

}
