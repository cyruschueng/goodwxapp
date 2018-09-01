const app = getApp()
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false
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
    let that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      show: false
    })
    wx.request({
      url: "https://unify.playonweixin.com/site/get-advertisements?operator_id=13",
      success: function (res) {
        console.log(res);
        if (res.data.status) {
          var advers = res.data.adver.advers;
          wx.setStorageSync("advers", advers);
          that.setData({
            advers
          })
        }
      }
    })
    wx.hideLoading()
  },
  
  jump(e) {
    wx.showLoading({
      title: '加载中',
    });
    let appId = e.currentTarget.dataset.appid;
    console.log(appId);
    wx.navigateToMiniProgram({
      appId: appId,
      path: 'pages/index/index?scene=92c8a0964d1c6e8f0a33daf3a42798a5',
      envVersion: 'release',
      success(res) {
        // 打开成功
        console.log(res);
      },
      fail(res){
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