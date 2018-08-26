// pages/pay/pay.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payAmount: 0
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
    
  },
  amountBtnEvent: function (e) {
    this.setData({
      payAmount: e.target.dataset.amount
    })
  }
  ,
  inputCustomAmountEvent: function (e) {
    var inputValue = e.detail.value
    if (isNaN(inputValue) || inputValue == "") {
      inputValue = 0;
    }
    this.setData({
      payAmount: inputValue
    })
  }
  ,
  pay: function (e) {
    var pageObj = this;
    if (app.globalData.openId == null) {
      wx.showToast({
        title: '未经授权，无法支付',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    if (pageObj.data.payAmount <= 0) {
      wx.showToast({
        title: '请选择正确的支付金额',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    wx.showModal({
      title: '提示',
      content: '您将要支付' + pageObj.data.payAmount + "元，是否继续？",
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.webUrl + '/api/Pay',
            data: {
              OpenId: app.globalData.openId,
              Amount: pageObj.data.payAmount * 100 //必须乘以100，因为默认单位是分
            },
            method: "GET",
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (result) {
              var objData = result.data
              if (objData.paySign != null || objData.paySign != "") {
                wx.requestPayment({
                  'timeStamp': objData.TimeStamp,
                  'nonceStr': objData.NonceStr,
                  'package': objData.Package,
                  'signType': objData.SignType,
                  'paySign': objData.PaySign,
                  'success': function (res) {
                    console.log("调起支付成功，结果为：")
                    console.log(res)
                  },
                  'fail': function (res) {
                    console.log("调起支付失败，结果为：")
                    console.log(res)
                  }
                })
              }
            }
          })
        }
      }
    })
  }
})