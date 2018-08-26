/**
 * Created by lenovo on 2016/7/1.
 */


wx.ready(function(){
    wx.onMenuShareTimeline({
        title: 'sssssssssssss', // 分享标题
        link: 'http://45f6150b.ngrok.natapp.cn/oauth/wxapi/baseinfo.ashx?redirect_url=http://192.168.105.246:5555/app/back.html&state={"appid":"app001"}', // 分享链接
        imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
        title: 'sssssssssssss', // 分享标题
        desc: '群分享', // 分享描述
        link: 'http://45f6150b.ngrok.natapp.cn/oauth/wxapi/baseinfo.ashx?redirect_url=http://192.168.105.246:5555/app/back.html&state={"appid":"app001"}', // 分享链接
        imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg', // 分享图标
        //type: '', // 分享类型,music、video或link，不填默认为link
        //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

});