/**
 * @file 后台音效播放服务
 * @author hurry
 * @date 2018/02/02
 */
import config from '../config';

export default (function () {
    // const bgAM = wx.getBackgroundAudioManager();
    
    function loopPlay(url) {
        // getBackgroundAudioManager小程序退出还播放
        // https://developers.weixin.qq.com/blogdetail?action=get_post_info&docid=0006880b6a4530c192369acbf51800&highline=%E5%AE%89%E5%8D%93%E6%97%A0%E6%B3%95%E6%92%AD%E6%94%BE%E8%83%8C%E6%99%AF%E9%9F%B3%E4%B9%90&token=&lang=zh_CN
        playAudio(url);
        // wx.onBackgroundAudioStop(() => {
        //     playAudio(url);
        // });
    }

    function playAudio(url) {
        wx.pauseBackgroundAudio();
        wx.playBackgroundAudio({
            dataUrl: url
        });
    }

    function stop() {
        wx.stopBackgroundAudio()
    }

    return {
        loopPlay,
        playAudio,
        stop
    };
}());