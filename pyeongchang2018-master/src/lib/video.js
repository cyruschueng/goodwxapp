/**
 * Created by GUQIANG on 2018/1/10.
 */
// wx share
(function(){
    var videoInfo = {
        id: '7447398154719433106',
        text: '新华社独家航拍:飞越平昌,带你换个姿势看冬奥'
    }
    var closeCallback = null
    var option ={
        "auto_play":"1",
        "app_id":"1251448083",
        "file_id":videoInfo.id,
        "width":window.screen.width || window.innerWidth,
        "height":210,
        "stretch_patch":true,
        "hide_h5_setting": true,
        "disable_drag":1,
        "stretch_full":1
    }; 
    /*调用播放器进行播放*/
    jQuery("#videoBox_intro").html(decodeURIComponent(videoInfo.text || ""));
    
    jQuery("#videoBoxInner").css({
        "translateY":"0px"
    });
    jQuery("#videoBox").scrollTop(0);
    var player = new qcVideo.Player("id_video_container", option)
    // , {
    //     playStatus: function(state){
    //         var playContainer = document.getElementById("id_video_container"); 
    //         if(state === 'ready' && playContainer.hasChildNodes()){
    //             if(!player.isPlaying()){
    //                 setTimeout(function(){
    //                     player.play()
    //                 }, 100)
    //             }
    //         }
    //     }
    // }
    jQuery("#videoCloseBtn").on("touchstart mousedown", function(e){
        e.preventDefault();e.stopPropagation();
        jQuery("#videoBox").fadeOut(100, function(){
            closeCallback && closeCallback();
        });
    })
    window._player = {
        qcPlayer: player,
        setCloseCallback: function(call){
            closeCallback = call
        },
        play: function(seconds){
            player.play(seconds)
        },
        pause: function(){
            player.pause()
        }
    }
})();