 var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

//ZeS8Fm
Page({
  data: {
    members: [],
    name: "",
    student_code: "",
    phone: '',
    cid: "",
    mid: "",
    button_disable: true,
    button_loadding: false,
    focus: false,
    button_title: '保存'
  },

  onLoad: function (options) {
    // 页面初始化 options 为页面跳转所带来的参数
    var cid = options.cid;
    that = this;
    that.setData({ cid: cid });
  },

  bindKeyInput: function (e) {
    var id = e.currentTarget.id;
    switch (id) {
      case "name":
        that.setData({
          name: e.detail.value
        });
        break;
      case "student_code":
        that.setData({
          student_code: e.detail.value
        })
        break;
      case "phone":
        that.setData({
          phone: e.detail.value
        });
        break;
      default:
    };
    that.checkStatus();
  },



  checkStatus: function () {
    if (that.data.phone.length > 0 && that.data.student_code.length > 0 && that.data.name.length > 0) {
      that.setData({ button_disable: false })
    } else {
      that.setData({ button_disable: true })
    }
  },

  next: function () {
        wx.redirectTo({
          url: '../notice/notice?cid=' + that.data.cid
        })
  },

  action: function (e) {
    var mid = e.currentTarget.dataset.mid;
    var members = that.data.members;

    wx.showActionSheet({
      itemList: ['修改', '删除'],
      success: function (res) {
        if (res.tapIndex == 0) {
          var member;
          members.forEach(function (m) {
            if (m._id == mid) {
              member = m;

            }
          });
          that.setData({
            name: member.name,
            student_code: member.student_code,
            phone: member.phone,
            button_title: '保存修改',
            mid: mid,
            focus: true
          });
          that.checkStatus();
        } else if (res.tapIndex == 1) {
          wx.showModal({
            title: '提示',
            content: '确认删除?',
            success: function (res) {
              if (res.confirm) {
                app.getImprint(function (imprint) {

                  util.AJAX2(config.delMemberUrl, '处理中', { mid: mid }, "post", { imprint: imprint }, function (res) {
                    if (res.data.status == 'ok') {
                      members.forEach(function (item, i) {
                        if (item._id == mid) {
                          members.splice(i, 1);
                        }
                      });
                      wx.showToast({
                        title: '删除成功',
                      })
                      that.setData({ members: members });
                    } else {
                      wx.showToast({
                        title: '删除失败',
                      })
                    }
                  });
                });
              }
            }
          })

        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  reset: function () {
    that.setData({
      name: "",
      student_code: "",
      phone: '',
      mid: "",
      button_title: "保存"
    });
    that.checkStatus();
  },

  // 提交 TODO
  submit: function (event) {
    var name = event.detail.value.name;
    var student_code = event.detail.value.student_code;
    var phone = that.data.phone;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showModal({
        title: '提示',
        content: '手机号码格式有错误',
      })
      return;
    }
    that.setData({ button_loadding: true });
    var cid = that.data.cid;
    var mid = that.data.mid;
    app.getImprint(function (imprint) {
      var formdata = { "student_code": student_code, "phone": phone, "cid": cid, "name": name }
      if (mid) {
        formdata = { "student_code": student_code, "phone": phone, "cid": cid, "name": name, id: mid }
        util.AJAX2(config.updateMemberUrl, '更新中', formdata, "post", { imprint: imprint }, function (res) {
          that.setData({ button_loadding: false });
          var result = res.data;
          that.reset();
          if (result.status == 'ok') {
            var members = that.data.members;
            members.forEach(function (item) {
              if (item._id == mid) {
                item.student_code = student_code;
                item.phone = phone;
                item.name = name;
              }
            })
            wx.showToast({
              title: '更新成功',
            })
            that.setData({ members: members });
          }
        });
      } else {
        util.AJAX2(config.createMemberUrl, '添加中', formdata, "post", { imprint: imprint }, function (res) {
          that.setData({ button_loadding: false });
          var result = res.data;
          that.reset();
          if (result.status == 'ok') {
            var members = that.data.members;
            var member = result.member;
            members.push(member);
            that.setData({ members: members });
          }
        });
      }
    });
  },

});