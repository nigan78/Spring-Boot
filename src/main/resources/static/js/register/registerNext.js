let message = "";

window.onload = function () {
    if (kakao != null) {
        document.getElementById("idcheck").value = 1;
        document.getElementById("idOrEmail").value = kakao;
        document.getElementById("idOrEmail").style.display = "none";
        document.getElementById("pwcheck").value = 1;
        document.getElementById("pw").value = "kakao";
        document.getElementById("pw").style.display = "none";
        document.getElementById("RePassword").value = "kakao";
        document.getElementById("RePassword").style.display = "none";
    }
}

$('#idOrEmail').focusout(function () {
    var id = document.getElementById("idOrEmail").value;
    if (id != ""){
        $.ajax({
            async: false,
            url: "/register/checkid?ID=" + id,
            success: function(result){
                if(result){
                    $(".fail").eq(0).css("display", "block");
                    $(".succes").eq(0).css("display", "none");
                    document.getElementById("idcheck").value = 0;
                }else{
                    $(".fail").eq(0).css("display", "none");
                    $(".succes").eq(0).css("display", "block");
                    document.getElementById("idcheck").value = 1;
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

$('#nickname').focusout(function () {
    var name = $("#nickname").val();
    if(name == ""){
        $(".fail").eq(1).css("display", "block");
        document.getElementById("namecheck").value = 0;
    }
    else {
        $(".fail").eq(1).css("display", "none");
        document.getElementById("namecheck").value = 1;
    }
});

$('#phoneNumber').keydown(function () {
    var hp = this;
    if(hp.value.length > 10){
        hp.value = hp.value.slice(0, 10);
    }
});

$('#send').click(function () {
    if($('#phoneNumber').val().length != 11){
        $(".fail").eq(2).css("display", "block");
    }
    else {
        $(".fail").eq(2).css("display", "none");
        var hp = $('#phoneNumber').val();
        var n = 4;
        var str = "";
        for (let i = 0; i < n; i++) {
            str += Math.floor(Math.random() * 10)
        }
        $.ajax({
            async: false,
            url: "/register/checkHp?str=" + str + "&hp=" + hp,
            success: function (result) {
                if(result == "true"){
                    $(".fail").eq(3).css("display", "block");
                }
                else {
                    $(".fail").eq(3).css("display", "none");
                    message = result
                }
            }
        });
    }
});

$('#checkHp').click(function () {
    var input = $('#authenticationNumber').val();
    if(input != message || input == ""){
        $(".fail").eq(4).css("display", "block");
        $(".succes").eq(1).css("display", "none");
        $('#hpcheck').val('0');
    }
    else{
        $(".fail").eq(4).css("display", "none");
        $(".succes").eq(1).css("display", "block");
        $('#hpcheck').val('1');
    }
});

function regist() {
    document.getElementById("sort").value = "n";
    var id = $("#idcheck").val();
    var pw = $("#pwcheck").val();
    var name = $("#namecheck").val();
    var hp = $("#hpcheck").val();
    if(id+pw+name+hp != 1111){
        $(".fail").eq(5).css("display", "block");
    }
    else {
        document.join.submit();
    }
}