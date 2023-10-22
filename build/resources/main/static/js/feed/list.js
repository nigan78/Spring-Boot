let feedNum = '';
let groupId = '';
let page = 1;
const $feedUl = $("#feedList");


/*=======================================================================*/
/*모듈*/
/*=======================================================================*/

// //피드 리스트
let feedGetgetList = function(callback){
    $.ajax({
        url: `/feed/list/${page}`,
        type: `GET`,
        success: function(feeds){
            if(callback){
                callback(feeds);
            }
            //ul 사이즈 변경
            ulWidth_fn();

            //페이지네이션 생성
            pageAppend_fn();
            
            //슬라이드 기능
            slide_fn();
        }
    });
}

let feedReport = function (reportedId, feedId) {
    $.ajax({
        url: `/feed/report`,
        type: `post`,
        data: JSON.stringify({reportedId: reportedId, feedId: feedId}),
        contentType: "application/json;charset=utf-8",
        success: function(){
            alert("신고되었습니다.")
        }
    });
}

/*=======================================================================*/
/*템플릿*/
/*=======================================================================*/
function feedList(feeds){
    let text ='';

    if(feeds.length == 0){
        text +=
            `
           <div class="no-data">
                <div class="ico xi-library-image-o"></div>
                <div class="message">피드가 없습니다.</div>
           </div>
           `
    }else{
        feeds.forEach(feed =>{
            text +=
                `
                <div class="post" id="post">
                    <div class="user-wrap">
                        <a href="">`
                    if(feed.img == null){
                        text +=
                            `
                            <div class="user-img"><div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAABZCAMAAABi1XidAAAAUVBMVEVHcEzz9Pby9Pb2+/vy8/f09/jq6/L////y9Pfz9ffy9ffz9Pfy8/fz9Pby9Pfy9Pby9Pfz9Pfy8/art8To6++wusi5ws7g5Orw8fTEzNbS1+C1FdKWAAAAEnRSTlMA5bIa8jsuC1GOZLnZzJ7Kt9TwOxZLAAADVklEQVRYw8VZ25arMAhNrdZqb1MgQPL/H3oe6kzb0ZBUJ+vwahfFLWxg41ze9t04NJfzroV2d740w9jt3Xbrj8Md5nYfjv02t1+Qtq/Vzg/XFmxrr4cVfrsGSqzpPo33BKV2+iTufoBPbCjG+7iDz2x3rBFwedj7G6yxW7Z4uhbWWZtJkqPCWlMT7BG22FjLseH6CFstAUinmz3r4mfct7Dd2oXk62/wF3abl8wAf2PD33+9xFfssyREEhk5CmXpqf8EC43B48N8iPoBHgf7t5ER0XMIgT0icrR//toKrA6iGhB9kEekKsEjBjPs00uNmAAzYnhFlwIim3A/66WxHXv59RbibddNCco6dzy51gKkr1ZSLDgGAPFofcbrlMsGYRAmPEREA4+2z5ZfSL41Y8gWopFy5FESjwQ9ZRKvt0okGbIqm0j3WTDCqmcPOAYz5ST5UMzEG5xzdxNmMjxbQN+d24OZc7TuIcDe5AyywjJfCKCzZgzd4nk0OX+L58HiuU0xN+5SKeaLO1eK+ex2lWLeubZSzK2DSpUCVsyg3uQNr2bMO7sJxhUMO+F8Nkcj5ORDm5/hbOYzSBpLQgMpALiYswZoutsFGwxoMrNiTOUd2WMBwJDZp1JBay5kGO2ZDkCWB46YQRmgM3vKA8+FIUm82V4fPcXqgxMes+mQOIcF3AtWH5oNnsRmc/3p3dndRzzyKyDCy1PkbN7oocC1fy4n0Rc4ht45576yP2NEZFEAUGFEo+R/tLyyVVA9MiJyiIERPdsk9zKL9rmFmxBJwrS1BckR83N+tmb+F76kGEKIlOHWt5k/tw3OPMVsNh9Kdqs5K2mWjZqyfXBh2YmZvOuKdtiFBU3VrpVTyd6tcXGpJH6tHWvvXiIPVZXIy4uwEiNyFFXNaSe/9A2VwOw9YjI0jR4RvWf+3vUT+sZ7IUaetAyOlFQQKPKkefDbvx/TOhIxog9RRMhMW1USkRj8m5YwpLUvYvSBAMrUO/2lSixoX996HZWw70JmUlKvmzRGDfl+sdh3giY1xsdXlGxTTrV4Seuizo3WUGTDHZDVlIlpXciPCXA0xfgsQaapNnOgOKwCAwDC4b/dJireUyregGrerSre2mreB2veNGveYWvejjfdu/8BI2K8ok7u95kAAAAASUVORK5CYII=" alt="profile-image" class="Image__DefaultImage-v97gyx-3 hVNKgp"></div></div>
                            `
                    }else {
                        text +=
                            `
                            <div class="user-img"><div><img src="/img/trade/피드(1).jpg" alt=""></div></div>
                            `
                    }
             text +=      `
                            <div class="usr-mid">
                                <div class="user-name">${feed.name}</div>
                                <div class="post-date"></div>
                            </div>
                        </a>
                        <button type="button" class="feed-util-btn" data-member-id="${feed.memberId}" data-feed-id="${feed.id}"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='17' viewBox='0 0 4 17'%3E %3Cpath fill='%23999' fill-rule='evenodd' d='M1.57 14a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-7a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm0-7a1.5 1.5 0 110 3 1.5 1.5 0 010-3z'/%3E %3C/svg%3E" alt="더보기"></button>
                    </div>
                    <div class="img-wrap">
                        <ul class="thumb-ul">`
            feed.files.forEach(file => {
                text +=
                    `
                            <li>
                                <div class="img-box">
                                    <img src="/files/feed/display?fileName=${file.filePath}/${file.fileUuid}_${file.fileName}" alt="${file.fileName}">
                                </div>
                            </li>
                    `
            })
            text += `
                        </ul>
                     `
                    if(feed.files.length > 1){
                        text += `
                        
                        <div class="arrow left"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E %3Cpath fill='none' fill-rule='evenodd' stroke='%23FFF' stroke-width='2' d='M21 17l8 8.014L21.028 33'/%3E %3C/svg%3E"  alt=""></div>
                        <div class="arrow right"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E %3Cpath fill='none' fill-rule='evenodd' stroke='%23FFF' stroke-width='2' d='M21 17l8 8.014L21.028 33'/%3E %3C/svg%3E"  alt=""></div>
                        <ul class="page"></ul>
                        `
                    }

            text +=
            `
                    </div>
                    <div class="con-wrap">
                        <div class="hashtag">${feed.tagCode}</div>
                        <div class="tit">${feed.title}</div>
                        <div class="content">${feed.content}</div>
                    </div>
                    <div class="util-wrap">
                        <div class="like">
                            <div class="icon-wrap">
            `
            if(feed.likeCheck == 0){
                text +=
                    `<button type="button" class="ActionGroup-heart likeBtn">
                                       <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'> <g clip-path='url(#clip0_2519_490)'> <mask id='mask0_2519_490' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'> <path d='M32 0H0V32H32V0Z' fill='white'/> </mask> <g mask='url(#mask0_2519_490)'> <mask id='mask1_2519_490' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'> <path d='M32 0H0V32H32V0Z' fill='white'/> </mask> <g mask='url(#mask1_2519_490)'> <path d='M28 12C28 16.1889 24.9781 19.7916 22.063 22.3047C20.2579 23.8469 18.2982 25.1986 16.2154 26.3381C16.2027 26.3441 16.1898 26.3505 16.1774 26.357C16.1226 26.3861 16.0613 26.4013 15.999 26.4015C15.9401 26.4015 15.882 26.3881 15.8293 26.362L15.8094 26.3511L15.784 26.3378C15.1694 26.0033 14.5659 25.649 13.9743 25.2754C12.5586 24.3847 11.2086 23.3914 9.93704 22.3049C7.02334 19.7914 4.00003 16.1887 4 12C4.00014 10.6766 4.41054 9.38568 5.17469 8.30517C5.93885 7.22466 7.01918 6.4076 8.26696 5.96651C9.51472 5.52542 10.8685 5.482 12.142 5.84222C13.4155 6.20245 14.546 6.94859 15.3778 7.97794C15.5297 8.16589 15.7584 8.2751 16 8.2751C16.2416 8.2751 16.4704 8.16589 16.6222 7.97794C17.4541 6.94859 18.5845 6.20245 19.8579 5.84222C21.1315 5.482 22.4853 5.52542 23.7331 5.96651C24.9808 6.4076 26.0611 7.22466 26.8253 8.30517C27.5894 9.38568 27.9998 10.6766 28 12Z' stroke='#333333' stroke-width='1.5' stroke-linejoin='round'/> </g> </g> </g> <defs> <clipPath id='clip0_2519_490'> <rect width='32' height='32' fill='white'/> </clipPath> </defs> </svg>
                                   </button>
                                   `
            }else{
                text +=
                    `<button type="button" class="ActionGroup-heart likeBtn active" th:if="${feed.likeCheck == 1}">
                                       <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'> <g clip-path='url(#clip0_2519_490)'> <mask id='mask0_2519_490' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'> <path d='M32 0H0V32H32V0Z' fill='white'/> </mask> <g mask='url(#mask0_2519_490)'> <mask id='mask1_2519_490' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'> <path d='M32 0H0V32H32V0Z' fill='white'/> </mask> <g mask='url(#mask1_2519_490)'> <path d='M28 12C28 16.1889 24.9781 19.7916 22.063 22.3047C20.2579 23.8469 18.2982 25.1986 16.2154 26.3381C16.2027 26.3441 16.1898 26.3505 16.1774 26.357C16.1226 26.3861 16.0613 26.4013 15.999 26.4015C15.9401 26.4015 15.882 26.3881 15.8293 26.362L15.8094 26.3511L15.784 26.3378C15.1694 26.0033 14.5659 25.649 13.9743 25.2754C12.5586 24.3847 11.2086 23.3914 9.93704 22.3049C7.02334 19.7914 4.00003 16.1887 4 12C4.00014 10.6766 4.41054 9.38568 5.17469 8.30517C5.93885 7.22466 7.01918 6.4076 8.26696 5.96651C9.51472 5.52542 10.8685 5.482 12.142 5.84222C13.4155 6.20245 14.546 6.94859 15.3778 7.97794C15.5297 8.16589 15.7584 8.2751 16 8.2751C16.2416 8.2751 16.4704 8.16589 16.6222 7.97794C17.4541 6.94859 18.5845 6.20245 19.8579 5.84222C21.1315 5.482 22.4853 5.52542 23.7331 5.96651C24.9808 6.4076 26.0611 7.22466 26.8253 8.30517C27.5894 9.38568 27.9998 10.6766 28 12Z' stroke='#333333' stroke-width='1.5' stroke-linejoin='round'/> </g> </g> </g> <defs> <clipPath id='clip0_2519_490'> <rect width='32' height='32' fill='white'/> </clipPath> </defs> </svg>
                                   </button>
                                   `
            }
            text +=`
                                <input type="hidden" value="${feed.id}" class="feed-id">
                            </div>
                            <span class="count">${feed.likeCnt}</span>
                        </div>
                        <div class="comment reply-open">
                            <div class="icon-wrap">
                                <button type="button">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='18' viewBox='0 0 21 18'%3E %3Cpath fill='none' stroke='%234E5968' stroke-width='1.5' d='M20.25.75H.75v11.818h3.842v4.015l5.9-4.015h9.758V.75z'/%3E %3C/svg%3E" alt="댓글">
                                </button>
                            </div>
                            <span class="count">${feed.reCnt}</span>
                        </div>
                    </div>
                </div>
                `
        });
    }
    $feedUl.html(text);
}

//리스트 무한스크롤
$(window).scroll(function(){
    //if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        page++;
        feedGetgetList(feedList)
    }
});


// 슬라이드 ul의 넓이를 li의 개수만큼 설정
    let ulWidth_fn = function(){
        let $thumbUl = $('.thumb-ul');
        let $listUl = $('.list-wrap');


        $thumbUl.each((idx, el) => {
            let ulWidth = 100 * $(el).children('li').length + '%';
            $(el).css('width', ulWidth);
        });
    }

// 페이지네이션 생성
    let pageAppend_fn = function () {
        const $feedList = $('.FeedList .post');

        $feedList.each((idx, el) => {
            const $page = $(el).find('.page');
            const $pageLi = $(el).find('.thumb-ul>li');
            let $liCount = $(el).find('.thumb-ul>li').length;

            let $html = '';
            if ($(el).find('.page')) {
                if ($liCount > 1) {
                    $pageLi.each((idx, el) => {
                        if (idx === 0) $html += `<li class="active"></li>`;
                        else $html += `<li></li>`;
                    });
                }

                $page.html($html);
            }
        });
    }

// 슬라이드 기능
    let slide_fn = function () {
    // 버튼 엘리먼트 선택하기
        const $btnPrev = $('.arrow.left');
        const $btnNext = $('.arrow.right');

        let count = 0;

        $btnNext.on('click', function (el) {
            const $thisUl = $(el.currentTarget).prev().prev().eq(0).eq(0);
            const $thisUlLi = $thisUl.children('li');
            const $pagenation = $(el.currentTarget).next().eq(0).find('li');

            if (count >= $thisUlLi.length - 1) count = -1;
            ++count;
            const $gap = $($thisUlLi).eq(1).offset().left - $($thisUlLi).eq(0).offset().left;
            const $goto = -$gap * count + 'px';
            $thisUl.css('left', $goto);

            $pagenation.not(count).removeClass('active');
            $pagenation.eq(count).addClass('active');
        });

        $btnPrev.on('click', function (el) {
            const $thisUl = $(el.currentTarget).prev().eq(0).eq(0);
            const $thisUlLi = $thisUl.children('li');
            const $pagenation = $(el.currentTarget).next().next().eq(0).find('li');

            if (count <= 0) count = $thisUlLi.length;
            --count;
            const $gap = $($thisUlLi).eq(1).offset().left - $($thisUlLi).eq(0).offset().left;
            const $goto = -$gap * count + 'px';
            $thisUl.css('left', $goto);

            $pagenation.not(count).removeClass('active');
            $pagenation.eq(count).addClass('active');
        });

    // 페이지네이션 클릭
        $('.page li').on('click', function () {
            const $thisIdx = $(this).index();
            const $liThumb = $(this).parent().prev().prev().prev();
            const $thisThumbLi = $liThumb.find('li');
            const $gap = $thisThumbLi.eq(1).offset().left - $thisThumbLi.eq(0).offset().left;
            const $goto = -$gap * $thisIdx + 'px';
            count = $thisIdx;

            $liThumb.css('left', $goto);
            $(this).addClass('active');
            $('.page li').not(this).removeClass('active');
        });
    }


$(document).ready(function () {
    // 페이징 불러오기
    feedList(feeds);
    
    //ul 사이즈 변경
    ulWidth_fn();

    //페이지네이션 생성
    pageAppend_fn();

    //슬라이드 기능
    slide_fn();
})

//좋아요
$(document).on("click", ".likeBtn" ,function () {
    let $feedId = $(this).next(".feed-id").val();
    let thisBtn = $(this);
    let thisCnt = $(this).parent().next();

    $.ajax({
        type : "POST",
        url: `/feed/checkLike`,
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        data : JSON.stringify({feedId:$feedId}),
        success: function(result){
            console.log(result)
            console.log(thisCnt.text())
            let cnt = thisCnt.text()*1;
            if(result){
                thisCnt.text(cnt - 1);
                thisBtn.removeClass('active');
            }else{
                thisCnt.text(cnt + 1);
                thisBtn.addClass('active');
            }
        }
    });
})

// 신고
/* 피드 신고 */
    $(document).on('click', '.feed-util-layer .report', function() {
        let feedId = $(this).siblings(".feedId").val();
        let reportedId = $(this).siblings(".id").val();


        feedReport(reportedId, feedId);
    });



//피드 유틸 js
    const $feedUtil = $(".feed-util-layer");
    $(document).on("click",".feed-util-btn",(e)=>{
        let feedId = $(e.currentTarget).data("feed-id");
        let userId = $(e.currentTarget).data("member-id");
        $(".feed-util-layer .feedId").val(feedId);
        $(".feed-util-layer .id").val(userId);

        $feedUtil.fadeIn("fast");
    });
    $(document).on("click",".feed-util-layer .bg",function () {
        $feedUtil.fadeOut("fast");
    })


//댓글---------------------------------------------------------------------------------------

let replyPage = 1;
    let categoryName = "r";
const $reply = $(".reply-layer");
const $replyUl = $(".reply-layer ul");


/*=======================================================================*/
/*모듈*/
/*=======================================================================*/


let replyService = (function(){

    function getList(callback, feedId){

        $.ajax({
            url: `/feedReplies/list/${feedId}/${replyPage}`,
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
            data: {'categoryName': categoryName},
            success: function(result){
                if(result > 0) {
                    alert("삭제되었습니다.");
                    if(callback){
                        callback();
                    }    
                } else {
                    alert("신고가 접수된 댓글입니다. 삭제하실 수 없습니다.");
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
            url: `/replies/rereplyWrite`,
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
$(document).on("click",".reply-open",function () {
    let $feedId = $(this).prev().find(".feed-id").val();
    $reply.fadeIn("fast");
    $("html").css("overflow","hidden");

    window.feedNum = $feedId;
    replyService.getList(showList, $feedId);
});

//댓글 레이어 닫기
$(document).on("click", ".reply-layer .bg", function () {
    $reply.fadeOut("fast");
    $("html").css("overflow","unset");

    $(".rereply-wrap").hide();
    $(".reply-wrap").css("display","flex");
    $(".rereply-textarea").val("");

    replyPage = 1;
    $('.scroll-wrap').scrollTop(0);
    replyService.getList(showList, window.feedNum);
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
        replyPage++;
        replyService.getList(showList, window.feedNum);
    }
});

/*댓글 작성 완료*/
$(document).on("click",".replyBtn", function(){
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
$(document).on("click",".rereply-del",function () {
    $(".rereply-textarea").val("");
    $(".rereply-wrap").hide();
    $(".reply-wrap").css("display","flex");
})

/*대댓글 작성 완료*/
$(document).on("click",".rereplyBtn", function(){
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
