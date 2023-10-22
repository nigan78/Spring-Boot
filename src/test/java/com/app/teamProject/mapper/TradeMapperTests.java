package com.app.teamProject.mapper;

import com.app.teamProject.domain.trade.TradeApplyVO;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeApplyDTO;
import com.app.teamProject.dto.trade.TradeReplyDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class TradeMapperTests {
    @Autowired TradeMapper tradeMapper;
    @Autowired TradeReplyMapper tradeReplyMapper;
    @Autowired TradeApplyMapper tradeApplyMapper;

    @Test
    public void applyTest(){
        TradeApplyDTO tradeApplyDTO = new TradeApplyDTO();
        tradeApplyDTO.setContent("하.....이게 뭐야");
        tradeApplyDTO.setMemberId("manimm1");
        tradeApplyDTO.setTagCode("음식");
        tradeApplyDTO.setTradeId(6l);

        tradeApplyMapper.insert(tradeApplyDTO);
    }

    @Test
    public void applyYesTest(){
        tradeApplyMapper.update(55l);
    }
}
