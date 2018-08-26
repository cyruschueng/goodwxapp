app.factory('initService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var deferred = $q.defer();
    var _init = function () {
        var p = getQueryString("o");
        var url = "http://161s5g6007.51mypc.cn/app/appstart/Generalize/Resolver.ashx"
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
            debug:false,
            appId: res.info.jsSdk.appId,
            timestamp: res.info.jsSdk.timestamp,
            nonceStr: res.info.jsSdk.nonceStr,
            signature: res.info.jsSdk.signature,
            jsApiList: ['getLocation', 'scanQRCode','onMenuShareTimeline','onMenuShareAppMessage','chooseImage','previewImage','uploadImage']
        });
    };
    return {
        init: _init
    }
} ]);

app.factory('cacheService', ['localStorageService', function (localStorageService) {
    return {
        base: localStorageService.get("baseinfo"),
        user: localStorageService.get("userlogin")
    }
} ]);

app.factory('wxJsSdkService', [function () {
    var _image={
        localIds:[],
        current:'',
        urls:[],
        serverId:''
    };
    /*扫一扫*/
    var _scanQRCode = function (needResult, f) {
        wx.scanQRCode({
            needResult: needResult, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                f(result);
            }
        });
    };
    /*获取地理坐标*/
    var _getLocation = function (f) {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                if (typeof f == 'function') {
                    f(latitude, longitude);
                }
            }
        });
    };
    //分享朋友圈
    var _onMenuShareTimeline=function(data){
        wx.onMenuShareTimeline({
            title:data.title, // 分享标题
            link:data.link,// 分享链接
            imgUrl:data.imgUrl,// 分享图标
            success:function(res){

            },
            cancel:function(res){

            }
        });
    };
    //分享给朋友
    var _onMenuShareAppMessage=function(data){
        wx.onMenuShareAppMessage({
            title:data.title,// 分享标题
            link:data.link,// 分享链接
            desc:data.desc,// 分享描述
            imgUrl:data.imgUrl, // 分享图标
            type:data.type,// 分享类型,music、video或link，不填默认为link
            dataUrl:data.dataUrl,//如果type是music或video，则要提供数据链接，默认为空
            success:function(res){

            },
            cancel:function(res){

            }
        });
    };
    var _chooseImage=function(f){
        wx.chooseImage({
            count: 1,//默认9
            sizeType:['compressed'],// 可以指定是原图还是压缩图，默认二者都有 ['original', 'compressed']
            sourceType:['album','camera'],// 可以指定来源是相册还是相机，默认二者都有 ['album', 'camera']
            success:function(res){
                _image.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                if(typeof f =='function' ){
                    f(res.localIds[0]);
                }
            }
        });
    };
    var _previewImage=function(){
        wx.previewImage({
            current: _image.current, // 当前显示图片的http链接
            urls: _image.urls // 需要预览的图片http链接列表
        });
    };
    var _uploadImage=function(f){
        wx.uploadImage({
            localId: _image.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                _image.serverId = res.serverId; // 返回图片的服务器端ID
                if(typeof f =='function' ){
                    f(res);
                }
            }
        });
    };
    return {
        scanQRCode: _scanQRCode,
        getLocation: _getLocation,
        onMenuShareTimeline:_onMenuShareTimeline,
        onMenuShareAppMessage:_onMenuShareAppMessage,
        chooseImage:_chooseImage,
        previewImage:_previewImage,
        uploadImage:_uploadImage
    }
} ]);

app.factory('createService', ['$http','$q','cacheService',function($http,$q,cacheService) {
    var base = cacheService.base;
    var user = cacheService.user;

    var _uploadImg = function (imgServerId,validdate,title,catalogue, classname) {
        var deferred = $q.defer();
        var openId = base.info.wxUserInfo.openId;
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/Controller/MediaDataController.ashx"
        $http({
            method: 'GET',
            url: url,
            params:{
                imageMediaId: imgServerId,
                openid: openId,
                validdate: validdate,
                grouptype: user.id,
                title:title,
                catalogue:catalogue,
                classname:classname
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _init = function () {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/Controller/GroupContentController.ashx?method=init"
        $http({
            method: 'GET',
            url: url,
            params:{
                grouptype:user.id
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    return {
        init:_init,
        uploadImg:_uploadImg
    }

}]);

app.factory('loginService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var _login = function (accounts, password) {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/logincontroller.ashx"
        var data = { accounts: accounts, password: password };
        console.log(JSON.stringify(data));

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
            localStorageService.set('userlogin', response);
        }).error(function (err, status) {
            deferred.reject(err);
            localStorageService.clearAll();
        });
        return deferred.promise;
    };
    return {
        login:_login
    }
}]);
app.factory('homeService', ['$http', '$q', 'cacheService', function ($http, $q, cacheService) {
    var user = cacheService.user;
    var _list = function () {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/GroupListController.ashx?method=list";
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param({ grouptype: user.id });
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _using = function (groupId,catalogue) {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/GroupListController.ashx?method=using";
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param({ grouptype: user.id, groupid: groupId,catalogue:catalogue });
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _delete = function (groupId) {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/GroupListController.ashx?method=delete";
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param({ groupid: groupId });
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _detail = function (groupId) {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/GroupListController.ashx?method=detail";
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param({ groupid: groupId });
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _getGroupName=function(){
        return user.groupName;
    };
    var _checkClass=function(classname){
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/GroupListController.ashx?method=checkclassname";
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param({ classname: classname });
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _update=function(data){
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/GroupContentController.ashx?method=update";
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
    return {
        list: _list,
        using: _using,
        dele: _delete,
        detail: _detail,
        getGroupName:_getGroupName,
        checkClass:_checkClass,
        update:_update,
    }
}]);
app.factory('posterService', ['$http', '$q', 'cacheService', function ($http, $q, cacheService) {
    var base = cacheService.base;
    var user = cacheService.user;
    var _createPoster = function () {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/PosterController.ashx";
        var data={
            x: 450,
            y: 780,
            w: 150,
            h: 150,
            fontx:15,
            fonty:15,
            bg:'bg.jpg',
            openid: base.info.wxUserInfo.openId,
            grouptype: user.id,
            size:'500', /*单位像索*/
            catalogue:1
        };
        console.log (data);
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
    var _getTpl = function () {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/GroupContentController.ashx?method=changetpl";
        $http({
            method: 'POST',
            url: url
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _createAdvancedPoster = function () {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/PosterController.ashx";
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param({
                    x: 35,
                    y: 604,
                    w: 170,
                    h: 170,
                    fontx: 15,
                    fonty: 15,
                    bg: 'bg2.jpg',
                    openid: base.info.wxUserInfo.openId,
                    grouptype: user.id,
                    size:'500', /*单位像索*/
                    catalogue:2
                });
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _createPosterByTpl = function (tmpId,catalogue) {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/project/Generalize/controller/PosterController.ashx?method=getbytpl";
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param({
                    tmpid:tmpId,
                    openid: base.info.wxUserInfo.openId,
                    grouptype: user.id,
                    size:'500', /*单位像索*/
                    catalogue:catalogue
                });
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        createPoster: _createPoster,
        createAdvancedPoster: _createAdvancedPoster,
        getTpl: _getTpl,
        createPosterByTpl:_createPosterByTpl
    }
}]);
app.factory('pageTitleService', function () {
    var title = '群海报自助生成';
    return {
        title: function () { return title; },
        setTitle: function (newTitle) { title = newTitle; }
    };
});