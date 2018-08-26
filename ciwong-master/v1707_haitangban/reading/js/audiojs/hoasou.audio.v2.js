function AudioClass(ProgressBar){
    var timer,
    _self = this,
    isPlay=false,
    isStop=true,
    wantPlayNum = 0,
    audioBtn = $(ProgressBar).siblings('.audioBtn'),    // 播放/暂停/载入中按钮
    progressOption={barWidth:0,progressWidth:0,progressValue:0};
    _self.barWidth = $(ProgressBar).width()
    _self.showTime = false;     // true:显示音频时间 / false:显示音频个数
    _self.index = 0;
    _self.audio = $(ProgressBar).siblings('audio').get(_self.index)
    _self.errorMsg = '';
    _self.errorCode = 0;
    
    if(!_self.audio) return '暂无音频';

    _self.audioList = []
    $(ProgressBar).siblings('audio').each(function(index, el) {
        _self.audioList.push({
            firstPlay:true,
            duration:el.duration && el.duration>0.2 && el.duration || 0
        })
    });
    _self.currentTime = 0;  // 所有音频的当前时间
    _self.totalDuration = getTotalDuration();

    var tempAudio = document.createElement('audio');
    $(ProgressBar).append(tempAudio)


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
    // 获取当前时间
    function getCurrentTime(){
        var currentTime = _self.audio.currentTime || 0;
        for (var i = 0; i < _self.index; i++) {
            if(_self.audioList[i].duration && _self.audioList[i].duration>0){
                currentTime+=_self.audioList[i].duration
            }
        }
        return currentTime;
    }
    // 获取总时间
    function getTotalDuration(){
        var totalDuration = 0;
        $(ProgressBar).siblings('audio').each(function(index, el) {
            !_self.audioList[index].duration && (_self.audioList[index].duration = el.duration && el.duration>0.2 && el.duration || 0)
        })
        // $('#debug').html(JSON.stringify(_self.audioList))
        
        for (var i = 0; i < _self.audioList.length; i++) {
            if(_self.audioList[i].duration && _self.audioList[i].duration>0){
                totalDuration+=_self.audioList[i].duration
            }else{
                return 0;
            }
        }
        return totalDuration;
    }
    // 设置进度条信息
    function setProgressOption(e){
        // return;
        if(_self.showTime) return ;

        e.preventDefault();
        var touch = getMouse(e)
        if(!touch){
            $.alert('鼠标指针获取失败')
            return;
        }

        var mousePostion = touch.pageX - $(ProgressBar).offset().left,
            progressWidth = mousePostion<0? 0 : mousePostion>_self.barWidth? _self.barWidth : mousePostion;
            progressValue = parseFloat(progressWidth/_self.barWidth);
        if( (isNaN(_self.barWidth) || _self.barWidth<=0) || (isNaN(progressValue) || progressValue>1) ){
            $.alert('进度条总长度获取错误');console.log(_self.barWidth,progressValue);
            return ;
        }
        if(progressValue>1) progressValue = 1;
        _self.index = Math.floor((progressValue*100)/(100/_self.audioList.length));
        progressOption = {barWidth:_self.barWidth,progressWidth:progressWidth,progressValue:progressValue}

        isStop = false;
        isPlay=false
        _self.audio = $(ProgressBar).siblings('audio').get(_self.index)
        _self.errorMsg = '';
        _self.errorCode = 0;
        _self.play('set')
        setUI();
        return progressOption;
    }
    // 重新加载音频
    function againLoadAudio(){
        var _list = $(ProgressBar).siblings('audio');
        try{
            var first=true;
            for(var i=_self.index;i<_list.length;i++){
            // $.alert('测试音频：'+_list.get(i).duration,1000)
                // if(!_list.get(i).duration){
                    _list.get(i).play();
                    // setTimeout(function() {
                        !first && _list.get(i).pause();
                        first = false;
                    // }, 100);
                // }
            }
        }catch(e){}
        document.removeEventListener('touchstart',againLoadAudio,false)
    }
    // 播放
    _self.play = function(action){
        clearTimeout(timer)
        if(isStop) return ;
        _self.audio = $(ProgressBar).siblings('audio').get(_self.index)
        if(_self.errorCode){    // errorCode：1[加载失败] 2[正在加载中]
            $.alert(_self.errorMsg)
            _self.errorCode = 0;
        }
        !_self.totalDuration && (_self.totalDuration = getTotalDuration());
        // 兼容ios播放机制 && /iPhone/i.test(navigator.userAgent)
        // $.alert('test:'+_self.index+'-'+_self.audioList[_self.index].firstPlay+'-paused:'+_self.audio.paused,1000)
        if(_self.audioList[_self.index] && _self.audioList[_self.index].firstPlay){
            wantPlayNum++;
            if(wantPlayNum==15){
                // wantPlayNum = 0;
                document.addEventListener('touchstart',againLoadAudio,false)
            }
            _self.duration = _self.audio.duration;
            // 音频是否已准备播放
            if( (_self.audio.readyState!==undefined && _self.audio.readyState!=4) || !_self.audio.currentTime || _self.audio.currentTime<0.2 || !_self.duration || _self.duration<0.2 ){
                // 进入这里则从未播放
                isPlay = false;
                if(!audioBtn.hasClass('audio-loading')) audioBtn.addClass('audio-loading');
                _self.realPlay()
                // $.alert('play -'+isPlay+'- readyState:'+_self.audio.readyState+'\ncurrentTime:'+_self.audio.currentTime+'\nduration:'+_self.duration)
                timer = setInterval(function(){
                    _self.play()
                },200)
                setUI()
                return false;
            }else{
                isPlay = true;
                _self.audioList[_self.index].firstPlay = false;
            }
        }
        // 设置音频对象时没能及时更新currentTime状态，当set时不更新进度百分比状态
        if(action!='set') {
            progressOption.progressValue = _self.audio.currentTime/_self.audio.duration
            if(_self.audio.currentTime>=_self.audio.duration) progressOption.progressValue = 1;
        }
        setUI()

        $('.list-item').removeClass('read-here').eq(_self.index).addClass('read-here')
        // 播放完成
        if(progressOption.progressValue>=1){
            _self.stop(_self.index);
            // $('#debug').append('#'+_self.index+' ')
            _self.index++;
            wantPlayNum && (wantPlayNum = 0);
            $('.list-item').removeClass('read-here').eq(_self.index).addClass('read-here')
            if(_self.index<_self.audioList.length){
                isPlay=false
                progressOption={barWidth:0,progressWidth:0,progressValue:0};
                _self.audio = $(ProgressBar).siblings('audio').get(_self.index)
                _self.errorMsg = '';
                _self.errorCode = 0;
                _self.play();
                setUI();
            }else{  // 全部播放完毕
                setUI();
                setTimeout(function(){
                    _self.index=0;
                    isPlay=false
                    isStop=true
                    progressOption={barWidth:0,progressWidth:0,progressValue:0};
                    _self.audio = $(ProgressBar).siblings('audio').get(_self.index)
                    _self.errorMsg = '';
                    _self.errorCode = 0;
                    setUI();
                },300)
            }
            return;
        }
        timer = setTimeout(function(){
            _self.play()
        },200)
        // 音频是否已准备播放
        // $.alert('play -'+isPlay+'- readyState:'+_self.audio.readyState+'\ncurrentTime:'+_self.audio.currentTime+'\nduration:'+_self.audio.duration) // || (!_self.audio.currentTime || _self.audio.currentTime<0.2)
        // if(!_self.audio.currentTime || _self.audio.currentTime<0.2){
        //     setTimeout(function(){
        //         if(!_self.audio.currentTime || _self.audio.currentTime<0.2){
        //             if(!audioBtn.hasClass('audio-loading')) audioBtn.addClass('audio-loading');
        //         }
        //     },500)
        // }
        // if( (_self.audio.readyState!==undefined && _self.audio.readyState!=4) || !_self.audio.duration || _self.audio.duration<0.2 ){
        //     // 进入这里则从未播放
        //     isPlay = false;
        //     if(!audioBtn.hasClass('audio-loading')) audioBtn.addClass('audio-loading');
        //     return;
        // }
        // firstPlay = false;
        if(!isPlay) {   // 当前没有播放
            _self.realPlay()
            isPlay = true;
        }
    }
    // 暂停
    _self.pause = function(){
        clearTimeout(timer)
        _self.audio.pause()
        isPlay = false;
        setUI()
    }
    // 停止
    _self.stop = function(index){
        clearInterval(timer)
        isPlay = false;
        _self.audio.pause()
        // progressOption.progressValue = 1;
        setTimeout(function(){
            // progressOption.progressValue = 0;
            $(ProgressBar).siblings('audio').get(index).currentTime = 0;
            setUI()
        },200)
        setUI()
    }
    // 全部停止
    _self.stopAll = function(){
        $('audio').each(function(index){
           var theAudio = $(ProgressBar).siblings('audio').get(index)
           theAudio && theAudio.length>0 && !theAudio.paused && _self.stop(index)
            // $(this).get(0).pause();
        })
    }
    _self.realPlay = function(){
        // $('#debug').append(_self.index+'-')
        // _self.stopAll();
        _self.audio.play();
        // $.alert('test2:'+_self.index+'-'+_self.audioList[_self.index].firstPlay+'-paused:'+_self.audio.paused,1000)
    }
    // Css效果同步
    function setUI(){
        if(!_self.totalDuration && _self.showTime){
            // if(!audioBtn.hasClass('audio-loading')) audioBtn.addClass('audio-loading');
            $(ProgressBar).siblings('.timeBox').children('.currentTime').html('');
            $(ProgressBar).siblings('.timeBox').children('.duration').text('');
            setTimeout(function(){
                setUI()
            },200)
            return;
        }

        if( (!_self.audioList[_self.index] || !_self.audioList[_self.index].firstPlay) && audioBtn.hasClass('audio-loading')) audioBtn.removeClass('audio-loading');
        if(_self.showTime){
            $(ProgressBar).css('width','4rem');
            _self.currentTime = getCurrentTime();
            $(ProgressBar).siblings('.timeBox').children('.currentTime').html(formatTime(_self.currentTime));
            $(ProgressBar).siblings('.timeBox').children('.duration').html('<i class="mlr10"> / </i>'+formatTime(_self.totalDuration));
            $(ProgressBar).children('h3').css('width',(progressOption.progressValue+_self.index)*100/_self.audioList.length+'%');
        }else{
            $(ProgressBar).css('width','4.5rem');
            $(ProgressBar).siblings('.timeBox').children('.currentTime').html(_self.index+1>_self.audioList.length?_self.audioList.length:_self.index+1);
            $(ProgressBar).siblings('.timeBox').children('.duration').html('<i class="mlr10">/</i>'+_self.audioList.length);
            $(ProgressBar).children('h3').css('width',(_self.index)*100/_self.audioList.length+'%');
        }
        if(isPlay){
            audioBtn.addClass('playing')
        }else{
            audioBtn.removeClass('playing');
        }
    
    }

    ProgressBar.addEventListener('touchstart',setProgressOption,false)
    ProgressBar.addEventListener('touchmove',setProgressOption,false)
    // 点击播放
    audioBtn.get(0).addEventListener('click',function(){
        audioBtn.removeClass('audio-loading');
        // 暂停所有audio
        // for (var i = 0; i < AudioList.length; i++) {
        //     if(_self.index!=i){
        //         AudioList[i].pause();
        //     }
        // };
        isStop = !isStop;
        if(isStop){
            _self.pause()
        }else{
            _self.play()
        }
    })
    // 加载失败
    function loadError(){
        _self.errorCode = 1
        _self.errorMsg = '音频加载失败'
        $(ProgressBar).siblings('.loadError').html('<span class="f-error_icon">!</span>')
        // $(ProgressBar).siblings('.timeBox').hide()
    }
    // 只有PC端支持该错误监听事件
    _self.audio.addEventListener('error',loadError)
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

    // 自动加载音频
    function autoLoadAudio(){
        var _list = $(ProgressBar).siblings('audio');
        try{
            for(var i=_self.index;i<_list.length;i++){
                // if(!_list.get(i).duration){
                    _list.get(i).play();
                    // setTimeout(function() {
                    _list.get(i).pause();
                    // }, 100);
                // }
            }
        }catch(e){}
        // setTimeout(function() {
            document.removeEventListener('touchstart',autoLoadAudio,false)
        // }, 1000);
    }
    var _list = $(ProgressBar).siblings('audio');
    if(!_list.get(_list.length-1).duration){
        document.addEventListener('touchstart',autoLoadAudio,false)
    }
}