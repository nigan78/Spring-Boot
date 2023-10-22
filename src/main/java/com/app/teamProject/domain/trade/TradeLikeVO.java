package com.app.teamProject.domain.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class TradeLikeVO {
    private Long id;
    private Long tradeId;
    private String memberId;
}
