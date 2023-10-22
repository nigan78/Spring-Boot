package com.app.teamProject.dao;

import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.mapper.LoginMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class LoginDAO {
    private final LoginMapper loginMapper;
    //    세션에 담기
    public MemberVO findIDByID(MemberVO memberVO){
        return loginMapper.select(memberVO);
    }
    //    비밀번호 변경
    public void updatePWByIDPW(MemberVO memberVO){
        loginMapper.update(memberVO);
    };

    //    카카오 로그인
    public MemberVO findKakao(MemberVO memberVO) {
        return loginMapper.selectKakao(memberVO);
    }

    //    아이디 찾기
    public String findIDByHP(String hp) {
        return loginMapper.selectId(hp);
    }
}
