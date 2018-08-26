require(function(){
    var View = com.vizengine.view.View;
    var TextView = com.vizengine.view.TextView;
    var AlphaAnimation = com.vizengine.animation.AlphaAnimation;
    var TranslateAnimation = com.vizengine.animation.TranslateAnimation;
    var PanoAnimation = com.vizengine.animation.PanoAnimation;
    var DecelerateInterpolator = com.vizengine.animation.DecelerateInterpolator;
    var util = window.util = {};

    if(/shot.test.vb.com.cn/.test(window.location.href)) {  //测试环境

        util.baseUrl  = window.location.protocol+"//api.shot.test.vb.com.cn";

        util.qrCodeUrl = window.location.protocol + "//show.test.vb.com.cn/static/wx/index.html";


    } else if (/shot.vb.com.cn/.test(window.location.href)){   //正式环境

        util.baseUrl  = window.location.protocol + "//api.shot.vb.com.cn";

        util.qrCodeUrl = window.location.protocol + "//show.vb.com.cn/static/wx/index.html";

    } else if (/shot.test.vizen.cn/.test(window.location.href)) {

        util.baseUrl  = window.location.protocol+"//api.shot.test.vizen.cn";

        util.qrCodeUrl = window.location.protocol + "//show.test.vizen.cn/static/wx/index.html";

    } else if (/shot.vizen.cn/.test(window.location.href)) {

        util.baseUrl  = window.location.protocol+"//api.shot.vizen.cn";

        util.qrCodeUrl = window.location.protocol + "//show.vizen.cn/static/wx/index.html";

    } else {
        
         util.baseUrl  = window.location.protocol+"//api.shot.test.vb.com.cn";

         util.qrCodeUrl = window.location.protocol + "//show.test.vb.com.cn/static/wx/index.html";

        //util.baseUrl  = "http://localhost:8083";
    }

    util.preload = function() {
        var imageUrls = [];
        var callback = null;
        for(var i = 0 ; i < arguments.length; i++) {
            if(arguments[i] instanceof Function) {
                callback = arguments[i];
            } else {
                imageUrls.push(arguments[i]);
            }
        }
        if(!imageUrls.length){
            callback();
            return;
        }
        var loadedCount = 0;
        for(var i = 0 ; i < imageUrls.length; i++) {
            var imgEle = document.createElement("img");
            imgEle.src = imageUrls[i];
            imgEle.onload = function() {
                loadedCount++;
                if(loadedCount == imageUrls.length) {
                    callback();
                }
            }
        }
    }
    // 数组去重
    util.removeSameEle = function(arr){
        var n = {}, r = [], len = arr.length, val, type;
        for (var i = 0; i < len; i++) {
            val = arr[i];
            type = typeof val;
            if (!n[val]) {
                n[val] = [type];
                r.push(val);
            } else if (n[val].indexOf(type) < 0) {
                n[val].push(type);
                r.push(val);
            }
        }
        return r;
    }

    util.hideLoading = function(id) {
        if(!id){
            console.error("util.hideLoading's params error");
            return;
        }
        var loadingDiv = document.getElementById(id);
        loadingDiv.style.display = "none";
    }

    util.showLoading = function(id) {
        if(!id){
            console.error("util.showLoading's params error");
            return;
        }
        var loadingDiv = document.getElementById(id);
        loadingDiv.style.display = "block";
    }

    util.isAndroid = function(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        return isAndroid;
    }

    util.isIOS = function(){
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        return isIOS;
    }

    util.isEmptyObject = function(obj) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    }

    util.isUndefined = function (obj) {
        if(typeof (obj) == "undefined"){
            return true;
        }
        return false;
    }

    util.isArray = function(o){
        return Object.prototype.toString.call(o) === '[object Array]';
    }

    util.setCookie = function(name, value, time) {
        if(time){
            var exp = new Date();
            exp.setTime(exp.getTime() + time);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        } else {
            document.cookie = name + "=" + escape(value);
        }
    }

    util.getCookie = function(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    }

    util.delCookie = function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = util.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }

    util.tel = function(tel) {
        window.location.href = "tel:" + tel;
    }

    util.compareByPinyin = function(val1, val2) {
        val1 = val1.toLowerCase();
        val2 = val2.toLowerCase();
        var length = val1.length > val2.length ? val1.length : val2.length;
        // 依次比较字母的unicode码，相等时返回0，小于时返回-1，大于时返回1
        for (var i = 0; i < length; i++) {
            var differ = val1.charCodeAt(i) - val2.charCodeAt(i);
            if (differ == 0) {
                continue;
            } else {
                if (val1.charAt(i) == '_') {
                    return -1;
                }
                return differ;
            }
        }
        if (i == length) {
            return val1.length - val2.length;
        }
    }

    util.distanceFormat = function(dis, lan){
        // lan ? lan = "zh" : "en";
        var str;
        var mStr = lan ? 'm' : '米';
        var kmStr = lan ? 'km' : '公里';
        if(dis <= 1000){
            str = parseInt(dis) + mStr;
        }
        else if(dis > 1000 && dis < 100000){
            str = (dis/1000).toFixed(1)+ kmStr;
        }
        else{
            str = parseInt(dis/1000) + kmStr;
        }
        return str;
    }

    util.distanceFormat2 = function(dis, lan){
        // lan ? lan = "zh" : "en";
        var str;
        var mStr = lan ? 'm' : '米';
        var kmStr = lan ? 'km' : '公里';
        if(dis <= 1000){
            str = parseInt(dis) + mStr;
        }
        else if(dis > 1000 && dis < 100000){
            str = (dis/1000).toFixed(1)+ kmStr;
        }
        else{
            str = "大于999公里";
        }
        return str;
    }

    util.addEventHandler = function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            elmenet["on" + type] = handler;
        }
    }

    util.removeEventHandler = function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }

    util.changeDocumentTitle = function(title){
        var $body = $('body');
        document.title = title;
        var $iframe = $('<iframe src="/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($body);
    }

    // 以下方法均需要依赖第三方库
    // 依赖微信JSSDK
    util.nav = function(lat,lng,name,address){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == "micromessenger") {
            var lat = parseFloat(lat);
            var lng = parseFloat(lng);
            var isAndroid = util.isAndroid();
            var scale = isAndroid ? 14 : 11;
            try {
                if(wx) {
                    wx.openLocation({
                        latitude: lat,
                        longitude: lng,
                        name: name,
                        address: address,
                        scale: scale,
                        infoUrl: ""
                    });
                } else {
                    alert("调用地图失败");
                }
            }
            catch(e) {
                alert("调用地图失败");
            }
        } else {
            window.location.href = "//apis.map.qq.com/uri/v1/routeplan?type=drive&to="+name+"&tocoord="+lat+","+lng;
            // window.location.href = "//apis.map.qq.com/uri/v1/marker?marker=coord:" + lat+","+lng;
        }
    }

    // 请求数据 依赖jQuery
    util.http = function(){
        if(arguments.length < 2) {
            console.error("http request params error");
            return;
        }
        var url = arguments[0];
        var successFun;
        var errorFun = function(){console.log("http request error");};
        var async = true;

        if(arguments.length == 2){
            successFun = arguments[1];
        }
        else if(arguments.length == 3 && typeof arguments[1] == "function" && typeof arguments[2] == "function"){
            successFun = arguments[1];
            errorFun = arguments[2];
        }
        else if(arguments.length == 3 && typeof arguments[1] != "function" && typeof arguments[2] == "function"){
            async = arguments[1];
            successFun = arguments[2];
        }
        else {
            async = arguments[1];
            successFun = arguments[2];
            errorFun = arguments[3];
        }

        jQuery.ajax({
            type:"GET",
            async: async,
            url:url,
            xhrFields: {
                withCredentials: true
            },
            dataType:"json",
            success: successFun,
            error: errorFun
        });
    }

  util.httpGet = function (url, success, error) {
    jQuery.ajax({
      type: "get",
      async: false,
      url: url,
      dataType: "json",
      success: success,
      error: error
    });
  };

    util.postHttp = function(url,successCallback,errorCallback,data){
        jQuery.ajax({
            type:"POST",
            url:url,
            xhrFields: {
                withCredentials: true
            },
            data:data,
            dataType:"json",
            success: successCallback,
            error: errorCallback
        });
    }

    // 请求本地数据 依赖jQuery
    util.getLocalData = function(url, callback) {
        jQuery.getJSON(url, function (data) {
            callback(data);
        });
    }

    // 根据经纬度计算两点之间的距离 依赖vizengine库
    util.getDistance = function(fromLat, fromLon, toLat, toLon){
        var p1 = new LatLon(fromLat, fromLon);
        var p2 = new LatLon(toLat, toLon);
        var distance = p1.distanceTo(p2);
        return distance;
    }

    //解决横屏不支持问题 依赖vizengine库
    util.forbidScreen =  function(view) {
        window.addEventListener("orientationchange" ,function() {
            if (window.orientation === 180 || window.orientation === 0) {
                console.log('竖屏状态！');
                view.setVisible(false);
            }
            if (window.orientation === 90 || window.orientation === -90 ){
                console.log('横屏状态！');
                view.setVisible(true);
            }
        }, false);
    }

    // 依赖vizengine库
    util.disablePreventTouch = function (view) {
        view.dispatchTouch = function(e) {
            var ret = View.prototype.dispatchTouch.apply(view,arguments);
            if(view.isTouchInside(e)) {
                window.__preventDefault__ = false;
            }
            return ret;
        };
    }

    util.createVideoBox = function(rootView, option){
        if(!rootView || !rootView.addView || !option) return;
        var videoBoxId ="videoBox_"+parseInt(Math.random()*100);
        // var height     = 1;
        // if(util.isAndroid()) {
        //     height = 0.8;
        // }
        option.stretch_patch = option.stretch_patch || false;
        option.app_id = "1251448083";
        option.width  = rootView.frame.width;
        // option.height = option.height || rootView.frame.height * height;
        option.height = rootView.frame.height;
        var videoBox = View.parse({
                background:"#000000",
                alpha:0,
                children:[{
                    gravity:"center",
                    // height:"match "+height,
                    height:"match",
                    id:videoBoxId
                },{
                    id:"videoClose",
                    padding:"16dp",
                    height:"wrap",
                    width:"wrap",
                    gravity:"right",
                    children:[{
                        type:"ImageView",
                        width:"20dp",
                        height:"20dp",
                        src:"/images/close_b@2x.png"
                    }]
                }]
            });
        var videoClose = videoBox.$("videoClose");
        var videoCtn   = videoBox.$(videoBoxId);
        var centerIcon = videoBox.$("video_centerIcon");
        var iconBox    = videoBox.$("videoCtl_btn");

        videoClose._nativeView.div.style["zIndex"] = 99999;
        rootView.addView(videoBox);
        var video = new qcVideo.Player(videoBoxId, option);
        util.disablePreventTouch(videoCtn);
        videoBox.setOnClick(function(){return;});
        videoClose.setOnClick(function(){
            rootView.removeView(videoBox);
        });
        var anim = new AlphaAnimation();
            anim.fromAlpha = 0;
            anim.toAlpha   = 1;
            anim.duration  = 200;
            videoBox.setAlpha(0);
            videoBox.setVisible(true);
            videoBox.startAnimation(anim);
    }

    //pano动画 panoView, animData, callback
    util.startPanoAnimation = function (obj) {
        if(!obj || !obj.panoView){return};
        var panoView  = obj.panoView,
            toHeading = obj.toHeading,
            toPitch   = obj.toPitch,
            callback  = obj.callback,
            type      = obj.type;

        var fromHeading = panoView.getHeading()%360;
        if(fromHeading > 180){
            fromHeading = fromHeading - 360;
        }else if(fromHeading < -180){
            fromHeading = fromHeading + 360;
        }
        var fromPitch = panoView.getPitch()%360;

        var animation = new PanoAnimation();
        animation.fromHeading = fromHeading;
        animation.fromPitch = fromPitch;
        animation.fromFov = (panoView.panoViewInternal&&panoView.panoViewInternal._fov) || 100;

        var toHeading = toHeading%360;
        if(toHeading > 180){
            toHeading = toHeading - 360;
        }else if(toHeading < -180){
            toHeading = toHeading + 360;
        }
        //修改框架旋转bug
        if (toHeading - fromHeading > 180) {
            toHeading -= 360;
        }else if(toHeading - fromHeading <-180){
            toHeading +=  360;
        }
        animation.toHeading = toHeading;
        animation.toPitch = toPitch;
        switch(type){
            case 'enlarge':
                animation.toFov = 40;
                break;
            case 'shrink':
                animation.toFov = 140;
                break;
            case 'translation':
                animation.toFov = 80;
                break;
            case 'normal':
                animation.toFov = 100;
                break;
        }
        animation.enablePitch = true;
        animation.enableHeading = true;
        animation.enableFov     = true;
        animation.duration      = 1000;
        animation.timeInterplator = new com.appengine.animation.DecelerateInterpolator(2);
        animation.callback = function(){
            if(callback){callback();};
            setTimeout(function(){
                if(panoView.setFov){
                    panoView.setFov(100);
                }else{
                    panoView.panoViewInternal._setFov(100);
                }
            },150);
        };
        panoView.startAnimation(animation);
    }

    util.setOnClick = function(v, callback){
        if(!v) return;
        v.setOnClick(callback || function(){return;});
    }

    util.setOnClickUnenable = function(){
        if(!arguments.length) return;
        $.each(arguments, function(i, view) {
            if(view.setOnClick){
                view.setOnClick(function(){return;});
            }
        });
    }

    util.setVisibleTrue = function(){
        if(arguments.length){
            $.each(arguments, function(i, v){
                v.setVisible(true);
            });
        }
    }

    util.setVisibleFalse = function(){
        if(arguments.length){
            $.each(arguments, function(i, v){
                v.setVisible(false);
            });
        }
    }

    // 动画库
    util.transYAnim = function(){
        if(arguments.length < 4){
            console.error("util.transYAnim's params error");
            return;
        }
        var view = arguments[0];
        var duration = arguments[1];
        var fromY = arguments[2];
        var toY = arguments[3];
        var callback;
        var timeInterplator;
        if(arguments.length == 5 && typeof arguments[4] == "function"){
            callback = arguments[4];
        }
        else if(arguments.length == 5 && typeof arguments[4] != "function"){
            timeInterplator = arguments[4];
        }
        else if(arguments.length > 5){
            timeInterplator = arguments[4];
            callback = arguments[5];
        }
        view.setVisible(true);
        var transY = new TranslateAnimation();
        transY.fromTranslateY = fromY;
        transY.toTranslateY = toY;
        transY.duration = duration;
        transY.callback = callback || null;
        if(timeInterplator){
            transY.timeInterplator = new DecelerateInterpolator(2);
        }
        view.startAnimation(transY);
    }

    util.transXAnim = function(){
        if(arguments.length < 4){
            console.error("util.transXAnim's params error");
            return;
        }
        var view = arguments[0];
        var duration = arguments[1];
        var fromX = arguments[2];
        var toX = arguments[3];
        var callback;
        var timeInterplator;
        if(arguments.length == 5 && typeof arguments[4] == "function"){
            callback = arguments[4];
        }
        else if(arguments.length == 5 && typeof arguments[4] != "function"){
            timeInterplator = arguments[4];
        }
        else if(arguments.length > 5){
            timeInterplator = arguments[4];
            callback = arguments[5];
        }
        view.setVisible(true);
        var transX = new TranslateAnimation();
        transX.fromTranslateX = fromX;
        transX.toTranslateX = toX;
        transX.duration = duration;
        transX.callback = callback || null;
        if(timeInterplator){
            transX.timeInterplator = new DecelerateInterpolator(2);
        }
        view.startAnimation(transX);
    }

    util.fadeOut = function() {
        if(arguments.length < 2){
            console.error("util.fadeOut's params error");
            return;
        }
        var view = arguments[0];
        var duration = arguments[1];
        // var fromA = 1;
        var fromA = view.alpha || 1;
        var toA = 0;
        var callback;
        if(arguments.length == 3){
            callback = arguments[2];
        } else if(arguments.length == 4){
            fromA = arguments[2];
            toA = arguments[3];
        } else if(arguments.length > 4){
            fromA = arguments[2];
            toA = arguments[3];
            callback = arguments[4];
        }
        view.setAlpha(fromA);
        var hideAnim = new AlphaAnimation();
        hideAnim.fromAlpha = fromA;
        hideAnim.toAlpha = toA;
        hideAnim.duration = duration;
        hideAnim.callback = callback;
        view.startAnimation(hideAnim);
    }

    util.fadeIn = function() {
        if(arguments.length < 2){
            console.error("util.fadeIn's params error");
            return;
        }
        var view = arguments[0];
        var duration = arguments[1];
        var fromA = 0;
        var toA = 1;
        var callback;
        if(arguments.length == 3){
            callback = arguments[2];
        } else if(arguments.length == 4){
            fromA = arguments[2];
            toA = arguments[3];
        } else if(arguments.length > 4){
            fromA = arguments[2];
            toA = arguments[3];
            callback = arguments[4];
        }
        view.setAlpha(fromA);
        if(!view.visible){ view.setVisible(true); }
        var showAnim = new AlphaAnimation();
        showAnim.fromAlpha = fromA;
        showAnim.toAlpha = toA;
        showAnim.duration = duration;
        showAnim.callback = callback;
        view.startAnimation(showAnim);
    }

    util.fadeIn2 = function() {
        if(arguments.length < 2){
            console.error("util.fadeIn2's params error");
            return;
        }
        var view = arguments[0];
        var duration = arguments[1];
        var fromA = 0;
        var toA = 1;
        var callback;
        if(arguments.length == 3){
            callback = arguments[2];
        } else if(arguments.length == 4){
            fromA = arguments[2];
            toA = arguments[3];
        } else if(arguments.length > 4){
            fromA = arguments[2];
            toA = arguments[3];
            callback = arguments[4];
        }
        view.setAlpha(fromA);
        var showAnim = new AlphaAnimation();
        showAnim.fromAlpha = fromA;
        showAnim.toAlpha = toA;
        showAnim.duration = duration;
        showAnim.callback = callback;
        view.startAnimation(showAnim);
    }

    util.rotateYAnim = function(){
        if(arguments.length < 2){
            console.error("util.rotateAnim's params error");
            return;
        }
        var view = arguments[0];
        var duration = arguments[1];
        var fromY = 0;
        var toY = 90;
        var callback;
        var timeInterplator;
        if(arguments.length == 3){
            callback = arguments[2];
        }
        else if(arguments.length == 4){
            fromY = arguments[2];
            toY = arguments[3];
        }
        else if(arguments.length == 5 && typeof arguments[4] != "function"){
            fromY = arguments[2];
            toY = arguments[3];
            timeInterplator = arguments[4];
        }
        else if(arguments.length == 5 && typeof arguments[4] == "function"){
            fromY = arguments[2];
            toY = arguments[3];
            callback = arguments[4];
        }
        else if(arguments.length > 5){
            fromY = arguments[2];
            toY = arguments[3];
            timeInterplator = arguments[4];
            callback = arguments[5];
        }
        var rotateY = new RotateAnimation();
        rotateY.fromRotateY = fromY;
        rotateY.toRotateY = toY;
        rotateY.duration = duration;
        rotateY.callback = callback;
        if(timeInterplator){
            rotateY.timeInterplator = new DecelerateInterpolator(2);
        }
        view.startAnimation(rotateY);
    }
    // tip
    util.toastTip = function(parentView, msg, time){
        var tag = 1;
        var time = time || 1000;
        $.each(parentView.subViews, function(index, view){
            if(view.toastTip){
                tag = 0;
                view.subViews[1].setText(msg);
                setTimeout(function(){
                    util.fadeOut(view, 300, 1, 0, function(){
                        parentView.removeView(view);
                    });
                }, time);
                return false;
            }
        });
        if(tag){
            var view = new View();
                view.setWidth("wrap");
                view.setHeight("40dp");
                view.setClipToBounds("true");
                view.setBorderCorner('2dp');
                view.setGravity("center");
                view.toastTip = true;

            var view1 = new View();
                view1.setBackground("#000000");
                view1.setAlpha(0.4);

            var view2 = new TextView();
                view2.setPaddingLeft('20dp');
                view2.setPaddingRight('20dp');
                view2.setFontSize('14dp');
                view2.setWidth("wrap");
                view2.setFontColor('#ffffff');
                view2.setContentGravity('center');
                view2.setText(msg);

                view.addView(view1);
                view.addView(view2);
                parentView.addView(view);
                setTimeout(function(){
                    util.fadeOut(view, 300, 1, 0, function(){
                        parentView.removeView(view);
                    });
                }, time);
        }
    }

    //计算两个POI之间的距离
    util.poiToMarkerDistance = function(tarPoi,curPoi){
        var distance = "";
        if(!tarPoi || !curPoi) return distance;
        if(tarPoi.poi_name == curPoi.poi_name) return distance;
        distance = util.lanDistance({
            lat1:tarPoi.lnglat.lat,
            lng1:tarPoi.lnglat.lng,
            lat2:curPoi.lnglat.lat,
            lng2:curPoi.lnglat.lng
        })
        distance = parseInt(distance);
        return distance;
    }

    //计算连个不同经纬度点之间的距离
    util.lanDistance = function(obj){
        var lat1 = obj.lat1,
            lng1 = obj.lng1,
            lat2 = obj.lat2,
            lng2 = obj.lng2;
        var EARTH_RADIUS = 6378137.0;    //单位M
        var PI = Math.PI;
        var getRad = function(d){
            return d*PI/180.0;
        }
        var radLat1 = getRad(lat1);
        var radLat2 = getRad(lat2);

        var a = radLat1 - radLat2;
        var b = getRad(lng1) - getRad(lng2);

        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s*EARTH_RADIUS;
        s = Math.round(s*10000)/10000.0;
        return s;
    }

    //对POI数组进行距离排序-默认为升续
    util.sortObjArr = function(arr){
        var _arr = arr.sort(function(cur,next){
            return parseFloat(cur.distance) - parseFloat(next.distance);
        });
        return _arr;
    };


});
