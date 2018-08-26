// pages/detail/base.

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      func_name:'', //编码函数
      data:'',       //待编码数据
      result:'',    //解码后的数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.func_name = options.name;
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

  /**
   * textarea blur事件
   */
  bindTextAreaBlur: function (e) {
    this.setData({
      data: e.detail.value
    })
  },

  /**
   * textarea blur事件
   */
  decodeBlur: function (e) {
    this.setData({
      result: e.detail.value
    })
  },

  /**
   * 编码
   */
  encode: function () {
    var that = this
    setTimeout(function () {
      if (that.data.data == '' || that.data.data == undefined || that.data.data == null) {
        wx.showToast({
          title: '请输入需要待编码的数据',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
      }
      wx.request({
        url: app.globalData.apiDomain + '/smallContent/encode',
        data: {
          'data': that.data.data,
        },
        success: res => {
          if (res.data.status == 1) {
            that.setData({
              result: res.data.msg
            })
          } else {
            wx.showToast({
              title: '编码失败',
              icon: 'none',
              duration: 500,
              mask: true
            })
          }
        }
      })
    }, 100)
  },

  /**
   * 解码
   */
  decode: function () {
    var that = this
    setTimeout(function () {
      if (that.data.result == '' || that.data.result == undefined || that.data.result == null) {
        wx.showToast({
          title: '请输入需要待解码的数据',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        return false;
      }
      wx.request({
        url: app.globalData.apiDomain + '/smallContent/decode',
        data: {
          'data': that.data.result
        },
        success: res => {
          if (res.data.status == 1) {
            that.setData({
              data: res.data.msg
            })
          } else {
            wx.showToast({
              title: '解码失败',
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
        }
      })
    }, 100)
  },
})