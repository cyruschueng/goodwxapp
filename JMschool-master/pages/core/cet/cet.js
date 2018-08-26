// pages/cet/cet.js
Page({
  data: {
    //remind: '加载中',,
    userid_focus: false,
    passwd_focus: false,
    name: '',
    number: '',
    namehint: '',
    numberhint: '',
    isquery: false,
  },
  onLoad: function (options) {
    var _this = this;
    this.setData({
      name: options.name,
      number: options.number
    });
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
    if (e.detail.value.length == 15) {
      wx.hideKeyboard();
    }
    if (this.data.isquery) {
      if (e.detail.value.length == 0) {
        this.setData({
          numberhint: '准考证号不能为空'
        });
      } else if (e.detail.value.length < 15) {
        this.setData({
          numberhint: '准考证号格式错误'
        });
      } else if (e.detail.value.length == 15) {
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

  forget() {
    wx.navigateTo({
      url: "/pages/core/cet/cetnumber"
    })
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
        numberhint: '准考证号不能为空'
      });
    } else if (_this.data.number.length < 15) {
      this.setData({
        numberhint: '准考证号格式错误'
      });
    }
    if (!_this.data.namehint && !_this.data.numberhint) {
      wx.navigateTo({
        url: "/pages/core/cet/cetshow?name=" + _this.data.name + "&&number=" + _this.data.number
      })
    }
  },
});