package com.app.teamProject.mapper;

import com.app.teamProject.domain.trade.TradeFileVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TradeFileMapper {
    //    파일 추가
    public void insert(TradeFileVO tradeFileVO);

    //    파일 삭제
    public void delete(Long id);

    //    게시글의 파일 전체 삭제
    public void deleteAll(Long tradeId);

    //    파일 조회
    public List<TradeFileVO> selectAll(Long TradeId);

    //    어제 날짜 파일 조회
    public List<TradeFileVO> selectYesterday();
}
