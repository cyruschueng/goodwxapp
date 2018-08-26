
const util = require('../../utils/util.js')

Page({


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
          
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
          console.error("open-onShow--" )
          var token = wx.getStorageSync('token')
          if (token == "") {
                  wx.navigateTo({
                          url: '../login/index?id=1'
                  })
          } else {
                  // 只允许从相机扫码
                  //   { result: "http://www.klch.cn/?lockcode=123456", errMsg: "scanCode:ok", scanType: "QR_CODE", charSet: "UTF-8" }
                  wx.scanCode({
                          onlyFromCamera: true,
                          success: (res) => {
                                  var result = res.result.replace("?", "\?")
                                  console.log(result)
                                  var parameterObject = util.getQueryObject(result)
                                  wx.reLaunch({
                                          url: '../openLockIng/index?lockcode=' + parameterObject.lockcode
                                  });
                          }, fail: (res)=>{
                                  console.log("fail"+res)
                                  wx.reLaunch({
                                          url: '../index/index'
                                  });
                          }, complete: (res)=>{
                                  console.log("complete")
                          }
                  })
          }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
          console.error("open-onHide--")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
          console.error("open-onUnload--")
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