// pages/getWeRunData/getWeRunData.js
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
      //获取用户过去三十天微信运动步数
      wx.getWeRunData({
          success(res) {
              const encryptedData = res.encryptedData;
              console.log(res.encryptedData);
              //encryptedData 解密
              // 参考 加密数据解密算法 https://developers.weixin.qq.com/miniprogram/dev/api/signature.html#wxchecksessionobject
          }
      })
  },




})