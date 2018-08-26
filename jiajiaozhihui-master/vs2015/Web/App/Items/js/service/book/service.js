app.factory('initService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var deferred = $q.defer();
    var _init = function () {
        var p = getQueryString("o");
        var url = "http://161s5g6007.51mypc.cn/app/appstart/book/Resolver.ashx"
        var data = { o: p, url: window.location.href };
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
            localStorageService.set("baseinfo", response);
            wxconfig(response);
            //hideMenuItems();
        }).error(function (err, status) {
            deferred.reject(err);
            localStorageService.clearAll();
        });
        return deferred.promise;
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    function wxconfig(res) {
        wx.config({
            debug: true,
            appId: res.info.jsSdk.appId,
            timestamp: res.info.jsSdk.timestamp,
            nonceStr: res.info.jsSdk.nonceStr,
            signature: res.info.jsSdk.signature,
            jsApiList: ['getLocation', 'hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'openAddress', 'previewImage', 'uploadImage']
        });
    };
    
    return {
        init: _init
    }
}]);

app.factory('cacheService', ['localStorageService', function (localStorageService) {
    var info = localStorageService.get("baseinfo");
    return {
        base: localStorageService.get("baseinfo")
    }
}]);

app.factory('commonService', ['seSettings', 'cacheService', 'localStorageService', function (seSettings, cacheService, localStorageService) {
    var data = cacheService.base.info;
    var remark = {};
    if (data.remark != "") remark = JSON.parse(data.remark);
    return {
        /*应用Id*/
        appId: data.appId,
        /*当前用户信息*/
        openId: data.openId,
        nickName: data.wxUserInfo.nickName,
        headImgUrl: data.wxUserInfo.headImgUrl,
        
        /*分享者*/
        share: data.sharer,
        /*微信用户信息*/
        wxUserInfo: data.wxUserInfo,
        /*服务器地址*/
        serviceUrl: seSettings.config.serviceUrl,
        /*客户端地址*/
        clientUrl: seSettings.config.clientUrl,
        /*分享作品时的作品Id*/
        fileId: data.objectId,
    }
}]);

app.factory('wxShareService', ['seSettings', function (seSettings) {
    var _shareData = {
        title: '我免费领取了全套《四大名著》，快来为你的孩子也免费领一套吧！', // 分享标题
        desc: '我为孩子免费领取了《升级版中国儿童文学四大名著》，真的好书，快来让你的孩子也一起读吧！',
        groupTitle: '我为孩子免费领取了《升级版中国儿童文学四大名著》，真的好书，快来让你的孩子也一起读吧！',
        link: seSettings.config.serviceUrl + 'link/book/index.html',
        imgUrl: seSettings.config.clientUrl + '/app/items/imgs/jjzh.jpg', // 分享图标
        type: 'link',
        success: function () {
            
        },
        error: function () { }
    };

    var _default = function (obj) {
        var timelineData = _shareData;
        var appMessage = _shareData;
        if (obj !=undefined && typeof obj == "object") {
            timelineData = $.extend({}, _shareData, obj);
            appMessage = $.extend({}, _shareData, obj);
        }
        wx.ready(function () {
            wx.onMenuShareTimeline(timelineData);
            wx.onMenuShareAppMessage(appMessage);
        })
    };
    var _custom = function (title, desc, id, page,obj) {
        // 分享链接
        var link = commonService.serviceUrl + 'app/appstart/book/baseinfo.ashx?redirect_url=' + commonService.clientUrl + '/app/items/book.html?r=a=app001|h=' + page + '|id=' + id;
        var data = {
            title: title,
            desc: desc,
            groupTitle: title,
            link: link
        };
        var params = $.extend({}, _shareData, data);

        if (obj != undefined && typeof obj == "object") {
            params = $.extend({}, params, obj);
        }
        var timelineData = params;
        var appMessage = params;
        wx.ready(function () {
            wx.onMenuShareTimeline(timelineData);
            wx.onMenuShareAppMessage(appMessage);
        });
    };
    var _hideMenuItems= function() {
        wx.ready(function () {
            wx.hideMenuItems({
                menuList: [
                  'menuItem:share:appMessage', // 发送给朋友
                  'menuItem:share:qq', // 分享到QQ
                  'menuItem:share:weiboApp', // 分享到Weibo
                  'menuItem:share:facebook',//分享到FB
                  'menuItem:share:QZone', //分享到 QQ 空间
                  'menuItem:openWithQQBrowser',
                  'menuItem:openWithSafari'
                ],
                success: function (res) {

                },
                fail: function (res) {

                }
            });
        })
    };
    return {
        custom: _custom,
        default: _default,
        hideMenuItems: _hideMenuItems
    };
}]);

app.factory('attentionService', ['$http', '$q', 'commonService', function ($http, $q, commonService) {
    var deferred = $q.defer();
    var _addShsre = function () {
        var url = commonService.serviceUrl + "app/project/book/controller/WxShareController.ashx";
        var data = { openid: commonService.openId, bookid: 110 };
        console.log("shareService");
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    return {
        addShsre: _addShsre
    }
}]);

app.factory('storeService', ['$http', '$q', 'commonService', function ($http, $q, commonService) {
    
    var _getProductInfo = function () {
        var deferred = $q.defer();
        var url = commonService.serviceUrl + "app/project/product/controller/productcontroller.ashx?method=type";
        var data = { type: 20161220 };
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _hot = function (prodcutid) {
        var deferred = $q.defer();
        var url = commonService.serviceUrl + "app/project/book/controller/productcontroller.ashx";
        var data = { openid: commonService.openId, productid: prodcutid };
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    return {
        getProductInfo: _getProductInfo,
        hot:_hot
    }
}]);


app.factory('detailService', ['$http', '$q', 'commonService', function ($http, $q, commonService) {
    var deferred = $q.defer();
    var _getProductInfo = function (id) {
        var url = commonService.serviceUrl + "app/project/book/controller/ProductDetailController.ashx";
        var data = { id: id, openid: commonService.openId, ordertype: "20161221" };
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    return {
        getProductInfo: _getProductInfo
    }
}]);
app.factory('wxJsSdkService', ['$http', '$q', '$location', function ($http, $q, $location) {

    var _openAddress = function (f,u) {
        wx.openAddress({
            trigger: function (res) {
                console.log("用户开始拉出地址");
            },
            success: function (res) {
                console.log(res);
                if (typeof f == "function") {
                    f(res);
                }
                if (typeof u == "function") {
                    u(res);
                }
            },
            cancel: function (res) {
                console.log("用户取消拉出地址");
            },
            fail: function (res) {
                console.log(JSON.stringify(res));
            }
        });
    };
    var _pay = function (data,seccess, cancel,error, fail) {
        wx.chooseWXPay({
            timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
            package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: data.paySign, // 支付签名
            success: function (res) {
                // 支付成功后的回调函数
                seccess();
                /*
                if (arguments.length >= 2) {
                    if (typeof seccess == "function") {
                        seccess();
                    }
                }
                */
            }, cancel: function () {
                if (arguments.length >= 3) {
                    if (typeof cancel == "function") {
                        cancel();
                    }
                }
            }, error: function (res) {
                if (arguments.length >= 4) {
                    if (typeof error == "function") {
                        error();
                    }
                }
            }, fail: function (res) {
                if (arguments.length >= 5) {
                    if (typeof fail == "function") {
                        fail();
                    }
                }
            }
        })
    }
    return {
        openAddress: _openAddress,
        pay:_pay
    }
}]);

app.factory('payService', ['$http', '$q', 'commonService', function ($http, $q, commonService) {

    var _createOrder = function (outTradeNo, productId,number) {
        var deferred = $q.defer();
        var url = commonService.serviceUrl + "app/pay/service/OrderController.ashx";
        var data = { openId: commonService.openId, number: number, tradeno: outTradeNo, product_id: productId };
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _unifiedOrder = function (number, product_id) {
        var deferred = $q.defer();
        var url = commonService.serviceUrl + "app/pay/service/UnifiedOrderController.ashx";
        var data = { openId: commonService.openId, number: number, product_id: product_id };
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _latestAddress = function () {
        var deferred = $q.defer();
        var url = commonService.serviceUrl + "app/pay/service/AddressController.ashx?method=get";
        var data = { openId: commonService.openId };
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _updateLatestAddress=function(wxAddress){
        var deferred = $q.defer();
        var url = commonService.serviceUrl + "app/pay/service/AddressController.ashx?method=update";
        var data = { address: wxAddress, openId: commonService.openId };
        console.log(JSON.stringify(data));
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }, transformRequest: function () {
                return JSON.stringify(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        createOrder: _createOrder,
        unifiedOrder: _unifiedOrder,
        latestAddress: _latestAddress,
        updateLatestAddress: _updateLatestAddress
    }
}]);

app.factory('rewriteAddressService', ['$http', '$q', 'commonService', function ($http, $q, commonService) {
    var _updateAddress = function (wxAddress) {
        var deferred = $q.defer();
        var url = commonService.serviceUrl + "app/project/payorder/controller/OrderController.ashx?method=updateaddress";
        var data = { openId: commonService.openId, address: wxAddress };
        console.log(JSON.stringify(data));
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }, transformRequest: function () {
                return JSON.stringify(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        updateAddress: _updateAddress
    }
}]);

