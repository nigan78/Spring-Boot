package com.app.teamProject.controller;

import com.app.teamProject.domain.adv.AdvFileVO;
import com.app.teamProject.dto.AdvDTO;
import com.app.teamProject.service.AdvSerivce;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("advertising/*")
@Slf4j
public class AdvertisingController {
    private final AdvSerivce advSerivce;

    @GetMapping("form")
    public void form(){;}

    @GetMapping("write")
    public RedirectView write(AdvDTO advDTO){
        advDTO.setPrice("0");
        advDTO.setStatus("n");
        advSerivce.insert(advDTO);
        String path = "C:/upload/adv/";
        Long ID = 0l;
        ID = advSerivce.select(ID);
        AdvFileVO advFileVO = new AdvFileVO();
        advFileVO.setFilePath(path);
        advFileVO.setFileName(advDTO.getFileName());
        advFileVO.setPostId(ID);
        advSerivce.insertfile(advFileVO);
        return new RedirectView("/index/index");
    }

    @PostMapping("upload")
    @ResponseBody
    public List<String> upload(@RequestParam("uploadFile") List<MultipartFile> uploadFiles) throws IOException {
        String path = "C:/upload/adv/";
        File file = new File(path);
        if(!file.exists()){file.mkdirs();}

        log.info("path {} ", path);
        for (int i=0; i<uploadFiles.size(); i++){
            log.info("size {}", uploadFiles.get(i).getSize());
            File temp = new File(path, uploadFiles.get(i).getOriginalFilename());
            uploadFiles.get(i).transferTo(temp);
        }
        return null;
    }

    @GetMapping("display")
    @ResponseBody
    public byte[] display(String fileName) throws IOException{
        log.info("asdf");
        return FileCopyUtils.copyToByteArray(new File("C:/upload/adv", fileName));
    }


    @GetMapping("main")
    public void main(){;}
}
