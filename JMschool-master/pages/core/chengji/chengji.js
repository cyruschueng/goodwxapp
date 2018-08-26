// pages/core/chengji/chengji.js
//获取应用实例
var app = getApp();
Page({
  data: {
    cjInfo: [],
    multiArray: [[], ['上学期', '下学期']],
    multiIndex: [0, 1],
    term: '',
    user: '',
  },

  bindOpenList: function (e) {
    var index = !isNaN(e) ? e : parseInt(e.currentTarget.dataset.index),
      data = {};
    data['cjInfo[' + index + '][9]'] = !this.data.cjInfo[index][9];
    this.setData(data);
  },
  onLoad: function () {
    this.setData({
      user: app._user
    });
    this.pickerAuto();
  },
  onShow: function () { },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },

  bindSearch: function () {
    var _this = this;
    if (_this.data.user.is_bind) {
      var a = _this.data.multiArray[0][_this.data.multiIndex[0]].substring(0, 4),
        b = parseInt(_this.data.multiIndex[1]) + 1;
      _this.setData({
        term: a + '.' + b
      })
      app.showLoadToast('查询中');
      wx.request({
        url: app._server + "/school/api/html.php",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        data: {
          studentid: _this.data.user.we.student_no,
          term: parseFloat(_this.data.term),
        },
        success: function (res) {
          if (res.data.code == 200) {
            if (res.data.data[0][0].replace(/\u6ca1\u6709\u6ee1\u8db3\u6b64\u6761\u4ef6\u7684\u8bb0\u5f55\uff01/g, '404') == 404) {
              app.showErrorModal("暂无成绩记录", "提示")
            } else {
              _this.setData({
                cjInfo: res.data.data,
                remind: ''
              });
            }
          }
          else {
            app.showErrorModal(res.data.message, "提示")
          }
        },
        fail: function (res) {
          app.showErrorModal("网络错误", "提示", "#E65454")
        },
        complete: function () {
          wx.hideToast();
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: "您还未绑定学号，是否前去绑定",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../pages/bind/bind'
            })
          }
        }
      })
    }
  },

  pickerAuto: function () {
    var _this = this,
      nian = _this.data.user.we.student_no.substring(0, 4),
      nians = new Date().getFullYear();
    var grade = nians - nian;
    for (var i = 0; i < nians - nian + 1; i++) {
      nian = parseInt(nian) + 1;
      _this.data.multiArray[0].push(nian - 1 + '-' + nian)
    }
    _this.setData({
      multiArray: _this.data.multiArray,
    });
  },
});