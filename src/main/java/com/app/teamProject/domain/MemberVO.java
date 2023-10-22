package com.app.teamProject.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
public class MemberVO {
    private String Id;
    private String Pw;
    private String Name;
    private String Hp;
    private String Img;
    private String Sort; /*(회원구분:일반n, 관리자m, 공식o, 제제b, dm차단d, 비공개p, 탈퇴e) */

}