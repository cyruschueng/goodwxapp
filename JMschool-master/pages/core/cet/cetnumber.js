// pages/cet/cetnumber.js
var app = getApp();
Page({
  data: {
    //remind: '加载中',,
    userid_focus: false,
    passwd_focus: false,
    name: '',
    number: '',
    namehint: '',
    numberhint: '',
    kd: '1',
    isquery: false,
    result: '',
    help_status: false,
  },
  onReady: function () {
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    });
    if (this.data.isquery) {
      if (e.detail.value) {
        this.setData({
          namehint: ''
        });
      } else {
        this.setData({
          namehint: '姓名不能为空'
        });
      }
    }
  },
  numberInput: function (e) {
    this.setData({
      number: e.detail.value,
    });
    if (e.detail.value.length == 18) {
      wx.hideKeyboard();
    }
    if (this.data.isquery) {
      if (e.detail.value.length == 0) {
        this.setData({
          numberhint: '身份证号不能为空'
        });
      } else if (e.detail.value.length < 18) {
        this.setData({
          numberhint: '身份证号格式错误'
        });
      } else if (e.detail.value.length == 18) {
        this.setData({
          numberhint: ''
        });
      }
    }
  },
  inputFocus: function (e) {
    if (e.target.id == 'name') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'number') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'name') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'number') {
      this.setData({
        'passwd_focus': false
      });
    }
  },
  switchChange: function (e) {
    if (e.detail.value) {
      this.setData({
        "kd": 1
      })
    } else {
      this.setData({
        "kd": 2
      })
    }
  },

  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  },
  
  //绑定事件
  bind: function () {
    var _this = this;
    this.setData({
      isquery: true
    });
    if (!_this.data.name) {
      this.setData({
        namehint: '姓名不能为空'
      });
    } else {
      this.setData({
        namehint: ''
      });
    }
    if (!_this.data.number) {
      this.setData({
        numberhint: '身份证号不能为空'
      });
    } else if (_this.data.number.length < 18) {
      this.setData({
        numberhint: '身份证号格式错误'
      });
    }
    if (!_this.data.namehint && !_this.data.numberhint) {
      var _this = this;
      app.showLoadToast('查询中，请稍等');
      wx.request({
        url: 'https://cet.xsico.cn/find',
        method: 'GET',
        data: {
          NM: _this.data.name,
          ID: _this.data.number,
          KD: _this.data.kd
        },
        success: function (res) {
          if (res.data.ks_bh) {
            //wx.hideToast();
            wx.redirectTo({
              url: "/pages/core/cet/cet?name=" + _this.data.name + "&&number=" + res.data.ks_bh
            })
            // _this.setData({
            //   result: res.data.ks_bh
            // });
          } else {
            wx.hideToast();
            app.showErrorModal("查询失败,请检查身份证或者姓名是否正确,或者联系客服", "提示");
          }
        },
        fail: function (res) {
          wx.hideToast();
          app.showErrorModal("网络错误", "提示");
        },
        complete: function () {
          wx.hideToast();
        }
      });
    }
  },
});