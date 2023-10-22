package com.app.teamProject.domain.trade;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@Component
public class TradeFileVO {
    private Long id;
    private String filePath;
    private String fileUuid;
    private String fileName;
    private String fileType;
    private int fileSize;
    private Long tradeId;
}
