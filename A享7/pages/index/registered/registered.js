
import Api from '../../../utils/config/api.js';
import { GLOBAL_API_DOMAIN } from '../../../utils/config/config.js';
var utils = require('../../../utils/util.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _build_url: GLOBAL_API_DOMAIN,
    isgetnumber:true,
    sessionkey:'',
    phone:'',
    Verify:'',
    verifitime:'',
    clock:''
  },
  onLoad: function (options) {
    this.getuseradd()
  },
  getuseradd: function () {  //获取用户userid
    wx.login({
      success: res => {
        let _code = res.code;
        // console.log("code:", _code)
        // return false  //此处返回，获取的code是没有用过的，用于测试
        if (res.code) {
          let _parms = {
            code: res.code
          }
          Api.useradd(_parms).then((res) => {
            if (res.data.data) {
              app.globalData.userInfo.userId = res.data.data
              this.getuser()
            }
          })
        }
      }
    })
  },
  getuser: function () { //从自己的服务器获取用户信息
    let that = this
    wx.request({
      url: this.data._build_url + 'user/get/' + app.globalData.userInfo.userId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code == 0) {
            let data = res.data.data;
            app.globalData.userInfo.userType = data.userType,
            app.globalData.userInfo.openId = data.openId,
            app.globalData.userInfo.password = data.password,
            app.globalData.userInfo.shopId = data.shopId ? data.shopId : '',
            app.globalData.userInfo.userName = data.userName,
            app.globalData.userInfo.nickName = data.nickName,
            app.globalData.userInfo.loginTimes = data.loginTimes,
            app.globalData.userInfo.iconUrl = data.iconUrl,
            app.globalData.userInfo.sourceType = data.sourceType,
            app.globalData.userInfo.sex = data.sex
            if (data.mobile == '' || data.mobile == null){}else{
              wx.switchTab({
                url: '../../index/index',
              })
              return false
            }
        }
      }
    })
  },
  getPhoneNumber: function (e) { //获取用户授权的电话号码
    let _detail = e.detail
    let that = this
    wx.login({
      success: res => {
        if (res.code) {
          let _parms = {
            code: res.code
          }
          Api.getOpenId(_parms).then((res) => {
            if (res.data.code == 0) {
              app.globalData.userInfo.openId = res.data.data.openId,
                app.globalData.userInfo.sessionKey = res.data.data.sessionKey
              let _pars = {
                sessionKey: res.data.data.sessionKey,
                ivData: msg.iv,
                encrypData: msg.encryptedData
              }
              Api.phoneAES(_pars).then((res) => {
                if (res.data.code == 0) {
                  let _data = JSON.parse(res.data.data)
                  that.setData({
                    phone: _data.phoneNumber
                  })
                }
              })
            }
          })
        }
      }
    })


    this.getphone(_detail)
  },
  getphone: function (msg) {//获取用户电话号码
    this.setData({
      isgetnumber: false
    })
    let that = this
    wx.login({
      success: res => {
        if (res.code) {
          let _parms = {
            code: res.code
          }
          Api.getOpenId(_parms).then((res) => {
            if (res.data.code == 0) {
              app.globalData.userInfo.openId = res.data.data.openId,
                app.globalData.userInfo.sessionKey = res.data.data.sessionKey
              let _pars = {
                sessionKey: res.data.data.sessionKey,
                ivData: msg.iv,
                encrypData: msg.encryptedData
              }
              Api.phoneAES(_pars).then((res) => {
                if (res.data.code == 0) {
                  let _data = JSON.parse(res.data.data)
                  that.setData({
                    phone: _data.phoneNumber
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  bindblur:function(e){  //输入框失去焦点  获取输入框内容
    let _phone = e.detail.value
    if (/^1[34578]\d{9}$/.test(_phone)){
      this.setData({
        phone: _phone
      })
    }else{
      wx.showToast({
        title: '电话号码有误，请重新输入',
        icon: 'none',
        mask:true,
        duration: 1500
      })
    }
  },
  getverification: function () {  //获取验证码
    let that = this
    if(this.data.phone){
      let _parms = {
        shopMobile: this.data.phone,
        userId: app.globalData.userInfo.userId,
        userName: app.globalData.userInfo.userName
      }
      Api.sendForRegister(_parms).then((res) => {
        if (res.data.code == 0) {
          let _time = res.data.data.veridyTime
          let time = new Date(_time.replace("-", "/"));
          time.setMinutes(time.getMinutes() + 10, time.getSeconds(), 0);
          that.setData({
            verifitime: time
          })
          let nowtime = new Date();
          let setIn =  setInterval(function () {
            var leftTime = (new Date(that.data.verifitime) - new Date()); //计算剩余的毫秒数
            var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
            var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
            that.setData({
              clock: minutes + "分" + seconds + "秒"
            })
            if ( minutes == '00' && seconds == '00') {
              clearInterval(setIn);
            }
          }, 1000)
        }
      })
    }
  },
  smsbindblur:function(e){  //获取验证码框内容
    this.setData({
      Verify: e.detail.value
    })
  },
  login:function(){  //点击立即注册
    let that = this
    if(this.data.phone == ''){
      wx.showToast({
        title: '请输入电话号码',
        mask: true,
        icon: 'none',
        duration: 1500
      })
      return false
    }
    if (this.data.Verify){
      let _parms = {
        shopMobile: this.data.phone,
        userId: app.globalData.userInfo.userId,
        userName: app.globalData.userInfo.userName,
        smsContent: this.data.Verify
      }
      Api.isVerify(_parms).then((res) => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '注册成功!',
            icon: 'none',
            mask:true,
            duration: 2000
          })
          that.setData({
            clock:''
          })
          wx.switchTab({
            url: '../../index/index',
          })
        }else{
          wx.showToast({
            title: '验证码错误，请重新输入!',
            icon: 'none',
            mask: true,
            duration: 2000
          })
          that.setData({
            clock: '',
            Verify:''
          })
        }
      })
    }else{
      wx.showToast({
        title: '请输入验证码',
        mask:true,
        icon:'none',
        duration:1500
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */

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
    
  }
})