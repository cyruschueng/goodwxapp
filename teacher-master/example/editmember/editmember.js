var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')

//ZeS8Fm
Page({
    data: {
        cid:"",
        id:"",
        member:"",
        name: "",
        student_code: "",
        phone: '',
        mode:'',
        button_disable:true,
        button_loadding:false,
        teachRoles: util.GetSubjectList(),
        teachRoleIndex: 0,   
         },

    onLoad: function (options) {
      // 页面初始化 options 为页面跳转所带来的参数
      var cid = options.cid;
      var id = options.id;
      var mode = options.mode;

      that = this;
      that.setData({ cid: cid, id: id, mode:mode });
      if(id){
        wx.showLoading({
          title: '加载中....',
        })
        app.getImprint(function (imprint) {
          var formdata = {id:id}
          util.AJAX1(config.memberByIdUrl, formdata, "post", { imprint: imprint }, function (res) {
            that.setData({ button_loadding: false });
            var result = res.data;
            console.log(result);
            wx.hideLoading();
            if (result.status == 'ok') {
              var member =result.member;
              that.setData({ member: member, name: member.name, phone: member.phone, student_code: member.student_code, teachRoleIndex: member.teach_role})
            }
          });
        });
      }
    },

    bindKeyInput: function (e) {
     var id=e.currentTarget.id;
      switch (id) {
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



     checkStatus:function(){
       if (that.data.phone.length>0&&that.data.name.length>0){
          that.setData({ button_disable:false})
        }else{
          that.setData({ button_disable: true })
        }
      
     },

     // 提交 TODO
  submit: function (event) {
    if (app.globalData.isExpOpenid) {
      wx.showToast({
        title: '体验者无权限',
      })
      return;
    }
    that.setData({button_loadding:true});
    var name = event.detail.value.name;
    var student_code = event.detail.value.student_code;
    var phone = that.data.phone;
    var cid=that.data.cid;
    var id=that.data.id;
    var teach_role = that.data.teachRoleIndex;
    wx.showNavigationBarLoading();
    app.getImprint(function (imprint) {
      var formdata = { "student_code": student_code, "phone": phone, "cid": cid, "name": name, "id": id, teach_role: teach_role}
      util.AJAX1(config.updateMemberUrl, formdata, "post", { imprint: imprint }, function (res) {
        that.setData({ button_loadding: false});
        var result=res.data;
        console.log(result);
        if (result.status=='ok'){
          app.globalData.memberReload=1;
          wx.navigateBack();
        }
      });
    });
  },
    
});