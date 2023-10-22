package com.app.teamProject.dto.feed;

import com.app.teamProject.domain.feed.FeedFileVO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
@NoArgsConstructor
public class FeedDTO {
    private Long id;
    private String title;
    private String content;
    private String tagCode;
    private String feedRegisterDate;
    private String feedUpdateDate;
    private String memberId;
    private String Name;
    private String img;
    private int reCnt;
    private int likeCnt;
    private int likeCheck;
    private List<FeedFileVO> files = new ArrayList<>();
    private List<Long> fileIdsForDelete = new ArrayList<>();
}
