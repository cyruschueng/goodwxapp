//=======账户========= pages/account/account.js
var app = getApp();
var urlData = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid: "",
    mer:"",
    func:[],
    phone: '',  //手机号
    display: '',  //判断是否实名bool
    num:'',  //还款中笔数
    money: '',  //还款中金额
    showModalStatus:false,
    //功能区域数据
    func : [
      {
        "url": "myCard",
        "src": "../../images/account/1.png",
        "txt": "我的银行卡",
        "arrowSrc": "../../images/account/5.png"
      },
      {
        "url": "security",
        "src": "../../images/account/2.png",
        "txt": "账户安全",
        "arrowSrc": "../../images/account/5.png"
      },
      // {
      //   "url": "grade",
      //   "src": "../../images/index/grade.png",
      //   "txt": "等级",
      //   "arrowSrc": "../../images/account/5.png"
      // },
      {
        "url": "center",
        "src": "../../images/index/promotion_act.png",
        "txt": "推广中心",
        "arrowSrc": "../../images/account/5.png"
      },

      {
        "url": "about",
        "src": "../../images/account/3.png",
        "txt": "关于我们",
        "arrowSrc": "../../images/account/5.png"
      },
      {
        "url": "helpCenter",
        "src": "../../images/account/4.png",
        "txt": "帮助中心",
        "arrowSrc": "../../images/account/5.png"
      }
    ]
  },
  //点击头像进入登陆页面
  bindlogin:function(){
    wx.navigateTo({
      url: "../login/login"
    })
  },
  //功能区域跳转页面
  onSkip:function(e){
    var that = this;
    var title = e.currentTarget.dataset.title; //获取自定义属性
    if (wx.getStorageSync("uid")){
      if (wx.getStorageSync("realName")) {
        wx.navigateTo({
          url: ".." + "/" + title + "/" + title,
        })
      } else {
        wx.navigateTo({
          url: '../realName/realName',
        })
      } 
    }else{
      that.setData({
        showModalStatus:true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取微信头像及昵称
    urlData.header(that, that.data.nickName, that.data.avatarUrl, that.data.uid)
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