// pages/alltimeinfo/alltimeinfo.js
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alltimeinfo: [],
    length: null,
    isAlarm: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      setTimeout(function() {
          if (that.data.isAlarm == 1) {
              that.playAlarmVoice();
          }
      },300);
      setInterval(function() {
          if (that.data.isAlarm == 1) {
              that.playAlarmVoice();
          }
      },10200);
  },

  playAlarmVoice: function() {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'music/4611.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  // wx.request远程服务器获取报警信息
  getAllTimeInfo: function () {
    var that = this; // 避免成为wx.request的this冲突
    wx.request({
      url: 'http://127.0.0.1:8080/equipment/showallequip',
      data: {
        name: 'info',
        age: 20
      },
      // 请求头
      header: {
        "Content-Type": 'application/json'
      },
      method: "GET",
      success: function (res) {
        var length = res['data'].length;
        console.log(res['data']);
        var isAlarm = 0;
        for (var i=0;i<length;i++) {
          if (res['data'][i].status == 2) {
              isAlarm = 1;
              break;
          }
        }
        if (isAlarm == 1) {
            that.setData({
                isAlarm: 1
            });
        }else {
            that.setData({
                isAlarm: null
            });
        }
        that.setData({
          alltimeinfo: res['data'],
          length: length
        });
      },
      fail: function (err) { }, // 请求失败
      complete: function () { } // 请求完成后执行的函数
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getAllTimeInfo();
    setInterval(function () {
        that.getAllTimeInfo();
    }, 10000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
      // var that = this;
      // wx.showNavigationBarLoading(); //在标题栏中显示加载
      // //模拟加载
      // setTimeout(function () {
      // // complete
      
      // wx.hideNavigationBarLoading(); //完成停止加载
      // wx.stopPullDownRefresh(); //停止下拉刷新
      //  }, 1500);
      // this.getAllTimeInfo();  
      // this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})