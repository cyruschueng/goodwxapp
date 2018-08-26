$(function () {
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            location.href = "http://weixin.jiajiaozhihui.cn/game/doublenovember/weixinpage.html";
        }
    }
    //isWeiXin();
})