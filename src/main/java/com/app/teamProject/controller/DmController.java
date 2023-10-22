package com.app.teamProject.controller;

import com.app.teamProject.dto.DmDTO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeReplyDTO;
import com.app.teamProject.service.DmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("dm/*")
@Slf4j
public class DmController {
    private final DmService dmService;
    private final HttpSession session;

    @GetMapping("detail")
    public void detail(){;}

    @GetMapping("list")
    @ResponseBody
    public List<DmDTO> list(String memberId){
        memberId = (String)session.getAttribute("memberId");
        List<DmDTO> lists = dmService.getList(memberId);
        return lists;
    }

//    디테일
    @GetMapping("detail/{sendId}")
    @ResponseBody
    public List<DmDTO> list(String memberId, String sendId){
        memberId = (String)session.getAttribute("memberId");
        List<DmDTO> lists = dmService.getMemberId(memberId);

        log.info("{}...........컨트롤러",lists);
        return lists;

    }
}
