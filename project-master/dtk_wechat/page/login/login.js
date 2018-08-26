var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listBox: true,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    var _this = this;
    //获取storage的token
    wx.getStorage({
      key: 'ftktokenstorage',
      success: function (res) {
        wx.switchTab({
          url: '/page/ftkindex/ftkindex'
        })
      },
      fail: function (res) {
        _this.setData({
          listBox: false
        })
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

  onPullDownRefresh: function () {
  
  },
   */
  /**
   * 页面上拉触底事件的处理函数

  onReachBottom: function () {
  
  },
   */
  /**
   * 用户点击右上角分享

  onShareAppMessage: function () {
  
  }
   */
  login:function(){
    var _this=this;
    app.userLogin(_this.data.id)
  }
})