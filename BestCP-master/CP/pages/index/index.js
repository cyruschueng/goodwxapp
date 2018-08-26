var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:"",
    screenWidth: '',
    screenHeight:"",
    model:""
  },
  nextPage: function() {
    if(this.data.status=="success"|| this.data.status == "insert")
      wx.redirectTo({
        url: '../rate/rate',
      })
      else{
        wx.navigateTo({
          url: '../brief/brief',
        })
      }
    
  },
  onShow:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (ops) {
    var that = this;
    var mobileModel = wx.getSystemInfoSync().model;
    var dat = mobileModel.substring(0, mobileModel.lastIndexOf("X")) + "X";
    this.setData({
      screenWidth: wx.getSystemInfoSync().windowWidth,
      screenHeight: wx.getSystemInfoSync().windowHeight,
      model: dat
    })
    console.log(this.data.screenWidth, this.data.screenHeight, this.data.model)

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: '群内般配指数测试',
      path: '/pages/index/index',
      imageUrl: '../cover.jpeg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})