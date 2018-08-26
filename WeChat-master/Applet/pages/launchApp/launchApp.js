// pages/launchApp/launchApp.js
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
      wx.showShareMenu({
          withShareTicket: true,
          success: function (res) {
              // 分享成功
              console.log('shareMenu share success')
              console.log('分享1',res)



          },
          fail: function (res) {
              // 分享失败
              console.log(res)
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
  onShareAppMessage: function (res) {
    console.log(res);
    return {
      title:'test',
      path:'/pages/login/login',
      success: function(res) {
          // 转发成功
          console.log('success', res);

          if (res.shareTickets) {
              // 获取转发详细信息
              wx.getShareInfo({
                  shareTicket: res.shareTickets[0],
                  success(res) {
                      console.log(res);
                      console.log(res.errMsg);// 错误信息
                      console.log(res.encryptedData);//  解密后为一个 JSON 结构（openGId    群对当前小程序的唯一 ID）
                      console.log(res.iv);// 加密算法的初始向量
                  },
                  fail() {},
                  complete() {}
              });
          }

      },
      fail: function(res) {
          // 转发失败
          console.log('fail', res);
      },
      complete:function (res) {
          // 转发结果
          console.log('complete', res);
      }
    }
  },
  launchAppError:function (e) {
      console.log(e);
  }
})