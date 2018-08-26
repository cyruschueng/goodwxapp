'use strict';
/**
 * Created by lenovo on 2016/6/6.
 */
var app=angular.module('app',['ui.router',
    'LocalStorageModule',
    'ngSanitize'
]);

app.config(function($stateProvider,$urlRouterProvider,$httpProvider){
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common["X-Requested-width"]='XMLHttpRequest';
    $httpProvider.defaults.headers.get["Cache-Control"]='no-cache';
    $httpProvider.defaults.headers.get["Pragma"]='no-cache';

    $urlRouterProvider.when("", "/empty");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            'body': {
                templateUrl: 'views/home/index.html',
            },
            'footer': {
                templateUrl: 'views/home/footer.html'
            }
        }
    }).state("regist", {
        url: "/regist",
        views: {
            'body': {
                templateUrl: 'views/regist/index.html'
            }
        }
    }).state("tip", {
        url: "/tip",
        views: {
            'body': {
                templateUrl: 'views/tip/index.html'
            }
        }
    }).state("my", {
        url: "/my",
        views: {
            'body': {
                templateUrl: 'views/my/index.html',
                controller: 'myController'
            },'footer':{
                templateUrl: 'views/my/footer.html',
            }
        }
    }).state("province", {
        url: "/province",
        views: {
            'body': {
                templateUrl: 'views/address/province.html',
                controller: 'provinceController'
            }
        }
    }).state("city", {
        url: "/city",
        views: {
            'body': {
                templateUrl: 'views/address/city.html',
                controller: 'cityController'
            }
        }
    }).state("district", {
        url: "/district",
        views: {
            'body': {
                templateUrl: 'views/address/district.html',
                controller: 'districtController'
            }
        }
    }).state("empty", {
        url: "/empty",
        views: {
            'body': {
                templateUrl: 'views/empty/index.html'
            }
        }
    })
});

app.run(['initService', '$location','$timeout' ,'wxJsSdkService','$rootScope', function (initService, $location,$timeout,wxJsSdkService,$rootScope) {
    initService.init().then(function (results) {
        console.log(results);
        $timeout(function(){
                wxJsSdkService.getLocation(function(latitude,longitude){
                    $rootScope.location={ 
                        latitude:latitude,
                        longitude:longitude
                    };
                })
        }, 2000);
        if (results.info.other.existCard == true) {
            $location.path("/my");
        } else {
            $location.path("/regist");
        }
    }, function (error) {
        
    });
    
} ]);







