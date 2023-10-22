package com.app.teamProject.domain.feed;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class FeedReplyReportVO {

    private Long id;
    private String memberId;
    private String reportId;
    private Long postId;


}
