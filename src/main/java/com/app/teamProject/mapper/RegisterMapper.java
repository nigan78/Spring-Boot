package com.app.teamProject.mapper;

import com.app.teamProject.domain.MemberVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegisterMapper {
//    회원가입
    public void insert(MemberVO memberVO);
//    중복체크
    public String selectForIdCheck(String ID);
//    번호중복체크
    public String selectForHpCheck(String hp);
}
