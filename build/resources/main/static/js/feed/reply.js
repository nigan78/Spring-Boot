let feedNum = '';
let groupId = '';
let page = 1;
const $reply = $(".reply-layer");
const $replyBg = $(".reply-layer .bg");
const $replyUl = $(".reply-layer ul");

/*=======================================================================*/
/*모듈*/
/*=======================================================================*/


let replyService = (function(){

    function getList(callback, feedId){

        $.ajax({
            url: `/feedReplies/list/${feedId}/${page}`,
            success: function(replies){
                if(callback){
                    callback(replies);
                }
            }
        });
    }

    function remove(id, callback){
        $.ajax({
            url: `/feedReplies/${id}`,
            type: `DELETE`,
            success: function(){
                if(callback){
                    callback();
                }
            }
        });
    }

    function createReport(reportedId, feedReplyId){
        $.ajax({
            url: `/feedReplies/report`,
            type: `post`,
            data: JSON.stringify({reportedId: reportedId, feedReplyId: feedReplyId}),
            contentType: "application/json;charset=utf-8",
            success: function(){
                alert("신고되었습니다.")
            }
        });
    }

    function replyWrite(feedId ,replyContent, callback){
        $.ajax({
            url: `/feedReplies/replyWrite`,
            type: `post`,
            data: JSON.stringify({feedId: feedId, replyContent: replyContent}),
            contentType: "application/json;charset=utf-8",
            success: function(){
                if(callback){
                    callback();
                }
            }
        })
    }
    function rereplyWrite(replyGroup, feedId ,replyContent, callback){
        $.ajax({
            url: `/feedReplies/rereplyWrite`,
            type: `post`,
            data: JSON.stringify({replyGroup: replyGroup, feedId: feedId, replyContent: replyContent}),
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

function showList(replies){
    let text ='';

    if(replies.length == 0){
        text += `<li class="no-data">댓글이 없습니다.</li>`
    }else{
        replies.forEach(reply =>{
            text +=
                `
                    <li>
                        <div class="re-con depth1">
                            <div class="img-wrap">
                                <a href=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABZCAMAAABi1XidAAAAUVBMVEVHcEzz9Pby9Pb2+/vy8/f09/jq6/L////y9Pfz9ffy9ffz9Pfy8/fz9Pby9Pfy9Pby9Pfz9Pfy8/art8To6++wusi5ws7g5Orw8fTEzNbS1+C1FdKWAAAAEnRSTlMA5bIa8jsuC1GOZLnZzJ7Kt9TwOxZLAAADVklEQVRYw8VZ25arMAhNrdZqb1MgQPL/H3oe6kzb0ZBUJ+vwahfFLWxg41ze9t04NJfzroV2d740w9jt3Xbrj8Md5nYfjv02t1+Qtq/Vzg/XFmxrr4cVfrsGSqzpPo33BKV2+iTufoBPbCjG+7iDz2x3rBFwedj7G6yxW7Z4uhbWWZtJkqPCWlMT7BG22FjLseH6CFstAUinmz3r4mfct7Dd2oXk62/wF3abl8wAf2PD33+9xFfssyREEhk5CmXpqf8EC43B48N8iPoBHgf7t5ER0XMIgT0icrR//toKrA6iGhB9kEekKsEjBjPs00uNmAAzYnhFlwIim3A/66WxHXv59RbibddNCco6dzy51gKkr1ZSLDgGAPFofcbrlMsGYRAmPEREA4+2z5ZfSL41Y8gWopFy5FESjwQ9ZRKvt0okGbIqm0j3WTDCqmcPOAYz5ST5UMzEG5xzdxNmMjxbQN+d24OZc7TuIcDe5AyywjJfCKCzZgzd4nk0OX+L58HiuU0xN+5SKeaLO1eK+ex2lWLeubZSzK2DSpUCVsyg3uQNr2bMO7sJxhUMO+F8Nkcj5ORDm5/hbOYzSBpLQgMpALiYswZoutsFGwxoMrNiTOUd2WMBwJDZp1JBay5kGO2ZDkCWB46YQRmgM3vKA8+FIUm82V4fPcXqgxMes+mQOIcF3AtWH5oNnsRmc/3p3dndRzzyKyDCy1PkbN7oocC1fy4n0Rc4ht45576yP2NEZFEAUGFEo+R/tLyyVVA9MiJyiIERPdsk9zKL9rmFmxBJwrS1BckR83N+tmb+F76kGEKIlOHWt5k/tw3OPMVsNh9Kdqs5K2mWjZqyfXBh2YmZvOuKdtiFBU3VrpVTyd6tcXGpJH6tHWvvXiIPVZXIy4uwEiNyFFXNaSe/9A2VwOw9YjI0jR4RvWf+3vUT+sZ7IUaetAyOlFQQKPKkefDbvx/TOhIxog9RRMhMW1USkRj8m5YwpLUvYvSBAMrUO/2lSixoX996HZWw70JmUlKvmzRGDfl+sdh3giY1xsdXlGxTTrV4Seuizo3WUGTDHZDVlIlpXciPCXA0xfgsQaapNnOgOKwCAwDC4b/dJireUyregGrerSre2mreB2veNGveYWvejjfdu/8BI2K8ok7u95kAAAAASUVORK5CYII=" alt="profile-image" class="Image__DefaultImage-v97gyx-3 hVNKgp"></a>
                            </div>
                            <div class="comment-wrap">
                                <div class="user-name">${reply.memberName}</div>
                                <div class="comment">${reply.replyContent}</div>
                                <div class="util">
                                    <span class="date">${timeForToday(reply.replyRegisterDate)}</span>
                                    <button type="button" class="report" data-member-id="${reply.memberId}" data-reply-id="${reply.id}">신고</button>`
            if(memberId == reply.memberId && reply.rereplies.length == 0){
                text += `<button type="button" class="remove" data-category-name ="r" data-reply-id="${reply.id}">삭제</button>`
            }
            text += `            <button type="button" class="rerepleBtn" onclick="rerepleBtnEvent(this)">답글 달기</button>
                                    <input type="hidden" name="" value="${reply.replyGroup}" class="groupIdVal">
                                </div>
                            </div>
                        </div>`
            reply.rereplies.forEach(rereply => {
                text +=
                    `<div class="re-con depth2">
                                        <div class="img-wrap">
                                            <a href=""><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABZCAMAAABi1XidAAAAUVBMVEVHcEzz9Pby9Pb2+/vy8/f09/jq6/L////y9Pfz9ffy9ffz9Pfy8/fz9Pby9Pfy9Pby9Pfz9Pfy8/art8To6++wusi5ws7g5Orw8fTEzNbS1+C1FdKWAAAAEnRSTlMA5bIa8jsuC1GOZLnZzJ7Kt9TwOxZLAAADVklEQVRYw8VZ25arMAhNrdZqb1MgQPL/H3oe6kzb0ZBUJ+vwahfFLWxg41ze9t04NJfzroV2d740w9jt3Xbrj8Md5nYfjv02t1+Qtq/Vzg/XFmxrr4cVfrsGSqzpPo33BKV2+iTufoBPbCjG+7iDz2x3rBFwedj7G6yxW7Z4uhbWWZtJkqPCWlMT7BG22FjLseH6CFstAUinmz3r4mfct7Dd2oXk62/wF3abl8wAf2PD33+9xFfssyREEhk5CmXpqf8EC43B48N8iPoBHgf7t5ER0XMIgT0icrR//toKrA6iGhB9kEekKsEjBjPs00uNmAAzYnhFlwIim3A/66WxHXv59RbibddNCco6dzy51gKkr1ZSLDgGAPFofcbrlMsGYRAmPEREA4+2z5ZfSL41Y8gWopFy5FESjwQ9ZRKvt0okGbIqm0j3WTDCqmcPOAYz5ST5UMzEG5xzdxNmMjxbQN+d24OZc7TuIcDe5AyywjJfCKCzZgzd4nk0OX+L58HiuU0xN+5SKeaLO1eK+ex2lWLeubZSzK2DSpUCVsyg3uQNr2bMO7sJxhUMO+F8Nkcj5ORDm5/hbOYzSBpLQgMpALiYswZoutsFGwxoMrNiTOUd2WMBwJDZp1JBay5kGO2ZDkCWB46YQRmgM3vKA8+FIUm82V4fPcXqgxMes+mQOIcF3AtWH5oNnsRmc/3p3dndRzzyKyDCy1PkbN7oocC1fy4n0Rc4ht45576yP2NEZFEAUGFEo+R/tLyyVVA9MiJyiIERPdsk9zKL9rmFmxBJwrS1BckR83N+tmb+F76kGEKIlOHWt5k/tw3OPMVsNh9Kdqs5K2mWjZqyfXBh2YmZvOuKdtiFBU3VrpVTyd6tcXGpJH6tHWvvXiIPVZXIy4uwEiNyFFXNaSe/9A2VwOw9YjI0jR4RvWf+3vUT+sZ7IUaetAyOlFQQKPKkefDbvx/TOhIxog9RRMhMW1USkRj8m5YwpLUvYvSBAMrUO/2lSixoX996HZWw70JmUlKvmzRGDfl+sdh3giY1xsdXlGxTTrV4Seuizo3WUGTDHZDVlIlpXciPCXA0xfgsQaapNnOgOKwCAwDC4b/dJireUyregGrerSre2mreB2veNGveYWvejjfdu/8BI2K8ok7u95kAAAAASUVORK5CYII=" alt="profile-image" class="Image__DefaultImage-v97gyx-3 hVNKgp"></a>
                                        </div>
                                        <div class="comment-wrap">
                                            <div class="user-name">${rereply.memberName}</div>
                                            <div class="comment">${rereply.replyContent}</div>
                                            
                                            <div class="util">
                                                <span class="date">${timeForToday(rereply.replyRegisterDate)}</span>
                                                <button type="button" class="report" data-member-id="${rereply.memberId}" data-reply-id="${rereply.id}">신고</button>`
                if(memberId == rereply.memberId){
                    text += `<button type="button" class="remove" data-categoryName ="r"  data-reply-id="${rereply.id}">삭제</button>`
                }

                text += `          <button type="button" class="rerepleBtn" onclick="rerepleBtnEvent(this)">답글 달기</button>
                                                <input type="hidden" name="" value="${reply.replyGroup}" class="groupIdVal">
                                            </div>
                                        </div>
                                    </div>`
            })
            text += `</li>`
        });
    }
    $replyUl.html(text);
}


//댓글 레이어 오픈
$(".reply-open").on("click",function () {
    let $feedId = $(this).prev().find(".feed-id").val();
    $reply.fadeIn("fast");
    $("html").css("overflow","hidden");

    window.feedNum = $feedId;
    replyService.getList(showList, $feedId);
});

$(".reMoreBtn").on("click",function () {
    page++;
    replyService.getList(showList, feedNum);
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
        page++;
        replyService.getList(showList, window.feedNum);
    }
});


//댓글 레이어 닫기
$($replyBg).on("click",function () {
    $reply.fadeOut("fast");
    $("html").css("overflow","unset");
})

/*댓글 작성 완료*/
const $replyBtn = $(".replyBtn");
$replyBtn.on("click", function(){
    const $writeTextarea = $(".reply-textarea");
    replyService.replyWrite(window.feedNum ,$writeTextarea.val(), function(){
        $replyUl.html("");
        // page = 0;
        replyService.getList(showList, window.feedNum);
    });
    $writeTextarea.val('');
});

/* 대댓글 작성 */
function rerepleBtnEvent(e){
    let $groupVal = $(e).next(".groupIdVal").val();
    let $name = $(e).parent().prev().prev().text();
    window.groupId = $groupVal;
    $(".rereply-name").text("@" + $name);
    $(".rereply-wrap").css("display","flex");
    $(".reply-wrap").hide();
    $(".reply-wrap .reply-textarea").val("");
    $(".rereply-textarea").focus()
}

/* 대댓글 취소 */
$(".rereply-del").on("click",function () {
    $(".rereply-wrap").hide();
    $(".reply-wrap").css("display","flex");
})

/*대댓글 작성 완료*/
const $rereplyBtn = $(".rereplyBtn");
$rereplyBtn.on("click", function(){
    const $writeTextarea = $(".rereply-textarea");
    replyService.rereplyWrite(window.groupId, window.feedNum,$writeTextarea.val(), function () {
        $replyUl.html("");
        // page = 0;
        replyService.getList(showList, window.feedNum);
    })
    $writeTextarea.val('');
});

/* 댓글 & 대댓글 삭제 */
$(document).on('click', '.remove', function() {
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

/* 댓글 & 대댓글 신고 */
$(document).on('click', '.report', function() {
    let feedReplyId = $(this).data("reply-id");
    let reportedId = $(this).data("member-id");

    replyService.createReport(reportedId, feedReplyId)
});
