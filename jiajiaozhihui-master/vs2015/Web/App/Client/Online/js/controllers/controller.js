
app.controller('tipController', ['$scope', '$location', function ($scope, $location) {
    var params = $location.search();
    $scope.params = {
        title: params.title,
        desc: params.desc,
        hash: params.hash,
        href: params.href,
        img: params.img
    };
}]);

app.controller('homeController', ['$scope', 'homeService', '$location', function ($scope, homeService, $location) {
    $scope.data = {
        username: '',
        telephone:''
    }
    $scope.seInValid = false;
    $scope.create = function (isValid) {
        if (isValid) {
            $scope.seInValid = true;
            return;
        };
        homeService.add($scope.data.username, $scope.data.telephone).then(function (result) {
            console.log(result);
            if (result.success == true) {
                $location.path("/tip").search({
                    title: "报名成功",
                    desc: "",
                    hash: "tip",
                    img: ""
                });
            }
        })
    }
    homeService.exist().then(function (result) {
        if (result.success == true && result.state == true) {
            $location.path("/tip").search({
                title: "报名成功",
                desc: "",
                hash: "tip",
                img: ""
            });
        }
    })
}]);

