package com.app.teamProject.service;

import com.app.teamProject.dao.LoginDAO;
import com.app.teamProject.domain.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {
    private final LoginDAO loginDAO;

    @Override
    public Optional<MemberVO> login(MemberVO memberVO) {
        return Optional.ofNullable(loginDAO.findIDByID(memberVO));
    }

    @Override
    public void changepw(MemberVO memberVO){
        loginDAO.updatePWByIDPW(memberVO);
    }

    @Override
    public Optional<MemberVO> kakaologin(MemberVO memberVO) {
        return Optional.ofNullable(loginDAO.findKakao(memberVO));
    }

    @Override
    public Optional<String> findId(String Hp) {
        return Optional.ofNullable(loginDAO.findIDByHP(Hp));
    }
}
