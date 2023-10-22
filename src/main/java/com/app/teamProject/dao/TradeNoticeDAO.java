package com.app.teamProject.dao;


import com.app.teamProject.domain.trade.TradeNoticeVO;
import com.app.teamProject.mapper.TradeNoticeMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class TradeNoticeDAO {
    private final TradeNoticeMapper tradeNoticeMapper;

//    신청 알림
    public void setApplyNotice(TradeNoticeVO tradeNoticeVO){tradeNoticeMapper.applyInsert(tradeNoticeVO);}

//    댓글 알림
    public void setReplyNotice(TradeNoticeVO tradeNoticeVO){tradeNoticeMapper.replyInsert(tradeNoticeVO);}

//    알림 전체 삭제
    public void removeApply(Long id){tradeNoticeMapper.deleteApply(id);}
    public void removeReply(Long id){tradeNoticeMapper.deleteReply(id);}


}
