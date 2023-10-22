package com.app.teamProject.service;

import com.app.teamProject.dao.FeedDAO;
import com.app.teamProject.dao.FeedFileDAO;
import com.app.teamProject.dao.LoginDAO;
import com.app.teamProject.domain.feed.FeedFileVO;
import com.app.teamProject.domain.feed.FeedLikeVO;
import com.app.teamProject.domain.feed.FeedReportVO;
import com.app.teamProject.domain.feed.FeedVO;
import com.app.teamProject.domain.type.FileType;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FeedServiceImpl implements FeedService {
    private final FeedDAO feedDAO;
    private final FeedFileDAO feedFileDAO;
    private final HttpSession session;

    @Override
    public List<FeedDTO> getList(String memberId, Pagination pagination){
//        게시글 전체 목록
        final List<FeedDTO> feeds = feedDAO.findAll(memberId, pagination);
//        게시글 하나씩 첨부파일 목록 담기
        feeds.forEach(feed -> feed.setFiles(feedFileDAO.findAll(feed.getId())));
        return feeds;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int write(FeedDTO feedDTO) {
        int result = 0;
        feedDTO.setMemberId((String)session.getAttribute("memberId"));

        // 저장
        result += feedDAO.save(feedDTO);

        for(int i=0; i<feedDTO.getFiles().size(); i++){
            feedDTO.getFiles().get(i).setFeedId(feedDTO.getId());
            if(feedDTO.getFiles().get(i).getFileType() == null){
                feedDTO.getFiles().get(i).setFileType(FileType.NON_REPRESENTATIVE.name());
            }
            feedFileDAO.save(feedDTO.getFiles().get(i));
        }

        return result;
    }

//    좋아요 추가
    @Override
    public int insertLike(FeedLikeVO feedLikeVO){
        return feedDAO.addLike(feedLikeVO);
    }

//    좋아요 삭제
    @Override
    public int deleteLike(FeedLikeVO feedLikeVO){
        return feedDAO.removeLike(feedLikeVO);
    }

//    좋아요 검사
    @Override
    public Optional<FeedLikeVO> checkLike(FeedLikeVO feedLikeVO){
        Optional<FeedLikeVO> chk = feedDAO.findByLike(feedLikeVO);
        if(chk.isPresent()) {
            log.info("{} 리무브" ,feedDAO.removeLike(feedLikeVO));
        } else {
            log.info("{} 애드", feedDAO.addLike(feedLikeVO));
        }
        return chk;
    }

//    신고 여부 검사
    @Override
    public int checkReport(FeedReportVO feedReportVO){
        return  feedDAO.findByReport(feedReportVO);
    }

//    피드 수정
    @Override
    public void modifyFeed(FeedDTO feedDTO){ feedDAO.setFeed(feedDTO);}

//    게시글 전체 개수 조회
    @Override
   public int getTotal(String memberId){return feedDAO.findCountOfPost(memberId);}


//    신고하기
    @Override
    public void createReport(FeedReportVO feedReportVO){
        feedReportVO.setReporterId((String)session.getAttribute("memberId"));
        feedDAO.addReport(feedReportVO);
    }
}
