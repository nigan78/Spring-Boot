const $chatBtn = $(".chat-btn");
const $chat = $("#chat");
console.log("ddd");
$chatBtn.on("click",function(){
    if($chat.css("display") == "none"){
        $chat.fadeIn("fast");
    }else{
        $chat.fadeOut("fast");
    }
})

autosize($("textarea"));