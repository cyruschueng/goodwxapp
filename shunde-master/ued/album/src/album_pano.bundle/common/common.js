(function(jq){
    httpGet = function (url, success, error) {
        $.ajax({
            type: "get",
            async: false,
            url: url,
            dataType: "json",
            success: success,
            error: error
        });
    };
    httpPost = function (url, params, success, error) {
        $.ajax({
            type: "post",
            data: params,
            url: url,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: success || null,
            error: error || null
        });
    };
    //设置微信title
    setWechartTitle = function (title) {
        var $body = jQuery('body');
        document.title = title;
        var $iframe = jQuery("<iframe style='display:none;'></iframe>");
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 50);
        }).appendTo($body);
    };
    //获取url的参数
    getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
    };
    //动画
    translateYAnimation = function(v, fromTY, toTY, duration, callback){
        var animation = new com.appengine.animation.TranslateAnimation();
        animation.timeInterplator = new com.appengine.animation.DecelerateInterpolator(2);
        animation.fromTranslateY = fromTY;
        animation.toTranslateY = toTY;
        animation.duration = duration;
        animation.callback = callback;
        v.startAnimation(animation);
    };
    alphaAnimation = function(v,fromAlpha,toAlpha,duration,callback){
        var animation = new com.appengine.animation.AlphaAnimation();
        animation.fromAlpha = fromAlpha;
        animation.toAlpha = toAlpha;
        animation.duration = duration;
        animation.callback = callback;
        v.startAnimation(animation);
    };
    scaleAnimation = function (v,fromScale, toScale, duration,callback) {
        var animation = new com.appengine.animation.ScaleAnimation();
        animation.fromScaleX = fromScale;
        animation.toScaleX = toScale;
        animation.duration = duration;
        animation.callback = callback;
        v.startAnimation(animation);
    };
    collectData = function(type, id){
        var host = '//shunde.vizen.cn/shunde/stat/'
        if (type === 'pano') {
            httpPost(host + 'reportViewPano', {
                panoId: id
            })
        } else {
            httpPost(host + 'reportViewPanoAblum', {
                panoAlbumId: id
            })
        }
    }
})($);