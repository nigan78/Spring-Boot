package com.app.teamProject.service;


import com.app.teamProject.dto.DmDTO;

import java.util.List;

public interface DmService {
//    DM 목록
    public List<DmDTO> getList(String memberId);

//    DM 상세 글
    public List<DmDTO> getMemberId(String memberId);

}
