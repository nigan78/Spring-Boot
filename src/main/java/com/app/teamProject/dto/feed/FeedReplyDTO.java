package com.app.teamProject.dto.feed;

import com.app.teamProject.domain.feed.FeedReplyVO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
@NoArgsConstructor
public class FeedReplyDTO {
    private Long id;
    private String replyContent;
    private String replyRegisterDate;
    private String replyUpdateDate;
    private int replyDepth;
    private int replyGroup;
    private String memberId;
    private String status;
    private Long feedId;
    private String memberName;
    private String memberImg;
    private List<FeedReplyDTO2> rereplies = new ArrayList<>();
}
