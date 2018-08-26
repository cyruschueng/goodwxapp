var util = require("../../utils/util.js")
var app = getApp();
var that;
var innerAudioContext = '';
//ZeS8Fm
Page({
  data: {
     descList:'',
     desc:''
  },

  onLoad: function (options) {
    that = this;
    var exit= options.exit;
    if(exit){
      wx.showLoading({
        title: '退出体验账户..',
      })
      setTimeout(function () {
          app.delExpImprint(function (expimprint) {
            wx.hideLoading();
            wx.reLaunch({
              url: '../start/start',
            })
          })

        }.bind(this), 1000);
     

    }else{
      var desc = "班级群小管家|是|一|款|基|于|班|级|群|的|作|业|管|理|小|程|序|,|即|将|进|入|体|验|账|户|.|.|.|."
      var descList = desc.split('|');
      var max = descList.length - 1;
      var n = 0;
      //连续动画需要添加定时器,所传参数每次+1就行
      if (!innerAudioContext) {
        innerAudioContext = wx.createInnerAudioContext();
      }
      innerAudioContext.autoplay = true;
      innerAudioContext.loop = true;
      innerAudioContext.src = "http://campus002.oss-cn-beijing.aliyuncs.com/dada.mp3";
      innerAudioContext.onPlay(() => {
        console.log('开始播放');

      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      });
      innerAudioContext.onEnded(() => {

        that.setData({ playing: false });
        console.log('开始结束');
      })
      innerAudioContext.onStop(() => {
        // playStatus = 'stop';
        // that.setData({ playing: false });
        console.log('暂时一个');
      })
      var interval = setInterval(function () {
        if (max <= n) {
          clearInterval(interval);
          innerAudioContext.stop();
          wx.showLoading({
            title: '进入体验账户',
          })
          setTimeout(function () {

            app.getExpImprint(function (expimprint) {
              wx.hideLoading();
              console.log(expimprint);
              wx.redirectTo({
                url: '../start/start',
              })
            })

          }.bind(this), 1000);
        }
        var nowDesc = that.data.desc + descList[n]
        n = n + 1;
        that.setData({ desc: nowDesc })
      }.bind(this), 160)
    }
   
  },
  onHide:function(){
    if (!innerAudioContext) {
      innerAudioContext.stop();
    }
  },
  onUnload: function () {
    if (!innerAudioContext) {
      innerAudioContext.stop();
    }
  },
});