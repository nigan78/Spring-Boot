package com.app.teamProject.service;

import com.app.teamProject.domain.MemberVO;

import java.util.Optional;

public interface LoginService {
//    로그인
    public Optional<MemberVO> login(MemberVO memberVO);
//    비밀번호 변경
    public void changepw(MemberVO memberVO);
//    카카오 로그인
    public Optional<MemberVO> kakaologin(MemberVO memberVO);
//    아이디 찾기
    public Optional<String> findId(String HP);
}
