function DMDetail() {
    var check = document.getElementById('onoff1').className;
    // alert(check);
    if(check == "on1") {
        document.getElementById('onoff1').className = "off1";
        document.getElementById('onoff2').className = "off2";
    }
    else{
        document.getElementById('onoff1').className = "on1";
        document.getElementById('onoff2').className = "on2";
    }
}

function FollowerDMDetail() {
    var check = document.getElementById('onoff3').className;
    // alert(check);
    if(check == "on1") {
        document.getElementById('onoff3').className = "off1";
        document.getElementById('onoff4').className = "off2";
    }
    else{
        document.getElementById('onoff3').className = "on1";
        document.getElementById('onoff4').className = "on2";
    }
}

function PrivateAccountDetail() {
    var check = document.getElementById('onoff5').className;
    // alert(check);
    if(check == "on1") {
        document.getElementById('onoff5').className = "off1";
        document.getElementById('onoff6').className = "off2";
    }
    else{
        document.getElementById('onoff5').className = "on1";
        document.getElementById('onoff6').className = "on2";
    }
}