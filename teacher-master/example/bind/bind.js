var util = require("../../utils/util.js")
var app = getApp();
const config = require('../../config')


var that;
//ZeS8Fm
Page({
  data: {
    relationships: ["妈妈", "爸爸", "其他"],
    relationIndex: 0,
    subjects: util.GetSubjectList(),
    subjectIndex: 0,
    roleItems: [
      { name: '我是学生家长', value: '0' },
      { name: '我是代课老师', value: '1' }
    ],
    gid: "",
    btn_disabled: false,
    btn_loadding:false,
    loaded: false,
    cinfo: '',
    authMemberId: '',
    show_associate: false,
    winWidth: '',
    winHeight: '',
    fromData: ''
  },

  onLoad: function (options) {
    that = this;
    //进入此页面有两种可能
    //1.从群里面直接过来的
    //2.再创建小管家的时候判断已经有人家创建，所以跳转过来直接绑定有gid这个参数
    var gid = options.gid;
   
    if (app.globalData.isExpOpenid) {
      app.delExpImprint(function (expimprint) {
        if (gid) {
          that.setData({
            gid: gid, loaded: true, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight
          });
          that.gidBindCheck(gid);
        } else {
          that.bindCheck();
        }
      })
    }else{
      if (gid) {
        that.setData({
          gid: gid, loaded: true, winWidth: app.globalData.winWidth, winHeight: app.globalData.winHeight
        });
        that.gidBindCheck(gid);
      } else {
        that.bindCheck();
      }
    }
  
    

   
  },

  //如果有gid 说明是再转发的时候已经有该班级所以直接跳转到这里的
  gidBindCheck:function(gid){
    app.getImprint(function (imprint) {
      util.AJAX1(config.gidBindCheckUrl, {gid:gid}, "post", { imprint: imprint }, function (res) {
        if(res.data.status=='ok'&&res.data.role!='no_sign'){
          wx.showModal({
            title: '提示',
            content: '您已经加入过了',
            success: function (res) {
              wx.redirectTo({
                url: '../start/start',
              })
            }
          })
        }
      })
    })
  },


  bindCheck: function () {
    wx.showLoading({
      title: '加载中...',
    })
    app.getImprint(function (imprint) {
      app.getLoginCode(function (logincode) {
        if (!app.globalData.ShareTicket){
             wx.redirectTo({
               url: '../start/start',
             })
             return;
        }
        wx.getShareInfo({
          shareTicket: app.globalData.ShareTicket,
          success: function (res) {
            var formdata = { "code": logincode, "iv": res.iv, encryptedData: res.encryptedData }
            util.AJAX1(config.groupBindCheckUrl, formdata, "post", { imprint: imprint }, function (res) {
              wx.hideLoading();
              console.log(res)
              if (res.data.status == "ok") {
                if (res.data.role == "teacher" || res.data.role == "parent") {
                  console.log("已经绑定了,此用户的角色是" + res.data.role)
                  wx.showToast({
                    title: '即将进入主页..',
                    icon: 'success',
                    duration: 500
                  });
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../start/start'
                    })
                  }, 500)
                } else if (res.data.role == "no_sign") {
                  var cinfo = res.data.cinfo;
                  that.setData({
                    cinfo: cinfo, gid: cinfo.open_gid, loaded: true, winWidth: app.globalData.windowWidth,winHeight: app.globalData.winHeight, })
                } else if (res.data.role == 'error') {
                  wx.showToast({
                    title: '班级不存在..',
                    icon: 'error',
                    duration: 1000
                  });
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../start/start'
                    })
                  }, 3000)
                }
              }
            });
          },
          fail: function (res) { wx.hideLoading(); console.log(res) },
          complete: function (res) { console.log(res) }
        })
      });
    });
  },






  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  onShow: function (options) {

  },


  // 提交 TODO
  submit: function (event) {
  
    var formdata = {};
    if (that.data.authMemberId) {
      formdata = that.data.formdata;
      formdata.needCheck = false;
    } else {
      var gid = that.data.gid;
      var name = event.detail.value.name;
      var phone = event.detail.value.phone;
      var relationIndex = that.data.relationIndex;
      var teachRoleIndex = that.data.subjectIndex;
      var role = "parent";
      if (that.data.roleItems[1].checked) {
        role = "teacher";
        name = event.detail.value.teacher_name;
        phone = event.detail.value.teacher_phone;
        if (name.indexOf('老师')>-1){
          wx.showModal({
            title: '提示',
            content: '为了便于区分,请填写您的姓名,而非' + name,
          });
          return;
        }
      } else if (that.data.roleItems[0].checked){
        name = event.detail.value.name;
        phone = event.detail.value.phone;
      }else{
        wx.showModal({
          title: '提示',
          content: '请选择角色再提交',
        });
        return;
      }
      if (!(/^1[34578]\d{9}$/.test(phone))) {
        wx.showModal({
          title: '提示',
          content: '手机号码格式有错误',
        })
        return;
      }
      if(name.length<2){
        wx.showModal({
          title: '提示',
          content: '请填写正确的姓名',
        })
        return;
      }
      var form_id = event.detail.formId;
      that.setData({ btn_disabled: true });
      formdata = { "gid": gid, relationIndex: relationIndex, teachRoleIndex: teachRoleIndex, role: role, name: name, phone: phone, needCheck: true, form_id: form_id }
    }
    that.setData({ btn_loadding: true, btn_disabled:true});
    app.getImprint(function (imprint) {
      util.AJAX1(config.memberJoinUrl, formdata, "post", { imprint: imprint }, function (res) {
        if (res.data.status == 'ok' && res.data.bind) {
          var member_id = res.data.member_id;
          that.setData({ show_associate: true, authMemberId: member_id, formdata: formdata })
          that.authInfo(member_id);
        }
        else if (res.data.status == 'ok') {
          wx.showToast({
            title: '设置成功..',
            icon: 'success',
            duration: 500
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../start/start'
            })
          }, 1000)
        } else {
          that.setData({ btn_disabled: false })
          that.tip("设置失败....")
        }
        that.setData({ btn_loadding: false, btn_disabled: false });
      });
    })
  },


  associate: function (e) {
    var authMemberId = that.data.authMemberId;
    wx.showModal({
      title: '提示',
      content: "确定要关联么？",
      success: function (res) {
        if (res.confirm) {
          app.getImprint(function (imprint) {
            util.AJAX1(config.associateUrl, { member_id: authMemberId }, "post", { imprint: imprint }, function (res) {
              console.log(res)
              if (res.data.status == 'ok') {
                wx.showToast({
                  title: '关联成功..',
                  icon: 'success',
                  duration: 3000
                });
                setTimeout(function () {
                  wx.redirectTo({
                    url: '../start/start'
                  })
                }, 3000)
              }
            });
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  authInfo: function (member_id) {
    app.getImprint(function (imprint) {
      util.AJAX1(config.CurrentUserWithMemberInfoUrl, { member_id: member_id }, "post", { imprint: imprint }, function (res) {
        console.log(res)
        if (res.data.status == 'ok') {
          that.setData({ currentUser: res.data.currentUser, member: res.data.member })
        }
      });
    });
  },


 

  roleChange: function (e) {
    var roleItems = this.data.roleItems;
    for (var i = 0, len = roleItems.length; i < len; ++i) {
      roleItems[i].checked = roleItems[i].value == e.detail.value;
    }
    this.setData({
      roleItems: roleItems,
      buttionDisable: false
    });
  },

  bindRelationChange: function (e) {
    that.setData({
      relationIndex: e.detail.value
    });
    console.log(that.data.relationships[e.detail.value])
  },

  bindSubjectChange: function (e) {
    that.setData({
      subjectIndex: e.detail.value
    });
    console.log(that.data.subjects[e.detail.value])
  },
});