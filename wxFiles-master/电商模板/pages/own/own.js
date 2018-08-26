// pages/own/own.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  navToOrder(){
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  mkphone(){
    wx.makePhoneCall({
      phoneNumber: '15320750155',
    })
  },
  addressManger(){
    var that = this;
    wx.chooseAddress({
      success:function(){

      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '为了您的方面请先开启微信地址授权',
          success(res){
            if(res.confirm){
              wx.openSetting({
                success: function () {
                  that.addressManger()
                }
              })
            }
          }
        })
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success(res){
        that.setData({
          uinfo:res.userInfo
        })
      },
      fail(res){
        that.setData({
          uinfo: {
            avatarUrl:'/img/us.png',
            nickName:'游客'
          }
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