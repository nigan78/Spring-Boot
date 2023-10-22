package com.app.teamProject.domain.feed;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class FeedFileVO {
    private Long id;
    private String filePath;
    private String fileUuid;
    private String fileName;
    private String fileType;
    private Long fileSize;
    private Long feedId;
}
