// pages/alumnimanager/alumnimanager.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topmsg: app.globalData.imgurl,
    mode: 'scaleToFill',
    info: '',
    headimg: '',
    alumniID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    _this.setData({
      alumniID: options.id
    })
    wx.request({
      url: app.globalData.url + 'apiXiaoyouhuiDetail/' + options.id,
      success: function (res) {
        wx.hideLoading();
        _this.setData({
          info: res.data,
          headimg: app.globalData.imgpath + res.data.school_info.logo
        })
      },
      fail: function (res) {
      }
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
    var _this = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.url + 'apiXiaoyouhuiDetail/' + _this.data.alumniID,
      success: function (res) {
        wx.hideLoading();
        _this.setData({
          info: res.data,
          headimg: app.globalData.imgpath + res.data.school_info.logo
        })
      },
      fail: function (res) {
      }
    })
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  /**
   * 编辑校友会
   */
  edit: function (res) {
    wx.navigateTo({
      url: '../createpage/createpage?id=' + this.data.info.id
    })
  },
  /**
   * 权限管理
   */
  permission: function (res) {
    // wx.navigateTo({
    //   url: '../createpage/createpage?id=' + this.data.info.id
    // })
  },
  /**
   * 发布公告
   */
  notice: function (res) {
    wx.navigateTo({
      url: '../createnotice/createnotice?xiaoyouid=' + this.data.info.id
    })
  },
  /**
   * 发布活动
   */
  activity: function (res) {
    wx.navigateTo({
      url: '../createactivity/createactivity'
    })
  }
})