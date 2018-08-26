var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
var util = require('../../utils/util.js');
Page({
  data: {
    imageUrl: '/image/yzmloading.png',
    phone: '',
    password: '',
    openid: '',
    cookie: '',
    yzmindex: 1,
    phoneInfo: '',
    hiddenLoading: true,
    jwUserInfo: {},
    toastHidden: true, //吐司  
    toastText: '',//吐司文本  
    bindRes: '',
  },
  onReady: function () {

  },
  onToastChanged: function () {
    this.setData({ toastHidden: !this.data.toastHidden });
  },
  onLoad: function () {
    that = this
    this.setData({
      openid: wx.getStorageSync('openid')
    })
    this.getCookie();
  },
  onShow: function () {
    if (wx.getStorageSync('isBindFlag') == 1) {
      this.setData({
        toastHidden: false, //吐司  
        toastText: '已经绑定：' + wx.getStorageSync('xh'),//吐司文本  
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 2000);

    }
  },
  formSubmit: function (event) {
    that = this
    this.setData({
      hiddenLoading: !this.data.hiddenLoading
    })
    //登录教务系统
    wx.request({
      url: getApp().data.getJWInfoUrl,
      data: {
        qq: event.detail.value.username,
        pwd: event.detail.value.paswd,
        secret: event.detail.value.yzm,
        cookie: this.data.cookie,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        if (res.data.stuInfo.flag == 1) {
          that.setData({
            jwUserInfo: res.data,
          })
          console.log(res.data.stuPerInfo.name)
          //绑定微信与学号
          wx.request({
            url: getApp().data.bindUserUrl,
            data: {
              openid: that.data.openid,
              xh: event.detail.value.username,
              pwd: event.detail.value.paswd,
              name: res.data.stuPerInfo.name,
              banji: res.data.stuPerInfo.banji,
              sex: res.data.stuPerInfo.sex,
              phone: '',
              memo: '',
              time: util.formatTime(new Date()),
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            method: "POST",
            success: function (result) {
              console.log(result)
              if (result.data.flag == 1) {
                wx.setStorage({
                  key: 'xh',
                  data: event.detail.value.username,
                  success: function (s) {
                    console.log('异步保存成功xh:' + event.detail.value.username)
                  }
                })
                wx.setStorage({
                  key: 'pwd',
                  data: event.detail.value.paswd,
                  success: function (s) {
                    console.log('异步保存成功pwd:' + event.detail.value.paswd)
                  }
                })
                wx.setStorage({
                  key: 'name',
                  data: res.data.stuPerInfo.name,
                  success: function (s) {
                    console.log('异步保存成功name:' + res.data.stuPerInfo.name)
                  }
                })
                that.setData({
                  hiddenLoading: true,
                  toastHidden: false, //吐司  
                  toastText: '绑定成功，' + that.data.jwUserInfo.stuPerInfo.name,//吐司文本  
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 2000);

              } else {
                that.getCookie();
                that.setData({
                  hiddenLoading: true,
                  toastHidden: false, //吐司  
                  toastText: '绑定失败，请重试，' + that.data.jwUserInfo.stuPerInfo.name,//吐司文本  
                })
              }

            }
          })
        } else {
          that.getCookie();
          that.setData({
            hiddenLoading: true,
            toastHidden: false, //吐司  
            toastText: '登录失败，请检查用户名密码及验证码',//吐司文本  
          })
        }

      }
    })
  },
  help: function (e) {
    common.showModal('  本程序目前服务于常州纺院的师生，如果你是本校师生，可使用学校教务系统的账号绑定微信小程序。绑定之后可随时使用刷新成绩、查询打卡、查询课程等服务！\n  如果你是新生，可以使用身份证号码做密码登录查看，不行也请不要着急，开学后一段时间会开通。');
  },
  getCookie() {
    that = this
    that.setData({
      yzmindex: this.data.yzmindex + 1,
      imageUrl: '/image/yzmloading.png',
    })
    console.log(this.data.yzmindex)
    //获取验证码
    wx.request({
      url: getApp().data.getCookie,
      data: {
        qq: this.data.openid + this.data.yzmindex,
        pwd: '123'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          cookie: res.data.cookie,
          imageUrl: 'https://fyapi.sinyu1012.cn/test/yzm/' + that.data.openid + that.data.yzmindex + '.png'
        })
      }
    })
  },
  updateyzm: function (e) {
    this.getCookie();
  }

}) 