package com.app.teamProject.domain.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@NoArgsConstructor
@Component
public class TradeReplyVO {
    private Long id;
    private String replyContent;
    private String replyRegisterDate;
    private String replyUpdateDate;
    private String memberId;
    private Long tradeId;
    private int replyDepth;
    private int replyGroup;
    private String status;
}
