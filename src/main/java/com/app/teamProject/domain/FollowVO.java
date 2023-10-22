package com.app.teamProject.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@Component
public class FollowVO {
    private Long id;
    private String memberId;
    private String fwId; /* id 기준의 팔로우 한 사람*/
}
