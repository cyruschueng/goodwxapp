define('module/weixinLog', [
    'common/interface',
    'common/util',
    'module/cookie',
], function(inter, util,cookie){
    var openid = cookie.get("openid");
    // var openid = "oSsyJwCdEQ8WJr6Wz7wHqv2IstbQ";
    var exp = new Date(new Date().getTime() + 216000000);
    var args = util.location();
    var wxlogin = util.strFormat(inter.getApiUrl().wxlogin,[encodeURIComponent(window.location.href.replace(/[&]?openId=.+?(?=&|$)/,''))]);
    var wxSilentLogin = util.strFormat(inter.getApiUrl().wxSilentLogin,[encodeURIComponent(window.location.href.replace(/[&]?openId=.+?(?=&|$)/,''))]);
    var loginType = 0;
    // cookie.set("openid", openid, exp);
    if(args["openId"]){
        openid = args["openId"];
        cookie.set("openid", openid, exp);
        //防止分享链接携带openId
        var jumpUrl = location.href.replace(/[&]?openId=.+?(?=&|$)/,'');
        location.replace(jumpUrl);
        return;
    }
    if(cookie.get("needSave")){
        saveWxUser();
    }
    function saveWxUser (callback){
        util.setAjax(inter.getApiUrl().saveWxUser, {
            openid: openid
        }, function (json) {
            if (json.status != "0") {
                if(cookie.get("needSave") == 1){
                    window.location.href = wxlogin;
                }else{
                    window.location.href = wxSilentLogin;
                }
            }
            else{
                cookie.del("needSave");
                if(callback){
                    callback();
                }
            }
        }, function () {
            $.alert('服务器繁忙，请稍后再试。');
        },"GET");
    }
    return {
        isLogin: function(type){
            //type：1 授权登录，0 默认静默获取
            type = type ? type : 0;
            loginType = type;
            if(!openid){
                cookie.set("needSave", type, new Date(new Date().getTime() + 360000));
                if(type == 1){
                    window.location.href = wxlogin;
                }
                else{
                    window.location.href = wxSilentLogin;
                }
                return;
            }
        },
        saveWxUser: saveWxUser,
        getWxUser: function(callback){
            util.setAjax(inter.getApiUrl().getWxUserPOByWxId, {
                openid: openid
            }, function (json) {
                if (json.status != "0") {
                    if(loginType == 1){
                        window.location.href = wxlogin;
                    }else{
                        window.location.href = wxSilentLogin;
                    }
                }else{
                    if(!json.data.headImgUrl){
                        json.data.headImgUrl = 'http://web-10002033.cos.myqcloud.com/abchina/images/default-avatar_64.png'
                    }
                    else{
                        json.data.headImgUrl = json.data.headImgUrl.substring(0,json.data.headImgUrl.length-1)+'64'
                    }
                    if(callback){
                        callback(json.data)
                    }
                    // return json.data;
                }
            }, function () {
                $.alert('服务器繁忙，请稍后再试。');
            },"GET");
        }
    }
});