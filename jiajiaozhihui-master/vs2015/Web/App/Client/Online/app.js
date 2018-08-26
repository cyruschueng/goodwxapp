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

    $urlRouterProvider.when("", "/start");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            'body': {
                templateUrl: 'views/home/index.html'
            }, 'header': {
                templateUrl: 'views/home/header.html'
            }
        }
    }).state("tip", {
        url: "/tip",
        views: {
            'body': {
                templateUrl: 'views/tip/index.html'
            }
        }
    }).state("login", {
        url: "/login",
        title:'登录',
        views: {
            'body': {
                templateUrl: 'views/login/index.html'
            }
        }
    }).state("start", {
        url: "/start",
        views: {
            'body': {
                templateUrl: 'views/start/index.html'
            }
        }
    }).state("create", {
        url: "/create",
        views: {
            'body': {
                templateUrl: 'views/create/index.html'
            }
        }
    }).state("detail", {
        url: "/detail",
        views: {
            'body': {
                templateUrl: 'views/detail/index.html'
            }
        }
    }).state("poster", {
        url: "/poster",
        views: {
            'body': {
                templateUrl: 'views/poster/index.html'
            }
        }
    })
    
});

app.run(['initService', '$location', '$timeout', '$rootScope', 'localStorageService', function (initService, $location, $timeout, $rootScope, localStorageService) {
    initService.init().then(function (results) {
        console.log(results);
        if (results.info.hash == "start") {
            $location.path("/home");
        }
    }, function (error) {
        
    });
    
    
} ]);







