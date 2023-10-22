package com.app.teamProject.controller.trade;

import com.app.teamProject.domain.trade.TradeReplyVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeReplyDTO;
import com.app.teamProject.service.TradeReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("replies/*")
@Slf4j
public class TradeReplyController {
    private final TradeReplyService tradeReplyService;
    private final HttpSession session;

    @GetMapping("list/{tradeId}/{page}")
    @ResponseBody
    public List<TradeReplyDTO> list(@PathVariable int page, @PathVariable Long tradeId){
        final Pagination pagination = new Pagination();
        pagination.setPage(page);
        pagination.progress();

        List<TradeReplyDTO> replies = tradeReplyService.getReplies(tradeId, pagination);

        return replies;
    }

    //    댓글작성
    @PostMapping("replyWrite")
    @ResponseBody
    public void replyWrite(@RequestBody TradeReplyVO tradeReplyVO){
        tradeReplyService.replyWrite(tradeReplyVO);
        log.info("{}.............댓글쓰기", tradeReplyVO);
    }

    //    대댓글작성
    @PostMapping("rereplyWrite")
    @ResponseBody
    public void rereplyWrite(@RequestBody TradeReplyVO tradeReplyVO){
        tradeReplyService.rereplyWrite(tradeReplyVO);
    }

    //    댓글삭제
    @DeleteMapping("remove")
    @ResponseBody
    public int remove(@RequestParam Long id, @RequestParam String categoryName){
        return tradeReplyService.remove(id, categoryName);
    }

    //    댓글 신고
    @PostMapping("report")
    @ResponseBody
    public void createReport(@RequestBody TradeReportVO tradeReportVO){
        tradeReportVO.setReporterId((String)session.getAttribute("memberId"));
        tradeReplyService.createReport(tradeReportVO);

    }

}
