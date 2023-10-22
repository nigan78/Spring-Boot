package com.app.teamProject.dto.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class TradeReplyDTO2 {
    private Long id;
    private String replyContent;
    private String replyRegisterDate;
    private String replyUpdateDate;
    private int replyDepth;
    private int replyGroup;
    private String memberId;
    private String status;
    private Long tradeId;
    private String memberName;
    private String memberImg;
}
