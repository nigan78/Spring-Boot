package com.app.teamProject.dao;

import com.app.teamProject.domain.trade.TradeFileVO;
import com.app.teamProject.mapper.TradeFileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TradeFileDAO {
    private final TradeFileMapper TradeFileMapper;

    //    파일 추가
    public void save(TradeFileVO tradeFileVO){
        TradeFileMapper.insert(tradeFileVO);
    }

    //    파일 삭제
    public void delete(Long id){
        TradeFileMapper.delete(id);
    }

    //    게시글의 파일 전체 삭제
    public void deleteAll(Long tradeId){
        TradeFileMapper.deleteAll(tradeId);
    }

    //    파일 조회
    public List<TradeFileVO> findAll(Long tradeId){
        return TradeFileMapper.selectAll(tradeId);
    }
}
