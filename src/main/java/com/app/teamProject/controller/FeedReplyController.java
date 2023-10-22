package com.app.teamProject.controller;

import com.app.teamProject.domain.feed.FeedReplyVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import com.app.teamProject.service.FeedReplyService;
import com.app.teamProject.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("feedReplies/*")
@Slf4j
public class FeedReplyController {
    private final FeedReplyService feedReplyService;
    private final HttpSession session;

    @GetMapping("list/{feedId}/{page}")
    @ResponseBody
    public List<FeedReplyDTO> list(@PathVariable int page, @PathVariable Long feedId){
        final Pagination pagination = new Pagination();
        pagination.setPage(page);
        pagination.progress();

        List<FeedReplyDTO> replies = feedReplyService.getReplies(feedId, pagination);

        return replies;
    }

    //    댓글작성
    @PostMapping("replyWrite")
    @ResponseBody
    public void replyWrite(@RequestBody FeedReplyVO feedReplyVO){
        feedReplyService.replyWrite(feedReplyVO);
    }

    //    댓글작성
    @PostMapping("rereplyWrite")
    @ResponseBody
    public void rereplyWrite(@RequestBody FeedReplyVO feedReplyVO){
        feedReplyService.rereplyWrite(feedReplyVO);
    }

    //    댓글삭제
    @DeleteMapping("{id}")
    @ResponseBody
    public int remove(@PathVariable Long id, @RequestParam String categoryName){
        return feedReplyService.remove(id, categoryName);
    }

    //    댓글 신고
    @PostMapping("report")
    @ResponseBody
    public void createReport(@RequestBody FeedReportVO feedReportVO){
        feedReportVO.setReporterId((String)session.getAttribute("memberId"));
        log.info("{}..........신고",feedReportVO);
        feedReplyService.createReport(feedReportVO);

    }

}
