app.controller('initController', ['$scope', '$location', 'initService', function ($scope, $location, initService) {
    
} ]);
app.controller('orderController', ['$scope', '$location', 'orderService',
    function ($scope, $location, orderService) {
        $scope.card = {
            user_name: "",
            telephone: "",
            area: "",
            province: "",
            city: "",
            address: "",
            openId:"",
        };
        $scope.submitted = false;
        $scope.processOrder = function (openId) {
            if ($scope.cardForm.$valid) {
                $scope.isLoading = true;
                $scope.card.openId=openId;
                orderService.order($scope.card).then(function (result) {
                    $scope.isLoading = false;
                    if (result == "true") {
                        $location.path("/tip").search({
                            title: "订单提交成功",
                            desc: "",
                            hash: "seacher",
                            img: "/app/Client/WarrantyCard/imgs/hf.jpg"
                        });
                    }
                })
            } else {
                $scope.submitted = true;
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

app.controller('searcherController', ['$scope', 'searcherSevice', function ($scope, searcherSevice) {
    $scope.search=function(values){
        searcherSevice.search(values).then(function (result) {
            $scope.info = result;
        })
    }
} ]);

