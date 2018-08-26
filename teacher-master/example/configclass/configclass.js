var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')
//ZeS8Fm
Page({
  data: {
    teachRoles: util.GetSubjectList(),
    teachRoleIndex: 0,
    class_name: "",
    student_number: "",
    name: '',
    phone: '',
    button_disable: true,
    button_loadding: false,
    gid:"",
    member_id:''
  },

  onLoad: function (options) {
    // 页面初始化 options 为页面跳转所带来的参数
    that = this;
    var gid=options.gid;
    var member_id = options.member_id;
    console.log(member_id)
    that.setData({ gid: gid, member_id: member_id});
    app.getImprint(function (imprint) {
      util.AJAX1(config.NameByImprintUrl, {}, "post", { imprint: imprint }, function (res) {
        var result = res.data;
        console.log(result);
        if (result.status == 'ok'&&result.name) {
          that.setData({
            name: result.name
          });
        }
        if (result.status == 'ok' && result.phone) {
          that.setData({
            phone: result.phone
          });
        }
      });
    });
  },

  bindKeyInput: function (e) {
    var id = e.currentTarget.id;
    switch (id) {
      case "class_name":
        that.setData({
          class_name: e.detail.value
        });
        break;
      case "name":
        that.setData({
          name: e.detail.value
        });
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
    if (that.data.class_name.length > 0 && that.data.name.length > 0 && that.data.phone.length > 0) {
      that.setData({ button_disable: false })
    } else {
      that.setData({ button_disable: true })
    }
  },


  submit: function (event) {
    var phone = event.detail.value.phone;
    var name = event.detail.value.name;
    if (!(/^1[34578]\d{9}$/.test(phone))){
      wx.showModal({
        title: '提示',
        content: '手机号码格式有错误',
      })
      return;
    }
    if (name.indexOf('老师') > -1) {
      wx.showModal({
        title: '提示',
        content: '为了便于区分,请填写您的姓名,而非' + name,
      });
      return;
    }
    that.setData({ button_loadding: true, button_disable: true});
    var class_name = event.detail.value.class_name;
    var student_number = event.detail.value.student_number;
    var teach_role = that.data.teachRoleIndex;

    var phone = event.detail.value.phone;
    var gid=that.data.gid;
    var member_id = that.data.member_id;
    var form_id = event.detail.formId;
    app.getImprint(function (imprint) {
      var formdata = { "class_name": escape(class_name), student_number: student_number, "name": name, "teach_role": teach_role, "phone": phone, gid: gid, member_id: member_id, form_id: form_id }
      util.AJAX1(config.updateClassUrl, formdata, "post", { imprint: imprint }, function (res) {
        that.setData({ button_loadding: false });
        var result = res.data;
        if (result.status == 'ok') {
          wx.redirectTo({
            url: '../start/start'
          })
        }else{
          that.setData({ button_disable: false });
        }
      });
    });
  },


  teachRoleChange: function (e) {
    this.setData({
      teachRoleIndex: e.detail.value
    })
  },
});