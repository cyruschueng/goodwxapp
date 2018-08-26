// page/999d/user/bindphone.js
//获取应用实例
var util = require('../../../util/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iv: '',
    encryptedData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.iv = options.iv;
    this.encryptedData = options.encryptedData;

  },
  /**
   * 绑定手机
   */
  formSubmit: function (e) {


    e.detail.value.iv = this.iv;
    e.detail.value.encryptedData = this.encryptedData;
    e.detail.value.user_type = 'third_party';
    e.detail.value.sms_type = 'bind_phone';
    e.detail.value.sid = wx.getStorageSync('sid');
    util.Ajax('/v2/passport/xiaochengxu/bindMobile', e.detail.value, function (res) {
      console.log(res);
      if (res.data.code == 0) {

      }
    });


    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  /**
   * 获取验证码
   */
  sendcode: function () {

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})