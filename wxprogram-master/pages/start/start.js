const app = getApp();
var timer = null;
Page({
  data: {
    bootimg: {},
    leftValue: -100,
    animationData: {},
    buttonText: '正在定位城市',
    showButton: false,
  },
  startProject: function () {
    if (this.data.showButton) {
      wx.switchTab({url: '../experience/experience'})
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this;
    wx.getUserInfo({
      fail: function () {
        wx.openSetting({})
      },
      success: function () {
        wx.getLocation({
	        success: function () {
            self.setData({
              showButton: true,
              buttonText: "开启探索之旅"
            })
	        },
          fail: function () {
            wx.openSetting({})
          }
        })
      }
    })
    wx.request({
      url: app.globalData.apiURL + '/bootloader/list',
      success: function (res) {
        self.setData({ bootimg: res.data.result });
      }
    });
    wx.setNavigationBarTitle({
      title: '乐游欧洲Go',
    });
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'linear',
    });
    this.animation = animation;
    this.animation.translate(this.data.leftValue).step({ duration: 6000 });
    this.animation.translate(0).step({ duration: 6000 });
    this.animation.translate(this.data.leftValue).step({ duration: 6000 });
    this.animation.translate(0).step({ duration: 6000 });
    this.animation.translate(this.data.leftValue).step({ duration: 6000 });
    this.animation.translate(0).step({ duration: 6000 });
    this.animation.translate(this.data.leftValue).step({ duration: 6000 });
    this.animation.translate(0).step({ duration: 6000 });
    this.setData({
      animationData: this.animation.export()
    });
    
    // timer = setInterval(() => {
    //   count--;
    //   setTimeout(() => {
    //     this.translateFn(count);
    //   },500)
    // },100);
  },
  //translateFn: function (count) {
    // if (count <= -300) {
    //   clearInterval(timer);
    //   timer = null;
    //   timer = setInterval(() => {
    //     count++;
    //     this.translateFn(count);
    //   }, 100);
    // }
    // if (count >= 30) {
    //   clearInterval(timer);
    //   timer = null;
    //   timer = setInterval(() => {
    //     count--;
    //     this.translateFn(count);
    //   }, 100);
    // };
    // this.animation.translate(30, 0).step({ duration: 1000 });
    // this.setData({
    //   animationData: this.animation.export()
    // });
  //}
})
 
