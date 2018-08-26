/*
   * 注意：
   * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
   * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
   * 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
   *
   * 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
   * 邮箱地址：weixin-open@qq.com
   * 邮件主题：【微信JS-SDK反馈】具体问题
   * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
   */
function setShare(sharetitle,sharedesc,link){
        var host=window.location.protocol+"//"+window.location.host;
        var finalUrl=host+"/getWxData";
        var shareUrl=location.href.split('#')[0];
        $.ajax({
            type:"post",
            url:finalUrl,
            data:{
                reqUrl:shareUrl
            },
            dataType:"json",
            success:function(result){
                /*console.info(result);
                alert(result.status);*/
                if(result.status == "success"){
                    wx.config({
                        debug: false,
                        appId:result.data.appId,
                        timestamp: result.data.timestamp,
                        nonceStr: result.data.nonceStr,
                        signature:result.data.signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ]
                    });

                    wxShare(sharetitle,sharedesc,link);
                }
            }
        });
        
    }

function wxShare(sharetitle,sharedesc,link) {
    var shareObject = {
        title:sharetitle,
        desc: sharedesc,
        link: link,
        imgUrl:'http://cdn2.picooc.com/web/res/fatburn/image/student/reportShareIcon.png'
    }
    console.info(shareObject);
 //检测api是否生效
 wx.ready(function() {
    // 分享到朋友圈
    wx.onMenuShareTimeline(shareObject);
    // 分享给朋友
    wx.onMenuShareAppMessage(shareObject);
    // 分享到QQ
    wx.onMenuShareQQ(shareObject);
    // 分享到微博
    wx.onMenuShareWeibo(shareObject);
 
 });
}