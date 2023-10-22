package com.app.teamProject.controller.trade;

import com.app.teamProject.domain.trade.TradeReplyVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;
import com.app.teamProject.dto.trade.TradeApplyDTO;
import com.app.teamProject.dto.trade.TradeDTO;
import com.app.teamProject.dto.trade.TradeReplyDTO;
import com.app.teamProject.service.TradeApplyService;
import com.app.teamProject.service.TradeReplyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("trade/app/*")
@Slf4j
public class TradeApplyController {
    private final TradeApplyService tradeApplyService;
    private final HttpSession session;

//    리스트
    @GetMapping("list")
    public void list(Pagination pagination, Long tradeId, Model model){
        pagination.setTotal(tradeApplyService.getTotal(tradeId));
        pagination.progress();
        model.addAttribute("applies",tradeApplyService.getList(pagination, tradeId));
    }

//    리스트 페이징
    @GetMapping("list/{tradeId}/{page}")
    @ResponseBody
    public List<TradeApplyDTO> list(@PathVariable int page, @PathVariable Long tradeId){
        final Pagination pagination = new Pagination();
        pagination.setPage(page);
        pagination.setTotal(tradeApplyService.getTotal(tradeId));
        pagination.progress();
        List<TradeApplyDTO> applies = tradeApplyService.getList(pagination, tradeId);

        return applies;
    }

    @GetMapping("write")
    public void goTowrite(TradeApplyDTO tradeApplyDTO, Model model){
        model.addAttribute("trade", tradeApplyDTO);
    }

//  교환해요 신청
    @PostMapping("write")
    public RedirectView write(RedirectAttributes re, TradeApplyDTO tradeApplyDTO){
        log.info("교환해요 신청 컨트롤러 들어옴11");
        tradeApplyDTO.setMemberId((String)session.getAttribute("memberId"));
        int result = tradeApplyService.write(tradeApplyDTO);
        re.addAttribute("id",tradeApplyDTO.getTradeId());
        re.addAttribute("memberId",tradeApplyDTO.getMemberId());

        return new RedirectView("/trade/detail");
    }

//    교환해요 수락
    @GetMapping("modify/{id}")
    @ResponseBody
    public void modify(@PathVariable Long id){
        log.info("컨트롤러 들어옴");
        log.info("{}...교환해요 수락",tradeApplyService.modify(id));
    }


}
