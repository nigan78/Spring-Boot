package com.app.teamProject.service;

import com.app.teamProject.dao.TradeNoticeDAO;
import com.app.teamProject.domain.trade.TradeNoticeVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;


@Service
@RequiredArgsConstructor
@Slf4j
public class TradeNoticeServiceImpl implements TradeNoticeService {
    private final TradeNoticeDAO tradeNoticeDAO;
    private final HttpSession session;

//    신청 알림
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void modifyApplyNotice(TradeNoticeVO tradeNoticeVO){tradeNoticeDAO.setApplyNotice(tradeNoticeVO);}

//    댓글 알림
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void modifyReplyNotice(TradeNoticeVO tradeNoticeVO){tradeNoticeDAO.setReplyNotice(tradeNoticeVO);}

//    알림 전체 삭제
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteApply(Long id){tradeNoticeDAO.removeApply(id);}
    public void deleteReply(Long id){tradeNoticeDAO.removeReply(id);}



}
