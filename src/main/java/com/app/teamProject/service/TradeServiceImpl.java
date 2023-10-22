package com.app.teamProject.service;

import com.app.teamProject.dao.*;
import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.domain.type.FileType;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;
import com.app.teamProject.mapper.TradeApplyMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;
import javax.swing.*;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TradeServiceImpl implements TradeService {
    private final TradeDAO tradeDAO;
    private final TradeFileDAO tradeFileDAO;
    private final TradeReplyDAO tradeReplyDAO;
    private final TradeApplyDAO tradeApplyDAO;
    private final TradeApplyFileDAO tradeApplyFileDAO;
    private final TradeNoticeDAO tradeNoticeDAO;
    private final HttpSession session;

    @Override
    public List<TradeDTO> getList(Pagination pagination, String memberId) {
        //        게시글 전체 목록
        final List<TradeDTO> trades = tradeDAO.findAll(pagination, memberId);
        //        게시글 하나씩 첨부파일 목록 담기
        trades.forEach(trade -> trade.setFiles(tradeFileDAO.findAll(trade.getId())));
        return trades;
    }

//    게시글 전체 개수 조회
    @Override
    public int getTotal(){return tradeDAO.findCountOfPost();}

//   게시글 작성
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int write(TradeDTO tradeDTO) {
        int result = 0;
        tradeDTO.setMemberId((String)session.getAttribute("memberId"));

        // 저장
        result += tradeDAO.save(tradeDTO);

        for(int i=0; i<tradeDTO.getFiles().size(); i++){
            tradeDTO.getFiles().get(i).setTradeId(tradeDTO.getId());
            if(tradeDTO.getFiles().get(i).getFileType() == null){
                tradeDTO.getFiles().get(i).setFileType(FileType.NON_REPRESENTATIVE.name());
            }
            tradeFileDAO.save(tradeDTO.getFiles().get(i));
        }
        return result;
    }

//    좋아요 추가
    @Override
    public int insertLike(TradeLikeVO tradeLikeVO){
        return tradeDAO.addLike(tradeLikeVO);
    }

//    좋아요 삭제
    @Override
    public int deleteLike(TradeLikeVO tradeLikeVO){
        return tradeDAO.removeLike(tradeLikeVO);
    }

//    좋아요 검사
    @Override
    public Optional<TradeLikeVO> checkLike(TradeLikeVO tradeLikeVO){
        Optional<TradeLikeVO> chk = tradeDAO.findByLike(tradeLikeVO);
        if(chk.isPresent()) {
            log.info("{} 리무브" ,tradeDAO.removeLike(tradeLikeVO));
        } else {
            log.info("{} 애드", tradeDAO.addLike(tradeLikeVO));
        }
        log.info("{}.....좋아요 검사",chk);
        return chk;
    }

//    상세페이지
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Optional<TradeDTO> read(Long id, String memberId, String fmemberId){
        final Optional<TradeDTO> foundTrade = tradeDAO.findById(id, memberId, fmemberId);
        if(foundTrade.isPresent()){
            foundTrade.get().setFiles(tradeFileDAO.findAll(foundTrade.get().getId()));
        }
        return foundTrade;
    }

    //수정
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int modify(TradeDTO tradeDTO){

        int result = tradeDAO.setTrade(tradeDTO);
        //추가
        tradeDTO.getFiles().forEach(file -> {
            if(file.getFileType() == null) {
                file.setFileType(FileType.NON_REPRESENTATIVE.name());
            }
            file.setTradeId(tradeDTO.getId());
            tradeFileDAO.save(file);
        });
        //삭제
        tradeDTO.getFileIdsForDelete().forEach(tradeFileDAO::delete);

        return result;
    };

    //    신고 여부 검사
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int checkReport(TradeReportVO tradeReportVO){
        return  tradeDAO.findByReport(tradeReportVO);
    }

    //    신고하기
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createReport(TradeReportVO tradeReportVO){
        tradeReportVO.setReporterId((String)session.getAttribute("memberId"));
        tradeDAO.addReport(tradeReportVO);
    }

//    삭제
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void remove(Long id){
        tradeNoticeDAO.removeReply(id);
        tradeNoticeDAO.removeApply(id);
        tradeDAO.removeReportAll(id);
        tradeApplyFileDAO.deleteAll(id);
        tradeApplyDAO.deleteAll(id);
        tradeReplyDAO.deleteAll(id);
        tradeFileDAO.deleteAll(id);
        tradeDAO.removeLikeAll(id);
        tradeDAO.deltete(id);
    }

//    교환해요 마감
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void modifyStatus(Long id){
        tradeDAO.setStatus(id);
    }


}
