let geocoder = new kakao.maps.services.Geocoder();
function drawMap(result, status) {
    let mapContainer = document.getElementById('map'), // 지도를 표시할 div
        mapOption = {
            center: new kakao.maps.LatLng(result[0].y, result[0].x), // 지도의 중심좌표
            level: 2, // 지도의 확대 레벨
        };
    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    let map = new kakao.maps.Map(mapContainer, mapOption);

    let markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);

    // 마커를 생성합니다
    let marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
}
geocoder.addressSearch('서울특별시 송파구 올림픽로 300 롯데월드타워 35층', drawMap);