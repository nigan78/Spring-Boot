package com.app.teamProject.service;

import com.app.teamProject.domain.MemberVO;

import java.util.Optional;

public interface RegisterService {
//    회원가입
    public void join(MemberVO memberVO);
//    중복체크
    public Optional<String> checkId(String ID);
//    번호중복체크
    public Optional<String> checkHp(String HP);
}
