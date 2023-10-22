package com.app.teamProject.domain.feed;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class FeedLikeVO {
    private Long id;
    private Long feedId;
    private String memberId;
}
