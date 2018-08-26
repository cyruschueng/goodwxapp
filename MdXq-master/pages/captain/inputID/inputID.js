var app = getApp();
var imgUrl = app.globalData.imgUrl;
var baseUrl = app.globalData.baseUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customer_id:'',
    referee_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  IDInput(e){
    this.setData({
      referee_id:e.detail.value
    })
  },
  // 点击去购物
  goShoping(e){
    var url = baseUrl + '/api/fort/hostess/become?customer_id=' + this.data.customer_id + '&referee_id=' + this.data.referee_id;
    console.log(url)
    wx.request({
      url: url,
      success(res){
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '欢迎加入蜜豆星球',
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../../homepage/homepage',
            })
          },600)
        }
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
    var that = this;
    wx.getStorage({
      key: 'customer_id',
      success: function (res) {
        that.setData({
          customer_id: res.data
        })
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