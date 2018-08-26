// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    wx.showLoading({
      title: '加载中',
    });
    var advers = wx.getStorageSync("advers");
    this.setData({
      advers
    })
    wx.hideLoading()
  },
  jump(e){
    wx.showLoading({
      title: '加载中',
    });
    let appId = e.currentTarget.dataset.appid;
    //console.log(appId);
    wx.navigateToMiniProgram({
      appId: appId,
      path: 'pages/index/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res);
      }
    })
    wx.hideLoading()
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: "更多好玩",
      path: '/pages/more/more',
      success: function (res) {
        console.log(res);
        // 转发成功
      },
      fail: function (res) {
        console.log(res);
        // 转发失败
      }
    }
  },
  
})