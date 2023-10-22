package com.app.teamProject.dto.trade;

import com.app.teamProject.domain.trade.TradeApplyFileVO;
import com.app.teamProject.domain.trade.TradeFileVO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
@NoArgsConstructor
public class TradeApplyDTO {
    private Long id;
    private String content;
    private String tagCode;
    private String tradeRegisterDate;
    private String tradeUpdateDate;
    private String status;
    private String memberId; /* 회원 아이디 */
    private String tradeMemberId; /* 원글 작성자 아이디 */
    private Long tradeId; /* 게시물 번호 */
    private String Name;
    private String img;
    private List<TradeApplyFileVO> files = new ArrayList<>();
    private List<Long> fileIdsForDelete = new ArrayList<>();
}
