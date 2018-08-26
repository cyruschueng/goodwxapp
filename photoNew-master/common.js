// 音乐
function bindPlay(){
  var that = this;
  let music_play = that.data.music_play;
  if (music_play == true) {
    wx.pauseBackgroundAudio();//暂停
    app.data.music_play = false;
    wx.setStorageSync('music_play', false)
    that.setData({
      music_play: false
    })
  } else {
    wx.playBackgroundAudio({ //播放
      dataUrl: app.data.dataUrl
    })
    app.data.music_play = true;
    wx.setStorageSync('music_play', true)
    that.setData({
      music_play: true
    })
  }
};

module.exports.bindPlay = bindPlay;
