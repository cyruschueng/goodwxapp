var app = getApp()
Page({
  data: {
    hiddeneditalias: false,//显示修改昵称弹出框
    alias: '',//昵称
    hiddenmodalput: false, //显示登陆框
    validCodeShow: false, //显示验证码倒计时
    validCodeTime: 120, //验证码倒计时时间
    phone: '', //登陆框手机号
    miniIndex: {}
  },
  showAlert(content) {
    var timer;
    clearTimeout(timer)
    this.setData({
      alert: {
        show: true,
        type: 'error',
        title: content
      }
    })
    timer = setTimeout(() => {
      this.setData({
        alert: {
          show: false
        }
      }, )
    }, 2000)
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '用户资料中心',
    })
  },
  onShow: function () {
    this.miniIndex()
  },
  //获取个人资料
  miniIndex() {

    app.commonAjax('/miniapp/miniprogram/userInfo/detail', ['openid'], {}, (res) => {

      this.setData({
        miniIndex: res.data.data
      })

    }, app.globalData, 'get')

  },
  //放弃编辑按钮
  cancel() {
    this.setData({
      phone: '',
      ValidCode:'',
      validCodeShow: false,
      validCodeTime: 120,
      hiddeneditalias: false,
      hiddenmodalput: false
    })
  },
  //点击编辑昵称按钮
  editalias() {
    this.setData({
      hiddeneditalias: !this.data.hiddeneditalias
    })
  },

  //输入新的昵称
  changealias(e) {
    this.setData({
      alias: e.detail.value
    })
  },

  //提交新的昵称

  sub_editalias() {
    if (this.data.alias) {

      app.commonAjax('/miniapp/miniprogram/userInfo/manage', ['openid'], { alias: this.data.alias }, (res) => {

        if (res.data.code == 0) {
          this.miniIndex()
          this.cancel()
          this.setData({
            alias:''
          })
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })

        } else {
          this.showAlert(res.data.message)
          // wx.showToast({
          //   title: res.data.message,
          //   image: '/image/i/x.png',
          //   duration: 2000
          // })
        }

      }, app.globalData, 'post')

    } else {
      wx.showToast({
        title: '请输入新的昵称！',
        image: '/image/i/x.png',
        duration: 2000
      })
    }
  },

  //点击编辑手机号按钮
  editphone() {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //输入手机号
  input_phone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  getValidCode() {
    if ((/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.phone))) {

      app.commonAjax('/miniapp/miniprogram/userInfo/getValidCode', ['shopId'], { phone: this.data.phone }, (res) => {

        if (res.data.code == 0) {

          this.setData({
            validCodeShow: true
          })
          this.changevalidCodeTime()
          wx.showToast({
            title: '发送成功！',
            icon: 'success',
            duration: 1000
          })
        } else {
          this.showAlert(res.data.message)
          // wx.showToast({
          //   title: res.data.message,
          //   image: '/image/i/x.png',
          //   duration: 1000
          // })
        }

      }, app.globalData, 'post')

    } else {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    }

  },
  //验证码倒计时
  changevalidCodeTime() {
    var that = this;
    var timer;
    timer = setInterval(function () {
      that.setData({
        validCodeTime: --that.data.validCodeTime
      })
      if (that.data.validCodeTime <= 0) {
        clearInterval(timer)
        that.setData({
          validCodeShow: false
        })
      }
    }, 1000)
  },
  //输入验证码
  inputValidCode(e) {
    this.setData({
      ValidCode: e.detail.value
    })
  },
  //提交手机号和验证码
  verifyPhone() {
    if ((/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.phone))) {

      if (this.data.ValidCode) {

        app.commonAjax('/miniapp/miniprogram/userInfo/manage', ['openid','shopId'], { hasPhone: true, phone: this.data.phone, verifyCode: this.data.ValidCode }, (res) => {

          if (res.data.code == 0) {
            wx.setStorageSync('userphone', this.data.phone)
            app.globalData.userphone = this.data.phone
            this.setData({
              hiddenmodalput: !this.data.hiddenmodalput,
              phone:'',
              verifyCode:''
            })
            this.miniIndex()
            this.cancel()
            wx.showToast({
              title: '手机号验证成功',
              icon: 'success',
              duration: 1000
            })
            

          } else {
            this.showAlert(res.data.message)
            // wx.showToast({
            //   title: res.data.message,
            //   image: '/image/i/x.png',
            //   duration: 1000
            // })
          }

        }, app.globalData, 'post')

      } else {
        wx.showToast({
          title: '请输入验证码',
          icon: 'loading',
          image: '/image/i/x.png',
          duration: 1000
        })
      }

    } else {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    }
  }

})