var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

//ZeS8Fm
Page({
  data: {
    teacherNames: '',
    teachers: '',
    teachersIndex: 0,
    class_name: "",
    student_number: "",
    button_disable: false,
    button_loadding: false,
    gid: "",
    member_id: ''
  },

  onLoad: function (options) {
    // 页面初始化 options 为页面跳转所带来的参数
    that = this;
    var gid = options.gid;
    var cid = options.cid;
    that.setData({ gid: gid, cid: cid });
    that.Init(cid);
  },



  Init: function (cid) {
    wx.showLoading({
      title: '加载中...',
    })
    app.getImprint(function (imprint) {
      util.AJAX1(config.classByIdUrl, { cid: cid }, "post", { imprint: imprint }, function (res) {
        if (res.data.status == 'ok') {
          var cls = res.data.class;
          var is_admin = res.data.is_admin;
          util.AJAX1(config.MembersByCidUrl, { cid: cid }, "post", { imprint: imprint }, function (res) {
            var result = res.data;
            wx.hideLoading();
            if (result.status == 'ok') {
              var teachers = [];
              var teacherNames = [];
              teacherNames.push(cls.admin_name);
              res.data.members.forEach(function (item) {
                if (item.type != 1 && imprint != item.wx_openid) {
                  teachers.push(item);
                  teacherNames.push("转让给> " + item.name + "老师");
                }
              });
              that.setData({ teachers: teachers, cls: cls, is_admin: is_admin, teacherNames: teacherNames })
            }
          });
        }
      })
    })
  },





  submit: function (event) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    var class_name = event.detail.value.class_name;
    var student_number = event.detail.value.student_number;
    var teachersIndex = that.data.teachersIndex;
    var cid = that.data.cid;
    var member_id = "";
    var gid = that.data.gid;
    if (teachersIndex != 0) {
      member_id = that.data.teachers[teachersIndex - 1]._id;
    }
    wx.showLoading({
      title: '操作中...',
    })
    app.getImprint(function (imprint) {
      var formdata = { "class_name": escape(class_name), student_number: student_number, gid: gid, member_id: member_id }     
      util.AJAX1(config.editClassUrl, formdata, "post", { imprint: imprint }, function (res) {
        var result = res.data;
        wx.hideLoading();
        console.log(res)
        if (result.status == 'ok') {
       
         if(member_id){
           wx.showToast({
             title: '保存成功',
             icon: 'success',
             duration: 1000
           });
           setTimeout(function () {
             wx.navigateBack({
               
             })
           }.bind(this), 1000);
         }else{
           wx.showToast({
             title: '保存成功',
           });
         }
        }
      });
    });
  },


  teacherChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      teachersIndex: e.detail.value
    })
  },

  delClass: function () {
    var cid=that.data.cid;
    wx.showModal({
      title: '提示',
      content: '确认要删除此班级么',
      success: function (res) {
        if (res.confirm) {
          if (app.globalData.isExpOpenid) {
            wx.showToast({
              title: '体验者无权限',
            })
            return;
          }
          wx.showLoading({
            title: '操作中....',
          })
          app.getImprint(function (imprint) {
            var formdata = {}
            util.AJAX1(config.delClassUrl, { _id: cid }, "get", { imprint: imprint }, function (res) {
              var result = res.data;
              wx.hideLoading();
              if (result.status == 'ok') {
                app.removeImprint();
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 1000
                });
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../start/start',
                  })
                }.bind(this), 1000);
              } else if (result.status == 'forbid') {
                wx.showToast({
                  title: '权限不足,无法删除',
                })
              }
            });
          });
        } else if (res.cancel) {
        }
      }
    })

  },

});