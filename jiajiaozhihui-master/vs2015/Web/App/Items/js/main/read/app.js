/**
 * Created by lenovo on 2016/6/6.
 */
var app=angular.module('zxsApp',['ui.router','LocalStorageModule']);
app.config(function($httpProvider){
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Accept'] = 'application/json, text/javascript, */*; q=0.01';
});
app.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.when("", "/empty");
    $stateProvider.state("home",{
        url:"/home",
        views:{
            'body':{
                templateUrl:'../items/views/read/home/index.html',
            },
            'header':{
            },
            'footer':{
                templateUrl: '../items/views/read/footer.html'
            }
        }
    }).state("join",{
        url:"/join",
        views:{
            'body':{
                templateUrl: '../items/views/read/join/index.html'
            },
            'header':{
                templateUrl: '../items/views/read/join/header.html'
            },
            'footer':{

            }
        }
    }).state("defier",{
        url:"/defier",
        views:{
            'body':{
                templateUrl: '../items/views/read/agreement/defier/index.html'
            },
            'header':{
                templateUrl: '../items/views/read/agreement/defier/header.html'
            }
        }
    }).state("fan",{
        url:"/fan",
        views:{
            'body':{
                templateUrl: '../items/views/read/agreement/fan/index.html'
            },
            'header':{
                templateUrl: '../items/views/read/agreement/fan/header.html'
            }
        }
    }).state("wxpay",{
        url:"/wxpay/order/",
        views:{
            'body':{
                templateUrl: '../items/views/read/pay/index.html'
            },
            'header':{
                templateUrl: '../items/views/read/pay/header.html'
            }
        }
    }).state("viewpersonal",{
        url:"/viewpersonal",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/personal/view/index.html'
            },
            'header':{
                templateUrl: '../items/views/read/my/personal/view/header.html'
            }
        }
    }).state("editpersonal",{
        url:"/editpersonal",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/personal/edit/index.html'
            }
        }
    }).state("addpersonal",{
        url:"/addpersonal",
        views:{
            'body':{
                templateUrl: '../items/views/read/register/index.html'
            }
        }
    }).state("result",{
        url:"/result",
        views:{
            'body':{
                templateUrl: '../items/views/read/result.html'
            }
        }
    }).state("start",{
        url:"/start",
        views:{
            'body':{
                templateUrl: '../items/views/read/start.html'
            }
        }
    }).state("my",{
        url:"/my",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/index.html'
            },'header':{
                templateUrl: '../items/views/read/my/header.html'
            }
        }
    }).state("effective",{
        url:"/effective",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/effective/index.html'
            },'header':{
                templateUrl: '../items/views/read/my/effective/header.html'
            }
        }
    }).state("activity",{
        url:"/activity",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/activity/index.html'
            },'header':{
                templateUrl: '../items/views/read/my/activity/header.html'
            }
        }
    }).state("task",{
        url:"/task",
        views:{
            'body':{
                templateUrl: '../items/views/read/task/index.html'
            },'header':{
                templateUrl: '../items/views/read/task/header.html'
            }
        }
    }).state("selectimage",{
        url:"/selectimage",
        views:{
            'body':{
                templateUrl: '../items/views/read/selectImage/index.html'
            },'header':{
                templateUrl: '../items/views/read/selectImage/header.html'
            }
        }
    }).state("uploadimage",{
        url:"/uploadimage",
        views:{
            'body':{
                templateUrl: '../items/views/read/uploadImage/index.html'
            },'header':{
                templateUrl: '../items/views/read/uploadImage/header.html'
            }
        }
    }).state("preuploadvoice",{
        url:"/preuploadvoice",
        views:{
            'body':{
                templateUrl: '../items/views/read/preUploadVoice/image/index.html'
            },'header':{
                templateUrl: '../items/views/read/preUploadVoice/image/header.html'
            }
        }
    }).state("uploadvoice",{
        url:"/uploadvoice",
        views:{
            'body':{
                templateUrl: '../items/views/read/uploadVoice/index.html'
            },'header':{
                templateUrl: '../items/views/read/uploadVoice/header.html'
            }
        }
    }).state("personalshare",{
        url:"/personalshare",
        views:{
            'body':{
                templateUrl: '../items/views/read/share/personalShare/index.html'
            },'header':{
                templateUrl: '../items/views/read/share/personalShare/header.html'
            },'footer':{
                templateUrl: '../items/views/read/share/personalShare/footer.html'
            }
        }
    }).state("personalview",{
        url:"/personalview",
        views:{
            'body':{
                templateUrl: '../items/views/read/share/personalView/index.html'
            },'header':{
                templateUrl: '../items/views/read/share/personalView/header.html'
            }
        }
    }).state("about",{
        url:"/about",
        views:{
            'body':{
                templateUrl: '../items/views/read/about/index.html'
            },'header':{
                templateUrl: '../items/views/read/about/header.html'
            }
        }
    }).state("witness",{
        url:"/witness",
        views:{
            'body':{
                templateUrl: '../items/views/read/witness/index.html'
            },'header':{
                templateUrl: '../items/views/read/witness/header.html'
            }
        }
    }).state("witnessview",{
        url:"/witnessview",
        views:{
            'body':{
                templateUrl: '../items/views/read/witness/post/index.html'
            },'header':{

            }
        }
    }).state("win",{
        url:"/win",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/win/index.html'
            },'header':{
                templateUrl: '../items/views/read/my/win/header.html'
            }
        }
    }).state("stop",{
        url:"/stop",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/stop/index.html'
            },'header':{
                templateUrl: '../items/views/read/my/stop/header.html'
            }
        }
    }).state("week",{
        url:"/week",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/week/index.html'
            },'header':{
                templateUrl: '../items/views/read/my/week/header.html'
            }
        }
    }).state("month",{
        url:"/month",
        views:{
            'body':{
                templateUrl: '../items/views/read/my/month/index.html'
            },'header':{
                templateUrl: '../items/views/read/my/month/header.html'
            }
        }
    }).state("joinnotice",{
        url:"/joinnotice",
        views:{
            'body':{
                templateUrl: '../items/views/read/home/result/index.html'
            },'header':{
                templateUrl: '../items/views/read/home/result/header.html'
            }
        }
    }).state("registsuccess",{
        url:"/registsuccess",
        views:{
            'body':{
                templateUrl: '../items/views/read/result/registsuccess.html'
            }
        }
    }).state("report",{
        url:"/report",
        views:{
            'body':{
                templateUrl: '../items/views/read/report/index.html'
            },'header':{
                templateUrl: '../items/views/read/report/header.html'
            }
        }
    }).state("myallwork",{
        url:"/myallwork",
        views:{
            'body':{
                templateUrl: '../items/views/read/myallwork/index.html'
            },'header':{
                templateUrl: '../items/views/read/myallwork/header.html'
            }
        }
    }).state("adv",{
        url:"/adv",
        views:{
            'body':{
                templateUrl: '../items/views/read/home/adv/index.html'
            },'header':{
                templateUrl: '../items/views/read/home/adv/header.html'
            }
        }
    }).state("uploadshare",{
        url:"/uploadshare",
        views:{
            'body':{
                templateUrl: '../items/views/read/uploadvoice/share/index.html'
            },'header':{
                templateUrl: '../items/views/read/uploadvoice/share/header.html'
            },'footer':{
                templateUrl: '../items/views/read/uploadvoice/share/footer.html'
            }
        }
    }).state("maintenance",{
        url:"/maintenance",
        views:{
            'body':{
                templateUrl: '../items/views/read/maintenance.html'
            }
        }
    }).state("jiajiaoguwen",{
        url:"/jiajiaoguwen",
        views:{
            'body':{
                templateUrl: '../items/views/read/article/index.html'
            }
        }
    }).state("empty", {
        url: "/empty",
        views: {
            'body': {
                templateUrl: '../items/views/read/empty.html'
            }
        }
    })
});

app.constant('seSettings',{
    config:{
        serviceUrl:'http://161s5g6007.51mypc.cn/',
        resolverServiceUrl:'http://161s5g6007.51mypc.cn/app/appstart/readv2/resolver.ashx',
        clientUrl:'http://161s5g6007.51mypc.cn'
    }
});

app.run(['resolverService', '$location', '$timeout', '$rootScope', function (resolverService, $location, $timeout, $rootScope) {

    resolverService.init().then(function (results) {
        console.log(results);

        $rootScope.attention = results.info.wxUserInfo.isSubscibe;

        if (results.info.hash == "start") {
            $timeout(function () {
                $location.path('/home');
            }, 1000);
        } else{
            $location.path('/' + results.info.hash);
        }
    });
}]);

/*
initWeixinService.getWeixinInfo().then(function (results) {
    console.log(results);
    var info = JSON.parse(results.Info);

    var state = JSON.parse(info.State);
    initWeixinService.jsSdk(info.JsSdk);
    var hash = state.hash;
    initReadService.getReadInfo(state.appid, info.UserInfo.OpenId).then(function (msg) {
        if (hash == 'start') {
            $timeout(function () {
               
                $location.path('/home');
            }, 2000);
        } else if (hash == 'empty') {
            
            $location.path('/' + initWeixinService.wxInfo.stateInfo.path);
        }
    })
});
*/

/*
app.run(['resolverService', '$location', '$timeout', '$rootScope', function (resolverService, $location, $timeout, $rootScope) {
    resolverService.init().then(function (results) {
        if (results.info.openId == "oqmjZjh55_7kJKBAZOjwhPUiGEjc1" || results.info.openId == "oc6zzs1itio2n5IXY01Yc2wW-0zg") {
            $location.path("/result").search({
                title: '��ʾ',
                desc: '����Υ����Ⱥ����',
                hash: 'javacript:void(0)'
            });
            return;
        }
        $rootScope.attention = results.info.wxUserInfo.isSubscibe;

        if (results.info.hash == "start") {
            $timeout(function () {
                $location.path('/home');
            }, 1000);
        } else if (results.info.hash == 'testing') {
            $location.path('/testing').search({ fileId: results.info.objectId });
        } else if (results.info.hash == 'expertdetail') {
            $location.path('/expertdetail').search({ id: results.info.objectId });
        }
    });
}]);

*/



