var util = require('../../utils/util.js')
var vm = null
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"意见反馈",
    toastHidden:true,
    notice_str:""
  },
  onLoad: function (){
    vm=this
    var title = vm.data.title
    wx.setNavigationBarTitle({ title: title })
  },
  bindFormSubmit:function(e){
    console.log("from："+JSON.stringify(e));
    var token = app.globalData.userInfo.token;
    var suggestion = e.detail.value.suggestion;
    var contact = e.detail.value.contact;
    var param={
      token: token,
      suggestion: suggestion,
      contact: contact
    }
    util.createSuggestion(param, function (ret) {
      console.log("createSuggestion:" + JSON.stringify(ret));
      if (ret.data.code == "200")
      {
        vm.setData({
          toastHidden: false,
          notice_str: "提交成功"
        })
      }
    })
  },
  toastChange:function(e){
    vm.setData({
      toastHidden: true,
      notice_str: ""
    })
  }
})