package com.app.teamProject.domain.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@Component
public class TradeReplyNoticeVO {

    private Long id;
    private String memberId;
    private Long noticeId;
    private int noticeCheck;
}
