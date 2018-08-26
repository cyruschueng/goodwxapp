
const util = require('../../utils/util.js');

Component({
  data: {
    playing: false,
    audioUrl: null,
    coverUrl: null
  },
  methods: {
    ready: function(audioUrl, coverUrl){

      var _this = this;

      wx.onBackgroundAudioPlay(function () {
        
        _this.setData({ playing: true });
        wx.hideLoading();
      });
      wx.onBackgroundAudioStop(function () {
        _this.setData({ playing: false });
      });
      _this.setData({
        audioUrl: audioUrl,
        coverUrl: coverUrl
      });
      this.selectComponent('#television').show(.4);
    },
    press: function(){

      if (this.data.playing) {
        wx.stopBackgroundAudio();
      } else {
        wx.showLoading({
          title: '正在加载..',
        });
        wx.playBackgroundAudio({
          title: '步咚猜剧',
          dataUrl: this.data.audioUrl,
          coverImgUrl: this.data.coverUrl
        });
      }
    },
    stop: function(){

      wx.stopBackgroundAudio();
    }
  }
})