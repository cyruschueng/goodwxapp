var common = require('../../common/common.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    tokenstorage: '',
    swapstorage: '',
    name: '',
    address: '',
    company:'',
    gender:'',
    bindForm: [],
    isDisabled: false,
    user_id: '',
    buttonDisable: false,
    verifyCodeTime: '获取验证码',
    isCode: false,
    imgCode: '',
    imgCaptcha: '',
    listBox: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //获取storage的swap
    wx.getStorage({
      key: 'swapstorage',
      success: function (res) {
        _this.setData({
          swapstorage: res.data,
        })
      }
    })
    //获取storage的token
    wx.getStorage({
      key: 'tokenstorage',
      success: function (res) {
        _this.setData({
          tokenstorage: res.data,
        })
        _this.userdata(res.data)
      }
    })
    this.WxValidate = app.globalDataValidate(
      {
        name: {
          required: true,
          maxlength: 10
        },
        address: {
          required: true,
          maxlength: 16
        },
        company:{
          maxlength: 32
        }
      }
      , {
        name: {
          required: '请填写真实姓名',
          maxlength: '真实姓名不能超过10字符'
        },
        address: {
          required: '请填写工作地点',
          maxlength: '工作地点不能超过16字符'
        },
        company: {
          maxlength: '公司名称不能超过32字符'
        }
      }
    )
  },
  //获取用户信息
  userdata: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/users/user',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': e
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          _this.setData({
            dataList: res.data.data[0],
            loadingHidden: true
          })
          wx.stopPullDownRefresh()
          
        } else if (res.data.code == 'TOKEN_INVLID') {
          _this.exchangeToken(1)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //提交修改信息
  formSubmit: function (e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      wx.showToast({
        title: `${error.msg} `,
        duration: 2000
      })
      return false
    }
    var _this = this;
    _this.setData({
      bindForm: e
    });
    wx.request({
      url: common.getRequestUrl + '/dtk/users/user',
      data: {
        name: e.detail.value.name,
        address: e.detail.value.address,
        company: e.detail.value.company,
        gender: e.detail.value.gender,
        wechat: e.detail.value.wechat,
        position: e.detail.value.position,
        isopen: e.detail.value.isopen,
        mobile: e.detail.value.mobile,
        captcha: e.detail.value.captcha,
        comment: e.detail.value.comment,
        email: e.detail.value.email
      },
      method: 'PUT',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': this.data.tokenstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          _this.userdata(_this.data.tokenstorage)
          setTimeout(function () {
            wx.switchTab({
              url: '../user/user'
            })
          }.bind(this), 1000);
        } else if (res.data.code == 'TOKEN_INVLID') {
          _this.exchangeToken(2)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 2000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //换取 token
  exchangeToken: function (e) {
    var _this = this;
    wx.request({
      url: common.getRequestUrl + '/dtk/users/token',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'swap': _this.data.swapstorage
      },
      success: function (res) {
        if (res.data.code == 'OK') {
          wx.setStorageSync('tokenstorage', res.data.token)
          _this.setData({
            tokenstorage: res.data.token
          })
          if (e == 1) {
            _this.userdata(res.data.token)
          } else {
            _this.formSubmit(_this.data.bindForm)
          }
        } else if (res.data.code == 'USER_NOT_LOGIN') {
          app.userLogin(e)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'cancel',
            duration: 2000
          })
          try {
            wx.setStorageSync('tokenstorage', '');
            wx.setStorageSync('swapstorage', '')
            wx.setStorageSync('myData', '')
            wx.setStorageSync('avatarInfo', '')
            _this.setData({
              tokenstorage: '',
              swapstorage: '',
              myData: '',
              srcavatar: '../../image/m.png'
            })
          } catch (e) {
          }
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index'
            })
          }.bind(this), 500);
        }
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * 获取--单个手机号
   */
  mobileInputEvent: function (e) {
    this.setData({
      user_id: e.detail.value,
      listBox: false
    })
  },
  /**
   * 获取--输入的图形验证码
   */
  imgInputEvent: function (e) {
    this.setData({
      imgCaptcha: e.detail.value
    })
  },
  /**
   * 换一张图片验证码
   */
  clickImgCode: function () {
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
            verifyCodeTime: '获取验证码'
          })
        }
      }
    })
  },
  /**
   * 获取--图形和短信验证码
   */
  picCode: function () {
    if (this.data.buttonDisable) return false;
    var _this = this;
    if (_this.data.user_id == ''){
      var user_id = _this.data.dataList.user_id;
    }else{
      var user_id = _this.data.user_id;
    }
    

    var regMobile = /^1\d{10}$/;
    if (!regMobile.test(user_id)) {
      wx.showToast({
        title: '手机号有误！'
      })
      return false;
    }
    //console.log(_this.data.user_id)
    if (_this.data.isCode == false) {
      wx.request({
        url: common.getRequestUrl + '/dtk/users/captcha/pic',
        data: {
          user_id: user_id
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
              verifyCodeTime: '获取验证码'
            })
          }
        }
      })
    } else {
      if (_this.data.imgCaptcha == '') {
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
                  verifyCodeTime: '获取验证码',
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
   
  onShareAppMessage: function () {
  
  }*/
})