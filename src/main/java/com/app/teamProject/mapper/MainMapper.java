package com.app.teamProject.mapper;

import com.app.teamProject.dto.AdvDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainMapper {
//    베너
    public List<AdvDTO> select(AdvDTO advDTO);
//    피드
    public List<AdvDTO> selectfeed( );
//    함께해요
    public List<AdvDTO> selecttg( );
//    교환해요
    public List<AdvDTO> selecttr( );
}
