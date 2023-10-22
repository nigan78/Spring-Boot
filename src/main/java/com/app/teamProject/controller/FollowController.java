package com.app.teamProject.controller;

import com.app.teamProject.domain.FollowVO;
import com.app.teamProject.service.FollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@RequestMapping("follow/*")
@Slf4j
public class FollowController {
    private final HttpSession session;
    private final FollowService followService;

    @PostMapping("check")
    @ResponseBody
    public boolean write(@RequestBody FollowVO followVO){
        followVO.setMemberId((String)session.getAttribute("memberId"));
        return followService.checkFollow(followVO).isPresent();
    }

}
