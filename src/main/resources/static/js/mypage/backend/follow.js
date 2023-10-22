const $listUp = $("#container");
let text = "";
//들어가면 팔로워가 우선 팔로워가 보이는 걸로
$(document).ready(function () {
    posts2.forEach(post => {
        text += `
<div class="FollowingCard-container-3">
    <div class="FollowingCard-contents-S">
       <div class="FollowingCard-leftPanel">
            <div class="FollowingCard-avatarWrapper">
                <div class="Avatar-avatar-FollowingCard-avatar">
<!--				여기 프로필이미지 변경-->
                        <span class="Avatar-hasImage"
                              style="background-image: url(/img/advertising/banner_1.png);
                              border: 1px solid rgb(221, 226, 230);"></span>
                </div>
            </div>
<!--						여기 이름 변경-->
            <div class="FollowingCard-info"><p class="FollowingCard-name">${post.fwId}</p></div>
        </div>
    </div>
    <div class="FollowingCard-divider"></div>
</div>`;
    });
    $listUp.append(text);
});

$("#follower").click(function () {
    $listUp.empty();
    text = "";

    posts2.forEach(post => {
        text += `
<div class="FollowingCard-container-3">
    <div class="FollowingCard-contents-S">
       <div class="FollowingCard-leftPanel">
            <div class="FollowingCard-avatarWrapper">
                <div class="Avatar-avatar-FollowingCard-avatar">
<!--				여기 프로필이미지 변경-->
                        <span class="Avatar-hasImage"
                              style="background-image: url(/img/advertising/banner_1.png);
                              border: 1px solid rgb(221, 226, 230);"></span>
                </div>
            </div>
<!--						여기 이름 변경-->
            <div class="FollowingCard-info"><p class="FollowingCard-name">${post.fwId}</p></div>
        </div>
    </div>
    <div class="FollowingCard-divider"></div>
</div>`;
    });

    $listUp.append(text);
});

$("#following").click(function () {
    $listUp.empty();
    text = "";

    posts.forEach(post => {
        text += `
<div class="FollowingCard-container-3">
    <div class="FollowingCard-contents-S">
       <div class="FollowingCard-leftPanel">
            <div class="FollowingCard-avatarWrapper">
                <div class="Avatar-avatar-FollowingCard-avatar">
<!--				여기 프로필이미지 변경-->
                        <span class="Avatar-hasImage"
                              style="background-image: url(/img/advertising/banner_1.png);
                              border: 1px solid rgb(221, 226, 230);"></span>
                </div>
            </div>
<!--						여기 이름 변경-->
            <div class="FollowingCard-info"><p class="FollowingCard-name">${post.memberId}</p></div>
        </div>
        <div class="FollowingCard-rightPanel">
            <button class="Button-button-3MO4n Button-secondary" type="button">
<!--			여유되면 팔로 클릭으로 변경-->
                <span class="Button-children">팔로잉</span>
            </button>
        </div>
    </div>
    <div class="FollowingCard-divider"></div>
</div>`;
    });

    $listUp.append(text);


    $(".Button-button-3MO4n").click(function() {
        // 버튼 아래의 <span> 요소 선택 후 텍스트 변경
        $(this).text("팔로우");
        let index = $(this).index();
        //삭제한 팔로잉
        console.log(posts[index].memberId);
        $.ajax({
            //인덱스 번호 변경 필요
            url: `/mypage/${memderid}/${posts[index].memberId}`,
            type: `DELETE`,
            success: function() {

                location.reload();
            }
        });
    });
});

