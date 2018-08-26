// pages/noticelist/noticelist.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noticelist: '',
    xiaoyouid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    if(options.id){
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: app.globalData.url + 'getNotice',
        method: 'POST',
        data: { xiaoyou_id: options.id},
        success: function(res){
          wx.hideLoading();
          _this.setData({
            noticelist: res.data,
            xiaoyouid: options.id
          })
        }
      })
    }
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
    var _this = this;
    if (_this.data.xiaoyouid) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      wx.request({
        url: app.globalData.url + 'getNotice',
        method: 'POST',
        data: { xiaoyou_id: _this.data.xiaoyouid },
        success: function (res) {
          wx.hideLoading();
          _this.setData({
            noticelist: res.data
          })
        }
      })
    }
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
  
  }
})