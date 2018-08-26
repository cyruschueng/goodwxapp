app.factory('orderService', ['$http', '$q', function ($http, $q) {

    var _order = function (obj) {
        var deferred = $q.defer();
        var data = {
            openId: obj.openId,
            userName: obj.user_name,
            telephone: obj.telephone,
            province: obj.province,
            city: obj.city,
            district: obj.district,
            address: obj.address
        };
        var url = "http://161s5g6007.51mypc.cn/app/Project/wxrrd/Controller/OrderController.ashx?method=order";
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
        order: _order
    }
} ]);


app.factory('searcherSevice', ['$http', '$q', function ($http, $q) {

    var _search = function (value) {
        var deferred = $q.defer();
        var url = "http://161s5g6007.51mypc.cn/app/Project/wxrrd/Controller/GuiderController.ashx?method=search";
        $http({
            method: 'GET',
            url: url,
            params: { value:value}
        }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        search:_search
    }
} ]);

