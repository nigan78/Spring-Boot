package com.app.teamProject.dto.trade;

import com.app.teamProject.domain.trade.TradeFileVO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
@NoArgsConstructor
public class TradeDTO {
    private Long id;
    private String title;
    private String content;
    private String tagCode;
    private String tradeRegisterDate;
    private String tradeUpdateDate;
    private String memberId;
    private String status;
    private String Name;
    private String img;
    private int reCnt;
    private int likeCnt;
    private int likeCheck;
    private int following;
    private int follower;
    private int followCheck;
    private List<TradeFileVO> files = new ArrayList<>();
    private List<Long> fileIdsForDelete = new ArrayList<>();
}
