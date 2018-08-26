var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picture: '',
    nickname: '',
    level: '',
    customer_id:'',
    telephone:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取个人信息
    wx.getStorage({
      key: 'picture',
      success: function (res) {
        that.setData({
          picture: res.data
        })
      },
    })
    wx.getStorage({
      key: 'nickname',
      success: function (res) {
        that.setData({
          nickname: res.data
        })
      },
    })
    wx.getStorage({
      key: 'level',
      success: function (res) {
        that.setData({
          level: res.data
        })
      },
    })
    wx.getStorage({
      key: 'customer_id',
      success: function (res) {
        that.setData({
          customer_id: res.data
        })
      },
    })
  },
  // 点击去修改电话号码
  alterTelephone(e){
    wx.navigateTo({
      url: './alterTelephne/alterTelephne',
    })
  },
  // 点击去收货地址
  goShippingAddress(e){
    wx.navigateTo({
      url: './shippingAddress/shippingAddress',
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
    var that=this;
    wx.getStorage({
      key: 'telephone',
      success: function(res) {
        that.setData({
          telephone:res.data
        })
        // console.log(res.data)
      },
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})