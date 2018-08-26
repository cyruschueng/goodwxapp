var util = require("../../utils/util.js")
var app = getApp();
var that;
const config = require('../../config')
//ZeS8Fm
Page({
    data: {
        name:"",
        student_code: "",
        phone:'',
        cid:"",
        button_disable:true,
        button_loadding:false,
    },

    onLoad: function (options) {
      // 页面初始化 options 为页面跳转所带来的参数
      var cid = options.cid;
      that = this;
      that.setData({ cid: cid});
    
    },

    bindKeyInput: function (e) {
     var id=e.currentTarget.id;
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



     checkStatus:function(){
       if (that.data.phone.length>0&&that.data.student_code.length>0&&that.data.name.length>0){
          that.setData({ button_disable:false})
        }else{
          that.setData({ button_disable: true })
        }
      
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

    var cid=that.data.cid;
    wx.showLoading({
      title: '添加中....',
    })
    app.getImprint(function (imprint) {
      var formdata = { "student_code":student_code, "phone": phone, "cid": cid, "name": name}
      util.AJAX1(config.createMemberUrl, formdata, "post", { imprint: imprint }, function (res) {
        that.setData({ button_loadding: false});
        var result=res.data;
        console.log(result);
        if (result.status=='ok'){
          app.globalData.memberReload=1;
          wx.navigateBack({ddd:"as"});
        }
      });
    });
  },
    
});