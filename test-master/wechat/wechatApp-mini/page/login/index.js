var app = getApp()
Page({
  data: {
    shopId: '',
    busname: '',
    hiddenmodalput: false, //显示登陆框
    validCodeShow: false, //显示验证码倒计时
    validCodeTime: 120, //验证码倒计时时间
    phone: '', //登陆框手机号
    userphone:'null',
    time300: true,
    memberId: ''
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
  onLoad(e){
    
    wx.setNavigationBarTitle({
      title: '会员注册',
    })
    this.setData({
      userphone: app.globalData.userphone ? app.globalData.userphone : ''
    })
  },
  onShow() {
    var that = this;
    this.setData({
      memberId: app.globalData.memberId
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

    if (this.data.time300){

      this.setData({
        time300: false
      })

      setTimeout(()=>{
        this.setData({
          time300: true
        })
      },1000)

      if ((/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.phone))) {

        app.commonAjax('/miniapp/miniprogram/userInfo/getValidCode', ['shopId'], { phone: this.data.phone }, (res) => {

          if (res.data.code == 0) {

            this.setData({
              validCodeTime: 120,
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

        app.commonAjax('/miniapp/miniprogram/userInfo/manage', ['openid','shopId'], { hasPhone: true,phone: this.data.phone, verifyCode: this.data.ValidCode }, (res) => {

          if (res.data.code == 0) {

            this.setData({
              validCodeShow: false,
              userphone: this.data.phone
            })
            wx.showToast({
              title: '号码验证成功',
              icon: 'success',
              duration: 1000,
              success: () => {
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1,
                  })
                },1000)
              }
            })
            wx.setStorageSync('userphone', this.data.phone)
            app.globalData.userphone = this.data.phone

            

          } else {
            this.showAlert(res.data.message)
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
  },
  // 
})