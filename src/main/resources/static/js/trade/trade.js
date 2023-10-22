let tradeNum = '';
let groupId = '';
let page = 1;
const $tradeUl = $("#tradeList");


/*=======================================================================*/
/*모듈*/
/*=======================================================================*/

// //피드 리스트
let tradeGetList = function(callback){
    $.ajax({
        url: `/trade/list/${page}`,
        type: `GET`,
        success: function(trades){
            if(callback){
                callback(trades);
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


/*=======================================================================*/
/*템플릿*/
/*=======================================================================*/
function tradeList(trades){
    let text ='';

    if(trades.length == 0){
        text +=
            `
           <div class="no-data">
                <div class="ico xi-library-image-o"></div>
                <div class="message">등록된 교환해요가 없습니다.</div>
           </div>
           `
    }else{
        trades.forEach(trade =>{
            text +=
                `
                <div class="post" id="post">
                    <div class="user-wrap">
                        <a href="">`
                        if(trade.img == null){
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
                        text += `
                            <div class="usr-mid">
                                <div class="user-name">${trade.name}</div>
                                <div class="post-date">${timeForToday(trade.tradeRegisterDate)}</div>
                            </div>
                        </a>
                    </div>
                    <div class="img-wrap">
                        <ul class="thumb-ul">`
            trade.files.forEach(file => {
                text +=
                    `
                            <li>
                                <div class="img-box">
                                    <img src="/files/trade/display?fileName=${file.filePath}/${file.fileUuid}_${file.fileName}" alt="${file.fileName}">
                                </div>
                            </li>
                    `
            })
            text += `
                        </ul>
                     `
            if(trade.files.length > 1){
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
                        <a href="/trade/detail?id=${trade.id}&memberId=${trade.memberId}">
                            <div class="tag-wrap">
                                <div class="hashtag">${trade.tagCode}</div>`
                               if(trade.status == "y"){
                                text += `<span class="hashtag">진행중</span>`
                               }else{
                                text += `<span class="hashtag end-tag">마감</span>`
                               }
                        text+=   `</div>
                            <div class="tit">${trade.title}</div>
                            <div class="content">${trade.content}</div>
                        </a>
                    </div>
                    <div class="util-wrap">
                        <div class="like">
                            <div class="icon-wrap">
            `
            if(trade.likeCheck == 0){
                text +=
                    `<button type="button" class="ActionGroup-heart likeBtn">
                                       <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'> <g clip-path='url(#clip0_2519_490)'> <mask id='mask0_2519_490' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'> <path d='M32 0H0V32H32V0Z' fill='white'/> </mask> <g mask='url(#mask0_2519_490)'> <mask id='mask1_2519_490' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'> <path d='M32 0H0V32H32V0Z' fill='white'/> </mask> <g mask='url(#mask1_2519_490)'> <path d='M28 12C28 16.1889 24.9781 19.7916 22.063 22.3047C20.2579 23.8469 18.2982 25.1986 16.2154 26.3381C16.2027 26.3441 16.1898 26.3505 16.1774 26.357C16.1226 26.3861 16.0613 26.4013 15.999 26.4015C15.9401 26.4015 15.882 26.3881 15.8293 26.362L15.8094 26.3511L15.784 26.3378C15.1694 26.0033 14.5659 25.649 13.9743 25.2754C12.5586 24.3847 11.2086 23.3914 9.93704 22.3049C7.02334 19.7914 4.00003 16.1887 4 12C4.00014 10.6766 4.41054 9.38568 5.17469 8.30517C5.93885 7.22466 7.01918 6.4076 8.26696 5.96651C9.51472 5.52542 10.8685 5.482 12.142 5.84222C13.4155 6.20245 14.546 6.94859 15.3778 7.97794C15.5297 8.16589 15.7584 8.2751 16 8.2751C16.2416 8.2751 16.4704 8.16589 16.6222 7.97794C17.4541 6.94859 18.5845 6.20245 19.8579 5.84222C21.1315 5.482 22.4853 5.52542 23.7331 5.96651C24.9808 6.4076 26.0611 7.22466 26.8253 8.30517C27.5894 9.38568 27.9998 10.6766 28 12Z' stroke='#333333' stroke-width='1.5' stroke-linejoin='round'/> </g> </g> </g> <defs> <clipPath id='clip0_2519_490'> <rect width='32' height='32' fill='white'/> </clipPath> </defs> </svg>
                                   </button>
                                   `
            }else{
                text +=
                    `<button type="button" class="ActionGroup-heart likeBtn active" th:if="${trade.likeCheck == 1}">
                                       <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'> <g clip-path='url(#clip0_2519_490)'> <mask id='mask0_2519_490' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'> <path d='M32 0H0V32H32V0Z' fill='white'/> </mask> <g mask='url(#mask0_2519_490)'> <mask id='mask1_2519_490' style='mask-type:luminance' maskUnits='userSpaceOnUse' x='0' y='0' width='32' height='32'> <path d='M32 0H0V32H32V0Z' fill='white'/> </mask> <g mask='url(#mask1_2519_490)'> <path d='M28 12C28 16.1889 24.9781 19.7916 22.063 22.3047C20.2579 23.8469 18.2982 25.1986 16.2154 26.3381C16.2027 26.3441 16.1898 26.3505 16.1774 26.357C16.1226 26.3861 16.0613 26.4013 15.999 26.4015C15.9401 26.4015 15.882 26.3881 15.8293 26.362L15.8094 26.3511L15.784 26.3378C15.1694 26.0033 14.5659 25.649 13.9743 25.2754C12.5586 24.3847 11.2086 23.3914 9.93704 22.3049C7.02334 19.7914 4.00003 16.1887 4 12C4.00014 10.6766 4.41054 9.38568 5.17469 8.30517C5.93885 7.22466 7.01918 6.4076 8.26696 5.96651C9.51472 5.52542 10.8685 5.482 12.142 5.84222C13.4155 6.20245 14.546 6.94859 15.3778 7.97794C15.5297 8.16589 15.7584 8.2751 16 8.2751C16.2416 8.2751 16.4704 8.16589 16.6222 7.97794C17.4541 6.94859 18.5845 6.20245 19.8579 5.84222C21.1315 5.482 22.4853 5.52542 23.7331 5.96651C24.9808 6.4076 26.0611 7.22466 26.8253 8.30517C27.5894 9.38568 27.9998 10.6766 28 12Z' stroke='#333333' stroke-width='1.5' stroke-linejoin='round'/> </g> </g> </g> <defs> <clipPath id='clip0_2519_490'> <rect width='32' height='32' fill='white'/> </clipPath> </defs> </svg>
                                   </button>
                                   `
            }
            text +=`
                                <input type="hidden" value="${trade.id}" class="trade-id">
                            </div>
                            <span class="count">${trade.likeCnt}</span>
                        </div>
                        <div class="comment reply-open">
                            <div class="icon-wrap">
                                <button type="button">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='18' viewBox='0 0 21 18'%3E %3Cpath fill='none' stroke='%234E5968' stroke-width='1.5' d='M20.25.75H.75v11.818h3.842v4.015l5.9-4.015h9.758V.75z'/%3E %3C/svg%3E" alt="댓글">
                                </button>
                            </div>
                            <span class="count">${trade.reCnt}</span>
                        </div>
                    </div>
                </div>
                `
        });
    }
    $tradeUl.html(text);
}

$(window).scroll(function(){
    //if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.scrollHeight - 500) {
        page++;
        tradeGetList(tradeList)
    }
});


// 슬라이드 ul의 넓이를 li의 개수만큼 설정
let ulWidth_fn = function(){
    let $thumbUl = $('.thumb-ul');


    $thumbUl.each((idx, el) => {
        let ulWidth = 100 * $(el).children('li').length + '%';
        $(el).css('width', ulWidth);
    });
}

// 페이지네이션 생성
let pageAppend_fn = function () {
    const $tradeList = $('#tradeList .post');

    $tradeList.each((idx, el) => {
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
    tradeList(trades);

    //ul 사이즈 변경
    ulWidth_fn();

    //페이지네이션 생성
    pageAppend_fn();

    //슬라이드 기능
    slide_fn();
})

//좋아요
$(document).on("click", ".likeBtn" ,function () {
    let $tradeId = $(this).next(".trade-id").val();
    let thisBtn = $(this);
    let thisCnt = $(this).parent().next();

    $.ajax({
        type : "POST",
        url: `/trade/checkLike`,
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        data : JSON.stringify({tradeId:$tradeId}),
        success: function(result){
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
