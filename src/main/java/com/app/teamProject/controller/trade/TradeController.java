package com.app.teamProject.controller.trade;

import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;
import com.app.teamProject.service.TradeService;
import lombok.Lombok;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("trade/*")
@Slf4j
public class TradeController {
    private final TradeService tradeService;
    private final HttpSession session;
    
//    리스트
    @GetMapping("list")
    public void list(Pagination pagination, String memberId, Model model){
        memberId = (String)session.getAttribute("memberId");
        pagination.setTotal(tradeService.getTotal());
        pagination.progress();

        model.addAttribute("trades",tradeService.getList(pagination, memberId));
    }

//    리스트 페이징
    @GetMapping("list/{page}")
    @ResponseBody
    public List<TradeDTO> list(@PathVariable int page, String memberId){
        final Pagination pagination = new Pagination();
        memberId = (String)session.getAttribute("memberId");
        pagination.setPage(page);
        pagination.setTotal(tradeService.getTotal());
        pagination.progress();

        List<TradeDTO> trades = tradeService.getList(pagination, memberId);

        return trades;
    }

    @GetMapping("write")
    public void tradeForm(TradeDTO tradeDTO, Model model){;}


//  교환해요작성
    @PostMapping("write")
    public RedirectView write(TradeDTO tradeDTO){
        tradeDTO.setMemberId((String)session.getAttribute("memberId"));
        int result = tradeService.write(tradeDTO);

        return new RedirectView("/trade/list");
    }

//   좋아요 유무 검사 및 삭제, 추가
    @PostMapping("checkLike")
    @ResponseBody
    public boolean checkLike(@RequestBody TradeLikeVO tradeLikeVO){
        tradeLikeVO.setMemberId((String)session.getAttribute("memberId"));
        return tradeService.checkLike(tradeLikeVO).isPresent();
    }

//  뷰페이지 이동
    @GetMapping("detail")
    public void goTODetail(Long id, String memberId, String fmemberId, Model model){
        fmemberId = (String)session.getAttribute("memberId");
        model.addAttribute("trade", tradeService.read(id, memberId, fmemberId).get());
    }

//  수정페이지 이동
    @GetMapping("modify")
    public void goModify(Long id, String memberId, String fmemberId, Model model){
        fmemberId = (String)session.getAttribute("memberId");
        memberId = (String)session.getAttribute("memberId");
        model.addAttribute("trade", tradeService.read(id, memberId, fmemberId).get());
    }

//  교환해요 수정
    @PostMapping("modify")
    public RedirectView modify(TradeDTO tradeDTO, RedirectAttributes redirectAttributes){
        tradeService.modify(tradeDTO);
        return new RedirectView("/trade/list");
    }

//    신고
    @PostMapping("report")
    @ResponseBody
    public void createReport(@RequestBody TradeReportVO tradeReportVO){
        tradeReportVO.setReporterId((String)session.getAttribute("memberId"));
        log.info("{}..........신고",tradeReportVO);
        tradeService.createReport(tradeReportVO);

    }

//    게시글 삭제
    @DeleteMapping("remove/{id}")
    @ResponseBody
    public void remove(@PathVariable Long id){
        tradeService.remove(id);
    };
    
//    교환해요 마감
    @GetMapping("modifyStatus/{id}")
    @ResponseBody
    public void modifyStatus(@PathVariable Long id){
        tradeService.modifyStatus(id);
    }


}
