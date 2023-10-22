/* 카테필터 */
const $cateFilter = $(".result .cate-filter");
const $cateFilterList = $(".cate-filter .list");
const $cateFilterListBtn = $(".cate-filter .list button")
const $cateArrow = $(".cate-arrow");
const $cateNameArea = $(".cate-tit");

$cateFilter.on("click",function () {
    $cateFilterList.toggle();
    $cateArrow.toggleClass("active");
})

$cateFilterListBtn.on("click",function () {
    let $listVal = $(this).text();
    $cateNameArea.text($listVal);
})

/* 서브필터 */
const $subFilterLi = $(".sub-filter li");

$subFilterLi.on("click",function(){
    $subFilterLi.not(this).removeClass("active")
    $(this).addClass("active");
})

/* 메인서브필터 */
const $mainSubFilterLi = $(".sub-main-filer li");

$mainSubFilterLi.on("click",function(){
    $mainSubFilterLi.not(this).removeClass("active")
    $(this).addClass("active");
})