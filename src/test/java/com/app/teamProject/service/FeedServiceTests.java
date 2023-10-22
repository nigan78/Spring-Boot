package com.app.teamProject.service;

import com.app.teamProject.domain.feed.*;
import com.app.teamProject.domain.trade.TradeApplyVO;
import com.app.teamProject.domain.type.FileType;
import com.app.teamProject.dto.feed.FeedDTO;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@Slf4j
@SpringBootTest
public class FeedServiceTests {
    @Autowired
    private FeedService feedService;
    @Autowired
    private FeedReplyService feedReplyService;
    @Autowired
    private TradeApplyService tradeApplyService;

//    @Test
//    public void insertTest(){
//        FeedDTO feedDTO = new FeedDTO();
//        feedDTO.setTitle("삿포로는 겨울에 가야 제맛");
//        feedDTO.setContent("여러분 삿포로는 겨울에 다녀오세요 진짜 재밌음");
//        feedDTO.setTagCode("일본");
//        feedDTO.setMemberId("manimm1");
//
//
//        feedService.write(feedDTO);
//    }
//
//    @Test
//    public void selectAllTest(){
//        log.info("유개발자 입니다 {}", feedService.getList("manimm1"));
//    }

//    @Test
//    public void likeInsertTest(){
//        FeedLikeVO feedLikeVO = new FeedLikeVO();
//
//        feedLikeVO.setFeedId(1L);
//        feedLikeVO.setMemberId("manimm1");
//
//        feedService.insertLike(feedLikeVO);
//    }

//    @Test
//    public void likeDeleteTest(){
//        feedService.deleteLike(3l);
//    }
//
//    @Test
//    public void findLikeTest(){
//        log.info("{}리절트",feedService.checkLike(2l,"id1"));
//    }
//
//    @Test
//    public void replySelectAllTest(){
//        FeedReplyDTO feedReplyDTO = new FeedReplyDTO();
//        feedReplyService.getReplies(1l);
//
//        log.info("{} 서비스테스트...........", feedReplyService.getReplies(1l));
//    }

//    @Test
//    public void replyInsertTest(){
//        FeedReplyVO feedReplyVO = new FeedReplyVO();
//
//        feedReplyVO.setReplyContent("댓글서비스테스트111");
//        feedReplyVO.setMemberId("manimm1");
//        feedReplyVO.setFeedId(5l);
//        feedReplyService.replyWrite(feedReplyVO);
//    }
//
//    @Test
//    public void rereplyInsertTest(){
//        FeedReplyVO feedReplyVO = new FeedReplyVO();
//
//        feedReplyVO.setReplyContent("대댓글서비스테스트444");
//        feedReplyVO.setMemberId("manimm1");
//        feedReplyVO.setFeedId(5l);
//        feedReplyVO.setReplyGroup(33);
//        feedReplyService.rereplyWrite(feedReplyVO);
//    }

    @Test
    public void test1(){
        FeedReportVO feedReportVO = new FeedReportVO();
        feedReportVO.setCategoryName("r");
        feedReportVO.setFeedReplyId(1l);

        feedService.checkReport(feedReportVO);

        log.info("{}",feedService.checkReport(feedReportVO));
    }

//    @Test
//    public void updateFeedTest(){
//        FeedDTO feedDTO = new FeedDTO();
//
//        feedDTO.setTitle("수정한 타이틀2");
//        feedDTO.setContent("수정한 내용2");
//        feedDTO.setTagCode("중국");
//        feedDTO.setId(1l);
//
//        feedService.modifyFeed(feedDTO);
//    }
//
//    @Test
//    public void TradeApplyTests(){
//        TradeApplyVO tradeApplyVO = new TradeApplyVO();
//        tradeApplyVO.setTradeId(6l);
//        tradeApplyVO.setTagCode("음식");
//        tradeApplyVO.setMemberId("won1");
//        tradeApplyVO.setContent("서비스테스트...");
//
//        tradeApplyService.write(tradeApplyVO);
//    }

}
