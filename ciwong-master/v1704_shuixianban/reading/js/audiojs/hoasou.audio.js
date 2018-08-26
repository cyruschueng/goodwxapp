function AudioClass(ProgressBar){
    var _self = this,
    timer,
    listenPlayTimer,
    _index = 0,
    _list = document.getElementsByTagName('audio'),
    _length = _list.length,
    _audio = _list[_index],
    _audioBtn = $(_audio).parent('.audio-btn2');

    if(!_audio) return '暂无音频';
    for(var i=0;i<_length;i++){
        _list[i].isLoaded = false;
        _list[i].isPlay = false;
        // 只有PC端支持该错误监听事件
        _list[i].addEventListener('error',loadError,false)
        removeLoadListener(i)
    }

    // 切换音频
    _self.slideAudio = function(){
        if(_index>=_length) {
            _index = _length=1;
        }else if(_index<0){
            _index = 0;
        }
        _audio = _list[_index]
        _audioBtn = $(_audio).parent('.audio-btn2');
        if(!_audio) return;
        if(!_audio.src || _audioBtn.hasClass('audio-error')){
            if(_index==_length-1) return ;
            _index++;
            this.slideAudio();
            return;
        }
        clearTimeout(timer)
        clearInterval(listenPlayTimer)
    }
    // 播放
    _self.play = function(){
        var index = _index;
        _list[index].isPlay = true;
        _audio.play();
        if(!_audioBtn.hasClass('audio-playing')) _audioBtn.addClass('audio-playing');

        _self.listenPlay(index);
        var currAudio = _list[index];
        timer = setTimeout(function(){
            if(!currAudio.isLoaded) _self.stop(index);
        },10000)
    }
    // 暂停
    _self.pause = function(index){
        clearTimeout(timer)
        clearInterval(listenPlayTimer)
        _list[index].isPlay = false;
        _list[index].pause();
        $(_list[index]).parent('.audio-btn2').removeClass('audio-playing audio-loading');
    }
    // 停止
    _self.stop = function(index){
        _self.pause(index);
        setTimeout(function(){
            _list[index].currentTime = 0;
        },200)
    }
    // 持续监听播放状态
    _self.listenPlay = function(index){
        listenPlayTimer = setInterval(function(){
           if(!_list[index].isLoaded){  // 音频未加载
                // 音频是否已准备播放
                if( (_audio.readyState!==undefined && _audio.readyState!=4) || !_audio.currentTime || _audio.currentTime<0.2 || !_audio.duration || _audio.duration<0.2 ){
                    if(!_audioBtn.hasClass('audio-loading')) _audioBtn.addClass('audio-loading');
                    // 进入这里则从未播放
                    _list[index].play();
                    return false;
                }else{
                    _list[index].isLoaded = true;
                }
           }
            if(_audioBtn.hasClass('audio-loading')) _audioBtn.removeClass('audio-loading');
            if(_audio.currentTime && _audio.duration && _audio.currentTime >= _audio.duration){
               _self.stop(_index);
               if(_index<_length-1){
                    _index++;
                    _self.slideAudio();
                    _self.play();
               }else{
                   _index = 0;
               }
           }

        },200)
    }
    // 更新UI
    _self.updateUI = function(){
    }
    // 点击播放
    $('.list-item2').on('click',function(){
        _audioBtn.removeClass('audio-loading audio-playing');
        if($(this).find('.audio-btn2').hasClass('audio-error')) return;
        var index = $(this).attr('index');
        index && (_index = index);
        _self.slideAudio();
        // 暂停所有其他audio
        for(var i=0;i<_length;i++){
            if(i!=_index) _self.stop(i);
        }
        // console.log(_audio.isPlay)
        if(!_audio.isPlay){
            _self.play(_index)
        }else{
            _self.stop(_index)
        }
    })
    // 加载失败
    function loadError(e){
        $(this).parent('.audio-btn2').addClass('audio-error')
    }
    // 移除load监听
    function removeLoadListener(index){
        setTimeout(function(){
            _list[index].removeEventListener('error',loadError,false)
        },5000)
    }

    // 自动加载音频
    function autoLoadAudio(){
        try{
            for(var i=_index;i<_length;i++){
                if($(_list[i]).parent('.audio-btn2').hasClass('audio-error')) break;
                _list[i].play();
                _list[i].pause();
            }
        }catch(e){}
        document.removeEventListener('touchstart',autoLoadAudio,false)
    }
    setTimeout(function(){
        if(_length>0 && (!_list[_length-1].duration || _list[_length-1].duration<0.2)){
            document.addEventListener('touchstart',autoLoadAudio,false)
        }
    },1000)
}