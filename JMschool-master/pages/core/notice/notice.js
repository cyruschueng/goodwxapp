// pages/core/notice/notice.js
var app = getApp();
Page({
  data: {
    passwd_focus: false,
    number: '',
    numberhint: '',
    isquery: false,
  },
  onLoad: function (options) {
    var _this = this;
    this.setData({
      number: options.number
    });
  },
  numberInput: function (e) {
    this.setData({
      number: e.detail.value,
    });
    if (e.detail.value.length == 14) {
      wx.hideKeyboard();
    }
    if (this.data.isquery) {
      if (e.detail.value.length == 0) {
        this.setData({
          numberhint: '考生号不能为空'
        });
      } else if (e.detail.value.length < 14) {
        this.setData({
          numberhint: '考生号格式错误'
        });
      } else if (e.detail.value.length == 14) {
        this.setData({
          numberhint: ''
        });
      }
    }
  },
  inputFocus: function (e) {
    if (e.target.id == 'number') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'number') {
      this.setData({
        'passwd_focus': false
      });
    }
  },

  // forget() {
  //   wx.navigateTo({
  //     url: "/pages/core/register/student"
  //   })
  // },

  //绑定事件
  bind: function () {
    var _this = this;
    this.setData({
      isquery: true
    });
    if (!_this.data.number) {
      this.setData({
        numberhint: '考生号不能为空'
      });
    } else if (_this.data.number.length < 14) {
      this.setData({
        numberhint: '考生号格式错误'
      });
    }
    if (!_this.data.numberhint) {
      app.showErrorModal("该功能正在开发中,请2017新生耐心等待", "开发中")
      // wx.navigateTo({
      //   url: "/pages/core/cet/cetshow?name=" + _this.data.name + "&&number=" + _this.data.number
      // })
    }
  },
});