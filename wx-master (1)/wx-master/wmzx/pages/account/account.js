//=======账户========= pages/account/account.js
var app = getApp();
var urlData = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    mer: "",
    func: [],
    phone: '',  //手机号
    display: '',  //判断是否实名bool
    num: '',  //还款中笔数
    money: '',  //还款中金额
    agMer: "",
    agName: "",
    nickName: wx.getStorageSync("nickName"),
    showModalStatus: false,

    //功能区域数据
    func: [
      {
        "url": "wallet",
        "src": "../../images/account/wallet.png",
        "txt": "钱包"
        // "arrowSrc": "../../images/account/5.png"
      },
      {
        "url": "myCard",
        "src": "../../images/account/card.png",
        "txt": "我的银行卡"
        //"arrowSrc": "../../images/account/5.png"
      },

      {
        "url": "security",
        "src": "../../images/account/security.png",
        "txt": "账户与安全"
        // "arrowSrc": "../../images/account/5.png"
      },
      {
        "url": "center",
        "src": "../../images/account/promotion.png",
        "txt": "推广中心"
        // "arrowSrc": "../../images/account/5.png" 
      },

      {
        "url": "about",
        "src": "../../images/account/about.png",
        "txt": "关于我们"
        //"arrowSrc": "../../images/account/5.png"
      },

      {
        "url": "helpCenter",
        "src": "../../images/account/help.png",
        "txt": "帮助中心"
        //"arrowSrc": "../../images/account/5.png"
      }
    ]
  },

  //点击头像进入登陆页面
  bindlogin: function () {
    wx.navigateTo({
      url: "../login/login"
    })
  },

  //点击nav区域跳转
  onSkip: function (e) {
    var that = this;
    var title = e.currentTarget.dataset.title; //获取自定义属性
    console.log(e)
    if (wx.getStorageSync("uid")) {
      if (wx.getStorageSync("realName")) {

        if (title == "myCard") {
          wx.setStorageSync("path", title)
        }

        wx.navigateTo({
          url: ".." + "/" + title + "/" + title,
        })
        console.log(title)
      } else {
        wx.navigateTo({
          url: '../realName/realName',
        })
      }
    } else {
      that.setData({
        showModalStatus: true
      })
    }

  },
  //去注册：
  regist: function (e) {
    this.setData({
      showModalStatus: false
    })
    wx.navigateTo({
      url: '../regist/regist',
    })

  },
  //去登陆：
  login: function () {
    this.setData({
      showModalStatus: false
    })
    wx.navigateTo({
      url: '../login/login',
    })
  },
  //关闭弹窗
  close: function () {
    this.setData({
      showModalStatus: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取微信头像及昵称
    that.setData({
      agName: wx.getStorageSync("realName"),
      agMer: wx.getStorageSync("mer")
    })
    urlData.header(that, that.data.nickName, that.data.avatarUrl, that.data.uid)
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
    var that = this;
    that.setData({
      mer: wx.getStorageSync("mer"),
      phone: wx.getStorageSync("phone"),
      display: wx.getStorageSync("display"),
      num: wx.getStorageSync("num"),
      money: wx.getStorageSync("money")
    })
    that.onLoad();
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