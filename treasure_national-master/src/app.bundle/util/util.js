/**
 * Created by Desmond on 2016/11/16.
 */
(function (jq) {
    var $ = com.appengine.$;
    var View = com.appengine.view.View;
    var TextView = com.appengine.view.TextView;
    var AnimationPano  = com.appengine.animation.PanoAnimation;
    var Animation      = com.appengine.animation.Animation;
    var RotateAnimation = com.appengine.animation.RotateAnimation;
    var AlphaAnimation = com.appengine.animation.AlphaAnimation;
    var TranslateAnimation = com.appengine.animation.TranslateAnimation;
    var DecelerateInterceptor = com.vizengine.animation.DecelerateInterceptor;

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
    window.CLIENT_TYPE = getClientType();//0：PC端， 1：H5，2：IOS， 3：Android。默认不区分渠道。
    //竖向的平移动画
    window.startTransYAnimation = function (view, fromY, toY, duration, callback,timeInterplator) {
        view.setVisible(true);
        var anim = new TranslateAnimation();
            anim.fromTranslateY = fromY;
            anim.toTranslateY   = toY;
            anim.duration       = duration;
            anim.timeInteplator = new DecelerateInterceptor(timeInterplator);
       if(callback){
            anim.callback = callback;
        };
        view.startAnimation(anim);
    };
    //横向的平移动画
    window.startTransXAnimation = function (view, fromX, toX, duration, callback,timeInterplator) {
        view.setVisible(true);
        var anim = new TranslateAnimation();
            anim.fromTranslateX = fromX;
            anim.toTranslateX = toX;
            anim.duration = duration;
            anim.timeInteplator = new DecelerateInterceptor(timeInterplator);
        if(callback){
            anim.callback = callback;
        };
        view.startAnimation(anim);
    };


    window.setAlternateTransXAnimation = function (view, fromX, toX, duration, callback,timeInterplator) {
        var anim = new Animation();
        anim.fromTranslateX = fromX;
        anim.toTranslateX = toX;
        anim.duration = duration;
        anim.timeInteplator = new DecelerateInterceptor(timeInterplator);
        anim.callback = function(){
            if(callback){callback();};
        };
        anim.animateFrame = function(v, pro){
            if(pro<0.5){
                v.setTranslateX(anim.fromTranslateX + (anim.toTranslateX - anim.fromTranslateX) * pro/0.5);
            }else{
                v.setTranslateX(anim.toTranslateX + (anim.fromTranslateX - anim.toTranslateX) * (pro - 0.5)/0.5);
            }
        }
        view.startAnimation(anim);

    };


    //alpha
    window.startAlphaAnimation = function (view, fromAlpha, toAlpha, duration, callback) {
        view.setVisible(true);
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

    //旋转动画
    window.setRotateAnimation = function (view, fromRotateZ, toRotateZ, duration, callback,repeatCount) {
        var anim = new RotateAnimation();
        anim.fromRotateZ = fromRotateZ;
        anim.toRotateZ = toRotateZ;
        anim.duration = duration;
        anim.repeatCount = repeatCount;
        anim.callback = function(){
            if(callback){callback();};
        };
        view.startAnimation(anim);

    };

    window.setAlternateRotateZAnimation = function (view, fromRotateZ, toRotateZ, duration, callback,repeatCount) {
        var anim = new Animation();
        anim.fromRotateZ = fromRotateZ;
        anim.toRotateZ = toRotateZ;
        anim.duration = duration;
        anim.repeatCount = repeatCount;
        anim.callback = function(){
            if(callback){callback();};
        };
        anim.animateFrame = function(v, pro){
            if(pro<0.5){
                v.setRotateZ(anim.fromRotateZ + (anim.toRotateZ - anim.fromRotateZ) * pro/0.5);
            }else{
                v.setRotateZ(anim.toRotateZ + (anim.fromRotateZ - anim.toRotateZ) * (pro - 0.5)/0.5);
            }
        }
        view.startAnimation(anim);

    };
    //y轴平移和alpha
    window.startTYAndApAnimation = function (view, fromY, toY, fromAlpha, toAlpha, duration, callback,timeInterplator) {
        view.setVisible(true);
        var animation = new Animation();
        animation.duration = duration;
        animation.animateFrame = function(view,progress) {
            if(2*progress*(toAlpha - fromAlpha) < 1){
                view.setAlpha(fromAlpha +  2*progress*(toAlpha - fromAlpha));
            }else{
                view.setAlpha(1);
            }
            view.setTranslateY(fromY +  progress*(toY - fromY));
        };
        if(callback){
            animation.callback = callback;
        };
        view.startAnimation(animation);
    };
    //pano动画 panoView, animData, callback
    window.startPanoAnimation = function (obj) {
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
            animation.duration      = obj.duration || 1000;
            animation.timeInterplator = obj.timeInterplator || new com.appengine.animation.DecelerateInterpolator(2);
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
    };

    window.httpGet = function (obj) {
        jq.ajax({
            url: obj.url,
            type: 'get',
            dataType: 'json',
            data: obj.data||{}
        }).done(function(json) {
            if (json.code == "0" || json.code == 0 || json.result == "0" || json.result == 0) {
                if(obj.callback){
                    obj.callback(json);
                };
            }else{
                if(obj.doneFail){
                    obj.doneFail();
                }else{
                    alert(json.msg);
                }
            }
        }).fail(function(res) {
            if(obj.fail){
                obj.fail();
            }else{
                alert(res.msg);
            }
        });
    };
    window.httpGet2 = function (obj) {
        jq.ajax({
            url: obj.url,
            type: 'get',
            dataType: 'json',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: obj.data||{}
        }).done(function(json) {
            if (json.status == "0" || json.status == 0 || json.status == "0" || json.status == 0) {
                if(obj.callback){
                    obj.callback(json);
                };
            }else{
                if(obj.doneFail){
                    obj.doneFail();
                }else{
                    alert(json.msg);
                }
            }
        }).fail(function(res) {
            if(obj.fail){
                obj.fail();
            }else{
                alert(res.msg);
            }
        });
    };

    window.isEmpty = function (object) {
        return typeof(object) == 'undefined' || object == null || object == "";
    };
    window.setImageSrc = function (imageView, src) {
        if (typeof(src) != 'undefined' && src != null && src != "") {
            imageView.setSrc(src);
        }
    };

    window.utilAudio = {}
    //audio
    utilAudio.audioPause = function(ended) {
        var audio = utilAudio.pluginAudio;
        if(!audio) return;
        if(!audio.paused){ // 正在播放中
            audio.pause();
            var tarAudio = utilAudio.getPluginIdCreater[utilAudio.pluginAudioId];
            if(utilAudio.audioStyleEx){
                utilAudio.audioStyleEx.call(tarAudio.view, "pause");
            }
        }
        if(ended){
            var tarAudio = utilAudio.getPluginIdCreater[utilAudio.pluginAudioId];
            if(utilAudio.audioStyleEx){
                utilAudio.audioStyleEx.call(tarAudio.view, "pause");
            }
        }
    };

    utilAudio.audioPlay = function(id){
        if(!id || !utilAudio.getPluginIdCreater || !utilAudio.getPluginIdCreater[id]) return;
        if(!utilAudio.pluginAudio) {
            utilAudio.initAudio();
        }
        var audio = utilAudio.pluginAudio;
        if(!audio.paused){ // 正在播放
            if(utilAudio.pluginAudioId == id){
                utilAudio.audioPause();
                return;
            } else { //非播放同一view
                utilAudio.audioPause();
                // return;
            }
        }
        var tarAudio = utilAudio.getPluginIdCreater[id];
        //pause状态
        if(utilAudio.pluginAudioId != id){
            var src = tarAudio.src;
                audio.setAttribute("src", tarAudio.src || "");
                utilAudio.audioStyleEx = tarAudio.callback || null;
        }
        audio.play();
        utilAudio.pluginAudioId = id;
        if(utilAudio.audioStyleEx){
            utilAudio.audioStyleEx.call(tarAudio.view, "play");
        }
    };

    utilAudio.initAudio = function(){
        var audio = document.createElement("audio");
            // audio.setAttribute("loop", "loop");
            // audio.setAttribute("preload", "auto");
        utilAudio.pluginAudio  = audio;
        audio.addEventListener("ended",function(){
            utilAudio.audioPause(true);
        });
    };

    utilAudio.getPluginAudioId = function(v, src ,call) {
        var res = {
            view:v || {},
            src:src,
            callback:call
        }
        if(!utilAudio.getPluginIdCreater) {
            utilAudio.getPluginIdCreater = [{}, res];
        } else {
            utilAudio.getPluginIdCreater.push(res);
        }
        return utilAudio.getPluginIdCreater.length-1;
    };

    utilAudio.getAudioType = function(){
        return {
            isPaused:(utilAudio.pluginAudio && !utilAudio.pluginAudio.paused)?false:true
        }
    };


    window.util = {};

    window.utilAlert  = (function(){
        var _alerts = [];
        var startEnterAni = function(view, callback){
            var ani = new Animation();
            ani.duration = 800;
            ani.timeInterplator = new com.appengine.animation.DecelerateInterpolator(2);
            ani.animateFrame = function(v, pro){
                v.setAlpha(pro);
                v.setTranslateY((1-pro)*30+"dp");
                if(pro == 1){
                    v.enterAniOver = true;
                }
            }
            ani.callback = function(){
                if(callback)callback(view);
            }
            view.startAnimation(ani);
        };
        var startHideAni = function(view, callback){
            if(view.hideAni) return;
            view.hideAni = true;
            var ani = new Animation();
            ani.duration = 800;
            ani.timeInterplator = new com.appengine.animation.DecelerateInterpolator(2);
            ani.animateFrame = function(v, pro){
                v.setAlpha(1-pro);
                v.setTranslateY(-pro*30+"dp");
            }
            ani.callback = function(){
                if(view.parentView){
                    view.parentView.removeView(view);
                }
                if(callback)callback(view);
            };
            view.startAnimation(ani);
        }
        return function(view, text){
            var _tv = new TextView();
                _tv.setFontColor("#ffffff");
                _tv.setFontSize("14dp");
                _tv.setWidth("wrap");
                _tv.setHeight("wrap");
                _tv.setPaddingTop("5dp");
                _tv.setPaddingBottom("5dp");
                _tv.setPaddingLeft("10dp");
                _tv.setPaddingRight("10dp");
                _tv.setBackground("#60000000");
                _tv.setAlpha(0);
                _tv.setText(text);
                _tv.setGravity("center");
                _tv.setClipToBounds(true);
                _tv.setBorderCorner("4dp");

                if(_alerts.length){
                    for(var i in _alerts){
                        var cur = _alerts[i];
                        if(cur.enterAniOver && !cur.hideAni){
                            clearTimeout(cur.aniTimeout);
                            startHideAni(cur);
                        }
                    }
                }
                startEnterAni(_tv, function(v){
                    v.aniTimeout = setTimeout(function(){
                        startHideAni(v);
                    }, 1500)
                });
            _alerts.push(_tv);
            view.addView(_tv);
        }
    })();
    window.utilConfirm = (function(){
        var _okCall = null;
        var _cancelCall = null;
        var confirmDom = View.parse({
            background:"#90000000",
            children:[{
                height:"wrap",
                width:"match 0.72",
                background:"#ccffffff",
                borderCorner:"8dp",
                clipToBounds:true,
                gravity:"center",
                layout:"vertical",
                children:[{
                    height:"wrap",
                    margin:"20 15 25 15",
                    layout:"vertical",
                    children:[{
                        id:"title",
                        type:"TextView",
                        fontSize:"17dp",
                        fontColor:"#000000",
                        height:"wrap",
                        contentGravity:"center"
                    },{
                        id:"content",
                        type:"TextView",
                        fontSize:"13dp",
                        fontColor:"#111111",
                        height:"wrap",
                        contentGravity:"center"
                    }]
                },{
                    height:"1dp",
                    background:"#C8C7CC",
                    scaleY:0.5,
                    anchorY:0.5
                },{
                    layout:"horizontal",
                    height:"44dp",
                    children:[{
                        id:"okBtn",
                        type:"TextView",
                        text:"是",
                        fontSize:"17dp",
                        fontColor:"#007AFF",
                        contentGravity:"center"
                    },{
                        width:"1dp",
                        background:"#C8C7CC",
                        scaleX:0.5,
                        anchorX:0.5
                    },{
                        id:"cancelBtn",
                        type:"TextView",
                        text:"否",
                        fontSize:"17dp",
                        fontColor:"#007AFF",
                        contentGravity:"center"
                    }]
                }]
            }]
        });
        confirmDom.setOnClick(function(){});
        confirmDom.$("okBtn").setOnClick(function(){
            if(_okCall)_okCall();
            confirmDom.parentView.removeView(confirmDom);
        })
        confirmDom.$("cancelBtn").setOnClick(function(){
            if(_cancelCall)_cancelCall();
            confirmDom.parentView.removeView(confirmDom);
        });
        return function(view, title, content, okCall , cancalCall){
            if(!view) return; 
            _okCall = okCall;
            _cancelCall = cancalCall;
            confirmDom.setAlpha(0);
            confirmDom.startAnimation(null);
            confirmDom.$("title").setText(title || "");
            confirmDom.$("content").setText(content || "");
            view.addView(confirmDom);
            startAlphaAnimation(confirmDom, 0, 1, 200);
        }
    })();


    util.isAndroid = function(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            return true;
        }else{
            return false;
        }
    };

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
            imgEle.onload = function() {
                loadedCount++;
                if(loadedCount == imageUrls.length) {
                    callback();
                }
            };
            imgEle.src = imageUrls[i];
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
    };
    //计算两经纬度点之间的距离
    util.lanDistance = function(obj){
        var lat1 = obj.lat1,
            lng1 = obj.lng1,
            lat2 = obj.lat2,
            lng2 = obj.lng2;
        var EARTH_RADIUS = 6378137.0;    //单位M
        var PI = Math.PI;
        var getRad = function(d){
            return d*PI/180.0;
        };
        var radLat1 = getRad(lat1);
        var radLat2 = getRad(lat2);
        
        var a = radLat1 - radLat2;
        var b = getRad(lng1) - getRad(lng2);
        
        var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
            s = s*EARTH_RADIUS;
            s = Math.round(s*10000)/10000.0;
        //return s.toFixed(1);
        return s;
    };
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
        console.log(arr);
        return
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

    //电话功能
    util.phoneTo = function(phone){
        if(!phone){return};
        util.dataCollect("phone_to_"+phone);
        $.callup(phone);
    };

    //防止事件分发
    util.disablePreventTouch = function (view) {
        view.dispatchTouch = function(e) {
            var ret = View.prototype.dispatchTouch.apply(view,arguments);
            if(view.isTouchInside(e)) {
                window.__preventDefault__ = false;
            }
            return ret;
        };
    };

    //数组祛重
    util.uniqArr = function (arr) {
            // var set = {};
            // for(var i = 0 ; i < arr.length; i++) {
            //     var ele = arr[i];
            //     var key = ele.column_name;
            //     set[key] = ele;
            // }
            // arr = [];
            // for(var key in set) {
            //     arr.push(set[key]);
            // }
            // return arr;
            // 遍历arr，把元素分别放入tmp数组(不存在才放)
            var tmp = new Array();
            for(var i in arr){
                //该元素在tmp内部不存在才允许追加
                if(tmp.indexOf(arr[i])==-1){
                    tmp.push(arr[i]);
                }
            }
            return tmp;
    };
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
    };
    util.singleSelect = function (fn, vArr, attrArr) {
        for(var i = 1, l = vArr.length; i < l; i++){
            fn(vArr[i], attrArr[1]);
        }
        fn(vArr[0], attrArr[0]);
    };
    util.setDocumentTitle = function(title){
            var $body = jq('body');  
                document.title= title;  
                var $iframe = jq('<iframe src="favicon.ico"><iframe>');  
                    $iframe.on('load',function(){  
                        setTimeout(function(){  
                            $iframe.off('load').remove();  
                        },0);  
                    }).appendTo($body);  
        };

    //调用qq的视屏播放

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

    // util.createVideoBox = function(rootView, option){
    //     if(!rootView || !rootView.addView || !option) return;
    //     var AlphaAnimation = com.appengine.animation.AlphaAnimation;
    //     var videoBoxId ="videoBox_"+parseInt(Math.random()*100);
    //     var height     = 1;
    //     if(CLIENT_TYPE == 3){
    //         height = 0.8;
    //     }
    //     option["stretch_patch"] = option["stretch_patch"] || false;
    //     option["app_id"] = option["app_id"] || "1251448083";
    //     option["width"]  = option["width"]  || rootView.frame.width;
    //     option["height"] = option["height"] || rootView.frame.height * height;
    //
    //     var videoBox = View.parse({
    //             background:"#000000",
    //             alpha:0,
    //             children:[{
    //                 gravity:"center",
    //                 height:"match "+height,
    //                 id:videoBoxId
    //             },{
    //                 id:"videoClose",
    //                 padding:"16dp",
    //                 height:"wrap",
    //                 width:"wrap",
    //                 gravity:"right",
    //                 children:[{
    //                     type:"ImageView",
    //                     width:"wrap",
    //                     height:"wrap",
    //                     src:"/home/images/close_b@2x.png"
    //                 }]
    //             }]
    //         });
    //     var videoClose = videoBox.$("videoClose");
    //     var videoCtn   = videoBox.$(videoBoxId);
    //     var centerIcon = videoBox.$("video_centerIcon");
    //     var iconBox    = videoBox.$("videoCtl_btn");
    //
    //     videoClose._nativeView.div.style["zIndex"] = 999;
    //     rootView.addView(videoBox);
    //     var video = new qcVideo.Player(videoBoxId, option);
    //     videoCtn.dispatchTouch = function(e) {
    //         var ret = View.prototype.dispatchTouch.apply(videoCtn,arguments);
    //         if(videoCtn.isTouchInside(e)) {
    //             window.__preventDefault__ = false;
    //         }
    //         return ret;
    //     }
    //     videoBox.setOnClick(function(){});
    //     videoClose.setOnClick(function(){
    //         rootView.removeView(videoBox);
    //     })
    //     var anim = new AlphaAnimation();
    //         anim.fromAlpha = 0;
    //         anim.toAlpha   = 1;
    //         anim.duration  = 200;
    //         videoBox.setAlpha(anim.fromAlpha);
    //         videoBox.setVisible(true);
    //         videoBox.startAnimation(anim);
    // };

    //导航 -- 微信浏览器导航
    util.nav_weixin = function (lat,lng,name,address) {
        util.dataCollect("navi_to_"+name+"_"+address);
        var ua = navigator.userAgent.toLowerCase();
        function openMap(lat,lng,name,address) {
            console.log(lat+","+lng+","+name+","+address);
            try {
                if(wx) {
                    wx.openLocation({
                        latitude: lat,
                        longitude: lng,
                        name: name,
                        address: address,
                        scale: 14,
                        fail: function(err){
                            alert(JSON.stringify(err))
                        }
                    })
                } else {
                    alert("调用地图失败");
                }
            }
            catch(e) {
                alert("调用地图失败l");
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