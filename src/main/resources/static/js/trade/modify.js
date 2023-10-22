autosize($("textarea"));
$("span.file-size").hide();

//사진 추가 버튼 클릭
$(".img-more").on("click",function () {
    if($(".depth2").css("display") == "none"){
        $(".depth2").fadeIn("fast")
    }else if($(".depth3").css("display") == "none"){
        $(".depth3").fadeIn("fast")
    }
})

const $upload = $("input.upload");
const $thumbnail = $("label.thumb img.thumbnail");
let sizes = new Array(9).fill(0);
const fileIdsForDelete = new Array();

function showSize(span){
    if(span.text() == 0){
        span.hide();
    }else{
        span.show();
    }
}
//대표 이미지 검사
let representativeFile = files.filter(file => file.fileType == "REPRESENTATIVE");
if(representativeFile.length != 0){
    let file = representativeFile[0];
    $("label.thumb").eq(i).find(".plus-img").hide();
    $("button.delBtn").eq(0).show();
    $thumbnail.eq(0).show();

    let fileName = file.filePath + "/t_" + file.fileUuid + "_" + file.fileName;
    $thumbnail.eq(0).attr("src", `/files/trade/display?fileName=${fileName}`);
    $thumbnail.eq(0).addClass("original")
    $thumbnail.eq(0).attr("data-id", file.id);
    sizes[0] = file.fileSize;
    $("span.file-size").eq(0).text((file.fileSize / 1024).toFixed(2) + "KB");
    showSize($("span.file-size").eq(0));
}

//일반 이미지 검사
files.filter(file => file.fileType != "REPRESENTATIVE").forEach((file, i) => {
    let fileType = file.fileType;
    $("label.thumb").eq(i).find(".plus-img").hide();
    $("button.delBtn").eq(i).show();
    $thumbnail.eq(i).show();

    let fileName = file.filePath + "/t_" + file.fileUuid + "_" + file.fileName;
    $thumbnail.eq(i).attr("src", `/files/trade/display?fileName=${fileName}`);
    $thumbnail.eq(i).addClass("original")
    $thumbnail.eq(i).attr("data-id", file.id);
    sizes[i] = file.fileSize;
    $("span.file-size").eq(i).text((file.fileSize / 1024).toFixed(2) + "KB");
    showSize($("span.file-size").eq(i + 1));
});

$upload.on("change", function(e){
    let i = $upload.index($(this));
    let files = $(this)[0].files;
    let name = files[0].name;
    let formData = new FormData();

    sizes[i] = files[0].size;
    $("span.file-size").eq(i).text((files[0].size / 1024).toFixed(2) + "KB");
    showSize($("span.file-size").eq(i));

    $(files).each((i, file) => {
        formData.append("uploadFile", file);
    });

    $.ajax({
        url: "/files/trade/upload",
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
            $("img.thumbnail").eq(i).attr("src", `/files/trade/display?fileName=${fileName}`);
        },
        error: function () {
            alert("파일 용량을 확인해주세요.");
        }
    });
});

$("button.delBtn").on("click", function(e){
    e.preventDefault();
    let i = $("button.delBtn").index($(this));
    sizes[i] = 0;
    $("span.file-size").eq(i).text(sizes[i]);
    showSize($("span.file-size").eq(i));
    $upload.eq(i).val("");
    $("label.thumb").eq(i).find(".plus-img").show();
    $("button.delBtn").eq(i).hide();
    $thumbnail.eq(i).attr('src', "");
    $thumbnail.eq(i).hide();

    if($thumbnail.eq(i).hasClass("original")){
        fileIdsForDelete.push($thumbnail.eq(i).data("id"));
    }
    $thumbnail.eq(i).removeClass("original");
});


$("#formBtn").on("click", function(){
    let text = ``;
    let count = 0;
    $("img.thumbnail").each((i, img) => {
        if($(img).hasClass("original")){return;}
        if(!$(img).attr("src")){return;}
        let fileType = $(img).hasClass("representative");
        let fullPath = $(img).attr("src");
        let datas = fullPath.split("_");
        let filePath = datas[0].split("=")[1].replace("/t", "");
        let fileUuid = datas[1];
        let fileName = datas.slice(2).join("_");
        let fileSize = sizes[i];

        text += `
            <input type="hidden" name="files[${count}].filePath" value="${filePath}">
            <input type="hidden" name="files[${count}].fileUuid" value="${fileUuid}">
            <input type="hidden" name="files[${count}].fileName" value="${fileName}">
            <input type="hidden" name="files[${count}].fileSize" value="${fileSize}">
        `;
        if(fileType){
            text +=`<input type="hidden" name="files[${i}].fileType" value="REPRESENTATIVE">`
        }
        count++;
    });

    //파일 삭제
    fileIdsForDelete.forEach((id, i) => {
        text += `<input type="hidden" name="fileIdsForDelete[${i}]" value="${id}">`;
    })

    $(writeForm).append(text);
    $(writeForm).submit();
});

function checkLength(textarea, max){
    let value = $(textarea).val();
    let length = value.length > max ? max : value.length;
    max = max.toLocaleString('ko-KR'); //한국 숫자 표기법(끝 3자리 마다 콤마 삽입)
    $(textarea).next().text(`${length}/${max}`);
}

function blockEnter(){
    if(event.keyCode == 13) {
        event.returnValue = false;
    }
}