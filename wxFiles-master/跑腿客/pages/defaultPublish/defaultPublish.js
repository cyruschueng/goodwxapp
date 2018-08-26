// pages/defaultPublish/defaultPublish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateLimit: [
      '当天到', '次日到', '3天内到达'
    ], dlFlag: 0,
    goodsSize: ['小件', '中件', '大件'],
    glFlag: 0,
    startPhone:null,
    endPhone:null
  },
  startPhoneInput(e){
    this.setData({
      startPhone:e.detail.value
    })
  },
  endPhoneInput(e) {
    this.setData({
      endPhone: e.detail.value
    })
  },
  dateLimitChange(e) {
    this.setData({
      dlFlag: e.detail.value
    })
  },
  goodsSizeChange(e) {
    this.setData({
      glFlag: e.detail.value
    })
  },
  saveSetting(){
    var that = this;
    wx.showLoading({
      title: '保存中...',
    })
    wx.setStorageSync("defaultPublishData", {
      startPhone: that.data.startPhone,
      endPhone: that.data.endPhone,
      dlFlag: that.data.dlFlag,
      glFlag: that.data.glFlag
    })
    wx.hideLoading();
    wx.showToast({
      title: '保存成功',
      duration: 800
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 800) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync("defaultPublishData")){
      this.setData({
        startPhone: wx.getStorageSync("defaultPublishData").startPhone,
        endPhone: wx.getStorageSync("defaultPublishData").endPhone,
        dlFlag: wx.getStorageSync("defaultPublishData").dlFlag,
        glFlag: wx.getStorageSync("defaultPublishData").glFlag
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})