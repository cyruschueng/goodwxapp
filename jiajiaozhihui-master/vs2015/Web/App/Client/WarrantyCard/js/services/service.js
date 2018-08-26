app.factory('initService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    var deferred = $q.defer();
    var _init = function () {
        var p = getQueryString("o");
        var url = "http://161s5g6007.51mypc.cn/app/appstart/WarrantyCard/Resolver.ashx"
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
            debug: false,
            appId: res.info.jsSdk.appId,
            timestamp: res.info.jsSdk.timestamp,
            nonceStr: res.info.jsSdk.nonceStr,
            signature: res.info.jsSdk.signature,
            jsApiList: ['getLocation','scanQRCode']
        });
    };
    
    return {
        init: _init
    }
} ]);

app.factory('cacheService', ['localStorageService', function (localStorageService) {
    return {
        base:localStorageService.get("baseinfo")
    }
} ]);
app.factory('registService', ['$http', '$q', 'cacheService', function ($http, $q, cacheService) {

    var base = cacheService.base;
    var _regist = function (obj) {
        var deferred = $q.defer();
        var data = {
            openId: base.info.wxUserInfo.openId,
            userName: obj.user_name,
            telephone: obj.telephone,
            orderDate: obj.order_date,
            province: obj.province,
            city: obj.city,
            district: obj.district,
            address: obj.address,
            machineCode: obj.machine_code,
            latitude:obj.latitude,
            longitude:obj.longitude
        };
        var url = "http://161s5g6007.51mypc.cn/app/Project/WarrantyCard/Controller/MemberController.ashx?method=regist";
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
    var _transformLocation = function (latitude, longitude) {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/Project/WarrantyCard/Controller/MemberController.ashx?method=location";
        $http({
            method: 'GET',
            url: url,
            params: { latitude: latitude, longitude: longitude }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _sameCode = function (code) {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/Project/WarrantyCard/Controller/MemberController.ashx?method=samecode";
        $http({
            method: 'GET',
            url: url,
            params: {machinecode:code}
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        regist: _regist,
        transformLocation: _transformLocation,
        sameCode:_sameCode
    }
} ]);

app.factory('wxJsSdkService', [function () {
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
    return {
        scanQRCode: _scanQRCode,
        getLocation: _getLocation
    }
} ]);

app.factory('myService', ['$http', '$q', 'cacheService', function ($http, $q, cacheService) {
    var base = cacheService.base;
    var _getRegistInfo = function () {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/Project/WarrantyCard/Controller/MemberController.ashx?method=registinfo";
        $http({
            method: 'GET',
            url: url,
            params: { openId: base.info.wxUserInfo.openId }
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        getRegistInfo:_getRegistInfo
    }
} ]);

app.factory('addressService',['$http','localStorageService',function($http,localStorageService){
    var _getAddress=function(){
        var url="./data/areas.json"
        $http.get(url).success(function(res){
            console.log(res);
            localStorageService.add('app_address',res);
        })
    };
    var _getProvince=function(){
        var address=localStorageService.get("app_address");
        console.log(address);

        var province=[];
        if(address!=null){
            for(var item in address){
                province.push(item);
            }
        };
        return province;
    };
    var _getCity=function(province){
        var address=localStorageService.get("app_address");
        var city=[];
        if(address!=null){
            var cities=address[province];

            for(var item in cities){
                city.push(item);
            }
        };
        return city;
    };
    var _getDistrict=function(province,city){
        var address=localStorageService.get("app_address");
        var district=[];
        if(address!=null){
            var districts=address[province][city];
            console.log("districts");
            console.log(districts);
            for(var i=0;i<districts.length; i++){
                district.push(districts[i]);
            }
        };
        console.log("districts");
        console.log(district);
        return district;
    };
    return{
        getProvince:_getProvince,
        getCity:_getCity,
        getDistrict:_getDistrict,
        getAddress:_getAddress
    }
}]);