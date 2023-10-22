$(document).ready(function () {

//분류
    $(".sub-main-filer ul li").on("click",function () {
        let $idx = $(this).index();
        $(".country-area").not($idx).css("display","none")
        $(".country-area").eq($idx).css("display","flex");
    })

//사진 추가 버튼 클릭
    $(".img-more").on("click",function () {
        if($(".depth2").css("display") == "none"){
            $(".depth2").fadeIn("fast")
        }else if($(".depth3").css("display") == "none"){
            $(".depth3").fadeIn("fast")
        }
    })
})

/* 파일 js */

const $upload = $("input.upload");
const $thumbnail = $("label.thumb .thumbnail");


let sizes = new Array(9).fill(0);
$upload.on("change", function(e){
    let i = $upload.index($(this));
    let files = $(this)[0].files;
    let name = files[0].name;
    let formData = new FormData();

    sizes[i] = files[0].size;

    $(files).each((i, file) => {
        formData.append("uploadFile", file);
    });

    $.ajax({
        url: "/files/feed/upload",
        type: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function(uuids){
            $("label.thumb").eq(i).find(".plus-img").hide();
            $("button.delBtn").eq(i).show();
            $("img.thumbnail").eq(i).show();

            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let date = now.getDate();

            month = month < 10 ? "0" + month : month;
            date = date < 10 ? "0" + date : date;

            let fileName = year + "/" + month + "/" + date + "/t_" + uuids[0] + "_" + name;
            $("img.thumbnail").eq(i).attr("src", `/files/feed/display?fileName=${fileName}`);
        },
        error: function () {
            alert("파일 용량을 확인해주세요.");
        }
    });

});

$("button.delBtn").on("click", function(e){
    e.preventDefault();
    let i = $("button.delBtn").index($(this));
    sizes = sizes.splice(i, 1);
    $upload.eq(i).val("");
    $("label.thumb").eq(i).find(".plus-img").show();
    $("button.delBtn").eq(i).hide();
    $thumbnail.eq(i).attr('src', "");
    $thumbnail.eq(i).hide();
});

$("button#formBtn").on("click", function(){
    let text = ``;
    let count = 0;
    $("img.thumbnail").each((i, img) => {
        let fullPath = $(img).attr("src");
        if(!fullPath) {return;}

        let datas = fullPath.split("_");
        let filePath = datas[0].split("=")[1].replace("/t", "");
        let fileUuid = datas[1];
        // let fileName = datas[2];
        let fileName = datas.slice(2).join("_");
        let fileType = $(img).hasClass("representative");
        let fileSize = sizes[i];

        text += `
            <input type="hidden" name="files[${count}].filePath" value="${filePath}">
            <input type="hidden" name="files[${count}].fileUuid" value="${fileUuid}">
            <input type="hidden" name="files[${count}].fileName" value="${fileName}">
            <input type="hidden" name="files[${count}].fileSize" value="${fileSize}">
        `
        if(fileType){
            text += `<input type="hidden" name="files[${count}].fileType" value="REPRESENTATIVE">`;
        }
        count++;
    });
    $(writeForm).append(text);
    $(writeForm).submit();

});