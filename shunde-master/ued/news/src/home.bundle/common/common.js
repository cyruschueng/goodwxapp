/**
 * Created by Desmond on 2016/11/16.
 */
(function (jq) {
    var $ = com.appengine.$;
    var View = com.appengine.view.View;
    var AnimationSet   = com.appengine.animation.AnimationSet;
    var AnimationPano  = com.appengine.animation.PanoAnimation;
    var Animation      = com.appengine.animation.Animation;
    var AlphaAnimation = com.appengine.animation.AlphaAnimation;
    var TranslateAnimation = com.appengine.animation.TranslateAnimation;

    /**
     * 0：PC端， 1：H5，2：IOS， 3：Android。默认不区分渠道。
     */
    var getClientType = function () {
        if(com.appengine.core.Platform.appengineAndroid) {
            return "3";
        }
        if(com.appengine.core.Platform.appengineiOS) {
            return "2";
        }
        if(com.appengine.core.Platform.mobile) {
            return "1";
        }
        return "0";
    };
    CLIENT_TYPE = getClientType();//0：PC端， 1：H5，2：IOS， 3：Android。默认不区分渠道。
    //竖向的平移动画
    startTransYAnimation = function (view, fromY, toY, duration, callback,timeInterplator) {
        view.setVisible(true);
        var anim = new TranslateAnimation();
            anim.fromTranslateY = fromY;
            anim.toTranslateY   = toY;
            anim.duration       = duration;
        if(callback){
            anim.callback = callback;
        };
        view.startAnimation(anim);
    };
    //横向的平移动画
    startTransXAnimation = function (view, fromX, toX, duration, callback,timeInterplator) {
        view.setVisible(true);
        var anim = new TranslateAnimation();
            anim.fromTranslateX = fromX;
            anim.toTranslateX = toX;
            anim.duration = duration;
        if(callback){
            anim.callback = callback;
        };
        view.startAnimation(anim);
    };
    //alpha
    startAlphaAnimation = function (view, fromAlpha, toAlpha, duration, callback) {
        var anim = new AlphaAnimation();
            anim.fromAlpha = fromAlpha;
            anim.toAlpha   = toAlpha;
            anim.duration  = duration;
        view.setAlpha(anim.fromAlpha);
        view.setVisible(true);
        anim.callback = function(){
            if(callback){callback();};
        };
        view.startAnimation(anim);
    };
    //pano动画 panoView, animData, callback
    startPanoAnimation = function (obj) {
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

        var animation = new AnimationPano();
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

    httpGet = function (obj) {
        jq.ajax({
            url: obj.url,
            type: 'get',
            dataType: 'json',
            data: obj.data||{}
        })
        .done(function(json) {
            if (json.code == "0" || json.code == 0 || json.result == "0" || json.result == 0) {
                if(obj.callback){
                    obj.callback(json);
                };
            }else{
                if(obj.callback){
                    obj.callback(null);
                };
            }
        })
        .fail(function(res) {
            if(obj.fail){
                obj.fail(null);
            };
        });
    };

    isEmpty = function (object) {
        return typeof(object) == 'undefined' || object == null || object == "";
    };
    setImageSrc = function (imageView, src) {
        if (typeof(src) != 'undefined' && src != null && src != "") {
            imageView.setSrc(src);
        }
    };

    var toastTimer = null;
    var toastArr   = [];
    toast = function (container, message, duration) {
        var _toast = {
            view:container,
            timer:null,
            tar:null//_toast.tar
        };
        _toast.tar = com.appengine.view.View.parse({
            width: "wrap",
            height: "wrap",
            gravity: "center",
            children: [
                {
                    background: "#000000",
                    alpha: 0.78,
                    borderCorner: "5dp",
                    clipToBounds: true
                },
                {
                    id: "tvMessage",
                    width: "wrap",
                    height: "wrap",
                    type: "TextView",
                    text: message,
                    paddingLeft: "20dp",
                    paddingRight: "20dp",
                    paddingBottom: "10dp",
                    paddingTop: "10dp",
                    fontSize: "16dp",
                    fontColor: "#f1f1f1",
                    contentGravity: "center"
                }
            ]
        });
        _toast.view.addView(_toast.tar);
        showAlphaAnimation(_toast.tar, 1, 300);
        if (_toast.timer) {
            clearTimeout(_toast.timer);
            _toast.timer = null;
        }
        _toast.timer = setTimeout(function () {
            _toast.timer = null;
            hideAlphaAnimation(_toast.tar, 1, 300, function () {
                _toast.view.removeView(_toast.tar);
            });
        }, duration);
        toastArr.push(_toast);
    };


    window.util = {};
    util.isAndroid = function(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            return true;
        }else{
            return false;
        }
    }
    util.setOnClick = function(v,func){
        if(!v) return;
        v.setOnClick(func || function(){});
    };
    //取得pois的x y单独存储
    util.getMarkersXY = function(data){
        var posArr = data.split(',');
        return {
            x:parseFloat(posArr[0]),
            y:parseFloat(posArr[1])
        };
    };
    //计算两点间距离
    util.distance = function(obj){
        return Math.sqrt(Math.pow(obj.x2-obj.x1,2)+Math.pow(obj.y2-obj.y1,2));
    }
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
    //对对象数组进行排序-默认为升续
    util.sortObjArr = function(arr){
        var _arr = arr.sort(function(cur,next){
                        return parseFloat(cur.distance) - parseFloat(next.distance);
                    });
        return _arr;
    };
    //统一选中一级子元素进行添加class操作---hover效果
    util.commonchoose = function(par){
        if(!par || !par.subViews || par.subViews.length<1){return};
        var sub = par.subViews;
        for(var i in sub){
            if(sub[i]._nativeView.div){
                sub[i]._nativeView.div.setAttribute("class","mouse_hover");
            };
        };
    };
    //数据收集
    util.dataCollect = function(arr){
        // console.log(arr)
        // return
        if(!arr){return};
        if(typeof(arr) == "string"){
            MtaH5.clickStat(arr);
            return;
        };
        for(var i =0 ,len = arr.length;i<arr;i++){
            MtaH5.clickStat(arr[i]);
        };
    };
    //从url中获取参数
    util.getParams = function(tar){
        var url = location.search;
        var res  = {};
        if(!url || url.length<=1) return res;
        url = url.substring(1);
        var _arr = url.split(/[&?]/);
        
        for(var i in _arr){
            var _cur = _arr[i];
            var _curArr = _cur.split("=");
            if(_curArr){
                var name = _curArr[0];
                    name = name.toLowerCase();
                res[name] = _curArr[1];
            }
        }
        if(tar) return res[tar];
        return res;
    };

    util.phoneTo = function(phone){
        if(!phone){return};
        util.dataCollect("phone_to_"+phone);
        $.callup(phone);
    }

    util.disablePreventTouch = function (view) {
        view.dispatchTouch = function(e) {
            var ret = View.prototype.dispatchTouch.apply(view,arguments);
            if(view.isTouchInside(e)) {
                window.__preventDefault__ = false;
            }
            return ret;
        };
    }
    
    //传入秒数 得到标准格式 时:分:秒
    util.getStandardTime = function(_second){
        if(!_second || _second<0) return "00:00:00";
        _second = parseInt(_second);
        var hour = 0,
            minu = 0,
            second = 0;
        hour = parseInt(_second / 3600) || hour;
        minu = parseInt((_second - hour * 3600)/60);
        var getTwo = function(val){
            if(!val) return "00";
            val +="";
            if(val.length == 1){
                return "0"+val;
            }
            return val;
        };
        second = _second%60;
        return getTwo(hour)+":"+getTwo(minu)+":"+getTwo(second);
    }
    util.createVideoBox = function(rootView, option,call){
        if(!rootView || !rootView.addView) return;
        var AlphaAnimation = com.appengine.animation.AlphaAnimation;
        var videoBoxId ="videoBox_"+parseInt(Math.random()*100);
        var height     = 1;
        if(util.isAndroid()){
            height = 0.8;
        }
        var videoBox = View.parse({
            background:"#000000",
            alpha:0,
            children:[{
                gravity:"center",
                height:"match "+height,
                id:videoBoxId
            },{
                padding:"16dp",
                height:"wrap",
                width:"wrap",
                gravity:"right",
                children:[{
                    width:"20dp",
                    height:"20dp",
                    clipToBounds:true,
                    gravity:"right",
                    children:[{
                        width:"match",
                        background:"#ffffff",
                        anchorX:0.5,
                        anchorY:0.5,
                        scaleX:1.2,
                        rotateZ:"45deg",
                        gravity:"center",
                        height:"1dp"
                    },{
                        height:"match",
                        anchorX:0.5,
                        anchorY:0.5,
                        scaleY:1.2,
                        rotateZ:"45deg",
                        background:"#ffffff",
                        gravity:"center",
                        width:"1dp"
                    }]
                }]
            }]
        })
        var videoClose = videoBox.subViews[1];
        var videoCtn   = videoBox.subViews[0];
        videoClose._nativeView.div.style["z-index"] = "999";
        videoBox.setOnClick(function(){});
        videoClose.setOnClick(function(){
            rootView.removeView(videoBox);
            if(call){
                call();
            }
        })
        videoCtn.dispatchTouch = function(e) {
            var ret = View.prototype.dispatchTouch.apply(videoCtn,arguments);
            if(videoCtn.isTouchInside(e)) {
                window.__preventDefault__ = false;
            }
            return ret;
        }
        rootView.addView(videoBox);

        if(!option) option = {};
        option["stretch_patch"] = option["stretch_patch"] || false; 
        option["app_id"] = option["app_id"] || "1251448083";
        option["width"]  = option["width"]  || rootView.frame.width;
        option["height"] = option["height"] || rootView.frame.height * height;

        // option["file_id"] = "14651978969303974790";
        var anim = new AlphaAnimation();
            anim.fromAlpha = 0;
            anim.toAlpha   = 1;
            anim.duration  = 200;
        videoBox.setAlpha(anim.fromAlpha);
        videoBox.setVisible(true);
        videoBox.startAnimation(anim);

        new qcVideo.Player(videoBoxId, option);
    }
    //导航 -- 微信浏览器导航函数
    util.nav_weixin = function (lat,lng,name,address) {
        util.dataCollect("navi_to_"+name+"_"+address);
        var ua = navigator.userAgent.toLowerCase();
        //打开微信地图
        function openMap(lat,lng,name,address) {
            console.log(lat+","+lng+","+name+","+address);
            // console.log(typeof(wx.openLocation));
            try {
                if(wx) {
                    wx.openLocation({
                        latitude: lat,
                        longitude: lng,
                        name: name,
                        address: address,
                        scale: 14,
                        infoUrl: ''
                    })
                } else {
                    alert("调用地图失败");
                }
            }
            catch(e) {
                alert("调用地图失败");
            }
        }
        if(ua.match(/MicroMessenger/i) == "micromessenger") {
            var lat = parseFloat(lat);
            var lng = parseFloat(lng);
            openMap(lat,lng,name,address);
        } else {
            window.location.href = "http://apis.map.qq.com/uri/v1/routeplan?type=drive&to="+name+"&tocoord="+lat+","+lng;
        };
    };
})($);

