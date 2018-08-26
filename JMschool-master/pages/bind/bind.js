// pages/bind/bind.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    help_status: false,
    name_focus: false,
    userid_focus: false,
    passwd_focus: false,
    name: '',
    userid: '',
    passwd: '',
    angle: 0,
  },
  onReady: function () {
    var _this = this;
    setTimeout(function () {
      _this.setData({
        remind: ''
      });
    }, 1000);
    //重力感应api
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  bind: function () {
    var _this = this;
    if (!_this.data.name || !_this.data.userid || !_this.data.passwd) {
      app.showErrorModal('请检查输入内容', '提醒');
      return false;
    }
    app.showLoadToast('绑定中');
    wx.request({
      url: app._server + '/school/api/student_id_bind.php',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        studentid: _this.data.userid,
        password: _this.data.passwd,
        studentname: _this.data.name,
        openid: app._user.openid
      },
      success: function (res) {
        console.log(res)
        if (res.data.data && res.data.code === 200) {
          app.showLoadToast('请稍候');
          try {
            wx.clearStorageSync()
          } catch (e) {
            console.log("清除缓存失败")
          }
          //重新获取数据
          app.getUser();
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }, 3000) //循环时间 这里是3秒  

        } else if (res.data.code === 400) {
          wx.hideToast();
          app.showErrorModal('学号或者密码错误', '绑定失败');
        }
        else if (res.data.code === 405) {
          wx.hideToast();
          app.showErrorModal('学号与姓名不匹配', '绑定失败');
        } else {
          wx.hideToast();
          app.showErrorModal('未知错误', '绑定失败');
        }
      },
      fail: function (res) {
        wx.hideToast();
        app.showErrorModal('你网络有问题，或者服务器君被人抱走了，稍后再试吧。', '绑定失败');
      }
    });
  },
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    });
    if (e.detail.value.length == 10) {
      wx.hideKeyboard();
    }
  },
  useridInput: function (e) {
    this.setData({
      userid: e.detail.value
    });
    if (e.detail.value.length == 14) {
      wx.hideKeyboard();
    }
  },
  passwdInput: function (e) {
    this.setData({
      passwd: e.detail.value
    });
  },
  inputFocus: function (e) {
    if (e.target.id == 'name') {
      this.setData({
        'name_focus': true
      });
    } else if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': true
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': true
      });
    }
  },
  inputBlur: function (e) {
    if (e.target.id == 'name') {
      this.setData({
        'name_focus': false
      });
    } else if (e.target.id == 'userid') {
      this.setData({
        'userid_focus': false
      });
    } else if (e.target.id == 'passwd') {
      this.setData({
        'passwd_focus': false
      });
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
  }
});