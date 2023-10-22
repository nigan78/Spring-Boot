package com.app.teamProject.controller;

import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.service.KakaoService;
import com.app.teamProject.service.LoginService;
import com.app.teamProject.service.RegisterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
@Slf4j
public class KakaoController {

    private final KakaoService kakaoService;
    private final RegisterService registerService;
    private final LoginService loginService;

    @ResponseBody
    @GetMapping("/login")
    public RedirectView kakaoCallback(@RequestParam String code, HttpSession session, RedirectAttributes redirectAttributes) throws Exception {
        log.info("{}.......",code);
        String token = kakaoService.getKaKaoAccessToken(code);
        String kakao =  kakaoService.getKakaoInfo(token);
        boolean id = registerService.checkId(kakao).isPresent();
        if(id){
            MemberVO memberVO = new MemberVO();
            memberVO.setId(kakaoService.getKakaoInfo(token));
            memberVO = loginService.kakaologin(memberVO).orElseThrow();
            session.setAttribute("memberId", kakao);
            session.setAttribute("memberName", memberVO.getName());
            return new RedirectView("/index/index");
        }
        redirectAttributes.addFlashAttribute("kakao", kakao);
        return new RedirectView("/register/registerNext");
    }

    @GetMapping("/logout")
    public void kakaoLogout(HttpSession session){
        log.info("logout");
        kakaoService.logoutKakao((String)session.getAttribute("token"));
        session.invalidate();
    }
}
