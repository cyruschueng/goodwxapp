/**
 * Created by GUQIANG on 2018/1/10.
 */
// wx share
(function(){
    var shareData = {
        title: '洲游',
        desc: '触摸世界的精彩，以全新视角发现您即将莅临的酒店之周边美景。',
        link: '//wap.visualbusiness.cn/ihg/adjust.html',
        imgUrl: '//wap.visualbusiness.cn/ihg/images/share.jpg'
    };
    var nonceStr;
    var timeStamp;
    var signature;
    var _loadNetResourceByXMLHttpRequest = function(path,callback) {

        var xmlhttp=null;
        if (window.XMLHttpRequest)
        {// code for all new browsers
            xmlhttp=new XMLHttpRequest();
        }
        else if (window.ActiveXObject)
        {// code for IE5 and IE6
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp!=null)
        {
            xmlhttp.onreadystatechange=function()
            {
                if (xmlhttp.readyState==4)
                {// 4 = "loaded"
                    if (xmlhttp.responseText != null)
                    {// 200 = OK
                        // ...our code here...
                        if(xmlhttp.status == 200 || xmlhttp.status == 304 || xmlhttp.status == 0) {
                            callback(xmlhttp.responseText,path);
                        } else {
                            callback(null,path);
                        }
                    }
                    else
                    {
                        callback(null,path);
                    }
                }
            };
            xmlhttp.open("GET",path,true);
            xmlhttp.send(null);
        }
        else
        {
            return "Your browser does not support XMLHTTP.";
        }
        return path;
    }
    window.setWXInitCallback = function (callback) {
        initCallback = callback;
    };
    var initConfig = function(callback) {
        wx.config({
            debug: false,
            appId: 'wxf8884f6b1d84257d',
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
            };
            if(initCallback) {
                initCallback();
            }
        });
    }
    window.getShareInfo = function(url, callback) {
        if(url == null) {
            url = window.location.href;
        }
        var signUrl = encodeURIComponent(window.location.href.split('#')[0]);
        // var mUrl = window.location.protocol+'//sfs.visualbusiness.cn/SimpleServer/signature_q?appId=wxa0c7da25637df906&url=' + signUrl;
        var mUrl = window.location.protocol+'//wx.vizen.cn/pay-service/signature/wx?appId=wxf8884f6b1d84257d&url=' + signUrl;
        _loadNetResourceByXMLHttpRequest(mUrl, function (response) {
            if(typeof response == "string") {
                response = JSON.parse(response);
            }
            if (response) {
                var dataJson = response.data;
                nonceStr = dataJson.nonceStr;
                timeStamp = dataJson.timestamp;
                signature = dataJson.signature;
                initConfig(callback);
            }
        });
    }
    window.getShareInfoSub = function(url, title, desc, imgUrl, success, cancel, callback) {
        if(url == null) {
            url = window.location.href;
        }
        var signUrl = encodeURIComponent(window.location.href.split('#')[0]);
        var mUrl =  window.location.protocol+'//wx.vizen.cn/pay-service/signature/wx?appId=wxf8884f6b1d84257d&url=' + signUrl;
        _loadNetResourceByXMLHttpRequest(mUrl, function (response) {
            if(typeof response == "string") {
                response = JSON.parse(response);
            }
            if (response) {
                var dataJson = response.data;
                nonceStr = dataJson.nonceStr;
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
        });
    }
})();