package com.app.teamProject.dao;

import com.app.teamProject.domain.MemberVO;
import com.app.teamProject.mapper.RegisterMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class RegisterDAO {
    private final RegisterMapper registerMapper;

//    회원가입
    public void save(MemberVO memberVO){
        registerMapper.insert(memberVO);
    }
//    중복체크
    public String findIDByID(String ID){
        return registerMapper.selectForIdCheck(ID);
    }
//    번호중복체크
    public String findHPByHP(String HP) {
        return registerMapper.selectForHpCheck(HP);
    }
}
