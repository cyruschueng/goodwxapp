// wx share
(function(){
    var shareData = {
        link: 'http://mob.visualbusiness.cn/treasure_national-debug/index.html',
        title:"国家宝藏",
        desc: "让国宝活起来",
        imgUrl: "http://mob.visualbusiness.cn/treasure_national-debug/app.bundle/images/shareLogo.jpg"
    };
    var nonceStr;
    var timeStamp;
    var signature;
    var wxInitCall;
    var isFirst = true;
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
    var initConfig = function(callback) {
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
            };
            if(wxInitCall && isFirst){
                isFirst=false;
                wxInitCall();
            }
        });
    };
    window.setWXInitCallback = function(call){
        wxInitCall = call;
    }
    window.getShareInfo = function(url, callback) {
        if(window.parent != null && window.parent != window && window.parent.getShareInfo != null) {
            return window.parent.getShareInfo.apply(window.parent,arguments);
        }
        if(url == null) {
            url = window.location.href;
        }
        var signUrl = encodeURIComponent(window.location.href.split('#')[0]);
        var mUrl = 'http://sfs.visualbusiness.cn/SimpleServer/signature_q?appId=wxa0c7da25637df906&url=' + signUrl;
        _loadNetResourceByXMLHttpRequest(mUrl, function (response) {
            if (response) {
                var dataJson = eval("(" + response + ")");
                nonceStr = dataJson.noncestr;
                timeStamp = dataJson.timestamp;
                signature = dataJson.signature;
                initConfig(callback);
            }
        });
    }
    window.getShareInfoSub_callback = function(url, title, desc, imgUrl, success, cancel, callback) {
        if(window.parent != null && window.parent != window && window.parent.getShareInfoSub != null) {
            return window.parent.getShareInfoSub.apply(window.parent,arguments);
        }
        if(url == null) {
            url = window.location.href;
        }
        var signUrl = encodeURIComponent(window.location.href.split('#')[0]);
        var mUrl = 'http://sfs.visualbusiness.cn/SimpleServer/signature_q?appId=wxa0c7da25637df906&url=' + signUrl;

        _loadNetResourceByXMLHttpRequest(mUrl, function (response) {
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
        });
    }
})();


