// pages/setting/setting.js
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
   * 调起客户端小程序设置界面，返回用户设置的操作结果。
   * 设置界面只会出现小程序已经向用户请求过的权限。
    */
  openSetting: function (){
      wx.openSetting({
          success: (res) => {
            console.log(res);
          }
      })
  },

  /**
   * 获取用户的当前设置
   * 返回值中只会出现小程序已经向用户请求过的权限
    */
  getSetting: function () {
      wx.getSetting({
          success: (res) => {
            console.log(res);
          }
      })
  }

})