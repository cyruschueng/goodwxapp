//index.js
var util = require('../../utils/util.js'); 
//获取应用实例
var app = getApp();  

Page({
  data: {
    getPhone:'',
    fromLoginOut:false,
    userName:'',
    userPassword:'',
    checked: false,
    disabled: true,
    color5: '#808080',
    color6: '#808080',
    color7: 'transparent',
    pwd1: false,
    pwd0:true,
    pwd0Val:'',
    pwd1Val:'',
    errBox: {},
  },

  // 隐藏密码  切换为可视
  eyeCheck1:function(){
    var that = this;
    that.setData({
      pwd1: true,
      pwd0: false,
    })
  },
  eyeCheck2: function (){
    var that = this;
    that.setData({
      pwd1: false,
      pwd0: true,
    })
  },
  // 获取输入账号
  usrInput: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '') {
      that.setData({
        userName: util.trim(e.detail.value)
      })
    } else {
      that.setData({ disabled: true })
    }
  },
  // 获取输入密码
  pwd0Input: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '') {
      that.setData({
        pwd0Val: util.trim(e.detail.value),
        pwd1Val: util.trim(e.detail.value),
        disabled: false,
        userPassword: util.sha1(util.trim(e.detail.value))
      })
    } else {
      that.setData({ disabled: true })
    }
  },
  // 获取输入密码
  pwd1Input: function (e) {
    var that = this
    if (util.trim(e.detail.value) != '') {
      that.setData({
        pwd0Val: util.trim(e.detail.value),
        pwd1Val: util.trim(e.detail.value),
        disabled: false,
        userPassword: util.sha1(util.trim(e.detail.value))
      })
    } else {
      that.setData({ disabled: true })
    }
  },
  // 记住密码多选框
  checkChange: function () {
    this.data.checked = !(this.data.checked);
  },
  // 示例电站
  demoToast: function () {
    var that = this
    that.setData({
      userName: 'vplant',
      userPassword: util.sha1('vplant')
    })
    that.logIn();
  },
  // 登录
  logIn: function () {
    var that = this;
    if (that.data.userName.length == 0) {
      util.errBoxFunc1(that, '请输入账号') 
    } else if ((that.data.userName.length <= 2) || (that.data.userName.length>32)){
      util.errBoxFunc1(that, '账号为2~32位') 
    } else if (that.data.userPassword.length == 0) {
      util.errBoxFunc1(that, '请输入密码') 
    }
    // 认证 
    var usr = that.data.userName;
    var pwd = that.data.userPassword;
    var checked = that.data.checked;
    var salt = new Date().getTime();
    var action = "&action=auth&usr=" + encodeURI(usr) + "&company-key=bnrl_frRFjEz8Mkn";
    var sign = util.sha1(salt + pwd + "&action=auth&usr=" + encodeURI(usr) + "&company-key=bnrl_frRFjEz8Mkn");
    var urlHead = util.RequestHead()
    var url = urlHead + "?sign=" + sign + "&salt=" + salt + action;
    
    if (usr.length != 0 && (pwd.length != 0)) {
      wx.showLoading({
        title:'登录中',
        mask:true
      })
      wx.request({
        url: url,
        method: 'GET',
        success: function (res) {
          if (res.data.err == 0) { 
            if (res.data.dat.role == 0 || (res.data.dat.role == 5) ||((usr == 'vplant' && (pwd == util.sha1('vplant'))))) {  // 电站业主 str
              wx.setStorageSync('identity', 'Owner') //登录者是电站业主
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000
              })
              var UInfo_index={
                'dat': res.data.dat,
                'userName': usr,
                'userPassword': pwd
              }
              wx.setStorageSync('UInfo_index', UInfo_index)
              if (checked) {
                wx.setStorageSync('UInfoRem_index', UInfo_index )
              }
              //  电站业主 end
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/list/list?fromIndex=true',
                })
              }, 1500)
            } else if (res.data.dat.role == 1 || res.data.dat.role == 2){
              wx.setStorageSync('identity', 'Adminis') //登录者是管理员
              //  厂家账号 str
              
              var UAInfo_index = {
                'datAdm': res.data.dat,
                'userNameAdm': usr,
                'userPasswordAdm': pwd
              }
              wx.setStorageSync('UAInfo_index', UAInfo_index)
              if (checked) {
                wx.setStorageSync('UAInfoRem_index', UAInfo_index)
              }
              //  厂家账号 end
              setTimeout(function () {
                wx.redirectTo({
                  url: '/pages/listAdm/listAdm?fromIndex=true',
                })
              }, 1500)
            }else{
              wx.hideLoading()
              errBox.isErr = true
              errBox.errMsg = '只支持管理员和电站业主登录'
              that.setData({
                errBox: errBox,
              })
            }
            
          } else {
            wx.hideLoading()
            util.errBoxFunc(that, res.data.err, res.data.desc)
          }
        },
        fail: function (res) {
          wx.hideLoading()
          util.netWork(that)
        }
      })
    }
  },
  
  register: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  // 加载页面 获取页面宽度
  onLoad: function (ops) {
    var that = this
    if (ops.fromLoginOut){
      that.setData({
        fromLoginOut:true
      })
    }
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
    wx.setStorageSync('stationArr', [])//用来存储跳转的层级
    var that = this;
    if (that.data.userName == '' && (that.data.userPassword == '')){
      util.loginRemember(that)
    }
    // 取得屏幕宽
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    });
    // 获取当前时间
    var date = new Date();
    var nowdate = new Date().toLocaleString()
    var currentDate = date.getFullYear() + '-' + util.doubDigit(date.getMonth() + 1) + '-' + util.doubDigit(date.getDate())
    var currentMonth = date.getFullYear() + '-' + util.doubDigit(date.getMonth() + 1)
    var currentYear = date.getFullYear()
    var screenVal={
      'windowWidth': that.data.windowWidth,
      'windowHeight': that.data.windowHeight,
      'currentDate': currentDate,
      'currentMonth': currentMonth,
      'currentYear': currentYear,
      'nowdate': nowdate,
    }
    wx.setStorageSync('screenVal', screenVal)
  },
  onShareAppMessage: function () {
    var shareObj = util.shareFunc()
    return shareObj
  }
})