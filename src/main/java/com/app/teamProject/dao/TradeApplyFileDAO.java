package com.app.teamProject.dao;

import com.app.teamProject.domain.trade.TradeApplyFileVO;
import com.app.teamProject.domain.trade.TradeFileVO;
import com.app.teamProject.mapper.TradeApplyFileMapper;
import com.app.teamProject.mapper.TradeFileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TradeApplyFileDAO {
    private final TradeApplyFileMapper tradeApplyFileMapper;

    //    파일 추가
    public void save(TradeApplyFileVO tradeApplyFileVO){
        tradeApplyFileMapper.insert(tradeApplyFileVO);
    }

    //    파일 삭제
    public void delete(Long id){
        tradeApplyFileMapper.delete(id);
    }

    //    게시글의 파일 전체 삭제
    public void deleteAll(Long tradeId){
        tradeApplyFileMapper.deleteAll(tradeId);
    }

    //    파일 조회
    public List<TradeApplyFileVO> findAll(Long tradeId){
        return tradeApplyFileMapper.selectAll(tradeId);
    }
}
