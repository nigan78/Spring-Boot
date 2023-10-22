package com.app.teamProject.mapper;

import com.app.teamProject.domain.trade.TradeLikeVO;
import com.app.teamProject.domain.trade.TradeReportVO;
import com.app.teamProject.dto.DmDTO;
import com.app.teamProject.dto.DmDTO2;
import com.app.teamProject.dto.Pagination;
import com.app.teamProject.dto.trade.TradeDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import javax.swing.*;
import java.util.List;
import java.util.Optional;

@Mapper
public interface DmMapper {
    public List<DmDTO> selectAll(String memberId);

//    디엠 내 글
    public List<DmDTO> selectMemberId(String memberId);

//    디엠 상대방 글
    public List<DmDTO2> selelctSendId(String sendId);
}
