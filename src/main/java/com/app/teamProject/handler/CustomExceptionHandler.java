package com.app.teamProject.handler;

import com.app.teamProject.exception.LoginFailedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(LoginFailedException.class)
    protected RedirectView handleLoginFailedException(LoginFailedException loginFailedException, RedirectAttributes redirectAttributes){
//        세션의 Flash영역에 담아 놓고 화면에서 초기화된 request 객체에 담아준 뒤 세션에서는 해당 데이터가 삭제된다.
        redirectAttributes.addFlashAttribute("login", "false");
        return new RedirectView("/login/login");
    }
}
