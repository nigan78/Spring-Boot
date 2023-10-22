package com.app.teamProject.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class AdvDTO {
//    멤버 테이블
    private String memberId;
    private String name;
//    광고 테이블
    private Long Id;
    private String title;
    private String content;
    private String startDate;
    private String endDate; /* 기간 */
    private String price; /* default = 0, 수락 시 입력 */
    private String status; /* (y / n / r[거절])*/
    private String sort;

//    파일
    private Long fileId;
    private String filePath;
    private String fileUuid;
    private String fileName;
    private String fileType;
    private int fileSize;

//    동적쿼리 구분용
      private String order;
}
