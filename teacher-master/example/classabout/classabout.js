var util = require("../../utils/util.js")
var app = getApp();
var that;
Page({
    data: {
        cid:'',
        class_name:'',
        classes: []
    },
    onLoad: function (options) {
      that=this;
      var cid= options.cid;
      var class_name= options.class_name;
      that.setData({cid:cid,class_name:class_name})
    },
    navigate: function (e) {
     var action = e.currentTarget.id;
     var cid=that.data.cid;
     var class_name=that.data.class_name;
      switch (action) {
        case "timetable":
          wx.navigateTo({
            url: '../timetable/timetable?cid=' + cid + '&class_name=' + class_name
          })
          break;
        case "memberlist":
          wx.navigateTo({
            url: '../member/member?cid=' + cid + '&class_name=' + class_name
          })
          break;
        default:
      }
    },

    
});
