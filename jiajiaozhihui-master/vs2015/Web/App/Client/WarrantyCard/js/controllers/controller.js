app.controller('initController', ['$scope', '$location', 'initService', function ($scope, $location, initService) {
    
} ]);
app.controller('registController', ['$scope', '$location', 'registService', 'wxJsSdkService', '$rootScope',
    function ($scope, $location, registService, wxJsSdkService, $rootScope) {
        $scope.card = {
            user_name: "",
            telephone: "",
            order_date: new Date(),
            area: "",
            province: "",
            city: "",
            address: "",
            machine_code: "",
            latitude: 0,
            longitude: 0
        };
        $scope.submitted = false
        $scope.processOrder = function () {
            if ($scope.cardForm.$valid) {
                $scope.isLoading = true;
                $scope.card.latitude = $rootScope.location.latitude;
                $scope.card.longitude = $rootScope.location.longitude;
                registService.regist($scope.card).then(function (result) {
                    $scope.isLoading = false;
                    if (result == "true") {
                        $location.path("/tip").search({
                            title: "保修卡登记成功",
                            desc: "<p class='text-left text-muted'>国学机保修时间由原来的1年延长至1年半<p><p class='text-left text-muted'>你还可以关注下面的【家教智慧】微信号，回复7将为你提供更多的国学教材升级服务<p>",
                            hash: "my",
                            img: "/app/Client/WarrantyCard/imgs/hf.jpg"
                        });
                    }
                })
            } else {
                $scope.submitted = true;
            }
        };
        $scope.getLocation = function () {
            $scope.mytip = "获取地理位置中....";
            wxJsSdkService.getLocation(get);
            function get(latitude, longitude) {

                $scope.isLoading = true;
                registService.transformLocation(latitude, longitude).then(function (res) {
                    $scope.isLoading = false;
                    $scope.card.area = res.province + " " + res.city + " " + res.district;
                    $scope.card.province = res.province;
                    $scope.card.city = res.city;
                    $scope.card.district = res.district;
                });
            }
        };
        $scope.scanQRCode = function () {
            wxJsSdkService.scanQRCode(1, getResult);
            function getResult(value) {
                $scope.$apply(function () {
                    var index = value.indexOf(',');
                    if (index != -1) {
                        $scope.card.machine_code = value.split(',')[1];
                    } else {
                        $scope.card.machine_code = value;
                    }
                });
            }
        };

        $scope.getAddress = function () {
            $location.path("/province");
        }

    }
]);

app.controller('tipController', ['$scope', '$location', function ($scope, $location) {
    var params = $location.search();
    $scope.params = {
        title: params.title,
        desc: params.desc,
        hash: params.hash,
        href: params.href,
        img: params.img
    };
} ]);

app.controller('myController', ['$scope', 'myService', function ($scope, homeService) {
    homeService.getRegistInfo().then(function (result) {
        $scope.info = result;
    })
    $scope.getDate = function (date, day) {
        return moment(date).add(day, 'days').format("YYYY-MM-DD");
    }
} ]);

app.controller('provinceController',['$scope','$location','addressService',function($scope,$location,addressService){
    $scope.provinces=addressService.getProvince();
    $scope.selected=function(province){
        $location.path('/city').search({province:province});
    };
}]);
app.controller('cityController',['$scope','$location','addressService',function($scope,$location,addressService){
    var province= $location.search().province;
    $scope.cities=addressService.getCity(province);

    $scope.selected=function(city){
        $location.path('/district').search({province:province,city:city});
    };
}]);
app.controller('districtController',['$scope','$location','addressService',function($scope,$location,addressService){
    var province= $location.search().province;
    var city= $location.search().city;
    $scope.districts=addressService.getDistrict(province,city);
    $scope.selected=function(city){

    };
}]);
