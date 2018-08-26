// pages/wallet/wallet.js

var urlData = require('../../utils/util.js');
// var util = require('../../utils/animation.js');
var md5 = require('../../utils/md5.js');

require("../../utils/mdM.js");
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputJine: "",  //提现金额
    sum: '',   //
    use: '',   //可用金额
    yue: "",   //可用余额
    num: "",
    dis: true,
    wallets_password: "",   //钱包密码
    showModalStatus: false,
    wallets_password_flag: false,
    isFocus: true,
    showModalState: true  //弹窗控制
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (wx.getStorageSync("uid")) {
      that.setData({
        showModalState: false
      })

    } else {
      that.setData({
        showModalState: true
      })
    }
    console.log(wx.getStorageSync("uid"))
    //钱包查询
    urlData.queryWallet(that, wx.getStorageSync("uid"), that.data.sum, that.data.use, that.data.yue)
  },
  //去注册：
  regist: function (e) {
    this.setData({
      showModalState: false
    })
    wx.navigateTo({
      url: '../regist/regist',
    })
  },
  //去登陆：
  login: function () {
    this.setData({
      showModalState: false
    })
    wx.navigateTo({
      url: '../login/login',
    })
  },
  //关闭弹窗
  // close: function () {
  //   this.setData({
  //     showModalState: false
  //   })
  // }, 

  //获取提现金额
  input: function (e) {
    this.setData({
      inputJine: e.detail.value
    })
    console.log(this.data.yue - this.data.inputJine)
  },

  //确认提现按钮
  withdrawal: function (e) {
    console.log(this.data.inputJine)
    console.log(this.data.yue)
    if (this.data.inputJine >= 5) {
      if (this.data.yue - this.data.inputJine > 1 && this.data.inputJine <= 10000) {
        if (this.data.inputJine !== "" && this.data.inputJine !== 0) {
          var that = this;
          // var currentStatu = e.currentTarget.dataset.statu;
          //支付弹窗显示
          // util.util(that, currentStatu)
          this.setData({
            showModalStatus: true,
            wallets_password: ""
          })

        } else {
          wx.showToast({
            title: '请输入提现金额',
            image: "../../images/icon/f.png",
            duration: 1000,
            mask: true,
          })
        }
      } else {
        wx.showToast({
          title: '提现金额过大',
          image: "../../images/icon/f.png",
          duration: 1000,
          mask: true,
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '提现金额最低5元,最高10000元',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  //确认触发
  withdrawalSure: function (e) {
    var that = this;
    if (wx.getStorageSync("IsPayPwd")) {
      that.setData({
        showModalStatus: false,
      })
      // var currentStatu = e.currentTarget.dataset.statu;
      // util.util(that, currentStatu)
      var payPwd = md5.md5(that.data.wallets_password);
      payPwd = md5.md5(payPwd);
      wx.setStorageSync("payPwd", payPwd)

      console.log(payPwd)
      console.log(that.data.inputJine)
      //申请提现
      urlData.requestWithdrawal(that, wx.getStorageSync("uid"), that.data.inputJine, payPwd)
    } else {
      wx.showModal({
        title: '您还没有设置支付密码！',
        content: '点击确定设置支付密码',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.setStorageSync("access", 2)
            wx.navigateTo({
              url: '../pwd/pwd',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  //获取钱包密码
  set_wallets_password(e) {
    this.setData({
      wallets_password: e.detail.value
    });
    if (this.data.wallets_password.length == 6) { //密码长度6位时，自动验证钱包支付结果
      console.log(this.data.wallets_password)
      this.setData({
        dis: false
      })
    }
  },

  //聚焦input
  set_Focus() {
    console.log('isFocus', this.data.isFocus)
    this.setData({
      isFocus: false
    })
  },

  //失去焦点
  set_notFocus() {
    this.setData({
      isFocus: false
    })
  },

  //关闭钱包输入密码遮罩
  close_wallets_password() {
    this.setData({
      isFocus: false,//失去焦点
      wallets_password_flag: false,
    })
  },

  withdrawalCancel: function () {
    this.setData({
      showModalStatus: false,
      inputJine: ""
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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