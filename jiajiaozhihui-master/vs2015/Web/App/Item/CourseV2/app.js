'use strict';
/**
 * Created by lenovo on 2016/6/6.
 */
var app=angular.module('app',['ui.router',
    'LocalStorageModule',
    'ngSanitize',
    'ngAudio'
]);

app.config(function($stateProvider,$urlRouterProvider,$httpProvider){
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $urlRouterProvider.when("", "/start");
    $stateProvider.state("home", {
        url: "/home",
        views: {
            'body': {
                templateUrl: 'views/home/index.html',
            }
        }
    }).state("result",{
        url:"/result",
        views:{
            'body':{
                templateUrl:'views/result.html'
            }
        }
    }).state("mycourse",{
        url:"/mycourse",
        views:{
            'body':{
                templateUrl:'views/course/my/index.html'
            },'header':{
                templateUrl:'views/course/my/header.html'
            }
        }
    }).state("mycommoncourse",{
        url:"/mycommoncourse",
        views:{
            'body':{
                templateUrl:'views/course/my/common/index.html'
            },'header':{
                templateUrl:'views/course/my/common/header.html'
            }
        }
    }).state("myonlinecourse",{
        url:"/myonlinecourse",
        views:{
            'body':{
                templateUrl:'views/course/my/online/index.html'
            },'header':{
                templateUrl:'views/course/my/online/header.html'
            }
        }
    }).state("my",{
        url:"/my",
        views:{
            'body':{
                templateUrl:'views/my/index.html'
            },'header':{
                templateUrl:'views/my/header.html'
            }
        }
    }).state("viewpersonal",{
        url:"/viewpersonal",
        views:{
            'body':{
                templateUrl:'views/my/personal/view/index.html'
            },'header':{
                templateUrl:'views/my/personal/view/header.html'
            }
        }
    }).state("editpersonal",{
        url:"/editpersonal",
        views:{
            'body':{
                templateUrl:'views/my/personal/edit/index.html'
            }
        }
    }).state("singleaudio",{
        url:"/singleaudio",
        views:{
            'body':{
                templateUrl:'views/course/audio/single/index.html?v=1.1'
            }
        }
    }).state("multipleaudio",{
        url:"/multipleaudio",
        views:{
            'body':{
                templateUrl:'views/course/audio/multiple/index.html'
            }
        }
    }).state("onlineaudio",{
        url:"/onlineaudio",
        views:{
            'body':{
                templateUrl:'views/course/audio/online/index.html'
            }
        }
    }).state("viewcourse",{
        url:"/viewcourse",
        views:{
            'body':{
                templateUrl:'views/course/index.html'
            }
        }
    }).state("freevideo",{
        url:"/freevideo",
        views:{
            'body':{
                templateUrl:'views/course/video/free/index.html'
            }
        }
    }).state("courselist",{
        url:"/courselist",
        views:{
            'body':{
                templateUrl:'views/courselist/index.html'
            },'header':{
                templateUrl:'views/courselist/header.html'
            }
        }
    }).state("empty",{
        url:"/empty",
        views:{
            'body':{
                templateUrl:'views/empty.html'
            }
        }
    }).state("about",{
        url:"/about",
        views:{
            'body':{
                templateUrl:'views/about/index.html'
            },'header':{
                templateUrl:'views/about/header.html'
            }
        }
    }).state("gxdr",{
        url:"/gxdr",
        views:{
            'body':{
                templateUrl:'views/gxdr/index_v2.html'
            },'header':{
                templateUrl:'views/gxdr/header.html'
            }
        }
    }).state("rank",{
        url:"/rank",
        views:{
            'body':{
                templateUrl:'views/advanced/gxdr/index.html'
            },'header':{
                templateUrl:'views/advanced/gxdr/header.html'
            }
        }
    }).state("faults",{
        url:"/faults",
        views:{
            'body':{
                templateUrl:'views/fault/index.html'
            }
        }
    }).state("order",{
        url:"/order",
        views:{
            'body':{
                templateUrl:'views/gxdr/order.html'
            }
        }
    })
});

app.constant('seSettings',{
    config:{
        serviceUrl:'http://161s5g6007.51mypc.cn/',
        resolverServiceUrl:'http://161s5g6007.51mypc.cn/app/appstart/coursev2/resolver.ashx',
        clientUrl:'http://161s5g6007.51mypc.cn/'
    }
});
app.value("songRemember",{});

app.run(['initService','$location','$timeout',function(initService,$location,$timeout){
    initService.init().then(function(results){
        console.log(results);
        if(results.info.hash=="start"){
            $timeout(function(){
                $location.path('/home');
            },2000);
        }else if(results.info.hash=="viewcourse"){
            var cid=results.info.objectId;
            var r=results.info.remark;
            var remark=JSON.parse(r);
            var themeid=remark.themeid;
            var mtype=remark.mtype;
            $location.path("/viewcourse").search({cid:cid,themid:themeid,mtype:mtype});
        }
    },function(error){

    });
}]);





