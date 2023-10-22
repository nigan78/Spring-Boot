package com.app.teamProject.domain.together;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@Component
@NoArgsConstructor
public class TogetherApplyVO {

    private Long id;
    private String title;
    private String content;
    private String tagCode;
    private String status;
    private String memberId;
    private Long postId;


}
