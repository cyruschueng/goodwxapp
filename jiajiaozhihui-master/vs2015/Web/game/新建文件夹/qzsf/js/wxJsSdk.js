function jsSdk() { 
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
                f(res.localIds);
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
                f(res.serverId);
            }, fail: function () {
                f("");
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
    var _uploadVoice = function (f) {
        wx.uploadVoice({
            localId: _voice.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            //localId:'weixin://resourceid/edd4af13bf328075d6fed8de02fa33be',
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                _voice.serverId = res.serverId; // 返回音频的服务器端ID
                f(res.serverId)
            }, fail: function () {
                f("");
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
            onMenuShareAppMessage:_onMenuShareAppMessage
        },
        image:{
            chooseImage:_chooseImage,
            previewImage:_previewImage,
            uploadImage:_uploadImage,
            downloadImage:_downloadImage
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
            downloadVoice:_downloadVoice
        },
        events:function(event){
            _events.completeFn=event;
        },
        getImageLocalId:_getImageLocalId,
        getVoiceLocalId:_getVoiceLocalId,

        setPreviewImageUrls:_setPreviewImageUrls,
        setImageLocalId:_setImageLocalId,
        setVoiceLocalId:_setVoiceLocalId,

        clearImageData:_clearImageData,
        clearVoiceData:_clearVoiceDate
        
    }
}