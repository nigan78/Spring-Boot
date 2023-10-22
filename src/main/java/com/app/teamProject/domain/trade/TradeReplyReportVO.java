package com.app.teamProject.domain.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@NoArgsConstructor
public class TradeReplyReportVO {

    private Long id;
    private String memberId;
    private String reportId;
    private Long postId;
}
