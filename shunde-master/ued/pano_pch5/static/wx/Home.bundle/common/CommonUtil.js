/**
 * Created by Drzhang on 2017/6/26.
 * 工具类
 */

require(function () {

    var commonUtil = window.commonUtil = {};

    /**
     * 渐入动画
     * @param view
     * @param duration
     * @param from
     * @param to
     * @param callback
     */
    commonUtil.fadeIn = function(view, duration, from, to, callback) {
        var fromA = from ? from : 0;
        view.setAlpha(fromA);
        if(!view.visible){
            view.setVisible(true);
        }
        var fadeInAnim = new com.appengine.animation.AlphaAnimation();
        fadeInAnim.fromAlpha = fromA;
        fadeInAnim.toAlpha = to || 1;
        fadeInAnim.duration = duration || 1000;
        fadeInAnim.callback = callback || null;
        view.startAnimation(fadeInAnim);
    }

    /**
     * 渐出动画
     * @param view
     * @param duration
     * @param from
     * @param to
     * @param callback
     */
    commonUtil.fadeOut = function(view, duration, from, to, callback) {
        var fromA = from ? from : 1;
        view.setAlpha(fromA);
        var fadeOutAnim = new com.appengine.animation.AlphaAnimation();
        fadeOutAnim.fromAlpha = fromA;
        fadeOutAnim.toAlpha = to || 0;
        fadeOutAnim.duration = duration || 1000;
        fadeOutAnim.callback = callback || null;  //该callback表示动画结束时的回调
        view.startAnimation(fadeOutAnim);
    }

    /**
     * 水平平移动画
     * @param view
     * @param duration
     * @param fromX
     * @param toX
     * @param timeInterplator
     * @param callback
     * @returns {com.appengine.UPTranslateAnimation}
     */
    commonUtil.translateXAnim = function(view, duration, fromX, toX, timeInterplator, callback) {
        if (!view.visible){
            view.setVisible(true);
        }
        var transX = new com.appengine.animation.TranslateAnimation();
        transX.fromTranslateX = fromX;
        transX.toTranslateX = toX;
        transX.duration = duration;
        transX.callback = callback || null;
        view.animation = transX;
        if(timeInterplator ){
            transX.timeInterplator = timeInterplator;
        }else{
            transX.timeInterplator = new com.appengine.animation.DecelerateInterpolator(2);
        }
        view.startAnimation(transX);
    }

    /**
     * 竖直平移动画
     * @param view
     * @param duration
     * @param fromX
     * @param toX
     * @param timeInterplator
     * @param callback
     */
    commonUtil.translateYAnim = function(view, duration, fromY, toY, timeInterplator, callback) {
        if (!view.visible){
            view.setVisible(true);
        }
        var transY = new com.appengine.animation.TranslateAnimation();
        transY.fromTranslateY = fromY;
        transY.toTranslateY = toY;
        transY.duration = duration;
        transY.callback = callback || null;
        if(timeInterplator){
            transY.timeInterplator = timeInterplator;
        }else{
            transY.timeInterplator = new com.appengine.animation.DecelerateInterpolator(2);
        }
        view.startAnimation(transY);
    }

    /**
     * 整体平移动画
     * @param view
     * @param duration
     * @param fromX
     * @param toX
     * @param fromY
     * @param toY
     * @param timeInterceptor
     * @param callback
     */
    commonUtil.translateAnim = function (view, duration, fromX, toX, fromY, toY, timeInterceptor, callback) {
        var animation = new com.appengine.animation.TranslateAnimation();
        animation.duration = duration || 1000;
        animation.fromTranslateX = fromX;
        animation.fromTranslateY = fromY;
        animation.toTranslateX = toX;
        animation.toTranslateY = toY;
        animation.timeInterplator = timeInterceptor || null;
        animation.callback = callback || null;
        view.startAnimation(animation);
    }

    /**
     * 水平缩放动画
     * @param view
     * @param duration
     * @param fromScaleX
     * @param toScaleX
     * @param timeInterceptor
     * @param callback
     */
    commonUtil.scaleXAnim = function (view, duration, fromScaleX, toScaleX, anchorX, anchorY, timeInterceptor, callback) {
        var animation = new com.appengine.animation.ScaleAnimation();
        animation.fromScaleX = fromScaleX;
        animation.toScaleX = toScaleX;
        if(anchorX > 0){
            anchorX = anchorX / view.measureWidth();
        }
        if(anchorY > 0){
            anchorY = anchorY / view.measureHeight();
        }
        view.setAnchorX(anchorX);
        view.setAnchorY(anchorY);
        animation.timeInterplator = timeInterceptor || null;
        animation.callback = callback || null;
        view.startAnimation(animation);
    }

    /**
     * 竖直缩放动画
     */
    commonUtil.scaleYAnim = function (view, duration, fromScaleY, toScaleY, anchorX, anchorY, timeInterceptor, callback) {
        var animation = new com.appengine.animation.ScaleAnimation();
        animation.fromScaleY = fromScaleY;
        animation.toScaleY = toScaleY;
        if(anchorX > 0){
            anchorX = anchorX / view.measureWidth();
        }
        if(anchorY > 0){
            anchorY = anchorY / view.measureHeight();
        }
        view.setAnchorX(anchorX);
        view.setAnchorY(anchorY);
        animation.timeInterplator = timeInterceptor || null;
        animation.callback = callback || null;
        view.startAnimation(animation);
    }

    /**
     * 整体缩放动画
     */
    commonUtil.scaleAnim = function (view, duration, fromScaleX, toScaleX, fromScaleY, toScaleY,
                               anchorX, anchorY, timeInterceptor, callback) {
        var animation = new com.appengine.animation.ScaleAnimation();
        animation.fromScaleX = fromScaleX;
        animation.toScaleX = toScaleX;
        animation.fromScaleY = fromScaleY;
        animation.toScaleY = toScaleY;
        //if(anchorX > 0){
        //    anchorX = anchorX / view.measureWidth();
        //}
        //if(anchorY > 0){
        //    anchorY = anchorY / view.measureHeight();
        //}
        //view.setAnchorX(anchorX);
        //view.setAnchorY(anchorY);
        animation.timeInterplator = timeInterceptor || null;
        animation.callback = callback || null;
        view.startAnimation(animation);
    }

    /**
     * 获取网络接口数据
     * @param url
     * @param successCallBack
     * @param failCallBack
     */
    commonUtil.getHttpData = function(url, successCallBack, failCallBack) {
        var http = com.appengine.$;
        http.get(url, function (dataSource) {
            if (dataSource){
                console.log("drzhang", "get data success of url " + url);
                successCallBack(dataSource);
            }else{
                console.log("drzhang", "get data failed by http of url " + url);
                failCallBack();
            }
        });

    }

    /**
     * 增加cookies, 并设置cookie超时时间
     * @param name
     * @param value
     * @param expiredays
     */
    commonUtil.setCookie = function(name, value, time) {
        if(time){
            var exp = new Date();
            exp.setTime(exp.getTime() + time);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        } else {
            document.cookie = name + "=" + escape(value);
        }
    }

    /**
     * 获取Cookie
     * @param c_name
     * @returns {string}
     */
    commonUtil.getCookie = function(c_name) {
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

    /**
     * 删除Cookie
     * @param name
     */
    commonUtil.delCookie = function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }

    /**
     * 存储到本地
     * @param key
     * @param value
     */
    commonUtil.putToStorageByKey = function(key, value) {
        var storage = com.appengine.$;
        storage.putByKey(key, value);
    }

    /**
     * 从本地读取
     * @param key
     * @returns {*}
     */
    commonUtil.getFromStorageByKey = function(key) {
        var storage = com.appengine.$;
        var content = storage.getByKey(key);
        return content;
    }

    /**
     * 对象是否为空
     * @param object
     * @returns {boolean}
     */
    commonUtil.isEmpty  = function (object) {
        return typeof(object) == 'undefined' || object == null || object == "";
    };

})


