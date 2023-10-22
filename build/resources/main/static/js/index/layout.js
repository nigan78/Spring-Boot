let $gallery = "";
let $galleryLi = "";
let $galleryWidth = "";
let length = "";
window.onload = function () {
    var $append = $(".main-visual ul");
    var text = "";

    var length1 = $("#length1 >tbody tr").length;
    for (i=0;i<length1; i++){
        var text = $('.path').eq(i).text();
        var text2 = $('.filename').eq(i).text();
        text = `<li>`+
            `<a href="">` +
            `<img src="/advertising/display?fileName=` + text2 + `">` +
            `</a>` +
            `</li>`
        $append.append(text);
    }

    /* 슬라이드 */

// 슬라이드 gallery의 넓이를 img의 개수만큼 설정
    $gallery = $(".main-visual ul");
    $galleryLi = $(".main-visual li");
    $galleryWidth = 100 * (($galleryLi.length) + length) + "%";

    $gallery.css("width", $galleryWidth);


// 버튼 엘리먼트 선택하기
    let count = 0;
    const $btnPrev = $(".arrow.left");
    const $btnNext = $(".arrow.right");

    /* 페이지네이션 */
    const $galleryTotal = $gallery.find("li").length;
    const $totalCount = $(".max");
    const $currCount = $(".curr");

    /* 총 페이지 수 */
    $totalCount.text($galleryLi.length);

    $btnNext.on("click", function () {
        if (count >= $galleryLi.length - 1) count = -1;
        ++count;
        const $gap = $galleryLi.eq(1).offset().left - $galleryLi.eq(0).offset().left;
        const $goto = (-$gap * count) + "px";
        $gallery.css("left", $goto);
        $currCount.text(count + 1);
    })

    $btnPrev.on("click", function () {
        if (count <= 0) count = $galleryLi.length;
        --count;
        const $gap = $galleryLi.eq(1).offset().left - $galleryLi.eq(0).offset().left;
        const $goto = (-$gap * count) + "px";
        $gallery.css("left", $goto);
        $currCount.text(count + 1);
    })

// 좋아요
    $(".like-btn").on("click", function () {
        if ($(this).find("i").hasClass("xi-heart")) {
            $(this).find("i").attr("class", "xi-heart-o");
            $(this).removeClass("active");
        } else {
            $(this).find("i").attr("class", "xi-heart");
            $(this).addClass("active");
        }
    });
}