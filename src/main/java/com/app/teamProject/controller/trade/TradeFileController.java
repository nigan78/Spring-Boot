package com.app.teamProject.controller.trade;

import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@Slf4j
@RequestMapping("/files/trade/*")
public class TradeFileController {

    //    파일 업로드
    @PostMapping("upload")
    @ResponseBody
    public List<String> upload(@RequestParam("uploadFile") List<MultipartFile> uploadFiles) throws IOException {
        String path = "C:/upload/trade/" + getPath();
        List<String> uuids = new ArrayList<>();
        File file = new File(path);
        if(!file.exists()){file.mkdirs();}

        log.info("path {} ", path);
        for (int i=0; i<uploadFiles.size(); i++){
            log.info("size {}", uploadFiles.get(i).getSize());
            uuids.add(UUID.randomUUID().toString());
            File temp = new File(path, uuids.get(i) + "_" + uploadFiles.get(i).getOriginalFilename());
            uploadFiles.get(i).transferTo(temp);
            if(uploadFiles.get(i).getContentType().startsWith("image")){
                FileOutputStream out = new FileOutputStream(new File(path, "t_" + uuids.get(i) + "_" + uploadFiles.get(i).getOriginalFilename()));
                Thumbnailator.createThumbnail(temp, new File(path, "t_" + uuids.get(i) + "_" + uploadFiles.get(i).getOriginalFilename()), 200, 200);
                out.close();
            }
        }
        log.info("{}파일업로드",uuids);
        return uuids;
    }

    public String getPath(){
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    //    파일 불러오기
    @GetMapping("display")
    @ResponseBody
    public byte[] display(String fileName) throws IOException{
        return FileCopyUtils.copyToByteArray(new File("C:/upload/trade", fileName));
    }

    //    파일 다운로드
    @GetMapping
    public ResponseEntity<Resource> download(String fileName) throws UnsupportedEncodingException {
        Resource resource = new FileSystemResource("C:/upload/trade" + fileName);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment;filename=" + new String(fileName.substring(fileName.indexOf("_") + 1).getBytes("UTF-8"), "ISO-8859"));
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}