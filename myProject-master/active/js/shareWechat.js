$(function(){

    var url=window.location.href;
    var endUrl=encodeURIComponent(url);
    var shareUrl = encodeURIComponent(endUrl);
    var appid = "wx8a2d80f723828157";

/*index share*/
$.ajax({
    type: "get",
    //async: false,
    url:"http://m.benxiangbentu.cn/api/h5/wxShare/getShareInfo?url=" + shareUrl,
    dataType: "json",
    jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
    jsonpCallback: "receive",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
    success: function (data) {
        //console.log(data);
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appid, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            wx.onMenuShareTimeline({
                title: '你敢说比我了解这个地方？来比比看！', // 分享标题
                link: 'http://m.benxiangbentu.cn/active/getCode.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://m.benxiangbentu.cn/active/img/wechatShare.png', // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log("分享到朋友圈成功")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    console.log("分享到朋友圈失败")
                }
            });
            //获取“分享给朋友”按钮点击状态及自定义分享内容接口
            wx.onMenuShareAppMessage({
                title: '你敢说比我了解这个地方？来比比看！', // 分享标题
                desc: '够胆就来参加本鄉本土城市达人评级赛，看看你能获得什么样的饕餮达人称号！', // 分享描述
                link: 'http://m.benxiangbentu.cn/active/getCode.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://m.benxiangbentu.cn/active/img/wechatShare.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log("分享给朋友失败")
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    console.log("分享给朋友失败")
                }
            });
        });
    }
});
})
