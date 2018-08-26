var shareData = {
    title: '洲游',
    desc: '触摸世界的精彩，以全新视角发现您即将莅临的酒店之周边美景。',
    link: 'http://wap.visualbusiness.cn/ihg/index.html',
    imgUrl: 'http://wap.visualbusiness.cn/ihg/images/share.jpg'
};
var nonceStr;
var timeStamp;
var signature;

function initConfig(callback) {
    wx.config({
        debug: false,
        appId: 'wxa0c7da25637df906',
        timestamp: timeStamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'openLocation'
        ]
    });

    wx.ready(function () {
        if (callback)callback();
        if (!shareData.success || typeof(shareData.success) != "function") {
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareQZone(shareData);
        } else {
            wx.onMenuShareAppMessage({
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                success: function () {
                    shareData.success("shareappmessage")
                }
            });

            wx.onMenuShareTimeline({
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                success: function () {
                    shareData.success("sharetimeline")
                }
            });

            wx.onMenuShareQQ({
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                success: function () {
                    shareData.success("shareqq")
                }
            });

            wx.onMenuShareQZone({
                title: shareData.title,
                desc: shareData.desc,
                link: shareData.link,
                imgUrl: shareData.imgUrl,
                success: function () {
                    shareData.success("shareqzone")
                }
            });
        }
        ;
    });
}

function getShareInfo(url, callback) {
    var signUrl = encodeURIComponent(window.location.href.split('#')[0]);
    var mUrl = 'http://sfs.visualbusiness.cn/SimpleServer/signature_q?appId=wxa0c7da25637df906&secret=b10ae7e4197d1c16064ca8d54f7cf94f&url=' + signUrl;
    $.get(mUrl, function (response) {
        if (response) {
            var dataJson = eval("(" + response + ")");
            nonceStr = dataJson.noncestr;
            timeStamp = dataJson.timestamp;
            signature = dataJson.signature;
            initConfig(callback);
        }
    });
}

function getShareInfoSub(url, title, desc, imgUrl, success, cancel, callback) {
    var signUrl = encodeURIComponent(window.location.href.split('#')[0]);
    var mUrl = 'http://sfs.visualbusiness.cn/SimpleServer/signature_q?appId=wxa0c7da25637df906&secret=b10ae7e4197d1c16064ca8d54f7cf94f&url=' + signUrl;
    $.get(mUrl, function (response) {
        if (response) {
            var dataJson = eval("(" + response + ")");
            nonceStr = dataJson.noncestr;
            timeStamp = dataJson.timestamp;
            signature = dataJson.signature;
            shareData.link = url;
            shareData.title = title;
            shareData.desc = desc;
            shareData.imgUrl = imgUrl;
            shareData.success = success;
            shareData.cancel = cancel;
            initConfig(callback);
        }
    })
}
 


 
