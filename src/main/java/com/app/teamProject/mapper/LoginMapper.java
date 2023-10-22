package com.app.teamProject.mapper;

import com.app.teamProject.domain.MemberVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {
//    세션에 담기
    public MemberVO select(MemberVO memberVO);
//    비밀번호 변경
    public void update (MemberVO memberVO);
//    카카오 로그인
    public MemberVO selectKakao(MemberVO memberVO);
//    아이디 찾기
    public String selectId(String hp);
}
