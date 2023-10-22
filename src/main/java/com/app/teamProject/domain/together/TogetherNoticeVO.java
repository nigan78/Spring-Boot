package com.app.teamProject.domain.together;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@NoArgsConstructor
public class TogetherNoticeVO {

    private Long id;
    private String memberId;
    private Long noticeId;
    private int noticeCheck;
}
