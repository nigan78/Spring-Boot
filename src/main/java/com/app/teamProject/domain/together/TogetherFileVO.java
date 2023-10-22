package com.app.teamProject.domain.together;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@Component
public class TogetherFileVO {

    private Long id;
    private String filePath;
    private String fileUuid;
    private String fileName;
    private String fileType;
    private int fileSize;
    private Long postId;


}
