package com.app.teamProject.service;


import com.app.teamProject.domain.MemberVO;

import java.util.Optional;

public interface MemberService {
    //    회원 가입
    public void join(MemberVO memberVO);
    //    로그인
    public Optional<String> login(MemberVO memberVO);
    //    아이디 중복검사
    public Optional<String> checkId(String memberId);
}
