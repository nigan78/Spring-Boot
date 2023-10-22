package com.app.teamProject.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@NoArgsConstructor
public class ReplyNoticeVO {

    private Long id;
    private String memberID;
    private Long noticeId;
    private int noticeCheck;

}
