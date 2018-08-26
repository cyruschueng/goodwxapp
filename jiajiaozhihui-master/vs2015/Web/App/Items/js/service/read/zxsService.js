/**
 * Created by lenovo on 2016/7/13.
 */
'use strict'
app.factory('resolverService', ['$http', '$q', 'localStorageService', 'seSettings', function ($http, $q, localStorageService, seSettings) {
    var deferred = $q.defer();
    var _init = function () {
        var p = getQueryString("o");
        var url = seSettings.config.resolverServiceUrl;
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
    };
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
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage',
                'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd',
                'uploadVoice', 'downloadVoice', 'chooseWXPay']
        });
    };

    return {
        init: _init
    }
}]);
app.factory('cacheService', ['localStorageService', function (localStorageService) {
    return {
        base: localStorageService.get("baseinfo")
    }
}]);
/*
 1：获取微信用户信息
 2：获取微信jssdk配置信息
 3：支付配置信息
 4：微信收货信息
 5：附加参数state
 * */

app.factory('initWeixinService',['$http','$q','localStorageService','$location','seSettings','initReadService',function($http,$q,localStorageService,$location,seSettings,initReadService){
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
        var params= $location.search();
        if(!isEmptyObject(params)){
            localStorageService.set('userInfoParams',{o:params.o,m:params.m})
        }else{
            params=localStorageService.get('userInfoParams');
        }
        var serviceUrl=seSettings.config.resolverServiceUrl;
        var url=serviceUrl+"?o="+params.o+"&m="+params.m;
        $http.get(url).success(function(response){
            deferred.resolve(response);

            var info= JSON.parse(response.Info);

            localStorageService.set('weiXinUserInfoDataLocalStorage',info.UserInfo);
            localStorageService.set('weiXinJsSdkInfoDataLocalStorage',info.JsSdk);
            localStorageService.set('weiXinstateInfoDataLocalStorage',JSON.parse(info.State));
            localStorageService.set('weiXinShareDataLocalStorage',info.Share);

            _wxInfo.userInfo = info.UserInfo;
            _wxInfo.jsSdkInfo = info.JsSdk;
            _wxInfo.stateInfo = JSON.parse(info.State);
            _wxInfo.share=info.Share;


        }).error(function (err, status) {
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
    var isEmptyObject=function(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    };

    initWeixinServiceFactory.getWeixinInfo=_getWeixinInfo;
    initWeixinServiceFactory.wxInfo=_wxInfo;
    initWeixinServiceFactory.jsSdk=_jsSdk;
    return initWeixinServiceFactory;
}]);
app.factory('initReadService',['$http','$q','seSettings',function($http,$q,seSettings){
    var initReadServiceFactory={};

    var _readInfo={
        baseInfo:{},
        readUserInfo:{},
        wxUserInfo:{},
        award:{},
        isAttention:false
    };

    /*获取知行社信息（知行社基本信息/个人信息/微信用户数据）*/
    var _getReadInfo=function(appId,openId){
        var deferred = $q.defer();
        var url=seSettings.config.serviceUrl;
        $http({
            method:'GET',
            url:url+'app/Project/Read/Controller/InitReadController.ashx?method=get',
            params:{
                appId:appId,
                openId:openId
            }
        }).success(function(response){
            deferred.resolve(response);

            _readInfo.baseInfo=response.readInfo;
            _readInfo.readUserInfo=response.readUserInfo;
            _readInfo.wxUserInfo=response.wxUserInfo;
            _readInfo.award=response.award;
            _readInfo.isAttention=response.isAttention;

        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    initReadServiceFactory.getReadInfo=_getReadInfo;
    initReadServiceFactory.readInfo=_readInfo;

    return initReadServiceFactory;
}]);

app.factory('commonService', ['seSettings', 'cacheService', function (seSettings, cacheService) {
    var data = cacheService.base.info;
    var remark = {};
    if (data.remark != "") remark = JSON.parse(data.remark);

    return{
        /*应用Id*/
        appId:data.appId,
        /*当前用户信息*/
        openId:data.openId,
        /*分享者*/
        share:data.sharer,
        /*微信用户信息*/
        wxUserInfo:data.wxUserInfo,
        /*阅读社用户信息*/
        readUserInfo:data.other.readUserInfo,
        /*阅读社信息*/
        readInfo: data.other.readInfo,
        /*服务器地址*/
        serviceUrl:seSettings.config.serviceUrl,
        /*分享作品时的作品Id*/
        fileId: data.objectId,
        /*积分*/
        award:data.other.award,
        /*年龄计算*/
        getAge:function(date){
            if ( date==null){
                date=new Date();
            }
            var yearOld=new Date(date).getFullYear();
            var yearNow=new Date().getFullYear();
            return yearNow-yearOld;
        },
        getFileType:function(type){
            if(type==0){
                return '诵读';
            }else if(type==1){
                return '故事';
            }

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
                console.log(res);
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

app.factory('readFileService',['$http','$q','commonService',function($http,$q,commonService){
    var userTaskServiceFactory={};

    var openId=commonService.openId;
    var appId=commonService.appId;

    var url=commonService.serviceUrl;
    var _add=function(imageMediaId,voiceMediaId,fileType,comment,taskId){
        var data={
            appId:appId,
            openId:openId,
            ImageMediaId:imageMediaId,
            VoiceMediaId:voiceMediaId,
            fileType:fileType,
            comment:comment,
            planId:taskId
        };
        var deferred = $q.defer();
        $http({
            method:'POST',
            url:url+'app/Project/Read/Controller/FileController.ashx?method=upload',
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
    userTaskServiceFactory.add=_add;
    return userTaskServiceFactory;
}]);

app.factory('homeService',['$http','$q','commonService',function($http,$q,commonService){
    var homeServiceFactory={};

    var openId=commonService.openId;
    var appId=commonService.appId;

    var _info={
        pageIndex:1,
        pageSize:10,
        isEnd:false,
        items:[]
    };
    var url=commonService.serviceUrl;
    var _gets=function(isTop){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+"app/Project/Read/Controller/HomeController.ashx?method=all",
            params:{
                appId:appId,
                openId:openId,
                isTop:isTop,
                pageIndex:_info.pageIndex,
                pageSize:_info.pageSize
            }
        }).success(function(response){
            deferred.resolve(response);
            _info.pageIndex+=1;
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _take=function(items){
        for(var i=0; i<items.length;i++){
            _info.items.push(items[i]);
        }
        return _info.items;
    };
    var _get=function(fileId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'app/Project/Read/Controller/HomeController.ashx?method=personal',
            params:{
                appId:appId,
                openId:openId,
                fileId:fileId
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _top=function(){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'app/Project/Read/Controller/HomeController.ashx?method=top',
            params:{
                appId:appId,
                openId:openId,
                pageIndex:_info.pageIndex,
                pageSize:_info.pageSize
            }
        }).success(function(response){
            deferred.resolve(response);
            _info.pageIndex+=1;
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _init=function(){
        _info.items=[];
        _info.pageIndex=1;
    };
    var _getTaskAndAdv=function(advs){
        for(var i=0;i<advs.length;i++){
            var start=+advs[i].positions-1;
            _info.items.splice(start,0,{type:'adv',data:advs[i]});
        }
        return _info.items;
    };
    var _delete=function(fileId){
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'app/Project/Read/Controller/HomeController.ashx?method=del',
            params:{
                fileId:fileId
            }
        }).success(function(response){
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    var _getMyAllTask=function(){
        var url=commonService.serviceUrl;
        var deferred = $q.defer();
        $http({
            method:'GET',
            url:url+'app/Project/Read/Controller/MyAllWorkController.ashx?method=all',
            params:{
                appId:appId,
                openId:openId,
                pageIndex:_info.pageIndex,
                pageSize:_info.pageSize
            }
        }).success(function(response){
            deferred.resolve(response);
            _info.pageIndex+=1;
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    homeServiceFactory.gets=_gets;
    homeServiceFactory.take=_take;
    homeServiceFactory.get=_get;
    homeServiceFactory.init=_init;
    homeServiceFactory.top=_top;
    homeServiceFactory.delete=_delete;
    homeServiceFactory.getTaskAndAdv=_getTaskAndAdv;
    homeServiceFactory.getMyAllTask=_getMyAllTask;

    return homeServiceFactory;
}]);

app.factory('wxShareService',['commonService',function(commonService){
    var _shareData={
        title: '[家教智慧]诵读社', // 分享标题
        desc:'培养孩子优秀品格和良好习惯的最佳方法！',
        groupTitle:'[家教智慧]诵读社',
        link: commonService.serviceUrl+'link/read.html',
        imgUrl: commonService.serviceUrl+'/content/imgs/logo1.png', // 分享图标
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
        var link=commonService.serviceUrl+'app/appstart/readv2/baseinfo.ashx?redirect_url='+commonService.serviceUrl+'app/items/read.html?r=a=app001|h='+page+'|id='+id;
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
app.factory('topService',['$http','$q','commonService',function($http,$q,commonService){
    var top={
        wxUser:commonService.wxUserInfo,
        appId:commonService.appId,
        set:function(fileId){
            var deferred = $q.defer();
            var url=commonService.serviceUrl;
            $http({
                method:'POST',
                url:url+"app/Project/Read/Controller/TopController.ashx?method=top",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },transformRequest:function(){
                    var data={
                        fileId:fileId
                    }
                    return $.param(data);
                }
            }).success(function(response){
                deferred.resolve(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
    return top;
}]);

app.factory('likeService',['$http','$q','commonService',function($http,$q,commonService){
    var like={
        wxUser:commonService.wxUserInfo,
        appId:commonService.appId,
        add:function(fileId){
            var data={
                appId:this.appId,
                readFileId:fileId,
                openId:this.wxUser.openId,
                nickName:this.wxUser.nickName,
                headImgUrl:this.wxUser.headImgUrl
            };
            var deferred = $q.defer();
            var url=commonService.serviceUrl;
            $http({
                method:'POST',
                url:url+"app/Project/Read/Controller/LikeController.ashx?method=add",
                headers:{
                    'Content-Type': 'application/json; charset=utf-8'
                },transformRequest:function(){
                    return JSON.stringify(data);
                }
            }).success(function(response){
                deferred.resolve(response);
                console.log(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
    return like;
}]);

app.factory('commentService',['$http','$q','commonService',function($http,$q,commonService){
    var comment={
        wxUser:commonService.wxUserInfo,
        appId:commonService.appId,
        add:function(context, fileId){
            var data={
                appId:this.appId,
                readFileId:fileId,
                openId:this.wxUser.openId,
                nickName:this.wxUser.nickName,
                headImgUrl:this.wxUser.headImgUrl,
                details:context
            };
            var deferred = $q.defer();
            var url=commonService.serviceUrl;

            $http({
                method:'POST',
                url:url+"app/Project/Read/Controller/CommentController.ashx?method=add",
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
        }
    }
    return comment;
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
            url:url+'app/Project/Read/Controller/PersonalController.ashx?method=add',
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
            url:url+'app/Project/Read/Controller/PersonalController.ashx?method=info',
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
            url:url+'app/Project/Read/Controller/PersonalController.ashx?method=update',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },transformRequest:function(){
                return $.param({appId:appId,openId:openId,age:age,tel:tel,sex:sex});
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
                console.log(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
    return info;
}]);

app.factory('taskService',['$http','$q','commonService',function($http,$q,commonService){
    var task={
        get:function(){
            var deferred = $q.defer();
            var url=commonService.serviceUrl;
            $http({
                method:'GET',
                url:url+"app/Project/Read/Controller/TaskController.ashx?method=task"
            }).success(function(response){
                deferred.resolve(response);
                console.log(response);
            }).error(function (err, status) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }
    return task;
}]);