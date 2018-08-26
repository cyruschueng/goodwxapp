/**
 * @filename wxshare.js
 * @filedesc wxshare.js
 * @authors lq
 * @email 610970478@qq.com
 * @date 2017-06-14 14:58:32
 * @version v1.0
*/
define(['wxapi'], function (wx) {
    return {
        share : function (shareImg,shareLink,shareTit,shareDesc){
            try{
                var appid;
                var nonceStr;
                var signature;
                var timestamp;
                var url = location.href.split('#')[0];
                var geturl = "https://api.banjoy.cn/weixin/getSign.shtml?callback=?&rnd="+Math.random();
                $.getJSON(geturl,{url:url},function(json) {
                    console.log(json);
                    appid = json.result.appId;
                    nonceStr = json.result.nonceStr;
                    signature = json.result.sign;
                    timestamp = json.result.timestamp;
                    wx.config({
                        debug: false,
                        appId: appid,
                        nonceStr: nonceStr,
                        signature: signature,
                        timestamp: timestamp,
                        jsApiList: ['checkJsApi','onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','onMenuShareWeibo','hideMenuItems']
                    });
                });
                var imgUrl = shareImg;
                var lineLink = shareLink;
                var shareTitle = shareTit;
                var descContent = shareDesc;
                wx.ready(function(){
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        imgUrl: imgUrl,
                        link: lineLink,
                        title: shareTitle,
                        desc: descContent,
                        trigger: function(res){},
                        success: function(res){},
                        cancel: function(res){},
                        fail: function(res){}
                    });
                    //分享朋友圈
                    wx.onMenuShareTimeline({
                        imgUrl: imgUrl,
                        link: lineLink,
                        title: shareTitle,
                        trigger: function(res){},
                        success: function(res){},
                        cancel: function(res){},
                        fail: function(res){}
                    });
                    wx.onMenuShareQQ({
                        imgUrl: imgUrl,
                        link: lineLink,
                        title: shareTitle,
                        desc: descContent,
                        trigger: function(res){},
                        success: function(res){},
                        cancel: function(res){},
                        fail: function(res){}
                    });
                    wx.onMenuShareQZone({
                        imgUrl: imgUrl,
                        link: lineLink,
                        title: shareTitle,
                        desc: descContent,
                        success: function(res){},
                        cancel: function(res){}
                    });
                    wx.onMenuShareWeibo({
                        imgUrl: imgUrl,
                        link: lineLink,
                        title: shareTitle,
                        desc: descContent,
                        trigger: function(res){},
                        success: function(res){},
                        cancel: function(res){},
                        fail: function(res){}
                    });
                    wx.hideMenuItems({ menuList:['menuItem:copyUrl'],
                        success:function(res){},
                        fail:function(res){},
                    });
                });
            }catch(e){
                //alert(e);
            }
        }
    };
});