/**
 * Created by lenovo on 2016/6/6.
 */
var app=angular.module('qaApp',['ui.router','LocalStorageModule','lazyload','infinite-scroll']);

app.config(function($stateProvider,$urlRouterProvider,$httpProvider){
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    $urlRouterProvider.when("", "/empty");
    $stateProvider.state("home",{
        url:"/home",
        views:{
            'body':{
                templateUrl: '../items/views/qa/home/index.html'
            },
            'header':{
            },
            'footer':{
                templateUrl: '../items/views/qa/footer.html'
            }
        }
    }).state("viewpersonal",{
        url:"/viewpersonal",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/personal/view/index.html'
            },
            'header':{
                templateUrl: '../items/views/qa/my/personal/view/header.html'
            }
        }
    }).state("editpersonal",{
        url:"/editpersonal",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/personal/edit/index.html'
            }
        }
    }).state("addpersonal",{
        url:"/addpersonal",
        views:{
            'body':{
                templateUrl: '../items/views/qa/register/index.html'
            }
        }
    }).state("result",{
        url:"/result",
        views:{
            'body':{
                templateUrl: '../items/views/qa/result.html'
            }
        }
    }).state("start",{
        url:"/start",
        views:{
            'body':{
                templateUrl: '../items/views/qa/start.html'
            }
        }
    }).state("my",{
        url:"/my",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/index.html'
            },'header':{
                templateUrl: '../items/views/qa/my/header.html'
            }
        }
    }).state("question",{
        url:"/question",
        views:{
            'body':{
                templateUrl: '../items/views/qa/question/index.html'
            },'header':{
                templateUrl: '../items/views/qa/question/header.html'
            }
        }
    }).state("personalshare",{
        url:"/personalshare",
        views:{
            'body':{
                templateUrl: '../items/views/qa/share/personalShare/index.html'
            },'header':{
                templateUrl: '../items/views/qa/share/personalShare/header.html'
            },'footer':{
                templateUrl: '../items/views/qa/share/personalShare/footer.html'
            }
        }
    }).state("personalview",{
        url:"/personalview",
        views:{
            'body':{
                templateUrl: '../items/views/qa/share/personalView/index.html'
            },'header':{
                templateUrl: '../items/views/qa/share/personalView/header.html'
            }
        }
    }).state("about",{
        url:"/about",
        views:{
            'body':{
                templateUrl: '../items/views/qa/about/index.html'
            },'header':{
                templateUrl: '../items/views/qa/about/header.html'
            }
        }
    }).state("joinnotice",{
        url:"/joinnotice",
        views:{
            'body':{
                templateUrl: '../items/views/qa/home/result/index.html'
            },'header':{
                templateUrl: '../items/views/qa/home/result/header.html'
            }
        }
    }).state("registsuccess",{
        url:"/registsuccess",
        views:{
            'body':{
                templateUrl: '../items/views/qa/result/registsuccess.html'
            }
        }
    }).state("myquestion",{
        url:"/myquestion",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/question/index.html'
            },'header':{
                templateUrl: '../items/views/qa/my/question/header.html'
            }
        }
    }).state("adv",{
        url:"/adv",
        views:{
            'body':{
                templateUrl: '../items/views/qa/home/adv/index.html'
            },'header':{
                templateUrl: '../items/views/qa/home/adv/header.html'
            }
        }
    }).state("jiajiaoguwen",{
        url:"/jiajiaoguwen",
        views:{
            'body':{
                templateUrl: '../items/views/qa/article/index.html'
            }
        }
    }).state("myanswers",{
        url:"/myanswers",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/testing/index.html'
            },'header':{
                templateUrl: '../items/views/qa/my/testing/header.html'
            }
        }
    }).state("testing",{
        url:"/testing",
        views:{
            'body':{
                templateUrl: '../items/views/qa/testing/index.html'
            },'header':{
                templateUrl: '../items/views/qa/testing/header.html'
            }
        }
    }).state("expert",{
        url:"/expert",
        views:{
            'body':{
                templateUrl: '../items/views/qa/expert/index.html'
            },'header':{
                templateUrl: '../items/views/qa/expert/header.html'
            }
        }
    }).state("expertdetail",{
        url:"/expertdetail",
        views:{
            'body':{
                templateUrl: '../items/views/qa/expert/detail/index.html'
            },'header':{
                templateUrl: '../items/views/qa/expert/detail/header.html'
            }
        }
    }).state("unanswered",{
        url:"/unanswered",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/unanswered/index.html'
            },'header':{
                templateUrl: '../items/views/qa/my/unanswered/header.html'
            }
        }
    }).state("join",{
        url:"/join",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/join/index.html'
            },'header':{
                templateUrl: '../items/views/qa/my/join/header.html'
            }
        }
    }).state("myexpert",{
        url:"/myexpert",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/expert/index.html'
            }
        }
    }).state("empty",{
        url:"/empty",
        views:{
            'body':{
                templateUrl: '../items/views/qa/empty.html'
            }
        }
    }).state("myexpert2",{
        url:"/myexpert2",
        views:{
            'body':{
                templateUrl: '../items/views/qa/my/expert2/index.html'
            }
        }
    }).state("essence",{
        url:"/essence",
        views:{
            'body':{
                templateUrl: '../items/views/qa/essence/index.html'
            },'header':{
                templateUrl: '../items/views/qa/essence/header.html'
            }
        }
    })
});

app.constant('seSettings',{
    config:{
        serviceUrl:'http://161s5g6007.51mypc.cn/',
        resolverServiceUrl:'http://161s5g6007.51mypc.cn/app/appstart/qav2/resolver.ashx',
        clientUrl:'http://161s5g6007.51mypc.cn'
    }
});

app.run(['resolverService','$location','$timeout','$rootScope',function(resolverService,$location,$timeout,$rootScope){
    resolverService.init().then(function(results){
        if(results.info.openId=="oqmjZjh55_7kJKBAZOjwhPUiGEjc1" ||results.info.openId=="oc6zzs1itio2n5IXY01Yc2wW-0zg"){
            $location.path("/result").search({
                title:'提示',
                desc:'你已违反社群规则',
                hash:'javacript:void(0)'
            });
            return;
        }
        $rootScope.attention=results.info.wxUserInfo.isSubscibe;
        $rootScope.globalOpenId = results.info.openId;

        if(results.info.hash=="start") {
            $timeout(function(){
                $location.path('/home');
            },1000);
        }else if(results.info.hash=='testing'){
            $location.path('/testing').search({fileId:results.info.objectId});
        }else if(results.info.hash=='expertdetail'){
            $location.path('/expertdetail').search({id:results.info.objectId});
        }
    });
}]);







