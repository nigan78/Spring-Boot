package com.app.teamProject.controller;

import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.exception.LoginFailedException;
import com.app.teamProject.service.LoginService;
import com.app.teamProject.service.RegisterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;

@Controller
@RequiredArgsConstructor
@RequestMapping("login/*")
@Slf4j
public class LoginController {
    private final LoginService loginService;

    private final RegisterService registerService;

    @GetMapping("findId")
    public void findId(){;}

    @GetMapping("checkHp")
    @ResponseBody
    public String checkHp(String str, String hp){
        if(registerService.checkHp(hp).isPresent()){
            log.info("{}!!!",hp);
            log.info("{}@@@",str);
            String  api_key= "NCS25JNHFNZ66ZNC";
            String  api_secret= "03PJTU1YIZLC0CC6ORQ8E61YVXEDYDOZ";

            net.nurigo.java_sdk.api.Message coolsms = new net.nurigo.java_sdk.api.Message(api_key, api_secret);
            HashMap<String, String> params = new HashMap<String, String>();
            params.put("to",hp);
            params.put("from","010-5691-8612");
            params.put("type","SMS");
            params.put("text", str);

            try {
                coolsms.send(params);
            } catch (CoolsmsException e) {
                e.printStackTrace();
            }
            return str;
        }
        else {
            boolean checkhp = registerService.checkHp(hp).isPresent();
            str = String.valueOf(checkhp);
            return str;
        }
    }

    @GetMapping("findIdResult")
    public void findIdResult(String hp, Model model){
        String ID = loginService.findId(hp).orElseThrow();
        log.info("{}...", ID);
        model.addAttribute("ID", ID);
    }

    @GetMapping("findPw")
    public void findPw(MemberVO memberVO){;}
    @PostMapping("findPw")
    public RedirectView updatePw(MemberVO memberVO, RedirectAttributes redirectAttributes) throws Exception{
        String inputId = memberVO.getId();
        String hpId = loginService.findId(memberVO.getHp()).orElseThrow();
        log.info(inputId);
        log.info(hpId);
        if(inputId.equals(hpId)){
            loginService.changepw(memberVO);
            return new RedirectView("/login/findPwResult");
        }
        else {
            redirectAttributes.addFlashAttribute("fail",false);
            return new RedirectView("/login/findPw");
        }
    }

    @GetMapping("findPwResult")
    public void findPwResult(){;}

    @GetMapping("login")
    public void login(MemberVO memberVO){;}

    @PostMapping("login")
    public RedirectView loginOk(MemberVO memberVO, HttpSession session){
//        session.setAttribute("memberId", loginService.login(memberVO).orElseThrow(() -> {throw new LoginFailedException("아이디 또는 비밀번호 오류");}));
        memberVO = loginService.login(memberVO).orElseThrow(() -> {throw new LoginFailedException("아이디 또는 비밀번호 오류");});
        session.setAttribute("memberId", memberVO.getId());
        session.setAttribute("memberName", memberVO.getName());
        return new RedirectView("/index/index");
    }

    @GetMapping("nothingResult")
    public void nothingResult(){;}
}
