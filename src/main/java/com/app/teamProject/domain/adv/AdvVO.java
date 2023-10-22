package com.app.teamProject.domain.adv;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@Component
public class AdvVO {

    private Long id;
    private String memberId;
    private String title;
    private String content;
    private String startDate;
    private String endDate; /* 기간 */
    private String price; /* default = 0, 수락 시 입력 */
    private String status; /* (y / n)*/
    private String sort;

}
