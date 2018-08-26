var res_path = $("#hfURL").val();
var isStarted = false;
var showDecode;
var urls1 = [
		"http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971429&idx=1&sn=b93dcbaaa1faa4406c5e560418629067#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971404&idx=1&sn=9907036639aff06d8331e4138b17d241#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971378&idx=1&sn=59044fcdbaec64f42d03396b2b47cfdd#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971341&idx=1&sn=37c84191a4ad380ccd3660724bc9dd4a#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971300&idx=1&sn=e16202994566c6fcc618f584190d1c55#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971362&idx=1&sn=69d4698cda3084e9eeb88b1945762c93#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971162&idx=1&sn=b8d1fdec9c1e8bb6b8f2157c086777cc#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971184&idx=1&sn=0266d56d6b6305766fe77212d61552a8#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971202&idx=1&sn=c0dd20681b73abd63929233d5a652218#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971135&idx=1&sn=2d874c44343690e125f8850218ef56e4#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204970871&idx=1&sn=d5885ef0791408cf20e48abd832076cb#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204970910&idx=1&sn=59bf8372ab08c910b7aca72269db3ca6#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204971101&idx=1&sn=1d53230e5ae59273a090d7022ddaa105#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204967044&idx=1&sn=44fce599e09cf5d460442db19768f550#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204970813&idx=1&sn=c11c82e55c6043a9c1d98963815b69fd#rd",
        "http://mp.weixin.qq.com/s?__biz=MzA4MjExMjkwNQ==&mid=204970842&idx=1&sn=7832171edd168dadb97ebab3fcdadd95#rd"
	];
var start, showDecode, lastTime, lastAcc, isStarted = false;
new Image().src = res_path + "images/decode.png";
new Image().src = res_path + "images/234.png";
$(function () {
    $(".do").click(start);
})
jumpToDecode = function () {
    var urls = urls1;  // change 
    var jumpTo = urls[parseInt(Math.random() * urls.length)];
    window.location = jumpTo;
}
showDecode = function () {
    $('.result').hide();
    $('.decode').show();
    setTimeout(jumpToDecode, 3000);
}
start = function () {
    isStarted = true;
    $('.decode').hide();
    $('.result').show();
    setTimeout(showDecode, 3000);
}
if (window.DeviceMotionEvent) {
    var speed = 25;
    var x = y = z = lastX = lastY = lastZ = 0;
    window.addEventListener('devicemotion', function () {
        var acceleration = event.accelerationIncludingGravity;
        x = acceleration.x;
        y = acceleration.y;
        if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
            start();
        }
        lastX = x;
        lastY = y;
    }, false);
}