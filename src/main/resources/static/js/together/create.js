function setThumbnail(event) {
    var reader = new FileReader();
    var i = document.getElementById("imgval").value;

    reader.onload = function(event) {
      var img = document.getElementById("thumnail" + (i-1));
      img.setAttribute("src", event.target.result);
      img.style.display = "block";
      document.getElementById("imginpdiv" + (i-1)).style.display = "none";
    };

    reader.readAsDataURL(event.target.files[0]);
    i++;
    document.getElementById("imgval").value = i;
    if(i < 10){
    $("#row").append(
                         "<div class='imgbox'>" +
                         "<div class='imgcard'>" +
                         "<div class=''>" +
                         "<label for='img'>" +
                         "<div class='imgdiv' id='image_container'>" +
                         "<img src='' class='thumnail' id='thumnail"+ i +"'>" +
                         "<div class='imginpdiv' id='imginpdiv"+ i +"'>" +
                         "<div>" +
                         "<div class='text-center'>" +
                         "<img src='https://frip.host/img/add.85e31315.svg' width='48' height='48'>" +
                         "<div>" + '이미지 추가하기' + "</div>" +
                         "</div>" +
                         "</div>" +
                         "</div>" +
                         "<input id='img' type='file' style='display: none;' accept='image/*' onchange='setThumbnail(event);'>" +
                         "</div>" +
                         "</label>" +
                         "<div class='container'></div>" +
                         "</div>" +
                         "</div>" +
                         "</div>"
                    );
    }
  }

  