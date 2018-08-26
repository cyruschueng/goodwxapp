var app = getApp()
Page({
  data: {
    miniIndex: {},
    phone: '',
    id: 1,
    index: 0,
    yzm: '',
    show: 0,
    num: 120,
    encryptedData:'',
    iv:'',
    sessionKey:'',
    yzm_ok : 0
  },
  onLoad: function () {

  },

  inputyzm: function (e) {
    this.setData({
      yzm: e.detail.value
    })
  },

  inputphone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  getPhoneNumber: function (e) {

    var that = this;
    console.log(e)
    //解密手机号
    var subdata3 = {}
    subdata3.encryptedData = e.detail.encryptedData
    subdata3.iv = e.detail.iv

    wx.getStorage({
      key: '3rd_session',
      success: function (res) {
        subdata3.sessionKey = res.data

        console.log(subdata3)

        wx.request({
          url: 'https://lingju360.natappvip.cc/miniapp/miniprogram/userInfo/decryptPhone',
          data: subdata3,
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          method: 'post',
          success: function (res) {
            console.log('--------------解密手机号')
            console.log(JSON.parse(res.data.data).phoneNumber)

            that.setData({
              phone: JSON.parse(res.data.data).phoneNumber
            })

          }
        })
      }
    })

  },

  onShow:function(){
    var that = this;
    wx.getStorage({
      key: '3rd_session',
      success: function (res) {
        that.getUserInfo(res.data)
      }
      
      })

  },



  //获取用户信息
  getUserInfo: function (key) {

    var that = this;

    wx.getUserInfo({
      lang:'zh_CN',
      success: function (res) {
        console.log(res)
        var subdata = {};
        subdata.encryptedData = res.encryptedData;
        subdata.sessionKey = key;
        subdata.iv = res.iv
        console.log(subdata)

        that.setData({
          encryptedData: res.encryptedData,
          iv: res.iv,
          sessionKey: key
        })

      }
    })

  },


  //获取验证码
  getyzm: function () {
    var that = this;
    var subdata = { phone: '' };
    subdata.phone = this.data.phone;
    if ((/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.data.phone))) {
      that.setData({
        show: 1
      })
      that.numchange()
      console.log(subdata)
      wx.request({
        url: 'https://lingju360.natappvip.cc/miniapp/cat/messagecenter/getvalidcode',
        data: subdata,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log('--------------获取验证码')
          console.log(res.data)
          wx.showToast({
            title: '发送成功！',
            icon: 'success',
            duration: 1000
          })

        }
      })
    } else {
      wx.showToast({
        title: '请输入正确的手机号！',
        icon: 'loading',
        image: '/image/i/x.png',
        duration: 1000
      })
    }

  },

  //计数
  numchange: function () {
    var that = this;
    var timer;
    timer = setInterval(function () {
      that.setData({
        num: --that.data.num
      })
      if (that.data.num <= 0) {
        clearInterval(timer)
        that.setData({
          show:0
        })
      }
    }, 1000)

    
  },

  //登陆
  save: function () {
    if(this.data.yzm){
      var that = this;
      var subdata = {};
      subdata.encryptedData = this.data.encryptedData;
      subdata.iv = this.data.iv;
      subdata.sessionKey = this.data.sessionKey;
      subdata.phone = this.data.phone;
      subdata.verifyCode = this.data.yzm;
      console.log(subdata)
      wx.request({
        url: 'https://lingju360.natappvip.cc/miniapp/miniprogram/userInfo/loadUserInfo',
        data: subdata,
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          console.log('--------------注册')
          console.log(res.data)
          if (res.data.code == 5003 || res.data.code == 5002){
            wx.showToast({
              title: '验证码有误',
              image: '/image/i/x.png',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 2000
            });
            wx.setStorage({
              key: 'memberId',
              data: res.data.data.id,
            });
            app.appshow()
            wx.setStorage({
              key: 'logins',
              data: 1,
              success: function () {
                wx.reLaunch({
                  url: '/page/index/index'
                })
              }
            });
          }
        }
      })
    }else{
      wx.showToast({
        title: '验证码有误',
        image: '/image/i/x.png',
        duration: 2000
      })
    }
  },
})