package com.app.teamProject.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("setting/*")
public class SettingController {

    @GetMapping("follow")
    public void follow(){;}

    @GetMapping("list")
    public void list(){;}
}
