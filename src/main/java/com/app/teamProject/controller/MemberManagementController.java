package com.app.teamProject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("memberManagement/*")
public class MemberManagementController {

    @GetMapping("detailPage")
    public void detailPage(){;}

    @GetMapping("memberList")
    public void memberList(){;}
}
