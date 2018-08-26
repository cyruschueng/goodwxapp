// reg.js
var common = require('../../common/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //src: '../../image/01.jpg',
    companyBox:'',
    isDisabled: false,
    user_id:'',
    buttonDisable: false,
    verifyCodeTime: '获取图形验证码',
    isCode: false,
    imgCode:'',
    imgCaptcha:''

  },
  /**
   * 内部员工--控制
   */
  checkboxChange: function (e) {
    if (e.detail.value=='1'){
      this.setData({
        companyBox: '丰融票号',
        isDisabled: true
      })
    }else{
      this.setData({
        companyBox: '',
        isDisabled: false
      })
    }
  },
  /**
   * 获取--单个手机号
   */
  mobileInputEvent: function (e) {
    this.setData({
      user_id: e.detail.value
    })
  },
  /**
   * 获取--输入的图形验证码
   */
  imgInputEvent:function(e){
    this.setData({
      imgCaptcha: e.detail.value
    })
  },
  /**
   * 换一张图片验证码
   */
  clickImgCode:function(){
    var _this = this;

    var user_id = _this.data.user_id;
    var regMobile = /^1\d{10}$/;
    if (!regMobile.test(user_id)) {
      wx.showToast({
        title: '手机号有误！'
      })
      return false;
    }
    wx.request({
      url: common.getRequestUrl + '/dtk/users/captcha/pic',
      data: {
        user_id: _this.data.user_id
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.code !== 'OK') {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        } else {
          _this.setData({
            imgCode: "data:image/png;base64," + res.data.data,
            isCode: true,
            verifyCodeTime: '获取短信验证码'
          })
        }
      }
    })
  },
  /**
   * 获取--图形和短信验证码
   */
  picCode:function(){
    if (this.data.buttonDisable) return false;
    var _this=this;

    var user_id = _this.data.user_id;
    var regMobile = /^1\d{10}$/;
    if (!regMobile.test(user_id)) {
      wx.showToast({
        title: '手机号有误！'
      })
      return false;
    }
    //console.log(_this.data.user_id)
    if (_this.data.isCode == false){
      wx.request({
        url: common.getRequestUrl + '/dtk/users/captcha/pic',
        data: {
          user_id: _this.data.user_id
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.code !== 'OK') {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          }else{
            _this.setData({
              imgCode: "data:image/png;base64," + res.data.data,
              isCode: true,
              verifyCodeTime: '获取短信验证码'
            })
          }
        }
      })
    }else{
      if (_this.data.imgCaptcha=='') {
        wx.showToast({
          title: '图形验证码有误！'
        })
        return false;
      }
      wx.request({
        url: common.getRequestUrl + '/dtk/users/captcha/sms',
        data: {
          captcha: _this.data.imgCaptcha,
          user_id: _this.data.user_id
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.data.code !== 'OK') {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          } else {
            /* 倒计时 */
            var c = 60;
            var intervalId = setInterval(function () {
              c = c - 1;
              _this.setData({
                verifyCodeTime: c + 's后重发',
                buttonDisable: true
              })
              if (c == 0) {
                clearInterval(intervalId);
                _this.setData({
                  verifyCodeTime: '获取短信验证码',
                  buttonDisable: false
                })
              }
            }, 1000)
            _this.setData({
              isCode: true
            })
          }
        }
      })
    }

  },
  formSubmit: function (e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        duration: 2000
      })
      return false
    } else if (e.detail.value.user_passwd !== e.detail.value.confirm_passwd){
      wx.showToast({
        title: '两次密码不一致',
        icon: 'cancel',
        duration: 2000
      })
      return false
    }

    wx.request({
      url: common.getRequestUrl + '/dtk/users',
      data: {
        user_id: e.detail.value.user_id,
        user_passwd: e.detail.value.user_passwd,
        name: e.detail.value.name,
        //company: e.detail.value.company,
        captcha: e.detail.value.captcha,
        wechat: e.detail.value.wechat,
        company_name: e.detail.value.company_name,
        address: e.detail.value.address
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code !== 'OK') {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 2000
          })
        }else {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          try {
            wx.setStorageSync('tokenstorage', res.data.token)
            wx.setStorageSync('swapstorage', res.data.swap)
          } catch (e) {
          }
          wx.switchTab({
            url: '../user/user'
          })
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.WxValidate = app.globalDataValidate(
      {
        user_id: {
          required: true,
          tel: true,
        },
        user_passwd: {
          required: true
        },
        name: {
          required: true,
          maxlength:6
        },
        captcha: {
          required: true
        }
      }
      , {
        user_id: {
          required: '请填写用户名',
        },
        user_passwd: {
          required: '请输入密码',
        },
        name: {
          required: '请输入姓名',
        },
        captcha: {
          required: '请输入手机验证码',
        }
      }
    )
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
  
  }
})