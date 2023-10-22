package com.app.teamProject.service;

import com.app.teamProject.dao.FollowDAO;
import com.app.teamProject.domain.FollowVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowServiceImpl implements FollowService {
    private final FollowDAO followDAO;

//    팔로우추가
    @Override
    public int insert(FollowVO followVO) {return followDAO.save(followVO);}

//    팔로우취소
    @Override
    public int remove(FollowVO followVO){return followDAO.remove(followVO);}

//    팔로우 검사
    @Override
    public Optional<FollowVO> checkFollow(FollowVO followVO){
        Optional<FollowVO> chk = followDAO.findByfollow(followVO);
        if(chk.isPresent()){
            log.info("{} 취소",followDAO.remove(followVO));
        }else {
            log.info("{} 추가", followDAO.save(followVO));
        }
        log.info("{}.....좋아요 검사",chk);
        return chk;
    }
}
