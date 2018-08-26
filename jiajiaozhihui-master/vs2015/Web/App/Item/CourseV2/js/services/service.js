
/**
 * Created by lenovo on 2016/7/13.
 */

app.factory('initService', ['$http', '$q', 'localStorageService','seSettings',function ($http, $q, localStorageService,seSettings) {
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
            localStorageService.set("baseinfo", response);
            deferred.resolve(response);
            wxconfig(response);
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
            debug: false,
            appId: res.info.jsSdk.appId,
            timestamp: res.info.jsSdk.timestamp,
            nonceStr: res.info.jsSdk.nonceStr,
            signature: res.info.jsSdk.signature,
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','previewImage','chooseWXPay','getLocation','scanQRCode']
        });
    };

    return {
        init: _init
    }
} ]);

app.factory('cacheService', ['localStorageService', function (localStorageService) {
    return {
        base:localStorageService.get("baseinfo")
    }
} ]);



/*
 1：获取微信用户信息
 2：获取微信jssdk配置信息
 3：支付配置信息
 4：微信收货信息
 5：附加参数state
 * */
app.factory('initWeixinService',['$http','$q','localStorageService','$location','seSettings',function($http,$q,localStorageService,$location,seSettings){
    var initWeixinServiceFactory={};

    var _wxInfo={
        userInfo:{},
        jsSdkInfo:{},
        stateInfo:{},
        share:''
    };
    var deferred = $q.defer();
    /*获取微信信息(用户/jssdk/state)*/
    var _getWeixinInfo=function(){
        var courseParams= $location.search();
        if(!isEmptyObject(courseParams)){
            localStorageService.set('courseUserInfoParams',{o:courseParams.o,m:courseParams.m})
        }else{
            courseParams=localStorageService.get('courseUserInfoParams');
        }
        var serviceUrl=seSettings.config.resolverServiceUrl;

        $http({
            method:'POST',
            url:serviceUrl+"?t="+Math.random(),
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({o:courseParams.o,m:courseParams.m});
            }
        }).success(function(response){

            console.log(response);
            var info= JSON.parse(response.Info);
            console.log(info);
            localStorageService.set('weiXinUserInfoDataLocalStorage',info.UserInfo);
            localStorageService.set('weiXinJsSdkInfoDataLocalStorage',info.JsSdk);
            localStorageService.set('weiXinstateInfoDataLocalStorage',JSON.parse(info.State));
            localStorageService.set('weiXinShareDataLocalStorage',info.Share);

            _wxInfo.userInfo = info.UserInfo;

            _wxInfo.jsSdkInfo = info.JsSdk;
            _wxInfo.stateInfo = JSON.parse(info.State);
            _wxInfo.share=info.Share;
            deferred.resolve(response);

        }).error(function(err, status){
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _jsSdk=function(data){
        wx.config({
            debug:false,
            appId:data.AppId,
            timestamp:data.Timestamp,
            nonceStr:data.NonceStr,
            signature:data.Signature,
            jsApiList:[
                'onMenuShareTimeline','onMenuShareAppMessage','chooseImage','previewImage','uploadImage','downloadImage',
                'startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd',
                'uploadVoice','downloadVoice','chooseWXPay'
            ]
        });
    };
    var _reflesh=function(){
        _wxInfo.userInfo=localStorageService.get('weiXinUserInfoDataLocalStorage');
        _wxInfo.jsSdkInfo=localStorageService.get('weiXinJsSdkInfoDataLocalStorage');
        _wxInfo.stateInfo=localStorageService.get('weiXinstateInfoDataLocalStorage');
        _wxInfo.share=localStorageService.get('weiXinShareDataLocalStorage');
    };
    var isEmptyObject=function(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    };

    initWeixinServiceFactory.getWeixinInfo=_getWeixinInfo;
    initWeixinServiceFactory.wxInfo=_wxInfo;
    initWeixinServiceFactory.jsSdk=_jsSdk;
    initWeixinServiceFactory.reflesh=_reflesh;
    return initWeixinServiceFactory;
}]);

app.factory('commonService',['seSettings','cacheService',function(seSettings,cacheService){
    var data=cacheService.base.info;
    return{
        /*应用Id*/
        appId:data.appId,
        /*当前用户信息*/
        openId:data.openId,
        /*分享者*/
        share:data.sharer,
        /*微信用户信息*/
        wxUserInfo:data.wxUserInfo,
        /*服务器地址*/
        serviceUrl:seSettings.config.serviceUrl,
        //客户端地址
        clientUrl:seSettings.config.clientUrl,
        /*分享作品时的作品Id*/
        fileId:data.objectId,
        /*入口*/
        hash:data.hash,
        /*年龄计算*/
        getAge:function(date){
            if ( date==null){
                date=new Date();
            }
            var yearOld=new Date(date).getFullYear();
            var yearNow=new Date().getFullYear();
            return yearNow-yearOld;
        },
        /*性别*/
        sex:[{value:'男',text:'男'},{value:'女',text:'女'}]
    }
}]);

app.factory('wxJsSdkService',['$http','$q','seSettings','$location',function($http,$q,seSettings,$location){

    var _image={
        localIds:[],
        current:'',
        urls:[],
        serverId:''
    };
    var _voice={
        localId:'',
        serverId:''
    };
    var _events={
        completeFn:function(){}
    }
    //分享朋友圈
    var _onMenuShareTimeline=function(data){
        wx.onMenuShareTimeline({
            title:data.title, // 分享标题
            link:data.link,// 分享链接
            imgUrl:data.imgUrl,// 分享图标
            success:function(res){

            },
            cancel:function(res){

            }
        });
    };
    //分享给朋友
    var _onMenuShareAppMessage=function(data){
        wx.onMenuShareAppMessage({
            title:data.title,// 分享标题
            link:data.link,// 分享链接
            desc:data.desc,// 分享描述
            imgUrl:data.imgUrl, // 分享图标
            type:data.type,// 分享类型,music、video或link，不填默认为link
            dataUrl:data.dataUrl,//如果type是music或video，则要提供数据链接，默认为空
            success:function(res){

            },
            cancel:function(res){

            }
        });
    };
    var _chooseImage=function(f){
        wx.chooseImage({
            count: 1,//默认9
            sizeType:['compressed'],// 可以指定是原图还是压缩图，默认二者都有 ['original', 'compressed']
            sourceType:['album','camera'],// 可以指定来源是相册还是相机，默认二者都有 ['album', 'camera']
            success:function(res){
                _image.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                f();
            }
        });
    };
    var _previewImage=function(){
        wx.previewImage({
            current: _image.current, // 当前显示图片的http链接
            urls: _image.urls // 需要预览的图片http链接列表
        });
    };
    var _uploadImage=function(f){
        wx.uploadImage({
            localId: _image.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                _image.serverId = res.serverId; // 返回图片的服务器端ID
                f(res);
            }
        });
    };
    var _downloadImage=function(){
        wx.downloadImage({
            serverId: _image.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                _image.localIds[0] = res.localId; // 返回图片下载后的本地ID
            }
        });
    };
    var _startRecord=function(f){
        wx.startRecord();
        f();
    };
    var _stopRecord=function(f){
        wx.stopRecord({
            success: function (res) {
                _voice.localId = res.localId;
                f();
            }
        });
    };
    var _onVoiceRecordEnd=function(){

    };

    wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
            _voice.localId = res.localId;
            alert('录音时间已超过一分钟');
            _events.completeFn();
        }
    });

    var _playVoice=function(){

        wx.playVoice({
            localId: _voice.localId // 需要播放的音频的本地ID，由stopRecord接口获得
        });
    };
    var _pauseVoice=function(){
        wx.pauseVoice({
            localId: _voice.localId // 需要暂停的音频的本地ID，由stopRecord接口获得
        });
    };
    var _stopVoice=function(){
        wx.stopVoice({
            localId: _voice.localId // 需要停止的音频的本地ID，由stopRecord接口获得
        });
    };
    var _onVoicePlayEnd=function(){
        wx.onVoicePlayEnd({
            success: function (res) {
                _voice.localId = res.localId; // 返回音频的本地ID
            }
        });
    };
    var _uploadVoice=function(f){
        wx.uploadVoice({
            localId: _voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            //localId:'weixin://resourceid/edd4af13bf328075d6fed8de02fa33be',
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                _voice.serverId = res.serverId; // 返回音频的服务器端ID
                f(res)
            }
        });
    };
    var _downloadVoice=function(){
        wx.downloadVoice({
            serverId: _voice.localId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                _voice.localId = res.localId; // 返回音频的本地ID
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
    var _getVoiceLocalId=function(){
        return _voice.localId();
    };
    var _setVoiceLocalId=function(localId){
        _voice.localId=localId;
    }
    var _clearImageData=function(){
        _image.localIds=[];
        _image.current='';
        _image.urls=[];
        _image.serverId='';
    };
    var _clearVoiceDate=function(){
        _voice.localId='';
        _voice.serverId='';
    };
    return{
        share:{
            onMenuShareTimeline:_onMenuShareTimeline,
            onMenuShareAppMessage:_onMenuShareAppMessage,
        },
        image:{
            chooseImage:_chooseImage,
            previewImage:_previewImage,
            uploadImage:_uploadImage,
            downloadImage:_downloadImage,
        },
        voice:{
            startRecord:_startRecord,
            stopRecord:_stopRecord,
            onVoiceRecordEnd:_onVoiceRecordEnd,
            playVoice:_playVoice,
            pauseVoice:_pauseVoice,
            stopVoice:_stopVoice,
            onVoicePlayEnd:_onVoicePlayEnd,
            uploadVoice:_uploadVoice,
            downloadVoice:_downloadVoice,
        },
        events:function(event){
            _events.completeFn=event;
        },
        setPreviewImageUrls:_setPreviewImageUrls,
        setImageLocalId:_setImageLocalId,
        getImageLocalId:_getImageLocalId,
        getVoiceLocalId:_getVoiceLocalId,
        clearImageData:_clearImageData,
        clearVoiceData:_clearVoiceDate,
        setVoiceLocalId:_setVoiceLocalId
    }
}]);

app.factory('homeService',['$http','$q','commonService',function($http,$q,commonService){

    var homeServiceFactory={};
    var openId=commonService.openId;
    var _info={
        items:{},
        item:{}
    };
    var url=commonService.serviceUrl;
    var _gets=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/HomeController.ashx?method=infos",
            params:{
                openId:openId
            }
        }).success(function(response){
            deferred.resolve(response);
            _info.items=response;
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _get=function(courseId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/HomeController.ashx?method=info",
            params:{courseId:courseId,openId:openId}
        }).success(function(response){
            deferred.resolve(response);
            _info.item=response;
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _href=function(mediaType,courseId,freeVideo){

        var href="javascript:void(0)";
        if(mediaType==1){
            if(freeVideo!=undefined){
                href="#freevideo?courseId="+courseId;
            }else{
                href="#video?courseId="+courseId;
            }
        }else if(mediaType==2){
            href="#singleaudio?courseId="+courseId;
        }else if(mediaType==3){
            href="#multipleaudio?courseId="+courseId;
        }
        return href;
    };

    var _isStart=function(startDate){
        var m= moment()-moment(startDate);
        return m
    };
    var _pay=function(cid,ctype){
        return commonService.serviceUrl + "link/pay/wmm_course.html?id=" + cid;
    };


    homeServiceFactory.gets=_gets;
    homeServiceFactory.get=_get;
    homeServiceFactory.pay=_pay;
    homeServiceFactory.info=_info;
    homeServiceFactory.href=_href;
    homeServiceFactory.isStart=_isStart;

    return homeServiceFactory;
}]);
app.factory('courseService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;
    var openId=commonService.openId;

    var _isBuy=function(courseId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/BuyController.ashx?method=ib",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({openId:openId,courseId:courseId});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function(err, status){
            deferred.reject(err);
        })
        return deferred.promise;
    };
    var _learn=function(courseId,ctype){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/CourseController.ashx?method=learn",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({openId:openId,courseId:courseId,ctype:ctype});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function(err, status){
            deferred.reject(err);
        })
        return deferred.promise;
    };

    var _myCourse=function(){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/CourseController.ashx?method=mycourse",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({openId:openId});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function(err, status){
            deferred.reject(err);
        })
        return deferred.promise;
    };
    var _viewCourse=function(courseId,themeId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/CourseController.ashx?method=view",
            params:{
                courseId:courseId,
                themeId:themeId,
                openId:openId
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function(err, status){
            deferred.reject(err);
        })
        return deferred.promise;
    };
    return {
        isBuy:_isBuy,
        learn:_learn,
        myCourse:_myCourse,
        viewCourse:_viewCourse
    };
}]);

app.factory('wxShareService',['commonService',function(commonService){
    var _shareData={
        title: '[家教智慧]在线课程', // 分享标题
        desc:'每一次学习都应有结果',
        groupTitle:'[家教智慧]在线课程',
        link:commonService.serviceUrl+'link/wmmweikei.html',
        img_url: commonService.serviceUrl + 'app/item/courseV2/imgs/jjzh.jpg', // 分享图标
        type:'link',
        dataUrl:'',
        success:function(){},
        error:function(){}
    };

    var _default=function(){
        var timelineData=_shareData;
        var appMessage=_shareData;

        wx.onMenuShareTimeline(timelineData);
        wx.onMenuShareAppMessage(appMessage);
    };
    var _custom=function(title,desc,id,page,remark){
        // 分享链接
        var link=commonService.serviceUrl+'app/appstart/coursev2/baseinfo.ashx?redirect_url='+commonService.clientUrl+'/app/item/courseV2/index.html?r=a=app001|h='+page+'|id='+id+'|r='+remark;
        var data={
            title:title,
            desc:desc,
            groupTitle:title,
            link:link
        };
        var params= $.extend({},_shareData,data);
        var timelineData=params;
        var appMessage=params;

        wx.onMenuShareTimeline(timelineData);
        wx.onMenuShareAppMessage(appMessage);
    };
    return {
        custom:_custom,
        default:_default
    };
}]);

app.factory('wxShareService1',['commonService',function(commonService){
    var _shareData={
        title: '[智慧父母特训营]', // 分享标题
        desc:'一次有结果的学习旅程',
        groupTitle:'[智慧父母特训营]',
        link: 'http://weixin.jiajiaozhihui.cn/app/appstart/course/baseinfo.ashx?redirect_url=http://courses.jiajiaozhihui.cn/app/default.html&state={"appid":"app001","hash":"card"}', // 分享链接
        imgUrl: 'http://courses.jiajiaozhihui.cn/content/imgs/logo.png', // 分享图标
        type:'link',
        dataUrl:'',
        success:function(){},
        error:function(){}
    };

    var _default=function(){
        var timelineData=_shareData;
        var appMessage=_shareData;

        wx.onMenuShareTimeline(timelineData);
        wx.onMenuShareAppMessage(appMessage);
    };
    var _custom=function(title,desc,id,page){
        // 分享链接
        var link=commonService.serviceUrl+'app/appstart/course/baseinfo.ashx?redirect_url='+commonService.clientUrl+'/app/default.html&state={"appid":"app001","hash":"empty","courseId":"'+id+'","path":"'+page+'"}'
        var date={
            title:title,
            desc:desc,
            groupTitle:title,
            link:link,
        };
        var params= $.extend({},_shareData,data);
        var timelineData=params;
        var appMessage=params;

        wx.onMenuShareTimeline(timelineData);
        wx.onMenuShareAppMessage(appMessage);
    };
    return {
        custom:_custom,
        default:_default
    };
}]);

app.factory('advService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;
    return{
        showAdv:function(){
            var deferred=$q.defer();
            $http({
                method:'GET',
                url:url+"app/Project/Read/Controller/AdvController.ashx?method=adv"
            }).success(function(response){
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        },showSingleAdv:function(id){
            var deferred=$q.defer();
            $http({
                method:'GET',
                url:url+"app/Project/Read/Controller/AdvController.ashx?method=info",
                params:{id:id}
            }).success(function(response){
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
}]);

app.factory('audio', ['$document',function($document) {
    var audio = $document[0].createElement('audio');
    audio.volume=1;
    return audio;
}]);
app.factory('playerService',['audio','$rootScope',function(audio,$rootScope){
    var player = {
        playing: false,
        current: null,
        ready: false,
        progress:0,

        play: function(url) {
            if (player.playing){
                player.stop();
                return;
            };
            player.playing = true;
            audio.src =url;
            audio.play(); // Start playback of the url

        },
        stop:function() {
            if (player.playing) {
                audio.pause(); // stop playback
                player.playing = false;
            }
        },
        currentTime: function() {
            return audio.currentTime;
        },
        currentDuration: function() {
            return parseInt(audio.duration);
        }
    };
    audio.addEventListener('ended', function() {
        $rootScope.$apply(player.stop());
    });
    audio.addEventListener('timeupdate', function(evt) {
        $rootScope.$apply(function() {
            player.progress = player.currentTime();
            player.progress_percent = player.progress / player.currentDuration();
        });
    });
    audio.addEventListener('canplay', function(evt) {
        $rootScope.$apply(function() {
            player.ready = true;
        });
    });
    return player;
}]);

app.factory('personalService',['$http','$q','commonService',function($http,$q,commonService){
    var personalServiceFactory={};

    var url=commonService.serviceUrl;
    var _add=function(data){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'app/Project/Course/Controller/PersonalController.ashx?method=add',
            headers:{
                'Content-Type': 'application/json; charset=utf-8'
            },transformRequest:function(){
                return JSON.stringify(data);
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var openId=commonService.openId;
    var appId=commonService.appId;

    var _getUserInfo=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'app/Project/Course/Controller/PersonalController.ashx?method=info',
            params:{appId:appId,openId:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    var _update=function(age,tel,sex){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'app/Project/Course/Controller/PersonalController.ashx?method=update',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return JSON.stringify({openId:openId,age:age,telePhone:tel,sex:sex});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    personalServiceFactory.add=_add;
    personalServiceFactory.getUserInfo=_getUserInfo;
    personalServiceFactory.update=_update;
    return personalServiceFactory;
}]);

app.factory('articleReleaseService',['$http','$q','commonService',function($http,$q,commonService){
    var info={
        get:function(id){
            var deferred = $q.defer();
            var url=commonService.serviceUrl;
            $http({
                method:'POST',
                url:url+"app/Project/Information/Controller/InfoController.ashx?method=info",
                params:{id:id}
            }).success(function(response){
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
    return info;
}]);


app.factory('TestService',['$http','$q','commonService',function($http,$q,commonService){
    var test={
        get:function(parentId){
            var deferred = $q.defer();
            var url=commonService.serviceUrl;
            var openId=commonService.openId;
            $http({
                method:'GET',
                url:url+"app/Project/Parents/Controller/QuestionBankController.ashx?method=get",
                params:{parentId:parentId,openId:openId}
            }).success(function(response){
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    };
    return test;
}]);

app.factory("bagsService",['$http','$q','commonService',function($http,$q,commonService){
    var openId=commonService.openId;
    var url=commonService.serviceUrl;
    var _get=function(bagId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/BagsController.ashx?method=infos",
            params:{bagId:bagId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _bags=function(bagId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/CourseController.ashx?method=bags",
            params:{bagId:bagId,openId:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _isBagBuy=function(bagId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/BuyController.ashx?method=ba",
            params:{bagId:bagId,openId:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _bagLearn=function(bagId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/CourseController.ashx?method=baglearn",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({openId:openId,bagId:bagId});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function(err, status){
            deferred.reject(err);
        })
        return deferred.promise;
    };
    return{
        get:_get,
        bags:_bags,
        isBagBuy:_isBagBuy,
        bagLearn:_bagLearn
    }
}]);

app.factory('myService',['$http','$q','commonService',function($http,$q,commonService){
    var openId=commonService.openId;
    var url=commonService.serviceUrl;
    var _get=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/MyController.ashx?method=my",
            params:{openId:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _list=function(theme){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/MyController.ashx?method=list",
            params:{openId:openId,theme:theme}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    return{
        get:_get,
        list:_list
    }
}]);

app.factory('courseListService',['$http','$q','commonService',function($http,$q,commonService){
    var openId=commonService.openId;
    var url=commonService.serviceUrl;

    var _getOnline=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/CourseListController.ashx?method=online",
            params:{openId:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _getBag=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/CourseListController.ashx?method=bag",
            params:{openId:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _getCommon=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/CourseListController.ashx?method=common",
            params:{openId:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        getOnline:_getOnline,
        getBag:_getBag,
        getCommon:_getCommon
    }
}]);

app.factory('defaultService',['$http','$q','commonService',function($http,$q,commonService){

    var defaultFactory={};
    var openId=commonService.openId;
    var _info={
        items:{},
        item:{}
    };
    var url=commonService.serviceUrl;
    var _gets=function(){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/DefaultController.ashx?method=infos",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({openId:openId});
            }
        }).success(function(response){
            deferred.resolve(response);
            _info.items=response;
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _get=function(courseId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/DefaultController.ashx?method=info",
            params:{courseId:courseId,openId:openId}
        }).success(function(response){
            deferred.resolve(response);
            _info.item=response;
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _href=function(mediaType,courseId,freeVideo){
        console.log(mediaType);
        console.log(courseId);
        console.log(freeVideo);


        var href="javascript:void(0)";
        if(mediaType==1){
            if(freeVideo!=undefined){
                href="#freevideo?courseId="+courseId;
            }else{
                href="#video?courseId="+courseId;
            }
        }else if(mediaType==2){
            href="#singleaudio?courseId="+courseId;
        }else if(mediaType==3){
            href="#multipleaudio?courseId="+courseId;
        }
        return href;
    };

    var _get2=function(courseId){

    };
    var _pay=function(cid,ctype){
        return commonService.serviceUrl+"app/pay/course.html?cid="+cid+"&ctype="+ctype+"&oid="+openId+"&v="+Math.random();
    };

    defaultFactory.gets=_gets;
    defaultFactory.get=_get;
    defaultFactory.pay=_pay;
    defaultFactory.info=_info;
    defaultFactory.href=_href;

    return defaultFactory;
}]);

app.factory('gxdrService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;
    var openId=commonService.openId;
    return{
        show:function(id){
            var deferred=$q.defer();
            $http({
                method:'GET',
                url:url+"app/Project/ZXS/Controller/GxdrController.ashx?method=info",
                params:{id:id,openId:openId}
            }).success(function(response){
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        get:function(courseId){
            var deferred=$q.defer();
            $http({
                method:'POST',
                url:url+"app/Project/Course/Controller/RankingController.ashx?method=gxdrranking",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },transformRequest:function(){
                    return $.param({openId:openId,top:10,courseId:courseId});
                }
            }).success(function(response){
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
}]);

app.factory('aboutService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;

    var _getInfo=function(id){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/BagsController.ashx?method=info",
            params:{id:id}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        getInfo:_getInfo
    }
}]);

app.factory('activeCardService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;
    var openId=commonService.openId;
    var _getInfo=function(cardId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/ActiveTheCardController.ashx?method=info",
            params:{cardId:cardId,openId:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _activeCard=function(cardId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/ActiveTheCardController.ashx?method=active",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({openId:openId,cardId:cardId});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _isMyCard=function(oId){
        if(openId==oId){
            return true;
        }
        return false;
    };
    var _freeActive=function(cardId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/ActiveTheCardController.ashx?method=freeallege",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({openId:openId,cardId:cardId});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _allege=function(cardId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/ActiveTheCardController.ashx?method=registallege",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({openId:openId,cardId:cardId});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _isChecking=function(list){
        for(var i=0;i<list.length;i++){
          var info=list[i];
          if(info.openId==openId && info.isAgree==0){
              return true;
              break;
          }
        };
        return false;
    };
    var _checkState=function(list){
        var hasOpenId=false;
        var checking=false;
        for(var i=0;i<list.length;i++){
            var info=list[i];
            if(info.openId==openId){
                hasOpenId=true;
                if(info.isAgree==0){
                    checking=true;
                }else{
                    checking=false;
                }
                break;
            }
        };
        return{
            hasOpenId:hasOpenId,
            checking:checking
        }
    };
    var _hasMyAllege=function(list){
        for(var i=0;i<list.length;i++){
            var info=list[i];
            if(info.openId==openId){
                return true;
            };
        };
        return false;
    };
    var _showallege=function(cardId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/ActiveTheCardController.ashx?method=showallege",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({cardId:cardId});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _checkAllege=function(errorId,openId){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Project/Course/Controller/ActiveTheCardController.ashx?method=checkallege",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({cardId:errorId,openId:openId});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        getInfo:_getInfo,
        activeCard:_activeCard,
        isMyCard:_isMyCard,
        freeActive:_freeActive,
        allege:_allege,
        isChecking:_isChecking,
        hasMyAllege:_hasMyAllege,
        showAllege:_showallege,
        checkAllege:_checkAllege,
        checkState:_checkState
    }
}]);

app.factory('taskService',['$http','$q','commonService',function($http,$q,commonService){

    var openId=commonService.openId;
    var serverUrl=commonService.serviceUrl;
    var clientUrl=commonService.clientUrl;
    var _getConfig=function(courseId){
        var deferred = $q.defer();
        var url=commonService.serviceUrl;
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/TaskController.ashx?method=config",
            params:{courseid:courseId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var url="javascript:void(0)";
    var _gxdr=function(activeId,courseId){
        if(activeId!=undefined && activeId!=null && activeId!=0){
            url=serverUrl+'game/brainsexpert/gxdr.aspx?id='+activeId+'&openid='+openId+'&weixinid=&courseid='+courseId+''
        }
        return url;
    };
    var _zxs=function(appId,themeId,courseId){
        if(themeId!=undefined && themeId!=null && themeId!=0 ){
            url=serverUrl+'app/appstart/zxs/baseinfo.ashx?redirect_url=http://zxs.jiaxiaogongyu.com/app/back.html&state={"appid":"'+appId+'","hash":"course","themeId":"'+themeId+'","kid":"'+courseId+'"}';
        }
        return url;
    };
    var _guwen=function(expertId){

        if(expertId!=undefined && expertId!=null && expertId!=0){
            url=serverUrl+'app/appstart/qa/baseinfo.ashx?redirect_url=http://qa.jiaxiaogongyu.com/app/back.html&state={"appid":"app001","hash":"empty","path":"expertdetail","id":"'+expertId+'"}';
        }
        return url;
    };
    return{
        getConfig:_getConfig,
        gxdr:_gxdr,
        zxs:_zxs,
        guwen:_guwen
    }
}]);
app.factory('errorService',['$http','$q','seSettings',function($http,$q,seSettings){
    var url=seSettings.serviceUrl;

    var _add=function(errMsg){
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+"app/Helper/HttpResponse/ErrorProvide.ashx?method=add",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({item:'微课',msg:errMsg});
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    return {
        add: _add
    }

}]);

app.factory('learnCardService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;
    var _getCardInfo=function(bagId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Course/Controller/LearnCardController.ashx?method=info",
            params:{bagId:bagId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return {
        getCardInfo:_getCardInfo
    }
}]);

app.factory('gxdrRankingService',['$http','$q','commonService',function($http,$q,commonService){
    var url=commonService.serviceUrl;
    var openId=commonService.openId;
    var deferred = $q.defer();
    var _getCityRank=function(item,city,top){
        $http({
            method:'GET',
            url:url+"app/Project/Gxdr/Controller/RankingController.ashx?method=city",
            params:{item:item,city:city,top:top,openid:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _getProvinceRank=function(item,province,top){
        $http({
            method:'GET',
            url:url+"app/Project/Gxdr/Controller/RankingController.ashx?method=province",
            params:{item:item,province:province,top:top,openid:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _getNationwideRank=function(item,top){
        $http({
            method:'GET',
            url:url+"app/Project/Gxdr/Controller/RankingController.ashx?method=nationwide",
            params:{item:item,top:top,openid:openId}
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    return{
        getCityRank:_getCityRank,
        getProvinceRank:_getProvinceRank,
        getNationwide:_getNationwideRank
    }
}]);
