package com.app.teamProject.dto.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
@NoArgsConstructor
public class TradeReplyDTO {
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
    private List<TradeReplyDTO2> rereplies = new ArrayList<>();
}
