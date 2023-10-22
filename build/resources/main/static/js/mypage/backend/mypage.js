// 저장 버튼 클릭 시
$(".topbut").click(function () {
    console.log("sdfsdf");
    // 입력값 수집
    let phoneNumber = $(".botinp[name='Hp']").val();
    let password = $(".botinp[name='Pw']").val();

    // Ajax 요청을 생성
    $.ajax({
        type: "POST", // POST 방식으로 서버에 데이터를 보냄
        url: "myupdate", // 데이터를 보낼 서버의 URL
        data: {
            phoneNumber: phoneNumber,
            password: password
        }, // 전송할 데이터 객체
        success: function (response) {

        },
        error: function () {
            // 오류 처리
            alert("서버 오류 발생");
        }
    });
});