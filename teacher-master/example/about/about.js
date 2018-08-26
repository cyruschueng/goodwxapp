var util = require("../../utils/util.js")
var app = getApp();
var that;
Page({
  data: {
    from: 'start',
    user:"",
    winWidth: 0,
    winHeight: 0,
  },
  

  navigate: function (e) {
    wx.navigateBack({
      
    })
  //  var from= this.data.from;
  //   switch (from) {
  //     case "start":
  //       wx.navigateTo({
  //         url: '../start/start'
  //       })
  //       break;
  //     case "my":
  //       wx.navigateTo({
  //         url: '../my/my'
  //       })
  //       break;
  //     case "class":
  //       wx.navigateTo({
  //         url: '../classlist/classlist'
  //       })
  //       break;
  //     default:

  //   }
  },

  detail: function (e) {
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../notify/notify?_id=' + id
    })
  }
});
