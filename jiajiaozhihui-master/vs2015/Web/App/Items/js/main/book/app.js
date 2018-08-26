'use strict';
/**
 * Created by lenovo on 2016/6/6.
 */
var app = angular.module('app', ['ui.router','ngSanitize',
    'LocalStorageModule'
]);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    $urlRouterProvider.when("", "/empty");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            'body': {
                templateUrl: '../items/views/book/home/index.html'
            }, 'footer': {
                //templateUrl: '../items/views/book/home/footer.html'
            }, 'header': {
                templateUrl: '../items/views/book/home/header.html'
            }
        }
    }).state("empty", {
        url: "/empty",
        views: {
            'body': {
                templateUrl: '../items/views/book/empty.html'
            }
        }
    }).state("share", {
        url: "/share",
        views: {
            'body': {
                templateUrl: '../items/views/book/share/index.html'
            }
        }
    }).state("attention", {
        url: "/attention",
        views: {
            'body': {
                templateUrl: '../items/views/book/attention/index.html'
            }
        }
    }).state("store", {
        url: "/store",
        views: {
            'body': {
                templateUrl: '../items/views/book/store/index.html'
            }
        }
    }).state("detail", {
        url: "/detail",
        views: {
            'body': {
                templateUrl: '../items/views/book/detail/index.html'
            }, 'footer': {
                //templateUrl: '../items/views/book/detail/footer.html'
            },
        }
    }).state("pay", {
        url: "/pay",
        views: {
            'body': {
                templateUrl: '../items/views/book/pay/index.html'
            }
        }
    }).state("result", {
        url: "/result",
        views: {
            'body': {
                templateUrl: '../items/views/book/result.html'
            }
        }
    }).state("address", {
        url: "/address",
        views: {
            'body': {
                templateUrl: '../items/views/book/rewrite/index.html'
            }
        }
    }).state("note", {
        url: "/note",
        views: {
            'body': {
                templateUrl: '../items/views/book/note/index.html'
            }
        }
    })

});

app.constant('seSettings', {
    config: {
        serviceUrl: 'http://161s5g6007.51mypc.cn/',
        resolverServiceUrl: 'http://161s5g6007.51mypc.cn/app/appstart/book/resolver.ashx',
        clientUrl: 'http://161s5g6007.51mypc.cn'
    }
});

app.run(['initService', '$location', '$timeout', 'wxShareService', function (initService, $location, $timeout, wxShareService) {
    initService.init().then(function (results) {
        console.log(results);
        if (results.info.hash == "start") {
            $timeout(function () {
                $location.path('/home');
            },2000);
        }else if(results.info.hash == "store") {
            $timeout(function () {
                $location.path('/store');
            }, 2000);
        } else if (results.info.hash == "address") {
            $timeout(function () {
                $location.path('/address');
            }, 2000);
        }
        wxShareService.default();
        wxShareService.hideMenuItems();
    },function () {

    });
}]);







