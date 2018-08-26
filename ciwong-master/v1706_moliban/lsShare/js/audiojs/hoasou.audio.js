function AudioClass(ProgressBar){
    var timer,
    _self = this,
    isPlay=false,
    firstPlay=true,
    canClick=true,
    audioBtn = $(ProgressBar).siblings('.audioBtn'),    // 播放/暂停/载入中按钮
    progressOption={barWidth:0,progressWidth:0,progressValue:0};
    _self.audio = $(ProgressBar).siblings('audio').get(0)
    _self.duration = 0;
    _self.errorMsg = '';
    _self.errorCode = 0;
    // 弹出框兼容处理
    if(!$.alert) $.alert = function(msg){alert(msg)}
    // 储存音频列表以便给外围函数操作
    if(!window["AudioList"]){
        _self.index = 0;
        window["AudioList"] = []
    }else{
        _self.index = window["AudioList"].length;
    }

    $(_self.audio).attr('index',_self.index)
    window["AudioList"].push(_self)
    // 获取音频
    // function getAudio(){
    //     return _self.audio;
    // }
    // 格式化时间
    function formatTime(second){
        var h = Math.floor(second/3600),
            m = ('0'+Math.floor((second%3600)/60)).substr(-2),
            s = ('0'+Math.ceil(second%60)).substr(-2)
        return h?h+':'+m+':'+s : m+':'+s
    }
    // 获取鼠标指针
    function getMouse(e){
        return e.targetTouches.length==1?e.targetTouches[0]:false;
    }
    // 设置进度条信息
    function setProgressOption(e){
        var mousePostion = e.pageX - $(ProgressBar).offset().left,
            barWidth = $(ProgressBar).width(),
            progressWidth = mousePostion<0? 0 : mousePostion>barWidth? barWidth : mousePostion;
            progressValue = parseFloat(progressWidth/barWidth);
        if( (isNaN(barWidth) || barWidth<=0) || (isNaN(progressValue) || progressValue>1) ){
            $.alert('进度条总长度获取错误');console.log(barWidth,progressValue);
            return ;
        }
        if(progressValue>1) progressValue = 1;
        progressOption = {barWidth:barWidth,progressWidth:progressWidth,progressValue:progressValue}
        _self.audio.currentTime = _self.duration*progressOption.progressValue

        _self.play('set')
        return progressOption;
    }
    // 播放
    _self.play = function(action){
        clearInterval(timer)
        if(_self.errorCode){    // errorCode：1[加载失败] 2[正在加载中]
            $.alert(_self.errorMsg)
            _self.errorCode = 0;
        }
        // 第一次播放
        if(firstPlay){
            _self.duration = _self.audio.duration
            // 音频是否已准备播放
            if( (_self.audio.readyState!==undefined && _self.audio.readyState!=4) || !_self.audio.currentTime || _self.audio.currentTime<0.2 || !_self.duration || _self.duration<0.2 ){
                // 进入这里则从未播放
                isPlay = false;
                if(!audioBtn.hasClass('audio-loading')) audioBtn.addClass('audio-loading');
                _self.audio.play()
                // $.alert('play -'+isPlay+'- readyState:'+_self.audio.readyState+'\ncurrentTime:'+_self.audio.currentTime+'\nduration:'+_self.duration)
                timer = setInterval(function(){
                    _self.play()
                },200)
                setUI()
                return false;
            }else{
                isPlay = true;
                firstPlay = false;
            }
        }
        // 设置音频对象时没能及时更新currentTime状态，当set时不更新进度百分比状态
        if(action!='set') {
            progressOption.progressValue = _self.audio.currentTime/_self.duration
            if(progressOption.progressValue>1) progressOption.progressValue = 1;
        }
        setUI()

        // 播放完成
        if(progressOption.progressValue==1){
            _self.stop();
            return;
        }
        // 不断更新播放进度
        timer = setInterval(function(){
            _self.play()
        },100)
        if(!isPlay) {   // 当前没有播放
            _self.audio.play()
            isPlay = true;
        }
    }
    // 暂停
    _self.pause = function(){
        clearInterval(timer)
        isPlay = false;
        _self.audio.pause()
        setUI()
    }
    // 停止
    _self.stop = function(){
        clearInterval(timer)
        isPlay = false;
        _self.audio.pause()
        progressOption.progressValue = 1;
        // _self.audio.currentTime = 0;
        setTimeout(function(){
            progressOption.progressValue = 0;
            _self.audio.currentTime = 0;
            setUI()
        },200)
        setUI()
    }
    // Css效果同步
    function setUI(){
        if(!_self.duration || _self.duration==0.1 || _self.audio.currentTime===undefined){
            // if(!audioBtn.hasClass('audio-loading')) audioBtn.addClass('audio-loading');
            $(ProgressBar).siblings('.timeBox').children('.currentTime').html('');
            $(ProgressBar).siblings('.timeBox').children('.duration').text('');
            setTimeout(function(){
                setUI()
            },200)
            return;
        }
        if(!firstPlay && audioBtn.hasClass('audio-loading')) audioBtn.removeClass('audio-loading');
        $(ProgressBar).siblings('.timeBox').children('.currentTime').html(formatTime(_self.audio.currentTime)+'<i class="mlr10"> / </i>');
        $(ProgressBar).siblings('.timeBox').children('.duration').text(formatTime(_self.duration));
        $(ProgressBar).children('h3').css('width',progressOption.progressValue*100+'%');
        if(isPlay){
            audioBtn.addClass('playing')
        }else{
            audioBtn.removeClass('playing');
        }
    
    }
    // 加载失败
    function loadError(){
        _self.errorCode = 1
        _self.errorMsg = '音频加载失败'
        $(ProgressBar).siblings('.loadError').html('<span class="f-error_icon">!</span>')
        // $(ProgressBar).siblings('.timeBox').hide()
    }

    ProgressBar.addEventListener('touchstart',function(e){
        e.preventDefault();
        var touch = getMouse(e)
        if(!touch){
            $.alert('鼠标指针获取失败')
            return;
        }
        setProgressOption(touch)    
    })
    ProgressBar.addEventListener('touchmove',function(e){
        e.preventDefault();
        status==2
        console.log('touchmove');
        var touch = getMouse(e)
        if(!touch){
            $.alert('鼠标指针获取失败')
            return;
        }
        setProgressOption(touch)
    })
    // 点击播放
    audioBtn.get(0).addEventListener('click',function(){
        if(!canClick) return;
        canClick=false;
        setTimeout(function(){canClick=true},1000)
        audioBtn.removeClass('audio-loading');
        // 暂停所有audio
        for (var i = 0; i < AudioList.length; i++) {
            if(_self.index!=i){
                AudioList[i].pause();
            }
        };
        if(isPlay){
            _self.pause()
        }else{
            _self.play()
        }
    })
    // 只有PC端支持该错误监听事件
    _self.audio.addEventListener('error',loadError)
    // 加载后获取总时长，loadstart/duratichange/loadedmetadata/loadeddata/progress/canplay/canplaythrough
    _self.audio.addEventListener('canplay',function(){
        _self.duration = _self.audio.duration
        removeEventListener('canplay',function(){
            // debugger;
            // $.alert(_self.duration)
        },false)
    }, false)

    // 判断App当前网络状态,0:无网络,1:有网络
     _self.getNetState = function (callback){
        if(typeof ciwongPlugin != 'undefined'){
            var isLoading = true;   // 是否加载中
            setTimeout(function(){
                if(isLoading){
                    callback(-2);   // APP请求超时
                }
            },5000)
            ciwongPlugin.createEvent('GetNetState' , [{source:3}] ,function( response ){
                isLoading = false;
                typeof debug != 'undefined' && debug && alert('app GetNetState 接口调用返回：'+ (typeof response=='string'?response:JSON.stringify(response)) )
                if(response==1){
                    callback(1);
                }else{
                    callback(0);
                }
            });
        }else{  // cordova插件未找到
            callback(-1);
        }
    }


    // 初始化
    setUI();
}