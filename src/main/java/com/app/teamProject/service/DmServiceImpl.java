package com.app.teamProject.service;

import com.app.teamProject.dao.DmDAO;
import com.app.teamProject.dto.DmDTO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeReplyDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DmServiceImpl implements DmService {
    private final DmDAO dmDAO;

    @Override
    public List<DmDTO> getList(String memberId) {
        return dmDAO.findAll(memberId);
    }

    //    디엠 상세 리스트 출력
    @Override
    public List<DmDTO> getMemberId(String memberId) {
        List<DmDTO> lists = dmDAO.findMemberId(memberId);
        lists.forEach(list -> list.setReDms(dmDAO.findSendId(list.getSendId())));

        return lists;
    }
}
