// pages/api/pages/share/share.js
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
    wx.onCompassChange(function (res) {
      console.log(res);
    })
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
  onShareAppMessage: function (res) {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title:'title1',
      path:'/pages/com/index',
      // imageUrl:'/image/icon_API.png',
      success: function(res){
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success:function(res){
            console.log(res);
            var iv = res.iv,
                encryptedData = res.encryptedData;
            wx.login({
              success:function(res){
                console.log(res)
                wx.request({
                  url: 'http://localhost:8004/mobile/getSessionKey/'+res.code,
                  success: function(res){
                    console.log(res)
                    var sessionKey = res.session_key;
                    console.log(sessionKey);
                    wx.request({
                      url: 'http://localhost:8004/mobile/decode',
                      data: { iv: iv, encryptedData: encryptedData, sessionKey: sessionKey},
                      method: 'POST',
                      success: function(res){
                        console.log(res);
                        that.setData({
                          gid:res.data
                        });
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    }
  }
})