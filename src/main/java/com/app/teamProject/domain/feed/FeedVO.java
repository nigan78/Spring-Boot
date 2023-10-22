package com.app.teamProject.domain.feed;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class FeedVO {
    private Long id;
    private String title;
    private String content;
    private String tagCode;
    private String feedRegisterDate;
    private String feedUpdateDate;
    private String memberId;
}
