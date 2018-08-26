var util = require("../../utils/util.js")
var app = getApp();
var that;
Page({
    data: {
        cid:'',
        classes: []
    },
    onLoad: function (options) {
      that=this;
      // 页面初始化 options 为页面跳转所带来的参数
      var cid = options.cid;
      this.setData({cid:cid})
    },
    navigate: function (e) {
      var action = e.currentTarget.id;
      switch (action) {
        case "excel":
          wx.navigateTo({
            url: '../excelimport/excelimport?cid='+that.data.cid
          })
          break;
        case "handcreate":
          wx.navigateTo({
            url: '../initmember/initmember?cid=' + that.data.cid
          })
          break;
        default:

      }
    },

    goClass: function (e) {
      var cid = e.currentTarget.id;
      var class_name="";
      that.data.classes.forEach(function(item){
          if(item._id==cid){
              class_name=item.class_name;
          }
      })
      wx.navigateTo({
        url: '../member/member?cid='+cid+'&class_name='+class_name
      })
    },
});
