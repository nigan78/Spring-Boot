$(document).ready(function () {
    $(".withIcon-icon-2KxnX").hide();
    $(".opacity").hide();
});

//자신 하위의 input이 보이게 만들기
function showInp(el) {
    console.log($(el));
    $(el).next().removeClass('noshow').addClass('commentForm');
}