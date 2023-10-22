package com.app.teamProject.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Data
@NoArgsConstructor
public class DmDTO2 {
    private Long id;
    private String memberId;
    private String sendId;
    private String content;
    private String dmCheck;
    private String dmRegisterDate;
    private String img;
    private String sendImg;
    private String name;
    private String sendName;
}
