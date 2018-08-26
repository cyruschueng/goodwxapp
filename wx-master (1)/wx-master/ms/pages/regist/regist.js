var urlData = require('../../utils/util.js');
var md5 = require("../../utils/md5.js");
var app = getApp()
Page({
  data: {
    registBtnTxt: "注册",
    getBtnText: '发送验证码',
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,

    pwdLogin: false, //密码登录显示
    phone: '',           //登录手机号码
    code: '',              //验证码
    password: '', 
    password1:'',        //登录密码
    getBtn: true,
    sort:'Mer',
    Invitation:'',        //邀请码
    disa:false,

    checked:false,
    disable:true,
    user:"",
    code:"",
    userPwd:"",
    confirmPwd:"",
    InvitationCode:"",
    focus:true,
    focus1:false,
    focus2:false,
    focus3: false

  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // var that = this;
    // that.setData({
    //   // user:template.name,
    //   // Code:template.code,
    //   // userPwd:template.userpwd,
    //   // confirmPwd:template.confirmPwd,
    //   // InvitationCode: template.InvitationCode
    // })
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  //获取手机号的值
  getPhone: function (e) {

    this.setData({
      phone: e.detail.value
    })

    if(this.data.phone.length==11){
      this.setData({
        focus1:true
      })
    } else if (this.data.phone.length < 11){
      this.setData({
        disa: false,
        code:"",
        getBtnText:"发送验证码"
      })
    }
  
  },

  //获取验证码的值
  getCode: function (e) {
    console.log("改变验证码")
    this.setData({
      code: e.detail.value
    })

    if (this.data.code.length == 6) {
      this.setData({
        disa: true,
        focus2:true
      })
    } else if (this.data.phone.length < 6) {
      this.setData({
        disa: false
      })
    }
  },

  //获取密码的值
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  firm:function(){
    this.setData({
      focus3:true
    })
  },

  firm1: function () {
    this.setData({
      focus4: true
    })
  },

  //再次获取密码的值
  getPassword1: function (e) {
    this.setData({
      password1: e.detail.value
    })
  },

  getInvitation:function(e){
    this.setData({
      Invitation: e.detail.value
    })
  },

  //登陆跳转
  login: function () {
    wx.redirectTo({
      url: '../login/login'
    })
  },

//忘记密码
  findPwd: function () {
    wx.redirectTo({
      url: '../pwd/pwd'
    })
  },

  //发送验证码
  sendCode: function () {
    var that = this;
    urlData.sendCode(that, that.data.phone, that.data.disa, that.data.getBtnText)
  },
  checkboxChange:function(){
    this.setData({
      checked:!this.data.checked
    })
  },
  //注册
  regist: function () {
    var that = this;
    var mdPwd = md5.md5(that.data.password);
    mdPwd = md5.md5(mdPwd);
    urlData.regist(that, that.data.phone, that.data.password, mdPwd, that.data.sort, that.data.Invitation, "Mer", that.data.password1, that.data.code)
  },
 //进入注册协议：
  registTreaty:function(){
    wx.navigateTo({
      url: '../registTreaty/registTreaty',
    })
  },
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {
    var that = this;
    that.setData({
      code:""
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
})