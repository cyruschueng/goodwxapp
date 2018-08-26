// pages/login/login.js

var urlData = require('../../utils/util.js');
var md5 = require("../../utils/md5.js");
require("../../utils/mdM.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // pwdLogin:false, //密码登录显示
    phone: '',       //登录手机号码
    name:"",          
    code:'',              //验证码
    password:'',        //登录密码
    getBtn: true,
    // VerificationCode:"验证码",
    // getBtnText: '发送验证码',
    uid:"",
    realName:'',  //真实姓名
    avatarUrl:'',
    disa:false,
    user:"",
    Code:"",  
    userPwd:"",
    focus:false  //自动聚焦
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    
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
    this.setData({
      uid: wx.getStorageSync("uid"),
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
  },

  //获取用户名
  getName:function(e){
    this.setData({
      phone: e.detail.value
    })
    if (this.data.phone.length == 11) {
      this.setData({
        focus: true
      })
    }
  },

  //获取密码的值
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

//跳转注册页面
  register:function(){
    wx.redirectTo({
      url: '../regist/regist'
    })
  },

//跳转找回密码
  findPwd: function () {
    wx.redirectTo({
      url: '../pwd/pwd'
    })
  },

  //密码登录
  loginPwd:function(){
    var that = this;
    console.log("测试对比")
    var mdPwd = md5.md5(that.data.password);
    mdPwd = md5.md5(mdPwd);
    var md = that.data.password.MD5(32);
    md = md.MD5(32)
    console.log(mdPwd)
    console.log(md)
    //密码登录
    urlData.login(that,that.data.phone,that.data.password,mdPwd) 
    that.onShow();
  },
})