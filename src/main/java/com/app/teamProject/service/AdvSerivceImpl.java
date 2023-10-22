package com.app.teamProject.service;

import com.app.teamProject.dao.AdvDAO;
import com.app.teamProject.domain.adv.AdvFileVO;
import com.app.teamProject.dto.AdvDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdvSerivceImpl implements AdvSerivce {
    private final AdvDAO advDAO;

    @Override
    public void insert(AdvDTO advDTO) {
        advDAO.insert(advDTO);
    }

    @Override
    public Long select(Long ID){
        return advDAO.select(ID);
    }

    @Override
    public void insertfile(AdvFileVO advFileVO){
        advDAO.insertfile(advFileVO);
    }

    @Override
    public List<AdvDTO> selectAdv(AdvDTO advDTO){
        return advDAO.findAdv(advDTO);
    }
}
