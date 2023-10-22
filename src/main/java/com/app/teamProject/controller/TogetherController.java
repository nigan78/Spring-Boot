package com.app.teamProject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("together/*")
public class TogetherController {

    @GetMapping("create")
    public void create(){;}

    @GetMapping("detailPage")
    public void detailPage(){;}

    @GetMapping("follow")
    public void follow(){;}

    @GetMapping("listPage")
    public void listPage(){;}

    @GetMapping("participate")
    public void participate(){;}
}
