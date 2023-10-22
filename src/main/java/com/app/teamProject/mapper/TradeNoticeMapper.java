package com.app.teamProject.mapper;


import com.app.teamProject.domain.trade.TradeNoticeVO;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface TradeNoticeMapper {
//    신청 알림
    public void applyInsert(TradeNoticeVO tradeNoticeVO);

//    댓글 알림
    public void replyInsert(TradeNoticeVO tradeNoticeVO);

//    알림 전체 삭제
    public void deleteApply(Long id);
    public void deleteReply(Long id);
}
