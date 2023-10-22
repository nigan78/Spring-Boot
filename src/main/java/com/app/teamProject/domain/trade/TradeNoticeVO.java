package com.app.teamProject.domain.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class TradeNoticeVO {
    private Long id;
    private String noticeId;
    private String sendId;
    private Long tradeId;
    private Long tradeReplyId;
    private String categoryName;
}
