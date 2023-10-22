package com.app.teamProject.domain.together;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@Component
public class TogetherVO {

   private Long id;
    private String title;
    private String content;
    private String mapInfo; /* 주소 */
    private int likeCount;
    private String status; /* 진행중 y / 마감 n*/
    private String memberId;

}
