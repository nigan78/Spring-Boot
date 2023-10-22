package com.app.teamProject.service;

import com.app.teamProject.dao.TradeApplyDAO;
import com.app.teamProject.dao.TradeApplyFileDAO;
import com.app.teamProject.dao.TradeFileDAO;
import com.app.teamProject.dao.TradeNoticeDAO;
import com.app.teamProject.domain.trade.TradeNoticeVO;
import com.app.teamProject.domain.type.FileType;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.feed.FeedDTO;
import com.app.teamProject.dto.feed.FeedReplyDTO;
import com.app.teamProject.dto.trade.TradeApplyDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class TradeApplyServiceImpl implements TradeApplyService {
    private final TradeApplyDAO tradeApplyDAO;
    private final TradeApplyFileDAO tradeApplyFileDAO;
    private final TradeNoticeDAO tradeNoticeDAO;
    private final HttpSession session;

//    리스트
    @Override
    public List<TradeApplyDTO> getList(Pagination pagination, Long tradeId){
//        게시글 전체 목록
        final List<TradeApplyDTO> applies = tradeApplyDAO.findAll(pagination, tradeId);
//        게시글 하나씩 첨부파일 목록 담기
        applies.forEach(apply -> apply.setFiles(tradeApplyFileDAO.findAll(apply.getId())));
        return applies;
    }

    //    게시글 전체 개수 조회
    @Override
    public int getTotal(Long tradeId){return tradeApplyDAO.findCountOfPost(tradeId);}


    //    신청
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int write(TradeApplyDTO tradeApplyDTO) {
        TradeNoticeVO tradeNoticeVO = new TradeNoticeVO();
        int result = 0;
        String sessionId = (String)session.getAttribute("memberId");

        tradeApplyDTO.setMemberId(sessionId);

        // 저장
        result += tradeApplyDAO.save(tradeApplyDTO);

        for(int i=0; i<tradeApplyDTO.getFiles().size(); i++){
            tradeApplyDTO.getFiles().get(i).setTradeApplyId(tradeApplyDTO.getId());
            if(tradeApplyDTO.getFiles().get(i).getFileType() == null){
                tradeApplyDTO.getFiles().get(i).setFileType(FileType.NON_REPRESENTATIVE.name());
            }
            tradeApplyFileDAO.save(tradeApplyDTO.getFiles().get(i));
        }
//        신청 알림
        tradeNoticeVO.setNoticeId(tradeApplyDTO.getTradeMemberId());
        tradeNoticeVO.setSendId(sessionId);
        tradeNoticeVO.setTradeId(tradeApplyDTO.getTradeId());

        tradeNoticeDAO.setApplyNotice(tradeNoticeVO);

        return result;
    }

//    교환해요 수락
    @Override
    public int modify(Long id){ return tradeApplyDAO.setApply(id); }

//    교환해요 전체 삭제
    @Override
    public int removeAll(Long id){return tradeApplyDAO.deleteAll(id);}
}
