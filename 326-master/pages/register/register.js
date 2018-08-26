var util = require('../../utils/util.js');
// var rc4 = require('../../utils/crypto-js.js');
//获取应用实例
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    errBox:{}
  },
  canceReg:function(){
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit: function (e) {
    var regName = util.trim(e.detail.value.regName);
    var regEmail = util.trim(e.detail.value.regEmail);
    var regPhone = util.trim(e.detail.value.regPhone);
    var regPN = util.trim(e.detail.value.regPN);
    var regPwd = util.trim(e.detail.value.regPwd);
    var regConpwd = util.trim(e.detail.value.regConpwd);
    var that = this;
    // 判断账号是否为空和判断该账号名是否被注册  
    if ("" == regName) {
      util.errBoxFunc1(that, '请输入用户名') 
      return  
    } else if (regName.length < 2 || (regName.length >= 20)) {
      util.errBoxFunc1(that, '用户名格式错误（2<=用户名长度<32）')
      return
    }else if ("" == regEmail) {
      util.errBoxFunc1(that, '请输入邮箱')
      return
    } else if (((regEmail.length < 6) || ((regEmail.length >= 64))) || (regEmail.indexOf("@") == -1)) { 
      util.errBoxFunc1(that, '邮箱格式错误（6<=邮箱长度<64）并包含@字符')
      return
    }else  if ("" == regPhone) {
      util.errBoxFunc1(that,'请输入手机号')
      return
    } else if (regPhone.length < 6 || (regPhone.length >= 32)) {
      util.errBoxFunc1(that, '电话号码格式错误（6<=号码长度<32）')
      return
    } else if ("" == regPN) {
      util.errBoxFunc1(that, '请输入PN号')
      return
    } else if (regPN.length != 14) {
      util.errBoxFunc1(that, 'PN号长度为14位')
      return
    } else if ("" == regPwd) {
      util.errBoxFunc1(that, '请输入密码')
      return
    } else if (regPwd.length < 6 || (regPwd.length >= 32)) {
      util.errBoxFunc1(that, '密码格式错误（6<=长度<32）')
      return
    } 
    // 判断确认密码是否为空  
    if ("" == regConpwd) {
      util.errBoxFunc1(that, '确认密码不能为空')
      return
    } else if (regConpwd != regPwd) {
      util.errBoxFunc1(that, "两次输入密码不一致")
      return
    } else {
      that.setData({
        errtS: false,
        errMsg: '',
      })
      wx.showLoading({
        title: '加载中',
        // mask: true,
      })
    // 验证都通过了执行注册方法   
    // 请求star
    var SHAregPwd = util.sha1(regPwd);
    var SHAregPN = util.sha1(regPN);
    var rcPWD = util.rc4(SHAregPwd, SHAregPN)
    var cryptPwd = util.byte2hex(rcPWD)

    var salt = new Date().getTime();
    var action = "&action=reg&usr=" + encodeURI(regName) + "&pwd=" + cryptPwd + "&mobile=" + regPhone + "&email=" + regEmail + "&sn=" + regPN.substring(0, 10) + "&company-key=bnrl_frRFjEz8Mkn"
    var sign = util.sha1(salt + SHAregPwd + action);
    var urlHead = util.RequestHead()
    var url = urlHead + "?sign=" + sign + "&salt=" + salt + action;
    wx.request({
      url: url,
      method: 'POST',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        wx.hideLoading()
        if (res.data.err == 0) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '/pages/index/index?fromLoginOut=true'
            })
          },2000)
        } else {
          util.errBoxFunc(that, res.data.err, res.data.desc)
        }
      },
      fail: function () {
        wx.hideLoading()
        util.netWork(that)
      }
    })
    }
    // 请求end
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
    var shareObj = util.shareFunc()
    return shareObj
  }
})