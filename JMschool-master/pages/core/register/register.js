// pages/core/student/register.js
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
    isquery: false,
  },
  // onLoad: function (options) {
  //   var _this = this;
  //   this.setData({
  //     name: options.name,
  //     number: options.number
  //   });
  // },
  // onReady: function () {
  // },
  // nameInput: function (e) {
  //   this.setData({
  //     name: e.detail.value
  //   });
  //   if (this.data.isquery) {
  //     if (e.detail.value) {
  //       this.setData({
  //         namehint: ''
  //       });
  //     } else {
  //       this.setData({
  //         namehint: '姓名不能为空'
  //       });
  //     }
  //   }
  // },
  // numberInput: function (e) {
  //   this.setData({
  //     number: e.detail.value,
  //   });
  //   if (e.detail.value.length == 15) {
  //     wx.hideKeyboard();
  //   }
  //   if (this.data.isquery) {
  //     if (e.detail.value.length == 0) {
  //       this.setData({
  //         numberhint: '准考证号不能为空'
  //       });
  //     } else if (e.detail.value.length < 15) {
  //       this.setData({
  //         numberhint: '准考证号格式错误'
  //       });
  //     } else if (e.detail.value.length == 15) {
  //       this.setData({
  //         numberhint: ''
  //       });
  //     }
  //   }
  // },
  inputFocus: function (e) {
    switch (parseInt(e.target.id)) {
      case 1:
        this.setData({
          'studentid_focus': true
        });
        break;
      case 2:
        this.setData({
          'name_focus': true
        });
        break;
      case 3:
        this.setData({
          'pwd_focus': true
        });
        break;
      case 4:
        this.setData({
          'repwd_focus': true
        });
        break;
      case 5:
        this.setData({
          'birthday_focus': true
        });
        break;
      case 6:
        this.setData({
          'idcard_focus': true
        });
        break;
      default:
        console.log("你大爷的")
    }
  },


  inputBlur: function (e) {
    switch (parseInt(e.target.id)) {
      case 1:
        this.setData({
          'studentid_focus': false,
        });
        break;
      case 2:
        this.setData({
          'name_focus': false,
        });
        break;
      case 3:
        this.setData({
          'pwd_focus': false,
        });
        break;
      case 4:
        this.setData({
          'repwd_focus': false,
        });
        break;
      case 5:
        this.setData({
          'birthday_focus': false,
        });
        break;
      case 6:
        this.setData({
          'idcard_focus': false,
        });
        break;
      default:
        console.log("你nn的")
    }
  },

  forget() {
    wx.navigateTo({
      url: "/pages/core/register/student"
    })
  },

  //绑定事件
  // bind: function () {
  //   var _this = this;
  //   this.setData({
  //     isquery: true
  //   });
  //   if (!_this.data.name) {
  //     this.setData({
  //       namehint: '姓名不能为空'
  //     });
  //   } else {
  //     this.setData({
  //       namehint: ''
  //     });
  //   }
  //   if (!_this.data.number) {
  //     this.setData({
  //       numberhint: '准考证号不能为空'
  //     });
  //   } else if (_this.data.number.length < 15) {
  //     this.setData({
  //       numberhint: '准考证号格式错误'
  //     });
  //   }
  //   if (!_this.data.namehint && !_this.data.numberhint) {
  //     wx.navigateTo({
  //       url: "/pages/core/cet/cetshow?name=" + _this.data.name + "&&number=" + _this.data.number
  //     })
  //   }
  // },
  bindRegister: function () {
    app.showErrorModal("该功能正在开发中,请各位同学耐心等待", "开发中")
  },
});