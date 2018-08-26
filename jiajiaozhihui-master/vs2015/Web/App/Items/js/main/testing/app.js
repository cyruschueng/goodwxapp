/**
 * Created by hasee on 2017/7/14.
 */
'use strict';
/**
 * Created by lenovo on 2016/6/6.
 */

var globalData= {
    exerciseActivityId: "",
    habitId:"",
    class:'0'
};

var app = angular.module('app', ['ui.router','ngSanitize', 'LocalStorageModule','ngAnimate','infinite-scroll','ngAudio']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    $urlRouterProvider.when("", "/empty");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            'body': {
                templateUrl: '../items/views/testing/home/index.html'
            }, 'footer': {
                //templateUrl: '../items/views/book/home/footer.html'
            }, 'header': {
                templateUrl: '../items/views/testing/home/header.html'
            }
        }
    }).state("memberregist", {
        url: "/memberregist",
        title:'会员验证',
        views: {
            'body': {
                templateUrl: '../items/views/testing/member/regist/index.html'
            }
        }
    }).state("empty", {
        url: "/empty",
        views: {
            'body': {
                templateUrl: '../items/views/testing/empty.html'
            }
        }
    }).state("result", {
        url: "/result",
        views: {
            'body': {
                templateUrl: '../items/views/testing/result.html'
            }
        }
    }).state("news", {
        url: "/news",
        views: {
            'body': {
                templateUrl: '../items/views/testing/news/index.html'
            }
        }
    }).state("task", {
        url: "/task",
        title:'我的任务',
        views: {
            'body': {
                templateUrl: '../items/views/testing/task/index.html'
            },'footer': {
                templateUrl: '../items/views/testing/task/footer.html'
            }
        }
    }).state("historyeveryday", {
        url: "/historyeveryday",
        title:'我的任务',
        views: {
            'body': {
                templateUrl: '../items/views/testing/history/everyday/index.html'
            }
        }
    }).state("historyeveryweek", {
        url: "/historyeveryweek",
        title:'我的任务',
        views: {
            'body': {
                templateUrl: '../items/views/testing/history/everyweek/index.html'
            }
        }
    }).state("my", {
        url: "/my",
        views: {
            'body': {
                templateUrl: '../items/views/testing/my/index.html'
            },'footer': {
                templateUrl: '../items/views/testing/my/footer.html'
            }
        }
    }).state("advice", {
        url: "/advice",
        views: {
            'body': {
                templateUrl: '../items/views/testing/my/advice.html'
            }
        }
    }).state("editpersonal", {
        url: "/editpersonal",
        views: {
            'body': {
                templateUrl: '../items/views/testing/my/edit.html'
            }
        }
/**************************start 练习************************************/
    }).state("exercise", {
        url: "/exercise",
        views: {
            'body': {
                templateUrl: '../items/views/testing/exercise/index.html'
            }
        }
    }).state("exerciseready", {
        url: "/exerciseready",
        views: {
            'body': {
                templateUrl: '../items/views/testing/exercise/ready/index.html'
            }
        }
    }).state("exercisetesting", {
        url: "/exercisetesting",
        views: {
            'body': {
                templateUrl: '../items/views/testing/exercise/testing/index.html'
            }
        }
    }).state("exerciserank", {
        url: "/exerciserank",
        views: {
            'body': {
                templateUrl: '../items/views/testing/exercise/rank/index.html'
            }
        }
    }).state("exerciseresult", {
        url: "/exerciseresult",
        views: {
            'body': {
                templateUrl: '../items/views/testing/exercise/result/index2.html'
            }
        }
/**************************end 习惯************************************/
/**************************start 习惯**********************************/
    }).state("habits", {
        url: "/habits",
        views: {
            'body': {
                templateUrl: '../items/views/testing/habits/index.html'
            }
        }
    }).state("myhabits", {
        url: "/myhabits",
        views: {
            'body': {
                templateUrl: '../items/views/testing/habits/myhabits/index.html'
            }
        }
    }).state("habitdetail", {
        url: "/habitdetail",
        views: {
            'body': {
                templateUrl: '../items/views/testing/habits/detail/index.html'
            }
        }
    }).state("habitrank", {
        url: "/habitrank",
        views: {
            'body': {
                templateUrl: '../items/views/testing/habits/rank/index.html'
            }
        }
    }).state("habitrecord", {
        url: "/habitrecord",
        views: {
            'body': {
                templateUrl: '../items/views/testing/habits/records/index.html'
            }
        }
    }).state("habitjoin", {
        url: "/habitjoin",
        views: {
            'body': {
                templateUrl: '../items/views/testing/habits/join/index.html'
            }
        }
    }).state("habitnews", {
        url: "/habitnews",
        views: {
            'body': {
                templateUrl: '../items/views/testing/habits/news/index.html'
            },'footer': {
                templateUrl: '../items/views/testing/habits/news/footer.html'
            }
        }
/**************************end 习惯************************************/
/**************************start 课程************************************/
    }).state("courses", {
        url: "/courses",
        views: {
            'body': {
                templateUrl: '../items/views/testing/courses/index.html'
            }
        }
    });
/**************************end 课程************************************/

});

app.constant('seSettings', {
    config: {
        serviceUrl: 'http://161s5g6007.51mypc.cn/',
        resolverServiceUrl: 'http://161s5g6007.51mypc.cn/app/appstart/gardenia/resolver.ashx',
        clientUrl: 'http://161s5g6007.51mypc.cn',
        habitAppId:'app001',
        exerciseAppId:'app001'
    }
});


app.run(['initService', 'wxShareService','$rootScope', function (initService, wxShareService,$rootScope) {
    initService.init().then(function (results) {
        console.log(results);
        initService.navigation(results.info.other.member.state,results.info.hash);
        wxShareService.default();
    },function () {

    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        console.log("toState");
        console.log(toState);

        if(toState.title==undefined){
            $rootScope.pageTitle ='枙子会';
        }else{
            $rootScope.pageTitle = toState.title;
            console.log(toState.title);
        }
    });
}]);

app.animation(".exerciseright",function(){
    return{
        enter:function(element,done){
            //定义动画
            $(element).animate({"opacity":"1"},300,function(){
                done();
            })
        },
        //一项从列表中被移除时触发
        leave:function(element,done){
            //定义动画
            $(element).animate({"opacity":"0"},300,function(){
                done();
            })
        }
    }
})
app.animation(".exerciseerror",function(){
    return{
        enter:function(element,done){
            //定义动画
            $(element).animate({"opacity":"1"},300,function(){
                done();
            })
        },
        //一项从列表中被移除时触发
        leave:function(element,done){
            //定义动画
            $(element).animate({"opacity":"0"},300,function(){
                done();
            })
        }
    }
})






