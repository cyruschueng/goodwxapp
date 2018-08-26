/**
 * Created by hasee on 2017/7/14.
 */
app.factory('initService', ['$http', '$q', 'localStorageService','$location','$timeout','seSettings', function ($http, $q, localStorageService,$location,$timeout,seSettings) {
    var deferred = $q.defer();
    var _init = function () {
        var p = getQueryString("o");
        var url =seSettings.config.resolverServiceUrl;
        var data = { o: p, url: window.location.href };
        $http({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }, transformRequest: function () {
                return $.param(data);
            }
        }).success(function (response) {
            deferred.resolve(response);
            localStorageService.set("baseinfo", response);
            wxconfig(response);
            //hideMenuItems();
        }).error(function (err, status) {
            deferred.reject(err);
            localStorageService.clearAll();
        });
        return deferred.promise;
    }
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    function wxconfig(res) {
        wx.config({
            debug:false,
            appId: res.info.jsSdk.appId,
            timestamp: res.info.jsSdk.timestamp,
            nonceStr: res.info.jsSdk.nonceStr,
            signature: res.info.jsSdk.signature,
            jsApiList: ['getLocation', 'chooseImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'openAddress', 'previewImage', 'uploadImage']
        });
    };
    var _navigation=function (state,hash){
        if(hash=='start'){
            $timeout(function () {
                $location.path('/task');
                //$location.path("/exerciseresult");
            },2000);
        }else if(hash=='member'){
            $timeout(function () {
                $location.path('/memberregist');
            },2000);
        }
    };
    return {
        init: _init,
        navigation:_navigation
    }
}]);

app.factory('cacheService', ['localStorageService', function (localStorageService) {
    var info = localStorageService.get("baseinfo");
    return {
        base: localStorageService.get("baseinfo")
    }
}]);

app.factory('commonService', ['seSettings', 'cacheService', 'localStorageService','$location', function (seSettings, cacheService, localStorageService,$location) {
    var data = cacheService.base.info;
    var remark = {};
    if (data.remark != "") remark = JSON.parse(data.remark);
    return {
        /*应用Id*/
        appId: data.appId,
        /*当前用户信息*/
        openId:data.openId,
        nickName: data.wxUserInfo.nickName,
        headImgUrl: data.wxUserInfo.headImgUrl,
        /*分享者*/
        share: data.sharer,
        /*微信用户信息*/
        wxUserInfo: data.wxUserInfo,
        /*服务器地址*/
        serviceUrl: seSettings.config.serviceUrl,
        /*客户端地址*/
        clientUrl: seSettings.config.clientUrl,
        /*分享作品时的作品Id*/
        fileId: data.objectId,
        /*练习appid*/
        exerciseAppId:seSettings.config.exerciseAppId,
        /*习惯appid*/
        habitAppId:seSettings.config.habitAppId,
        /*群类型*/
        groupType:1,
        /*会员信息*/
        /*state-> 0:请求验证 1:1验证通过 -1：验证失败*/
        member:data.other.member,
        /*会员状态*/
        memberState:data.other.member.state,
        /*会员权限*/
        checkMemberState:function(){
            var memberState=data.other.member.state;
            if(memberState==-1){
                //注册审核失败
                $location.path("/result").search({
                    title:'审核失败！',
                    success:false
                });
            }else if(memberState==0){
                //注册审核中
                $location.path("/result").search({
                    title:'正在审核中，请耐心等待',
                    desc:'',
                    success:true
                });
            }else if(memberState==404){
                //未注册
                $location.path("/memberregist");
                $location.replace();
            }
        }
    }
}]);

app.factory('wxShareService', ['seSettings', function (seSettings) {
    var _shareData = {
        title: '栀子会 会员大课堂', // 分享标题
        desc: '在这里可以看到每天的新任务 还有10万家长的家庭教育新动态分享 家长们的相互交流学习',
        link: seSettings.config.serviceUrl + 'link/gardenia/index.html',
        imgUrl: seSettings.config.serviceUrl + 'app/items/imgs/gardenia/logo.png', // 分享图标
        type: 'link',
        success: function () {

        },
        error: function () { }
    };

    var _default = function (obj) {
        var timelineData = _shareData;
        var appMessage = _shareData;
        if (obj !=undefined && typeof obj == "object") {
            timelineData = $.extend({}, _shareData, obj);
            appMessage = $.extend({}, _shareData, obj);
        }
        wx.ready(function () {
            wx.onMenuShareTimeline(timelineData);
            wx.onMenuShareAppMessage(appMessage);
        })
    };
    var _custom = function (title, desc, id, page,obj) {
        // 分享链接
        var link = commonService.serviceUrl + 'app/appstart/gardenia/baseinfo.ashx?redirect_url=' + commonService.clientUrl + '/app/items/gardenia.html?r=a=app001|h=' + page + '|id=' + id;
        var data = {
            title: title,
            desc: desc,
            groupTitle: title,
            link: link
        };
        var params = $.extend({}, _shareData, data);

        if (obj != undefined && typeof obj == "object") {
            params = $.extend({}, params, obj);
        }
        var timelineData = params;
        var appMessage = params;
        wx.ready(function () {
            wx.onMenuShareTimeline(timelineData);
            wx.onMenuShareAppMessage(appMessage);
        });
    };

    return {
        custom: _custom,
        default: _default
    };
}]);
app.factory('wxJsSdkService',[function(){

    var _image={
        localIds:[],
        current:'',
        urls:[],
        serverId:''
    };

    var _chooseImage=function(fun){
        wx.chooseImage({
            count: 1,//默认9
            sizeType:['compressed'],// 可以指定是原图还是压缩图，默认二者都有 ['original', 'compressed']
            sourceType:['album','camera'],// 可以指定来源是相册还是相机，默认二者都有 ['album', 'camera']
            success:function(res){
                _image.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                if(typeof fun=='function') fun(res.localIds);
            }
        });
    };
    var _previewImage=function(){
        wx.previewImage({
            current: _image.current, // 当前显示图片的http链接
            urls: _image.urls // 需要预览的图片http链接列表
        });
    };
    var _uploadImage=function(fun){
        wx.uploadImage({
            localId: _image.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                _image.serverId = res.serverId; // 返回图片的服务器端ID
                if( typeof fun=='function') fun(res.serverId);
            }
        });
    };

    var _setPreviewImageUrls=function(current,urls){
        _image.current=current;
        _image.urls=urls;
    };
    var _setImageLocalId=function(localId){
        _image.localIds[0]=localId;
    };
    var _getImageLocalId=function(){
        return _image.localIds[0];
    };

    var _clearImageData=function(){
        _image.localIds=[];
        _image.current='';
        _image.urls=[];
        _image.serverId='';
    };

    return{
        image:{
            chooseImage:_chooseImage,
            previewImage:_previewImage,
            uploadImage:_uploadImage,
            setPreviewImageUrls:_setPreviewImageUrls,
            setImageLocalId:_setImageLocalId,
            getImageLocalId:_getImageLocalId,
            clearImageData:_clearImageData
        }
    }
}]);
app.factory('memberService',['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _regist=function(data){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/gardenia/member/regist',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                data.openid=commonService.openId;
                data.grouptype=commonService.groupType;
                return JSON.stringify(data);
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _show=function(){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/gardenia/member/info',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    return {
        regist:_regist,
        show:_show,
        serverUrl:commonService.serviceUrl,
        wxUserInfo:commonService.wxUserInfo
    }
}]);

app.factory('historyService',['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var classId=commonService.member.classId;
    var _getEveryDayData=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'api/gardenia/history/everyday/'+classId,
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _getEveryWeekData=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'api/gardenia/history/everyweek/'+classId,
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        getEveryDayData:_getEveryDayData,
        getEveryWeekData:_getEveryWeekData,
        memberInfo:commonService.member
    }
}]);

app.factory('taskService',['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _getTask=function(name,tel){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/gardenia/task',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    grouptype:commonService.groupType
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        getTask:_getTask,
        memberInfo:commonService.member,
        checkMember:commonService.checkMemberState,
    }
}]);

app.factory('myService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;
    var _getAdvice=function(){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/gardenia/member/advice',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        userInfo:commonService.wxUserInfo,
        memberInfo:commonService.member,
        getAdvice:_getAdvice
    }
}]);
/***********start测试******************/
app.factory('exerciseActivityService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _activityList=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'app/Project/gxdr/Controller/ActivityController.ashx?method=activity',
            params:{appId:commonService.exerciseAppId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        activityList:_activityList
    }
}]);
app.factory('exerciseTestingService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _questionList=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'app/Project/gxdr/Controller/QuestionV2Controller.ashx?method=get',
            params:{
                appId:commonService.exerciseAppId,
                activeid:globalData.exerciseActivityId,
                openid:commonService.openId,
                type:1
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _addRecord=function(answer){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'app/Project/gxdr/Controller/QuestionAnswerRecordProvide.ashx?method=addapp001',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({
                    openid:commonService.openId,
                    appid:commonService.exerciseAppId,
                    activeid:globalData.exerciseActivityId,
                    answer:answer
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _addScore=function(score,totaltime){
        var deferred = $q.defer();
        //url="http://localhost:29564/";
        $http({
            method:'POST',
            url:url+'app/Project/gxdr/Controller/QuestionActiveScoreProvide.ashx?method=addapp001',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({
                    openid:commonService.openId,
                    appid:commonService.exerciseAppId,
                    activeid:globalData.exerciseActivityId,
                    score:score,
                    totaltime:totaltime,
                    catalogue:commonService.member.classId //班级 globalData.class
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        questionList:_questionList,
        userInfo:commonService.wxUserInfo,
        addRecord:_addRecord,
        addScore:_addScore
    }
}]);

app.factory('exerciseResultService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    return{
        userInfo:commonService.wxUserInfo,
        memberInfo:commonService.member
    }
}]);

app.factory('exerciseRankService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _rankSchool=function(top){
        var deferred = $q.defer();
        //url="http://localhost:29564/";
        $http({
            method:'POST',
            url:url+'app/Project/gxdr/Controller/QuestionActiveScoreProvide.ashx?method=rankschool',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({
                    appid:commonService.exerciseAppId,
                    activeid:globalData.exerciseActivityId,
                    top:top
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _rankClass=function(top){
        var deferred = $q.defer();
        //url="http://localhost:29564/";
        $http({
            method:'POST',
            url:url+'app/Project/gxdr/Controller/QuestionActiveScoreProvide.ashx?method=rankclass',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({
                    appid:commonService.exerciseAppId,
                    activeid:globalData.exerciseActivityId,
                    class:commonService.member.classId,
                    top:top
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        userInfo:commonService.wxUserInfo,
        rankSchool:_rankSchool,
        rankClass:_rankClass
    }
}]);
/***********end测试********************/

/***********start习惯******************/
app.factory('habitsService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _getList=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'api/habits/list/'+commonService.habitAppId+'/1',
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        getList:_getList
    }
}]);
app.factory('habitsMyService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _getMyHabit=function(){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/my/list',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        userInfo:commonService.wxUserInfo,
        getMyHabit:_getMyHabit
    }
}]);

app.factory('habitsRankService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _getRank=function(id){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'api/habits/rank/'+id,
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        userInfo:commonService.wxUserInfo,
        getRank:_getRank
    }
}]);
app.factory('habitsLikeService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _update=function(detailId,habitid){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/like/update/'+detailId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId,
                    habitid:habitid
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        update:_update
    }
}]);
app.factory('habitsCommentService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _comment=function(detailId,habitid,comment){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/comment/add/'+detailId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId,
                    habitid:habitid,
                    comment:comment
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _reply=function(detailId,habitid,commentid,comment){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/comment/reply/'+detailId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId,
                    habitid:habitid,
                    commentid:commentid,
                    comment:comment
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        comment:_comment,
        reply:_reply
    }
}]);
app.factory('habitsDetailService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _items=[];
    var _getDetail=function(start,end){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/detail/'+globalData.habitId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId,
                    startindex:start,
                    endindex:end
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _take=function(items){
        for(var i=0; i<items.length;i++){
            _items.push(items[i]);
        }
        return _items;
    };
    var _getHabitInfo=function(){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/info/'+globalData.habitId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        userInfo:commonService.wxUserInfo,
        getDetail:_getDetail,
        take:_take,
        getHabitInfo:_getHabitInfo
    }
}]);
app.factory('habitsRecordsService',['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    /*获取打卡数据*/
    var _getCard=function(habitId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/records/card/get/'+habitId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    /*打卡*/
    var _addCard=function(habitId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/records/card/add/'+habitId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    /*打卡心情记录*/
    var _addRecord=function(habitId, notes){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/records/add/'+habitId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId,
                    notes:notes
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    /*打卡图片上传*/
    var _addRecordImg=function(id,serverId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/records/uploadfile/'+id,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    serverid:serverId
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        getCard:_getCard,
        addRecord:_addRecord,
        addRecordImg:_addRecordImg,
        addCard:_addCard,
        memberInfo:commonService.member
    }
}]);

app.factory('habitsJoinService',['$http', '$q', 'commonService', function ($http, $q,commonService){
    var url=commonService.serviceUrl;
    var _getHabitInfo=function(){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/info/'+globalData.habitId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _joinHabit=function(target){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/my/join/'+globalData.habitId,
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId,
                    target:target
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        getHabitInfo:_getHabitInfo,
        joinHabit:_joinHabit
    }
}]);
app.factory('habitsNewsService', ['$http', '$q', 'commonService', function ($http, $q,commonService) {
    var url=commonService.serviceUrl;
    var _items=[];
    var _getDetail=function(start,end){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'api/habits/detail/all',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify({
                    openid:commonService.openId,
                    appid:commonService.habitAppId,
                    startindex:start,
                    endindex:end
                });
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _take=function(items){
        for(var i=0; i<items.length;i++){
            _items.push(items[i]);
        }
        return _items;
    };
    var _clear=function(){
        _items=[];
    };
    return{
        userInfo:commonService.wxUserInfo,
        memberInfo:commonService.member,
        getDetail:_getDetail,
        take:_take,
        clear:_clear
    }
}]);

/***********end习惯********************/

/***********start 习惯********************/
app.factory('coursesService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;

    var _get=function(courseId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/HomeController.ashx?method=info",
            params:{courseId:courseId,openId:commonService.openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        get:_get,
        memberInfo:commonService.member
    }
}]);

/**************end习惯********************/

