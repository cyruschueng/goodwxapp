var goldFallInterval;
var goldFallStart = 0;
function initGoldFall() {
    var length = $('img', '#drowngold').length;

    if (length < 2) {
        for (i = 0; i < 4; i++) {
            $('img', '#drowngold').clone().prependTo('#drowngold');
        }
    }
}
function startGoldFall() {
    clearInterval(goldFallInterval);
    endCount = 0;
    range();
    goldFallStart = new Date().getTime();
    goldFallInterval = setInterval(dropGoldFall, 300);
}

//排列
function range() {
    var num = 1;
    $('img', '#drowngold').each(function (i) {
        var ww = $(window).width(); //窗口宽度
        var wh = $(window).height();

        var ot = -20; //从头部以上开始

        $(this).css({ "left": (i * (ww / 16)) + "px", "top": "-50px" }); //距左距离保持，距上距离变化
        var op = new Array(-1, 1);
        var x = Math.round(Math.random());
        var y = Math.round(Math.random());

        $(this).children().css({ "transform": "scale(" + op[x] + "," + op[y] + ")" });
        num++;
    });
}

//降落
function dropGoldFall() {
    var now = new Date().getTime();
    if (now - goldFallStart > 6000) {
        clearInterval(goldFallInterval);
        $("#drowngold").hide();
        
    }


    var $objs = $('img', '#drowngold');
    $objs.each(function (i) {
        var wh = $(window).height();
        var ol = $(this).offset().left;
        var ot = $(this).offset().top;
        var rnd = Math.round(Math.random() * 100);
        var rnd2 = Math.round(Math.random() * 50);

        //降落的速度
        if (ot <= wh)//如果掉到窗口以下
        {
            $(this).css({ "top": (ot + rnd + rnd2) + "px" });
        }
    });
}
function score() {
    var i = 0;
    var gold = parseInt($("#hfIsGetGold").val());
    var v = parseInt($("#cur_gold").text()) - gold ; //呈现金币叠加效果
    var interval=setInterval(function () {
        v += 1;
        i+=1;
        $("#cur_gold").text(v);
        if (i == gold) {
            clearInterval(interval);
        }
    },200);
}

function fn() {
    initGoldFall();
    startGoldFall();
    score();
}
$(function () {
    var isready = $("#hfIsGetGold").val();
    if (parseInt(isready) > 0) {
        chanage_audio1(gamemusic.gold);
        $("#drowngold").show();
        $("#drowngold img").show();
        fn();
    }
})

function chanage_audio1(audiopath) {
    var goldaudio = document.getElementById('goldaudio');
    if (goldaudio != null) {
        goldaudio.src = audiopath;
        goldaudio.play();
    }
}

var gamemusic = {
    pass: "http://audio-10010590.file.myqcloud.com/4899.mp3",
    gold: "http://audio-10010590.file.myqcloud.com/4679.mp3"
};