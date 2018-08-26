var app=getApp();
var lib=require("../../utils/util.js");
Page({
  data: {
  
  },


  onLoad: function (options) {
  
  },
  clipText(){
      wx.setClipboardData({
          data: 'duo1869295',
          success: function(res) {
              wx.getClipboardData({
                  success: function(res) {
                      console.log(res.data) // data
                  }
              })
          }
      })
  },
  formSubmit: function(e) {
      console.log(e.detail.value);
      let formData=e.detail.value;
      if(formData.toyNum==''){
          wx.showToast({
              title: '兑换失败',
              icon: 'none',
              duration: 1000
          });

          return
      }
      wx.showModal({
          title: '提示',
          content: '您是否领取话费',
          success: function(res) {
              if (res.confirm) {
                  console.log(formData.toyNum)
                  if((app.globalData.nToy/6)>=formData.toyNum){
                      app.globalData.nToy-=Number(formData.toyNum)*6;
                      lib.setUser(app);
                      console.log(app.globalData.nToy);
                      console.log('form发生了submit事件，携带数据为：', e.detail.value);
                      wx.showToast({
                          title: '兑换成功',
                          icon: 'success',
                          duration: 1000
                      });
                      wx.request({
                          url: 'https://xcx3.zhuozhida.cn/user.php',
                          data: {
                              toyNum:formData.toyNum,
                              userTel:formData.userTel,
                              openId:app.globalData.openId
                          },
                          header: {
                              'content-type': 'application/json'
                          },
                          success: function(res) {
                              console.log(res.data)
                              console.log('兑换成功')
                          }
                      });
                  }else{
                      wx.showToast({
                          title: '话费卡数量不足,兑换失败',
                          icon: 'none',
                          duration: 1000
                      });
                  }
              } else if (res.cancel) {
                  wx.showToast({
                      title: '兑换失败',
                      duration: 1000
                  });
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