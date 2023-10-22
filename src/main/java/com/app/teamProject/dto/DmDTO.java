package com.app.teamProject.dto;

import com.app.teamProject.domain.feed.FeedFileVO;
import com.app.teamProject.dto.feed.FeedReplyDTO2;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
@NoArgsConstructor
public class DmDTO {
    private Long id;
    private String memberId;
    private String sendId;
    private String content;
    private String dmCheck;
    private String dmRegisterDate;
    private String img;
    private String sendImg;
    private String name;
    private String sendName;
    private List<DmDTO2> reDms = new ArrayList<>();
}
