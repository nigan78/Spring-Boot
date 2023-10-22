const $btnPrev = $('.arrow.left');
const $btnNext = $('.arrow.right');
const $currPage = $(".curr");
const $totalPage = $(".total");
const $thumUl = $(".slide ul")
const $imgLi = $(".slide li");
let count = 0;


/* 파일 이미지 넣기 */
let fileText = '';
trade.files.forEach(file => {
    fileText += `
        <li><div class="img-box"><img src="/files/trade/display?fileName=${file.filePath}/${file.fileUuid}_${file.fileName}" alt="${file.fileName}"></div></li>
    `
});
$thumUl.html(fileText);

// 슬라이드 ul의 넓이를 li의 개수만큼 설정
let ulWidth = 100 * $thumUl.find("li").length + '%';
$thumUl.css('width', ulWidth);

/* 페이지네이션 */
$totalPage.text($thumUl.find("li").length)

$btnNext.on('click', function (el) {
    const $thisUl = $(this).prev().prev('ul');
    const $thisUlLi = $thisUl.children('li');

    if (count >= $thisUlLi.length - 1) count = -1;
    ++count;
    const $gap = $($thisUlLi).eq(1).offset().left - $($thisUlLi).eq(0).offset().left;
    const $goto = -$gap * count + 'px';
    $thisUl.animate({left: $goto},200);
    $currPage.text(count + 1);
});

$btnPrev.on('click', function (el) {
    const $thisUl = $(this).prev('ul');
    const $thisUlLi = $thisUl.children('li');

    if (count <= 0) count = $thisUlLi.length;
    --count;
    const $gap = $($thisUlLi).eq(1).offset().left - $($thisUlLi).eq(0).offset().left;
    const $goto = -$gap * count + 'px';
    $thisUl.animate({left: $goto},200);
    $currPage.text(count + 1);
});

/* 디테일 유틸 창 */
//피드 유틸 js
const $utilBtn = $("#detail .util-btn");
const $utilBg = $(".detail-util-layer .bg");
const $detailUtil = $(".detail-util-layer");
$utilBtn.on("click",()=>{
    $detailUtil.fadeIn("fast");
});
$utilBg.on("click",function () {
    $detailUtil.fadeOut("fast");
})

/* 신고 */
let tradeReport = function (reportedId, tradeId) {
    $.ajax({
        url: `/trade/report`,
        type: `post`,
        data: JSON.stringify({reportedId: reportedId, tradeId: tradeId}),
        contentType: "application/json;charset=utf-8",
        success: function(){
            alert("신고되었습니다.")
            $(".detail-util-layer").hide();
        }
    });
}

/* 신고 */
$(".report").on('click', function() {
    tradeReport(tradeMemberId, tradeId);
});

/* 삭제 */
let tradeRemove = function (tradeId) {
    $.ajax({
        url: `/trade/remove/${tradeId}`,
        type: `DELETE`,
        data: {'id': tradeId},
        contentType: "application/json;charset=utf-8",
        success: function(){
            alert("삭제되었습니다.")
            location.href = "/trade/list";
        }
    });
}

/* 삭제 */
$(".delete").on('click', function() {
    tradeRemove(tradeId);
});

/* 팔로우 추가 */

$(".follow-btn").on('click', function() {
    let thisBtn = $(this);
    let follower = $(".follow-wrap").find('.count').eq(0)

    $.ajax({
        url: `/follow/check`,
        type: `post`,
        data: JSON.stringify({fwId: tradeMemberId}),
        contentType: "application/json;charset=utf-8",
        success: function(result){
            let cnt = follower.text()*1;
            if(result){
                follower.text(cnt - 1);
                alert("팔로우가 취소 되었습니다.")
                thisBtn.removeClass('active');
                thisBtn.text('팔로우')
            }else {
                follower.text(cnt + 1);
                alert(`${tradeName}님을 팔로우 합니다.`)
                thisBtn.addClass('active');
                thisBtn.text('팔로우 취소');
            }

        }
    });
});


/*=======================================================================*/
/*댓글 모듈*/
/*=======================================================================*/

let page = 1;
let categoryName = "r";
let replyService = (function(){

    function getList(callback){
        $.ajax({
            url: `/replies/list/${tradeId}/${page}`,
            type: `GET`,
            // data: JSON.stringify({tradeId: tradeId, page:page}),
            // contentType: "application/json;charset=utf-8",
            success: function(replies){
                if(callback){
                    callback(replies);
                }
            }
        });
    }

    function remove(id, callback){
        $.ajax({
            url: `/replies/remove`,
            type: `DELETE`,
            data: {'id': id,'categoryName': categoryName},
            success: function(result){
                if(result > 0) {
                    alert("삭제되었습니다.");
                    if(callback){
                        callback();
                    }
                } else {
                    alert("신고된 댓글로 삭제가 불가능합니다.");
                }
            }
        });
    }


    function createReport(tradeMemberId, tradeReplyId){
        $.ajax({
            url: `/replies/report`,
            type: `post`,
            data: JSON.stringify({tradeId:tradeId ,reportedId: tradeMemberId, tradeReplyId: tradeReplyId}),
            contentType: "application/json;charset=utf-8",
            success: function(){
                alert("신고되었습니다.")
            }
        });
    }

    function replyWrite(replyContent, callback){
        $.ajax({
            url: `/replies/replyWrite`,
            type: `post`,
            data: JSON.stringify({tradeId: tradeId, replyContent: replyContent}),
            contentType: "application/json;charset=utf-8",
            success: function(){
                if(callback){
                    callback();
                }
            }
        })
    }
    function rereplyWrite(replyGroup ,replyContent, callback){
        $.ajax({
            url: `/replies/rereplyWrite`,
            type: `post`,
            data: JSON.stringify({replyGroup: replyGroup, tradeId: tradeId, replyContent: replyContent}),
            contentType: "application/json;charset=utf-8",
            success: function(){
                if(callback){
                    callback();
                }
            }
        })
    }
    return {getList: getList, remove: remove, createReport: createReport, replyWrite: replyWrite, rereplyWrite: rereplyWrite};
})();

/*=======================================================================*/
/* 댓글&대댓글 이벤트, DOM, Ajax*/
/*=======================================================================*/

$replyUl = $(".reply-ul");
function showList(replies){
    let text =``;

    if(replies.length == 0){
        text += `<li class="no-reply">등록된 댓글이 없습니다.</li>`
    }else{
    replies.forEach(reply =>{
        text +=
            `
            <li>
                <div class="reply-wrap">
                    <div class="user-info">
                        <div class="user-img"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABZCAMAAABi1XidAAAAUVBMVEVHcEzz9Pby9Pb2+/vy8/f09/jq6/L////y9Pfz9ffy9ffz9Pfy8/fz9Pby9Pfy9Pby9Pfz9Pfy8/art8To6++wusi5ws7g5Orw8fTEzNbS1+C1FdKWAAAAEnRSTlMA5bIa8jsuC1GOZLnZzJ7Kt9TwOxZLAAADVklEQVRYw8VZ25arMAhNrdZqb1MgQPL/H3oe6kzb0ZBUJ+vwahfFLWxg41ze9t04NJfzroV2d740w9jt3Xbrj8Md5nYfjv02t1+Qtq/Vzg/XFmxrr4cVfrsGSqzpPo33BKV2+iTufoBPbCjG+7iDz2x3rBFwedj7G6yxW7Z4uhbWWZtJkqPCWlMT7BG22FjLseH6CFstAUinmz3r4mfct7Dd2oXk62/wF3abl8wAf2PD33+9xFfssyREEhk5CmXpqf8EC43B48N8iPoBHgf7t5ER0XMIgT0icrR//toKrA6iGhB9kEekKsEjBjPs00uNmAAzYnhFlwIim3A/66WxHXv59RbibddNCco6dzy51gKkr1ZSLDgGAPFofcbrlMsGYRAmPEREA4+2z5ZfSL41Y8gWopFy5FESjwQ9ZRKvt0okGbIqm0j3WTDCqmcPOAYz5ST5UMzEG5xzdxNmMjxbQN+d24OZc7TuIcDe5AyywjJfCKCzZgzd4nk0OX+L58HiuU0xN+5SKeaLO1eK+ex2lWLeubZSzK2DSpUCVsyg3uQNr2bMO7sJxhUMO+F8Nkcj5ORDm5/hbOYzSBpLQgMpALiYswZoutsFGwxoMrNiTOUd2WMBwJDZp1JBay5kGO2ZDkCWB46YQRmgM3vKA8+FIUm82V4fPcXqgxMes+mQOIcF3AtWH5oNnsRmc/3p3dndRzzyKyDCy1PkbN7oocC1fy4n0Rc4ht45576yP2NEZFEAUGFEo+R/tLyyVVA9MiJyiIERPdsk9zKL9rmFmxBJwrS1BckR83N+tmb+F76kGEKIlOHWt5k/tw3OPMVsNh9Kdqs5K2mWjZqyfXBh2YmZvOuKdtiFBU3VrpVTyd6tcXGpJH6tHWvvXiIPVZXIy4uwEiNyFFXNaSe/9A2VwOw9YjI0jR4RvWf+3vUT+sZ7IUaetAyOlFQQKPKkefDbvx/TOhIxog9RRMhMW1USkRj8m5YwpLUvYvSBAMrUO/2lSixoX996HZWw70JmUlKvmzRGDfl+sdh3giY1xsdXlGxTTrV4Seuizo3WUGTDHZDVlIlpXciPCXA0xfgsQaapNnOgOKwCAwDC4b/dJireUyregGrerSre2mreB2veNGveYWvejjfdu/8BI2K8ok7u95kAAAAASUVORK5CYII=" alt="profile-image" class="Image__DefaultImage-v97gyx-3 hVNKgp"></div>
                        <div class="user-con">
                            <div class="name">${reply.memberName}</div>
                            <div class="date">${timeForToday(reply.replyRegisterDate)}</div>
                        </div>
                    </div>
                    <div class="reply-con">${reply.replyContent}</div>
                    <div class="reply-btn-wrap">
                        <button type="button" class="rereply" data-reply-id="${reply.id}">답글달기</button>
                        <button type="button" class="report" data-member-id="${reply.memberId}"  data-reply-id="${reply.id}">신고</button>                        
                    `
                    if(loginId == reply.memberId){
                        text += `<button type="button" class="delete" data-reply-id="${reply.id}">삭제</button>`
                    }
            text +=`
                    </div>
                </div>
        <div class="rereply-wrap">`
        if(reply.rereplies.length == 0){
            text += `<div class="rereply no-rereply">등록된 답글이 없습니다.</div>`
        } else{
            reply.rereplies.forEach(rereply =>{
                    text +=
                            `
                          <div class="rereply">
                                <div class="user-info">
                                    <div class="user-img"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABZCAMAAABi1XidAAAAUVBMVEVHcEzz9Pby9Pb2+/vy8/f09/jq6/L////y9Pfz9ffy9ffz9Pfy8/fz9Pby9Pfy9Pby9Pfz9Pfy8/art8To6++wusi5ws7g5Orw8fTEzNbS1+C1FdKWAAAAEnRSTlMA5bIa8jsuC1GOZLnZzJ7Kt9TwOxZLAAADVklEQVRYw8VZ25arMAhNrdZqb1MgQPL/H3oe6kzb0ZBUJ+vwahfFLWxg41ze9t04NJfzroV2d740w9jt3Xbrj8Md5nYfjv02t1+Qtq/Vzg/XFmxrr4cVfrsGSqzpPo33BKV2+iTufoBPbCjG+7iDz2x3rBFwedj7G6yxW7Z4uhbWWZtJkqPCWlMT7BG22FjLseH6CFstAUinmz3r4mfct7Dd2oXk62/wF3abl8wAf2PD33+9xFfssyREEhk5CmXpqf8EC43B48N8iPoBHgf7t5ER0XMIgT0icrR//toKrA6iGhB9kEekKsEjBjPs00uNmAAzYnhFlwIim3A/66WxHXv59RbibddNCco6dzy51gKkr1ZSLDgGAPFofcbrlMsGYRAmPEREA4+2z5ZfSL41Y8gWopFy5FESjwQ9ZRKvt0okGbIqm0j3WTDCqmcPOAYz5ST5UMzEG5xzdxNmMjxbQN+d24OZc7TuIcDe5AyywjJfCKCzZgzd4nk0OX+L58HiuU0xN+5SKeaLO1eK+ex2lWLeubZSzK2DSpUCVsyg3uQNr2bMO7sJxhUMO+F8Nkcj5ORDm5/hbOYzSBpLQgMpALiYswZoutsFGwxoMrNiTOUd2WMBwJDZp1JBay5kGO2ZDkCWB46YQRmgM3vKA8+FIUm82V4fPcXqgxMes+mQOIcF3AtWH5oNnsRmc/3p3dndRzzyKyDCy1PkbN7oocC1fy4n0Rc4ht45576yP2NEZFEAUGFEo+R/tLyyVVA9MiJyiIERPdsk9zKL9rmFmxBJwrS1BckR83N+tmb+F76kGEKIlOHWt5k/tw3OPMVsNh9Kdqs5K2mWjZqyfXBh2YmZvOuKdtiFBU3VrpVTyd6tcXGpJH6tHWvvXiIPVZXIy4uwEiNyFFXNaSe/9A2VwOw9YjI0jR4RvWf+3vUT+sZ7IUaetAyOlFQQKPKkefDbvx/TOhIxog9RRMhMW1USkRj8m5YwpLUvYvSBAMrUO/2lSixoX996HZWw70JmUlKvmzRGDfl+sdh3giY1xsdXlGxTTrV4Seuizo3WUGTDHZDVlIlpXciPCXA0xfgsQaapNnOgOKwCAwDC4b/dJireUyregGrerSre2mreB2veNGveYWvejjfdu/8BI2K8ok7u95kAAAAASUVORK5CYII=" alt="profile-image" class="Image__DefaultImage-v97gyx-3 hVNKgp"></div>
                                    <div class="user-con">
                                        <div class="name">${rereply.memberName}</div>
                                        <div class="date">${timeForToday(rereply.replyRegisterDate)}</div>
                                    </div>
                                </div>
                                <div class="reply-con">${rereply.replyContent}</div>
                                <div class="reply-btn-wrap">
<!--                                    <button type="button" class="rereply" data-rereply-id="${rereply.id}">답글달기</button>-->
                                    <button type="button" class="report" data-member-id="${reply.memberId}" data-reply-id="${rereply.id}">신고</button>
                                    <button type="button" class="delete" data-reply-id="${rereply.id}">삭제</button>
                                </div>
                           </div>
                        `
            })
        }
            text +=
                `
                        <!--  대댓글 입력창  -->
                        <div class="rereply-input">
                            <textarea class="rereply-textarea" placeholder="답글을 입력해주세요."></textarea>
                            <button type="button" class="rereply-submit">작성</button>
                        </div>
                    </div>
                </div>
            </li>`
    });
    }
    $replyUl.html(text);
}


$(document).ready(function () {
    replyService.getList(showList);
})

$rereplyUl = $(".rereply-wrap");

function showRereply (replies){
    let text =``;

    replies.forEach(reply =>{
        if(reply.rereplies.length == 0){
            text += `<div class="rereply no-rereply">등록된 답글이 없습니다.</div>`
        } else{
            reply.rereplies.forEach(rereply =>{
                text +=
                    `
                  <div class="rereply">
                        <div class="user-info">
                            <div class="user-img"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABZCAMAAABi1XidAAAAUVBMVEVHcEzz9Pby9Pb2+/vy8/f09/jq6/L////y9Pfz9ffy9ffz9Pfy8/fz9Pby9Pfy9Pby9Pfz9Pfy8/art8To6++wusi5ws7g5Orw8fTEzNbS1+C1FdKWAAAAEnRSTlMA5bIa8jsuC1GOZLnZzJ7Kt9TwOxZLAAADVklEQVRYw8VZ25arMAhNrdZqb1MgQPL/H3oe6kzb0ZBUJ+vwahfFLWxg41ze9t04NJfzroV2d740w9jt3Xbrj8Md5nYfjv02t1+Qtq/Vzg/XFmxrr4cVfrsGSqzpPo33BKV2+iTufoBPbCjG+7iDz2x3rBFwedj7G6yxW7Z4uhbWWZtJkqPCWlMT7BG22FjLseH6CFstAUinmz3r4mfct7Dd2oXk62/wF3abl8wAf2PD33+9xFfssyREEhk5CmXpqf8EC43B48N8iPoBHgf7t5ER0XMIgT0icrR//toKrA6iGhB9kEekKsEjBjPs00uNmAAzYnhFlwIim3A/66WxHXv59RbibddNCco6dzy51gKkr1ZSLDgGAPFofcbrlMsGYRAmPEREA4+2z5ZfSL41Y8gWopFy5FESjwQ9ZRKvt0okGbIqm0j3WTDCqmcPOAYz5ST5UMzEG5xzdxNmMjxbQN+d24OZc7TuIcDe5AyywjJfCKCzZgzd4nk0OX+L58HiuU0xN+5SKeaLO1eK+ex2lWLeubZSzK2DSpUCVsyg3uQNr2bMO7sJxhUMO+F8Nkcj5ORDm5/hbOYzSBpLQgMpALiYswZoutsFGwxoMrNiTOUd2WMBwJDZp1JBay5kGO2ZDkCWB46YQRmgM3vKA8+FIUm82V4fPcXqgxMes+mQOIcF3AtWH5oNnsRmc/3p3dndRzzyKyDCy1PkbN7oocC1fy4n0Rc4ht45576yP2NEZFEAUGFEo+R/tLyyVVA9MiJyiIERPdsk9zKL9rmFmxBJwrS1BckR83N+tmb+F76kGEKIlOHWt5k/tw3OPMVsNh9Kdqs5K2mWjZqyfXBh2YmZvOuKdtiFBU3VrpVTyd6tcXGpJH6tHWvvXiIPVZXIy4uwEiNyFFXNaSe/9A2VwOw9YjI0jR4RvWf+3vUT+sZ7IUaetAyOlFQQKPKkefDbvx/TOhIxog9RRMhMW1USkRj8m5YwpLUvYvSBAMrUO/2lSixoX996HZWw70JmUlKvmzRGDfl+sdh3giY1xsdXlGxTTrV4Seuizo3WUGTDHZDVlIlpXciPCXA0xfgsQaapNnOgOKwCAwDC4b/dJireUyregGrerSre2mreB2veNGveYWvejjfdu/8BI2K8ok7u95kAAAAASUVORK5CYII=" alt="profile-image" class="Image__DefaultImage-v97gyx-3 hVNKgp"></div>
                            <div class="user-con">
                                <div class="name">${rereply.memberName}</div>
                                <div class="date">${timeForToday(rereply.replyRegisterDate)}</div>
                            </div>
                        </div>
                        <div class="reply-con">${rereply.replyContent}</div>
                        <div class="reply-btn-wrap">
                            <button type="button" class="report" data-member-id="${reply.memberId}" data-reply-id="${rereply.id}">신고</button>
                            <button type="button" class="delete" data-reply-id="${rereply.id}">삭제</button>
                        </div>
                   </div>
                        `
            })
        }
        text +=
            `
                    <!--  대댓글 입력창  -->
                    <div class="rereply-input">
                        <textarea class="rereply-textarea" placeholder="답글을 입력해주세요."></textarea>
                        <button type="button" class="rereply-submit">작성</button>
                    </div>
                </div>`

    })
    window.$rereplyUl.html(text);
}


let tradeReNum = '';

/* 댓글달기 창 */
$(document).on("click",".reply-btn-wrap .rereply", function () {
    if($(this).data("reply-id")){
        window.tradeReNum = $(this).data("reply-id");
    }else {
        window.tradeReNum = $(this).data("rereply-id");
    }
    $(this).parent().parent().next(".rereply-wrap").toggle();
})

/*댓글 작성 완료*/
$(".reply-submit").on("click", function(){
    const $writeTextarea = $(".reply-textarea");
    const $writeTextareaVal = $(".reply-textarea").val();
    replyService.replyWrite($writeTextareaVal, function(){
        $replyUl.html("");
        // page = 0;
        replyService.getList(showList, tradeId);
    });
    $writeTextarea.val('');
});

/*대댓글 작성 완료*/
$(document).on("click",".rereply-submit", function(){
    window.$rereplyUl = $(this).parent().parent();

    const $writeTextarea = $(this).prev(".rereply-textarea");
    const $writeTextareaVal = $writeTextarea.val();
    replyService.rereplyWrite(window.tradeReNum, $writeTextareaVal, function () {
        window.$rereplyUl.html("");
        // page = 0;
        replyService.getList(showList, tradeId);
    })
    $writeTextarea.val('');

    console.log($rereplyUl)
});

/* 댓글 & 대댓글 신고 */
$(document).on('click', '.reply-btn-wrap .report', function() {
    let tradeReplyId = $(this).data("reply-id");
    let reportedId = $(this).data("member-id");

    replyService.createReport(reportedId, tradeReplyId)
});

/* 댓글 & 대댓글 삭제 */
$(document).on('click', '.delete', function() {
    let replyId = $(this).data("reply-id");

    if (!confirm("삭제 하시겠습니까?")) {
        // 취소(아니오) 버튼 클릭 시 이벤트
    } else {
        replyService.remove(replyId, function () {
            $replyUl.html("");
            // page = 0;
            replyService.getList(showList, window.feedNum);
        })
    }
});

$(window).scroll(function(){
    //if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight - 200) {
        page++;
        replyService.getList(showList, tradeId);
    }
});

//좋아요
$("button.like").on("click" ,function () {
    $.ajax({
        type : "POST",
        url: `/trade/checkLike`,
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        data : JSON.stringify({tradeId:tradeId}),
        success: function(result){
            if(result){
                $("button.like").removeClass('active');
            }else{
                $("button.like").addClass('active');
            }
        }
    });
})


/* 교환 수락하기 */
$(".app-close-btn").on("click", function () {
    $.ajax({
        url: `/trade/modifyStatus/${tradeId}`,
        success: function(result){
            alert("교환을 마감 하였습니다.");
        }
    })
    replyService.getList(showList, tradeId);
})




/*=======================================================================*/
/*모듈*/
/*=======================================================================*/
let $applyPage = 1;
let $applyUl = $(".apply-ul");
let applyService = (function(){

    function getList(callback){
        $.ajax({
            url: `/trade/app/list/${tradeId}/${$applyPage}`,
            success: function(applies){
                if(callback){
                    callback(applies);
                }
            }
        });
    }
    
    function applyModify(applyId) {
        $.ajax({
            url: `/trade/app/modify/${applyId}`,
            success: function(result){
                alert("교환을 수락하였습니다.");
            }
        })
    }

    return {getList: getList, applyModify: applyModify};
})();

/*=======================================================================*/
/* 교환신청 이벤트, DOM, Ajax*/
/*=======================================================================*/

function applyShowList(applies){
    let text ='';
    if(applies.length == 0){
        text += `<li class="no-data">교환신청이 없습니다.</li>`
    }else{
        applies.forEach(apply =>{
            text +=
                `
               <li>
                    <div class="content-area">
                        <div class="img-wrap">`
            if(apply.img == null){
                text += `<a href=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABZCAMAAABi1XidAAAAUVBMVEVHcEzz9Pby9Pb2+/vy8/f09/jq6/L////y9Pfz9ffy9ffz9Pfy8/fz9Pby9Pfy9Pby9Pfz9Pfy8/art8To6++wusi5ws7g5Orw8fTEzNbS1+C1FdKWAAAAEnRSTlMA5bIa8jsuC1GOZLnZzJ7Kt9TwOxZLAAADVklEQVRYw8VZ25arMAhNrdZqb1MgQPL/H3oe6kzb0ZBUJ+vwahfFLWxg41ze9t04NJfzroV2d740w9jt3Xbrj8Md5nYfjv02t1+Qtq/Vzg/XFmxrr4cVfrsGSqzpPo33BKV2+iTufoBPbCjG+7iDz2x3rBFwedj7G6yxW7Z4uhbWWZtJkqPCWlMT7BG22FjLseH6CFstAUinmz3r4mfct7Dd2oXk62/wF3abl8wAf2PD33+9xFfssyREEhk5CmXpqf8EC43B48N8iPoBHgf7t5ER0XMIgT0icrR//toKrA6iGhB9kEekKsEjBjPs00uNmAAzYnhFlwIim3A/66WxHXv59RbibddNCco6dzy51gKkr1ZSLDgGAPFofcbrlMsGYRAmPEREA4+2z5ZfSL41Y8gWopFy5FESjwQ9ZRKvt0okGbIqm0j3WTDCqmcPOAYz5ST5UMzEG5xzdxNmMjxbQN+d24OZc7TuIcDe5AyywjJfCKCzZgzd4nk0OX+L58HiuU0xN+5SKeaLO1eK+ex2lWLeubZSzK2DSpUCVsyg3uQNr2bMO7sJxhUMO+F8Nkcj5ORDm5/hbOYzSBpLQgMpALiYswZoutsFGwxoMrNiTOUd2WMBwJDZp1JBay5kGO2ZDkCWB46YQRmgM3vKA8+FIUm82V4fPcXqgxMes+mQOIcF3AtWH5oNnsRmc/3p3dndRzzyKyDCy1PkbN7oocC1fy4n0Rc4ht45576yP2NEZFEAUGFEo+R/tLyyVVA9MiJyiIERPdsk9zKL9rmFmxBJwrS1BckR83N+tmb+F76kGEKIlOHWt5k/tw3OPMVsNh9Kdqs5K2mWjZqyfXBh2YmZvOuKdtiFBU3VrpVTyd6tcXGpJH6tHWvvXiIPVZXIy4uwEiNyFFXNaSe/9A2VwOw9YjI0jR4RvWf+3vUT+sZ7IUaetAyOlFQQKPKkefDbvx/TOhIxog9RRMhMW1USkRj8m5YwpLUvYvSBAMrUO/2lSixoX996HZWw70JmUlKvmzRGDfl+sdh3giY1xsdXlGxTTrV4Seuizo3WUGTDHZDVlIlpXciPCXA0xfgsQaapNnOgOKwCAwDC4b/dJireUyregGrerSre2mreB2veNGveYWvejjfdu/8BI2K8ok7u95kAAAAASUVORK5CYII=" alt="profile-image" class="Image__DefaultImage-v97gyx-3 hVNKgp"></a>`
            }
            text +=      `</div>
                        <div class="con-wrap">
                            <div class="name-date">
                                <span class="user-name">${apply.name}</span>
                                <span class="date">${timeForToday(apply.tradeRegisterDate)}</span>
                            </div>
                            <div class="comment">${apply.content}</div>
                            <div class="util">
                                <button type="button" class="view-img">이미지 보기</button>`
                                if(apply.status == 'n'){
            text +=                 `<button type="button" class="trade-btn" data-apply-id="${apply.id}">교환하기</button>`
                                }else {
            text +=                 `<span class="trade-ok">교환수락</span>`
                                }
            text +=         `</div>
                            <div class="trade-img">
                                <ul>`
            apply.files.forEach(file => {
                text +=
                    `
                                        <li>
                                            <div class="img-box">
                                                <img src="/files/trade/app/display?fileName=${file.filePath}/${file.fileUuid}_${file.fileName}" alt="${file.fileName}">
                                            </div>
                                        </li>
                                        `
            })

            text +=     `</ul>
                            </div>
                        </div>
                    </div>
                </li>
              `
        });
    }
    $applyUl.html(text);
}

/* 신청리스트 */
const $appViewLayer = $(".appView-layer");
$(".app-view-btn").on("click",function () {

    $appViewLayer.fadeIn("fast");

    applyService.getList(applyShowList, tradeId);
})
$(".appView-layer .bg").on("click",function () {
    $appViewLayer.fadeOut("fast");
})

/* 신청리스트 이미지 보기 */
$(document).on("click",".view-img", function () {
    $(this).parent().next('.trade-img').toggle()
})

/* 무한 스크롤 */
$(".scroll-wrap").scroll(function(){
    //현재 높이 저장
    var currentScroll = $(this).scrollTop();
    //div 문서의 높이
    var thisHeight = $(this).height();
    //현재 스크롤 + 문서 높이;
    var nowHeight = currentScroll + thisHeight;
    //스크롤 총 height
    var scrollHeight = $(this).prop('scrollHeight');

    if (nowHeight == scrollHeight) {
        $applyPage++;
        applyService.getList(applyShowList, tradeId);
    }
});

/* 교환 수락하기 */
$(document).on("click",".trade-btn",function () {
    let applyId = $(this).data("apply-id");
    applyService.applyModify(applyId);
    applyService.getList(applyShowList, tradeId);
})

