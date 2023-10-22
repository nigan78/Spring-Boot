package com.app.teamProject.controller;

import com.app.teamProject.dto.AdvDTO;
import com.app.teamProject.service.AdvSerivce;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("index/*")
@Slf4j
public class IndexController {
    private final AdvSerivce advSerivce;

    @GetMapping("index")
    public void index(AdvDTO advDTO, Model model){
        List<AdvDTO> advDTOS = advSerivce.selectAdv(advDTO);
        model.addAttribute("advDTOS", advDTOS);
    }
}
