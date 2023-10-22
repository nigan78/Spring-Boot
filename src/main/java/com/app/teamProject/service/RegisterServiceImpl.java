package com.app.teamProject.service;

import com.app.teamProject.dao.RegisterDAO;
import com.app.teamProject.domain.MemberVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {
    private final RegisterDAO registerDAO;

    @Override
    public void join(MemberVO memberVO) {
        registerDAO.save(memberVO);
    }

    @Override
    public Optional<String> checkId(String ID) {
        return Optional.ofNullable(registerDAO.findIDByID(ID));
    }

    @Override
    public Optional<String> checkHp(String HP) {
        return Optional.ofNullable(registerDAO.findHPByHP(HP));
    }
}
