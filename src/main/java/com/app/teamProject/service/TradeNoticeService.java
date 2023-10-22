package com.app.teamProject.service;


import com.app.teamProject.domain.trade.TradeNoticeVO;


public interface TradeNoticeService {
//    신청 알림
    public void modifyApplyNotice(TradeNoticeVO tradeNoticeVO);

//    댓글 알림
    public void modifyReplyNotice(TradeNoticeVO tradeNoticeVO);

//    알림 전체 삭제
    public void deleteApply(Long id);
    public void deleteReply(Long id);
}
