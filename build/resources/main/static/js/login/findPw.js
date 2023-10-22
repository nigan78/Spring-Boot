let message = "";

window.onload = function(){
    if(fail){
        $(".false").css("display", "block");
    }
}

$('#idOrEmail').focusout(function () {
    $(".false").css("display", "none");
    var id = document.getElementById("idOrEmail").value;
    if (id != ""){
        $.ajax({
            async: false,
            url: "/register/checkid?ID=" + id,
            success: function(result){
                if(result){
                    $(".fail").eq(0).css("display", "none");
                    document.getElementById("idcheck").value = 1;
                }else{
                    $(".fail").eq(0).css("display", "block");
                    document.getElementById("idcheck").value = 0;
                }
            }
        });
    }
    else {
        $(".fail").eq(0).css("display", "block");
        $(".succes").eq(0).css("display", "none");
        document.getElementById("idcheck").value = 0;
    }
});

$('#phoneNumber').keydown(function () {
    $(".false").css("display", "none");
    var hp = this;
    if(hp.value.length > 10){
        hp.value = hp.value.slice(0, 10);
    }
});


$('#send').click(function () {
    $(".false").css("display", "none");
    if($('#phoneNumber').val().length != 11){
        $(".fail").eq(1).css("display", "block");
        $(".fail").eq(2).css("display", "none");
    }
    else {
        $(".fail").css("display", "none");
        var hp = $('#phoneNumber').val();
        var n = 4;
        var str = "";
        var id = "";
        if($('#idcheck').val() == 1){
            id = $('#idOrEmail').val();
        }
        for (let i = 0; i < n; i++) {
            str += Math.floor(Math.random() * 10)
        }
        $.ajax({
            async: false,
            url: "/login/checkHp?str=" + str + "&hp=" + hp + "&id=" + id,
            success: function (result) {
                if(result == "false"){
                    $(".fail").eq(2).css("display", "block");
                }
                else {
                    $(".fail").eq(2).css("display", "none");
                    message = result
                }
            }
        });
    }
});
$('#checkHp').click(function () {
    $(".false").css("display", "none");
    var input = $('#authenticationNumber').val();
    if(input != message || input == ""){
        $(".fail").eq(3).css("display", "block");
        $(".succes").eq(0).css("display", "none");
        $('#hpcheck').val('0');
    }
    else{
        $(".fail").eq(3).css("display", "none");
        $(".succes").eq(0).css("display", "block");
        $('#hpcheck').val('1');
    }
});

$('#RePassword').focusout(function () {
    $(".false").css("display", "none");
    var pwd1 = $('#pw').val();
    var pwd2 = $('#RePassword').val();

    if (pwd1 != '' && pwd2 == '') {
        null;
    } else if (pwd1 != '' || pwd2 != '') {
        if (pwd1 == pwd2) {
            document.getElementById('checkPW').innerHTML = '비밀번호가 일치합니다.'
            document.getElementById('checkPW').style.color = '#21BAF3'
            document.getElementById("pwcheck").value = 1;

        } else {
            document.getElementById('checkPW').innerHTML = '비밀번호가 일치하지 않습니다.'
            document.getElementById('checkPW').style.color = 'red'
            document.getElementById("pwcheck").value = 0;
        }
    }
});

$('#success').click(function () {
    var id = $("#idcheck").val();
    var hp = $("#hpcheck").val();
    var pw = $("#pwcheck").val();
    if(id+hp+pw != 111){
        $(".fail").eq(4).css("display", "block");
    }
    else {
        document.join.submit();
    }
});