// 슬라이드 ul의 넓이를 li의 개수만큼 설정
let $thumbUl = $('.thumb-ul');
let $listUl = $('.list-wrap');

$thumbUl.each((idx, el) => {
    let ulWidth = 100 * $(el).children('li').length + '%';
    $(el).css('width', ulWidth);
    $('.thumb-ul li').css('height', $('.img-wrap').width());
});

// 페이지네이션 생성
const $feedList = $('.FeedList .post');
const $pagination = $('.page');
const $paginationLi = $('.page li');
const $sildeLi = $('.thumb-ul li');
const $maxSlide = $sildeLi.length;

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
// const $pageUlLi =
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


/*------------------------------------------------*/

function select(id) {
    var class_id = $('.select').attr('id');
    document.getElementById(class_id).className = "other";
    document.getElementById(id).className = "select";
}

//new 추가용 function(정보 처음 불러올 때 용으로 쓰면 됨)
window.onload = function () {
    // db에서 조회수를 가져와서 넣으면 됨
    var views = 0;

    //여기서 조회수를 체크해서 new를 삽입 함으로 제거는 알아서 됨
    if(views < 1){
        const classnm = document.getElementsByClassName('lititle');
        const addspan = document.createElement('span');

        addspan.setAttribute('class','check');
        addspan.innerHTML = "New";

        //조회수가 0인 애들을 가져와서 for문으로 돌려야 함 지금은 처음만 적용시킴
        classnm[0].appendChild(addspan);
    }
}

/* 메인서브필터 */
const $mainSubFilterLi = $(".sub-main-filer li");

$mainSubFilterLi.on("click",function(){
    $mainSubFilterLi.not(this).removeClass("active")
    $(this).addClass("active");
})