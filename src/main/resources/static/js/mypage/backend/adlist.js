const $listUp = $("#listUp");

$(document).ready(function () {
    let text = "";
    let index=0;

    posts.forEach(post => {
        index++;
        let day = adDate(post);

        let startDate = new Date(post.startDate);
        let year = startDate.getFullYear();
        let month = startDate.getMonth() + 1;
        let days = startDate.getDate();
        let date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${days}`;
        text += `<tr>
                       <td>${index}</td>
                       <td>${post.title}</td>
                       <td>${date}</td>
                       <td>${day}일</td>
                       <td>${post.status == 'n' ? '거절' : (post.status == 'y' ? '승인' : '대기')}</td>
                   </tr>`;
    });
    console.log(text);

    $listUp.append(text);
});


function adDate(post) {
    // AdvVO 클래스로부터 받은 startDate와 endDate를 JavaScript Date 객체로 변환합니다.
    let startDate = new Date(post.startDate);
    let endDate = new Date(post.endDate);

    // 두 날짜 사이의 시간 차이를 계산합니다.
    let timeDifference = endDate.getTime() - startDate.getTime();

    // 밀리초(ms)를 일(day)로 변환합니다.
    let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // 결과를 화면에 표시합니다.
    return daysDifference;
}