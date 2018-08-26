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

    $urlRouterProvider.when("", "/search");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            'body': {
                templateUrl: 'views/home/index.html'
            },
            'footer': {
                templateUrl: 'views/home/footer.html'
            }
        }
    }).state("search", {
        url: "/search",
        views: {
            'body': {
                templateUrl: 'views/search/index.html'
            }
        }
    }).state("tip", {
        url: "/tip",
        views: {
            'body': {
                templateUrl: 'views/tip/index.html'
            }
        }
    }).state("order", {
        url: "/order",
        views: {
            'body': {
                templateUrl: 'views/order/index.html'
            }
        }
    })
});







