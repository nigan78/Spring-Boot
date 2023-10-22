package com.app.teamProject.controller;

import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.service.RegisterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Parameter;
import java.util.HashMap;

@Controller
@RequiredArgsConstructor
@RequestMapping("register/*")
@Slf4j
public class RegisterController {
    private final RegisterService registerService;

    @GetMapping("registerMain")
    public void registerMain(){;}

    //    회원가입 페이지 연결
    @GetMapping("registerNext")
    public void registerNext(MemberVO memberVO){;}
    //    회원가입
    @PostMapping("registerNext")
    public RedirectView join(MemberVO memberVO){
//        null값이 들어가면 오류나서 빈 값을 던지게 만듦
        memberVO.setImg("");
        registerService.join(memberVO);
        return new RedirectView("/register/registerOk");
    }

    @GetMapping("/checkid")
    @ResponseBody
    public boolean checkId(String ID){
        return registerService.checkId(ID).isPresent();
    }

    @GetMapping("checkHp")
    @ResponseBody
    public String checkHp(String str, String hp){
        if(registerService.checkHp(hp).isPresent()){
            boolean checkhp = registerService.checkHp(hp).isPresent();
            str = String.valueOf(checkhp);
            return str;
        }
        else {
//            log.info("{}!!!",hp);
//            log.info("{}@@@",str);
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
    }

    @GetMapping("registerOk")
    public void registerOk(){;}
}
