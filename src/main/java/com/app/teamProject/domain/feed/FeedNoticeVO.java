package com.app.teamProject.domain.feed;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class FeedNoticeVO {
    Long id;
    String noticeId;
    String sendId;
    Long feedId;
    Long feedReplyId;
    long feedStatus;
}
