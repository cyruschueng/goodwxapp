var appid = document.getElementById("hfAppid").value;
var authurl = document.getElementById("hfAuthURL").value;
var imgUrl = $("#hfShareImgUrl").val();  //注意必须是绝对路径
var lineLink = authurl + "poetry.aspx";   //同样，必须是绝对路径
var descContent = window.document.title;
var shareTitle = window.document.title;  //分享title
var appid = ''; //apiID，可留空

wx.config({
    //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: $("#hfAppid").val(), // 必填，公众号的唯一标识
    timestamp: $("#hfTimestamp").val(), // 必填，生成签名的时间戳
    nonceStr: $("#hfNoncestr").val(), // 必填，生成签名的随机串
    signature: $("#hfSignature").val(), // 必填，签名，见附录1
    jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'showOptionMenu', 'onMenuShareQQ', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
wx.ready(function () {
    descContent = "输入手机号，让你一秒变成李清照！";
    shareTitle = title;
    wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function (res) {
            // 用户确认分享后执行的回调函数
            alert("分享成功");
        },
        cancel: function (res) {
            // 用户取消分享后执行的回调函数
            alert("分享取消");
        }
    });

    document.querySelector("#btnShare").onclick = function () {
        alert("dddd");
        wx.onMenuShareTimeline({
            title: shareTitle, // 分享标题
            desc: descContent, // 分享描述
            link: lineLink, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function (res) {
                // 用户确认分享后执行的回调函数
                alert("分享成功");
            },
            cancel: function (res) {
                // 用户取消分享后执行的回调函数
                alert("分享取消");
            }
        });
    }

    wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function (res) {
            // 用户确认分享后执行的回调函数
            alert("分享成功");
        },
        cancel: function (res) {
            // 用户取消分享后执行的回调函数
            alert("分享取消");
        }
    });
    wx.onMenuShareQQ({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            //alert("分享成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //alert("分享取消");
        }
    });
    wx.onMenuShareWeibo({
        title: shareTitle, // 分享标题
        desc: descContent, // 分享描述
        link: lineLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
            //alert("分享成功");
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            //alert("分享取消");
        }
    });
    wx.showOptionMenu();
})