$('#startDate').change(function () {
    var Sdate = $("#startDate").val();
    var Edate = $("#endDate").val();
    $(".fail").css("display","none");
    if(Sdate > Edate && Edate!= ""){
        $(".fail").css("display","block");
    }
});

$('#endDate').change(function () {
    var Sdate = $("#startDate").val();
    var Edate = $("#endDate").val();
    $(".fail").css("display","none");
    if(Sdate > Edate){
        $(".fail").css("display","block");
    }
});

function regist() {
    var sort = $("#sort input[type='radio']:checked").val();
    // var date = $("#date input[type='radio']:checked").val();
    var Sdate = $("#startDate").val();
    var Edate = $("#endDate").val();
    var img = $("#img").val().split(`\\`).reverse()[0];;
    var title = $("#adverTitle").val();
    var content = $("#adverContent").val();

    location.href = "/advertising/write?sort=" + sort + "&startDate=" + Sdate+ "&endDate=" + Edate
        + "&fileName=" + img + "&title=" + title + "&content=" + content + "&memberId=" + memberId;
}

function setThumbnail() {
    var reader = new FileReader();
    reader.onload = function(event) {
        var img = document.getElementById("thumnail");
        img.setAttribute("src", event.target.result);
        img.style.display = "block";
        document.getElementById("imginpdiv").style.display = "none";
        document.getElementsByClassName("delete")[0].style.display = "block";
    };
    reader.readAsDataURL(event.target.files[0]);
}

function del(i){
    document.getElementById("img").value = "";
    document.getElementsByClassName("thumnail")[0].src = "";

    document.getElementById("imginpdiv").style.display = "block";
    document.getElementsByClassName("delete")[0].style.display = "none";
}


//파일 업로드
const $upload = $("input.upload");
$upload.on("change", function(e){
    let i = $upload.index($(this));
    let files = $(this)[0].files;
    let name = files[0].name;
    let formData = new FormData();

    // sizes[i] = files[0].size;

    $(files).each((i, file) => {
        formData.append("uploadFile", file);
    });

    $.ajax({
        url: "/advertising/upload",
        type: "post",
        data: formData,
        contentType: false,
        processData: false,
        success: function(uuids){
            alert("성공");
        }
    });

});