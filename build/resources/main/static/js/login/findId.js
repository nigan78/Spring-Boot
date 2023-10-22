let message = "";

$('#phoneNumber').keydown(function () {
    var hp = this;
    if(hp.value.length > 10){
        hp.value = hp.value.slice(0, 10);
    }
});

$('#send').click(function () {
    if($('#phoneNumber').val().length != 11){
        $(".fail").eq(0).css("display", "block");
        $(".fail").eq(1).css("display", "none");
    }
    else {
        $(".fail").css("display", "none");
        var hp = $('#phoneNumber').val();
        var n = 4;
        var str = "";
        for (let i = 0; i < n; i++) {
            str += Math.floor(Math.random() * 10)
        }
        $.ajax({
            async: false,
            url: "/login/checkHp?str=" + str + "&hp=" + hp,
            success: function (result) {
                if(result == "false"){
                    $(".fail").eq(1).css("display", "block");
                }
                else {
                    $(".fail").eq(1).css("display", "none");
                    message = result
                }
            }
        });
    }
});
$('#checkHp').click(function () {
    var input = $('#authenticationNumber').val();
    if(input == message || input == ""){
        $(".fail").eq(2).css("display", "block");
        $(".succes").eq(0).css("display", "none");
        $('#hpcheck').val('0');
    }
    else{
        $(".fail").eq(2).css("display", "none");
        $(".succes").eq(0).css("display", "block");
        $('#hpcheck').val('1');
    }
});

$('#success').click(function () {
    var hp = $("#phoneNumber").val();
    var check = $("#hpcheck").val();
    if(check != 1){
        $(".fail").eq(3).css("display", "block");
    }
    else {
        location.href = "/login/findIdResult?hp=" + hp;
    }
});