var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    btn_code_text: '获取',
    t: 60,
    icon_mobile: app.globalData.res_path + '/img/icon_mobile.png',
    icon_pin: app.globalData.res_path + '/img/icon_pin.png',
  },
  
  onLoad: function () {
    this.setData({
      wxid: wx.getStorageSync('wxid'),
      t: 60
    })
    var that = this
    wx.request({
      url: app.globalData.server + '/api/Sp/getCode',
      success:function(res){
       that.setData({
         code: app.globalData.server + res.data.data['code']
       })
      }
    })
  },
  onShow: function () {
    this.setData({
      t: 60
    })
  },
  getCode:function(){
    var that = this
    that.setData({
      code: ''
    })
    wx.request({
      url: app.globalData.server + '/api/Sp/getCode',
      success: function (res) {
        that.setData({
          code: app.globalData.server + res.data.data['code']
        })
      }
    })
  },
  mobileInput: function (e) {
    wx.setStorage({
      key: 'mobile',
      data: e.detail.value,
    })
  },
  pinInput: function (e) {
    wx.setStorage({
      key: 'pin',
      data: e.detail.value,
    })
  },
  yzmInput: function(e) {
    if (e.detail.cursor == 4){
      wx.request({
        url: app.globalData.server + '/api/Sp/checkCode',
        data: {
          captcha: e.detail.value,
        },
        success:function(res){
          console.log(res.data.msg)
        }
      })
    }
  },
  getSmsCode: function () {
    var that = this
    wx.getStorage({
      key: 'mobile',
      success: function (res) {
        if (res.data == '') {
          wx.showToast({
            title: '请输入手机号',
            image: '../images/icon_warning.png'
          })
        } else if (res.data.length < 11) {
          wx.showToast({
            title: '手机号码错误',
            image: '../images/icon_warning.png'
          })
        }
        else {
          util.getCodeTime(that, that.data.t)
          wx.request({
            url: app.globalData.server + '/api.php/V1/getVerifyCode',
            data: {
              mobile: res.data
            },
            success: function (res) {
              if (res.data != '') {
                wx.showToast({
                  title: '发送成功',
                })
                wx.setStorage({
                  key: 's_pin',
                  data: res.data,
                })
              } else {
                wx.showToast({
                  title: '获取失败',
                  image: '../images/icon_warning.png'
                })
              }
            },
            fail: function () {
              wx.showToast({
                title: '获取失败',
                image: '../images/icon_warning.png'
              })
            }
          })
        }
      },
    })
  },
  formSubmit: function (e) {
    var that = this
    if (e.detail.value.pin == '' || e.detail.value.mobile == '') {
      wx.showToast({
        title: '登录信息不完整',
        image: '../images/icon_warning.png'
      })
    } else if (wx.getStorageSync('pin') != wx.getStorageSync('s_pin')) {
      wx.showToast({
        title: '验证码错误',
        image: '../images/icon_warning.png'
      })
    } else {
      wx.request({
        url: app.globalData.server + '/api.php/V1/checkLogin',
        data: e.detail.value,
        success: function (res) {
          if (res.data != 0) {
            wx.showToast({
              title: '登录成功'
            })
            wx.setStorage({
              key: 'oper_id',
              data: res.data,
            })
            wx.redirectTo({
              url: '../index/index',
            })
          } else {
            wx.showToast({
              title: '登录失败',
              image: '../images/icon_warning.png'
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '登录失败',
            image: '../images/icon_warning.png'
          })
        }
      })
    }

  }
})