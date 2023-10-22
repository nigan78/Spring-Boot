const $listUp = $("#FeedList");

let text = "";
$(document).ready(function () {
    let i = 0;

    posts.forEach(post => {
        console.log(cCount);
        text += `
            <div class="post">
                   <div class="user-wrap">
                       <a href="">
                           <div class="user-img">
<!--                           나중에 프로필 이미지 나오게 만들기-->
                               <img src="/img/trade/tradeImg/교환물건(12).jpg" alt=""/>
                           </div>
                           <div class="usr-mid">
<!--                           내 이름 나오게-->
                               <div class="user-name">${name}</div>
<!--                               업로드 날짜-->
                               <div class="post-date">1시간 전</div>
                           </div>
                       </a>
                   </div>
                   <div class="img-wrap">
                       <ul class="thumb-ul">
<!--                       등록된 사진 나오게 만들기-->
                           <li><img src="/img/trade/피드여행(3).jpg" alt=""/></li>
                           <li><img src="/img/trade/피드여행(4).jpg" alt=""/></li>
                       </ul>
                       <div class="arrow left">
                           <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E %3Cpath fill='none' fill-rule='evenodd' stroke='%23FFF' stroke-width='2' d='M21 17l8 8.014L21.028 33'/%3E %3C/svg%3E"/>
                       </div>
                       <div class="arrow right">
                           <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E %3Cpath fill='none' fill-rule='evenodd' stroke='%23FFF' stroke-width='2' d='M21 17l8 8.014L21.028 33'/%3E %3C/svg%3E"/>
                       </div>
                       <ul class="page"></ul>
                   </div>
                   <div class="con-wrap">
                       <a href="">
<!--                       게시글 제목-->
                           <div class="tit">${post.title}</div>
<!--                           게시글 내용-->
                           <div class="content">${post.content}</div>
                       </a>
                   </div>
                   <div class="util-wrap">
                       <div class="like">
                           <div class="icon-wrap">
                               <button type="button" class="ActionGroup-heart">
                                   <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='18' viewBox='0 0 21 18'%3E %3Cpath fill='none' stroke='%234E5968' stroke-width='1.5' d='M15.657.75c-1.226 0-2.379.485-3.246 1.365l-1.91 1.94-1.912-1.94C7.722 1.235 6.57.75 5.343.75s-2.378.485-3.245 1.365C1.198 3.028.75 4.227.75 5.425c0 1.199.448 2.398 1.348 3.31l8.425 8.504 8.379-8.504c.9-.912 1.348-2.111 1.348-3.31 0-1.198-.448-2.397-1.347-3.31-.867-.88-2.02-1.365-3.246-1.365z'/%3E %3C/svg%3E"/>
                               </button>
                           </div>
<!--                           좋아요 수-->
                           <span class="count">${post.likeCount}</span>
                       </div>
                       <div class="comment">
                           <div class="icon-wrap">
                               <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21' height='18' viewBox='0 0 21 18'%3E %3Cpath fill='none' stroke='%234E5968' stroke-width='1.5' d='M20.25.75H.75v11.818h3.842v4.015l5.9-4.015h9.758V.75z'/%3E %3C/svg%3E"/>
                           </div>
<!--                           댓글 수-->
                           <span class="count">${cCount[i++]}</span>
                       </div>
                   </div>
               </div>`;
    });
    console.log(text);

    $listUp.append(text);

    let $thumbUl = $('.thumb-ul');

    $thumbUl.each((idx, el) => {
        let ulWidth = 100 * $(el).children('li').length + '%';
        $(el).css('width', ulWidth);
        $('.thumb-ul li').css('height', $('.img-wrap').width());
    });


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
});

