package com.app.teamProject.mapper;

import com.app.teamProject.domain.feed.*;
import com.app.teamProject.domain.type.FileType;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import com.app.teamProject.dto.feed.FeedReplyDTO2;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
public class FeedMapperTests {
//    @Autowired FeedMapper feedMapper;
//    @Autowired FeedFileMapper feedFileMapper;
//    @Autowired FeedReplyMapper feedReplyMapper;
//
//    @Test
//    public void insertTest(){
//        FeedDTO feedDTO = new FeedDTO();
//        feedDTO.setTitle("매퍼테스트");
//        feedDTO.setContent("매퍼테스트11111");
//        feedDTO.setTagCode("일본");
//        feedDTO.setMemberId("manimm1");
//
//        feedMapper.insert(feedDTO);
//    }

//    @Test
//    public void selectAllTest(){
//        Pagination pagination = new Pagination();
//        log.info("유개발자 입니다 {}", feedMapper.selectAll("manimm1", pagination));
//    }

//    @Test
//    public void fileInsertTest(){
//        FeedFileVO feedFileVO = new FeedFileVO();
//        feedFileVO.setFilePath("2023/05/18");
//        feedFileVO.setFileUuid(UUID.randomUUID().toString());
//        feedFileVO.setFileName("dasdsa");
//        feedFileVO.setFileType(FileType.REPRESENTATIVE.name());
//        feedFileVO.setFileSize(11L);
//        feedFileVO.setFeedId(2l);
//        feedFileMapper.insert(feedFileVO);
//    }

//    @Test
//    public void replySelectAllTest(){
//        FeedReplyDTO feedReplyDTO = new FeedReplyDTO();
//        Pagination pagination = new Pagination();
//
//        pagination.setPage(1);
//        log.info("{} 매퍼테스트...........", feedReplyMapper.selectReplies(1l));
//    }
//
//    @Test
//    public void rereplySelectAllTest(){
//        FeedReplyDTO2 feedReplyDTO2 = new FeedReplyDTO2();
//
//        log.info("{} 매퍼테스트2...........", feedReplyMapper.selectRereplies(1l,5));
//    }
//

//    @Test
//    public void replyInsertTest(){
//        FeedReplyVO feedReplyVO = new FeedReplyVO();
//
//        feedReplyVO.setReplyContent("댓글매퍼테스트");
//        feedReplyVO.setMemberId("manimm1");
//        feedReplyVO.setFeedId(5l);
//        feedReplyMapper.replyInsert(feedReplyVO);
//    }

//    @Test
//    public void rereplyInsertTest(){
//        FeedReplyVO feedReplyVO = new FeedReplyVO();
//
//        feedReplyVO.setReplyContent("대댓글매퍼테스트~~~~~~");
//        feedReplyVO.setMemberId("manimm1");
//        feedReplyVO.setFeedId(5l);
//        feedReplyVO.setReplyGroup(30);
//        feedReplyMapper.rereplyInsert(feedReplyVO);
//    }
//
//    @Test
//    public void deleteTest(){
//        feedReplyMapper.delete(35l);
//    }

//    @Test
//    public void reportTest(){
//        FeedReportVO feedReportVO = new FeedReportVO();
//        feedReportVO.setReportedId("manimm1");
//        feedReportVO.setReporterId("test123");
//        feedReportVO.setFeedReplyId(1l);
//
//        feedReplyMapper.report(feedReportVO);
//    }

//    @Test
//    public void test1(){
//        FeedReportVO feedReportVO = new FeedReportVO();
//        feedReportVO.setCategoryName("p");
//        feedReportVO.setFeedId(1l);
//
//        feedMapper.findReport(feedReportVO);
//
//        log.info("{}",feedMapper.findReport(feedReportVO));
//    }

//    @Test
//    public void updateFeedTest(){
//        FeedDTO feedDTO = new FeedDTO();
//
//        feedDTO.setTitle("수정한 타이틀");
//        feedDTO.setContent("수정한 내용");
//        feedDTO.setTagCode("대한민국");
//        feedDTO.setId(1l);
//
//        feedMapper.update(feedDTO);
//    }

//    @Test
//    public void selectCountOfPost(){
//        log.info("{}",feedMapper.selectCountOfPost("manimm1"));
//    }

}
