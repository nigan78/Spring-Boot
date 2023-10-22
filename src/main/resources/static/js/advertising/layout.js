/* 파일 */
$(".file-box").on("change",function () {
    let $fileVal = $(this).val();
    $(this).prev().val($fileVal);
})

/* 유효성 검사 */
// $(".app-btn").on("click",function () {
//     if($("#adverTitle").val() == ""){
//         $("#adverTitle").next(".input-error").text("제목을 입력해주세요")
//         $("#adverTitle").focus();
//         $("#adverTitle").next(".input-error").show();
//     }else{
//         $("#adverTitle").next(".input-error").hide();
//     }
//
//     if($("#adverFile").val() == ""){
//         $("#adverFile").next().next(".input-error").text("이미지를 등록해주세요")
//         $("#adverFile").focus();
//         $("#adverFile").next(".input-error").show();
//     }else{
//         $("#adverFile").next(".input-error").hide();
//     }
//
//     if($("#adverContent").val() == ""){
//         $("#adverContent").next(".input-error").text("내용을 등록해주세요")
//         $("#adverContent").focus();
//         $("#adverContent").next(".input-error").show();
//     }else{
//         $("#adverContent").next(".input-error").hide();
//     }
//
//     if($("#startDate").val() == ""){
//         $("#startDate").next(".input-error").text("날짜를 설정해주세요")
//         $("#startDate").focus();
//         $("#startDate").next(".input-error").show();
//     }else{
//         $("#startDate").next(".input-error").hide();
//     }
// })

/* 날짜 선택 */
$(".adver-date input").on("change",function () {
    if($("#etc").prop("checked")){
        $(".ect-input").fadeIn("fast");
        $("#ectInput").focus();

        $("#ectInput").on("focusout",function () {
            if($("#ectInput").val() == ""){
                $("#ectInput").next(".input-error").text("기타 날짜를 입력해주세요")
                $("#ectInput").focus();
            }else{
                $("#adverTitle").next(".input-error").hide();
            }
        })
    }else{
        $(".ect-input").fadeOut("fast");
    }
})