// defined wx global config
window._WXGLOBAL_ = (function () {
    var _ENVIRONMENT = (function () {
        if (location.href.indexOf('h5.ichangtou.com') > -1) {
            return true;
        } else {
            return false;
        }
    })();
    var __debug__ = location
        .href
        .indexOf('localhost') > 0;
    var __TEST_API_TOKEN__ = 'XX:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e';
    var __FORMA_API_TOKEN__ = 'DE:_:w2qlJFV@ccOeiq41ENp><ETXh3o@aX8M<[_QOsZ<d8[Yz:NIMcKwpjtBk0e';
    var __API_TOKEN__ = _ENVIRONMENT ? __FORMA_API_TOKEN__ : __TEST_API_TOKEN__;
    var _FORMAL_API_DOMAIN = 'https://growth.ichangtou.com/';
    var _TEST_API_DOMAIN = 'https://geek.ichangtou.com/';
    var __API_URL_DOMAIN__ = _ENVIRONMENT
        ? _FORMAL_API_DOMAIN
        : _TEST_API_DOMAIN;
    var __TEST_APPID__ = 'wx7cf8dd5d80048e42';
    var __FORMA_APPID__ = 'wxd6c823882698f217';
    var __APPID__ = _ENVIRONMENT
        ? __FORMA_APPID__
        : __TEST_APPID__;
    var __API_URL_GROUP__ = {
        'wx_sign': 'wx/signature',
        'userinfo_authorization': 'wx/h5/info/login/OA_CTW',
        'base_login': 'wx/h5/base/login/OA_CTW',
        'get_order': 'payment/wx/jsapi/order'
    };
    Object.freeze(__API_URL_GROUP__);
    var __JSAPILIST__ = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'];

    var __SHARE_DESC__ = '新版react~';
    var __SHARE_TITLE__ = '我是标题';

    //支付AppID
    var _TEST_PAID_APPID = 'wx7cf8dd5d80048e42';
    var _FORMAL_PAID_APPID = 'wxd6c823882698f217';

    //支付APPID
    var __PAID_APPID__ = _ENVIRONMENT
        ? _FORMAL_PAID_APPID
        : _TEST_PAID_APPID;
    var __PAYPULLINGFLAG__ = false;
    var __COURSE_SUM__ = 1;
    return {
        __debug__: __debug__,
        __PAYPULLINGFLAG__: __PAYPULLINGFLAG__,
        __API_URL_DOMAIN__: __API_URL_DOMAIN__,
        __TEST_API_TOKEN__: __TEST_API_TOKEN__,
        __API_TOKEN__: __API_TOKEN__,
        __FORMA_API_TOKEN__: __FORMA_API_TOKEN__,
        __API_URL_GROUP__: __API_URL_GROUP__,
        __APPID__: __APPID__,
        __JSAPILIST__: __JSAPILIST__,
        __SHARE_DESC__: __SHARE_DESC__,
        __SHARE_TITLE__: __SHARE_TITLE__,
        __PAID_APPID__: __PAID_APPID__,
        __COURSE_SUM__: __COURSE_SUM__
    };
})(window);

Object.freeze(window._WXGLOBAL_);

var WXSDK = {};
WXSDK.InitWxApi = function () {
    window.sessionStorage.removeItem('wx-share-ready');
    if (!WXSDK._getUrlPara('code')) {
        WXSDK._redirectToBaseInfo();
    } else {
        
        WXSDK
            ._getUserInfoFromServer()
            .then(function (response) {
                var data = response.text();
                data.then(function (resdata) {
                    if (!resdata || !JSON.parse(resdata).userId) {
                        WXSDK._redirectToUserInfo();
                        return true;
                    } 
                    var data = JSON.parse(resdata)
                    var userInfo = {
                        userId: data.userId,
                        sessionId: data.sessionId,
                        openId: data.openId,
                        nickName: data.nickName,
                        headImage: data.headImage,
                        payOpenId: data.payOpenId,
                        subscribe: data.subscribe
                    };

                    if (userInfo.nickName && userInfo.nickName.length > 10) {
                        userInfo.nickName = userInfo
                            .nickName
                            .substr(0, userInfo.nickName.length - 6);
                    }
                    sessionStorage.setItem('wx-user-info', JSON.stringify(userInfo));
                    WXSDK._isWeiXin() && WXSDK
                    ._signWxApi()
                    .then(function (response) {
                        var date = response.json();
                        date.then(function (date) {
                            wx.config({appId: window._WXGLOBAL_.__APPID__, timestamp: date.timestamp, nonceStr: date.nonceStr, signature: date.signature, jsApiList: window._WXGLOBAL_.__JSAPILIST__});
                            wx.ready(function () {
                                // WXSDK.shareConfig();
                                window.sessionStorage.setItem('wx-share-ready', 'true');
                                dispatchEvent(new CustomEvent('_dove_FetchEvent', {
                                    bubbles: true,
                                    cancelable: false,
                                    detail: {
                                        type: '_dove_CustomEvent',
                                        info: 'hahaha'
                                    }
                                }));
                            })
                            wx.error(function (res) {
                                console.log(res);
                            });
                        });
                    });
                })
            }, function () {
                WXSDK._redirectToUserInfo();
            })
    }
};

WXSDK._getUserInfoFromServer = function () {
    // inject vinda
    var code = WXSDK._getUrlPara('code');
    var jsonData = JSON.stringify({'code': code});
    var APIUrl = WXSDK._getAPIUrl('base_login');
    if (WXSDK._getUrlPara('isuserinfo')) {
        APIUrl = WXSDK._getAPIUrl('userinfo_authorization');
        jsonData = JSON.stringify({'code': code, 'channel': '31'});
    }
    return fetch(APIUrl, {
        method: "POST",
        body: jsonData,
        headers: {
            "Accept": "application/json",
            "X-iChangTou-Json-Api-Token": window._WXGLOBAL_.__API_TOKEN__,
            "Content-Type": "application/json;charset=utf-8"
        }
    });
}
WXSDK._getAppId = function () {
    return window._WXGLOBAL_.__APPID__;
};
WXSDK._getPoundSignUrl = function () {
    return location
        .href
        .split('#')[1];
};
WXSDK._getHtmlUrl = function () {
    return location.protocol + "//" + location.host + location.pathname;
};
WXSDK._getCurrHtmlUrl = function () {
    if (location.href.indexOf('code=') !== -1) {
        return location.href.split('code=')[0].split('&')[0];
    } else {
        return location.href;
    }
}
WXSDK.shareConfig = function () {
    var USER_INFO = JSON.parse(sessionStorage.getItem('wx-user-info'));

    var imgUrl = USER_INFO.headImage,

        link = WXSDK._getShareUrl(),

        desc = window._WXGLOBAL_.__SHARE_DESC__,

        title = window._WXGLOBAL_.__SHARE_TITLE__;

    if (!imgUrl) {
        imgUrl = 'http://h5test.ichangtou.com.cn/minic/shareLogo.png';
    }
    var timelineOpt = {
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                //'朋友圈'
                WXSDK._onShareSuccess();
            },
            cancel: function () {
                WXSDK._onShareFailure();
            }
        },
        messageOpt = {
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                //'消息'
                WXSDK._onShareSuccess();
            },
            cancel: function () {
                WXSDK._onShareFailure();
            }
        },
        QQOpt = {
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                //'QQ'
                WXSDK._onShareSuccess();
            },
            cancel: function () {
                WXSDK._onShareFailure();
            }
        },
        weiboOpt = {
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function () {
                //微博
                WXSDK._onShareSuccess();
            },
            cancel: function () {
                WXSDK._onShareFailure();
            }
        };

    wx.onMenuShareTimeline(timelineOpt);
    wx.onMenuShareAppMessage(messageOpt);
    wx.onMenuShareQQ(QQOpt);
    wx.onMenuShareWeibo(weiboOpt);

};

WXSDK._onShareSuccess = function () {
};

WXSDK._onShareFailure = function () {
    console.log('分享失败')
};

WXSDK._getShareUrl = function () {
    var userInfo = JSON.parse(sessionStorage.getItem('wx-user-info'));
    return WXSDK._getHtmlUrl() + "?share=" + userInfo.userId + "#" + WXSDK._getPoundSignUrl();
};

WXSDK.wechatPay = function () {
    var userInfo = JSON.parse(sessionStorage.getItem('wx-user-info'));
    if (window._WXGLOBAL_.__PAYPULLINGFLAG__) {
        //如果正在拉取支付数据，阻止，避免重复请求
        setTimeout(function () {
            window._WXGLOBAL_.__PAYPULLINGFLAG__ = false;
        }, 3000);
    }
    var price = 1;
    if (price) {
        WXSDK._getOrder(userInfo.userId, price);
    } else {
        console.log('支付失败，获取成本价格为空');
    }

};

WXSDK._getOrder = function (userId, sum) {
    if (window._WXGLOBAL_.__PAYPULLINGFLAG__) {
        return;
    }
    if (!userId) {
        console.log('没有用户信息');
        return;
    }
    var userInfo = JSON.parse(sessionStorage.getItem('wx-user-info'));
    if (!sum) {
        sum = window._WXGLOBAL_.__COURSE_SUM__;
    }
    var jsonData = JSON.stringify({
        "body": '商品成本费',
        "deal": {
            "items": [
                {
                    dealType: 102, //交易类型
                    itemId: 2,
                    mchantType: 11, //商品类型
                    misc: '',
                    price: sum
                }
            ]
        },
        "openId": userInfo.payOpenId && userInfo
            .payOpenId
            .toString(),
        "sum": sum
    });
    var apiUrl = WXSDK._getAPIUrl('get_order');
    window._WXGLOBAL_.__PAYPULLINGFLAG__ = true;
    return fetch(apiUrl, {
            method: "POST",
            body: jsonData,
            headers: {
                "Accept": "application/json",
                "X-iChangTou-Json-Api-Token": window._WXGLOBAL_.__API_TOKEN__,
                "Content-Type": "application/json;charset=utf-8",
                "X-iChangTou-Json-Api-User": userInfo.userId,
                "X-iChangTou-Json-Api-Session": userInfo.sessionId
            }
        }).then(function (response) {
        response
            .json()
            .then(function (data) {
                sessionStorage.setItem('wx-user-pay', JSON.stringify(data));
                WXSDK._pay();
            })
    })
        .catch(function (data) {
            console.log('请求微信支付失败', data);
        })
};

WXSDK._pay = function () {

    var data = JSON.parse(sessionStorage.getItem('wx-user-pay'));
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', WXSDK._pay, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', WXSDK._pay);
            document.attachEvent('onWeixinJSBridgeReady', WXSDK._pay);
        }
    } else {
        WXSDK._onBridgeReady(data);
    }
};

WXSDK._onBridgeReady = function () {
    var param = {
        "appid": window._WXGLOBAL_.__PAID_APPID__,
        "timeStamp": data
            .timeStamp
            .toString(),
        "nonceStr": data.nonceStr,
        "package": ("prepay_id=" + data.prepayId.toString()),
        "signType": "MD5",
        "paySign": data.paySign
    };
    WeixinJSBridge.invoke('getBrandWCPayRequest', param, function res() {
        //标记请求支付完成
        window._WXGLOBAL_.__PAYPULLINGFLAG__ = false;
        if (res.err_msg == "get_brand_wcpay_request:ok") {
            //支付成功
            console.log('支付成功')
        } else {
            //取消支付
            console.log('支付失败')

        }
    });
};
WXSDK._getAPIUrl = function (type) {
    return WXSDK._getAPIDomain() + window._WXGLOBAL_.__API_URL_GROUP__[type];
};

WXSDK._getAPIDomain = function () {
    return window._WXGLOBAL_.__API_URL_DOMAIN__;
};

WXSDK._redirectToBaseInfo = function () {
    if (window._WXGLOBAL_.__debug__ || !WXSDK._isWeiXin()) {
        return;
    }
    var code = WXSDK._getUrlPara('code');
    var redirectUri = WXSDK._getRedirectUri(false),
        scope = 'snsapi_base'; //snsapi_userinfo;
    sessionStorage.removeItem('userInfoErrCounter');
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + WXSDK._getAppId() + '&redirect_uri=' + redirectUri + '&response_type=code&scope=' + scope + '&state=new#wechat_redirect';
    window.location.href = url;
};
WXSDK._getRedirectUri = function (isUserInfo) {
    var redirectUri = WXSDK._getCurrHtmlUrl(),
        prefix = '?';
    if (!isUserInfo) {
        //区分baseInfo和userInfo
        prefix = '?';
        if (redirectUri.indexOf('?') !== -1) {
            redirectUri = redirectUri + '&isuserinfo=1'
        } else {
            redirectUri = redirectUri + prefix + 'isuserinfo=1';
        }
    }
    var code = WXSDK._getUrlPara('code');
    return encodeURIComponent(redirectUri);
};

WXSDK._redirectToUserInfo = function () {
    if (!WXSDK._isWeiXin()) {
        return;
    }
    var redirectUri = WXSDK._getRedirectUri(true),
        scope = 'snsapi_userinfo'; //snsapi_userinfo

    var errCounter = 0;
    if (sessionStorage.getItem('userInfoErrCounter')) {
        errCounter = parseInt(sessionStorage.getItem('userInfoErrCounter'));
    }
    if (errCounter > 3) {
        sessionStorage.removeItem('userInfoErrCounter');
        return;
    } else {
        sessionStorage.setItem('userInfoErrCounter', (errCounter + 1).toString());
    }
    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + WXSDK._getAppId() + '&redirect_uri=' + redirectUri + '&response_type=code&scope=' + scope + '&state=minic#wechat_redirect';

    window.location.href = url;
};
WXSDK._getUrlPara = function (key) {
    var href = location.href,
        res = href.split(key + '=');
    if (res[1]) {
        res = decodeURIComponent(res[1].split('&')[0]);
    } else {
        res = null;
    }
    return res;
};

WXSDK._signWxApi = function () {
    return fetch(WXSDK._getAPIUrl('wx_sign'), {
        method: "POST",
        body: JSON.stringify({"url": location.href.split('#')[0]}),
        headers: {
            "Accept": "application/json",
            "X-iChangTou-Json-Api-Token": window._WXGLOBAL_.__API_TOKEN__,
            "Content-Type": "application/json;charset=utf-8"
        }
    });

};
WXSDK._isWeiXin = function () {
    var ua = navigator
        .userAgent
        .toLowerCase();

    if (ua.match(/MicroMessenger/i) !== null && ua.match(/MicroMessenger/i)[0] === "micromessenger") {
        return true;
    } else {
        return false;
    }
};

Object.freeze(WXSDK);

window.onload = function () {
    WXSDK.InitWxApi()
}