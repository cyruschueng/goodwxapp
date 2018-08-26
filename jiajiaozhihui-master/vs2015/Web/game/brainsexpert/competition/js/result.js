$(function () {
    $("#ranking").click(function () {
        window.location.href = "ranking.aspx?openid=" + $("#hfOpenID").val().replace(/\+/g, "%2B") + "&id=" + $("#hfID").val() + "&weixinid=" + $("#hfWeiXinID").val();
    });

    var isupgrade = $("#hfUpgrade").val();
    if (isupgrade == "true") {
        $("#upgrade").show();
        setTimeout(function () {
            $("#upgrade").hide();
        }, 5000)
    }

    $("#btnshare").click(function () {
        $("#share").show();
        setTimeout("$('#share').fadeOut()", 3000)
    });

    $("#btnrank").click(function () {
        window.location.href = "ranking.aspx?openid=" + $("#hfOpenID").val().replace(/\+/g, "%2B") + "&id=" + $("#hfID").val() + "&weixinid=" + $("#hfWeiXinID").val();
    })

    
    chanage_audio(gamemusic.pass);
    $("#img001").attr("src",imgbase64.img001);
})

function chanage_audio(audiopath) {
    var audio = document.getElementById('audio');
    this.play = function () {
        if (audio != null) {
            audio.src = audiopath;
            audio.play();
        }
    }
    if ((navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i))) {
        // 判断系统版本号是否大于 4
        var t = Boolean(navigator.userAgent.match(/OS [8-9]_\d[_\d]* like Mac OS X/i));
        if (t == true) {
            this.play();
        }
    } else {
        this.play();
    }

}

var gamemusic = {
    pass: "http://audio-10010590.file.myqcloud.com/4899.mp3",
    gold: "http://audio-10010590.file.myqcloud.com/4679.mp3"
};

var imgbase64 = {
    img001: "http://guoxuedaren-10010590.file.myqcloud.com/result_001.png"
}