/* 비밀번호 일치 불일치  */
/* 비밀번호 #pw // 비밀번호확인 #RePassword // p태그 checkPW */

$('#RePassword').focusout(function () {
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
