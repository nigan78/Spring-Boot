package com.app.teamProject.domain.feed;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@NoArgsConstructor
public class FeedReportVO {

    private Long id;
    private String reportedId;
    private String reporterId;
    private Long feedId;
    private Long feedReplyId;
    private String categoryName;

}
