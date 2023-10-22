package com.app.teamProject.domain.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class TradeVO {
    private Long id;
    private String title;
    private String content;
    private String tagCode;
    private String tradeRegisterDate;
    private String tradeUpdateDate;
    private String memberId;
    private String status;
}
