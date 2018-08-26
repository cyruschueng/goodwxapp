//index.js
//获取应用实例

var app = getApp()
Page({
  data: {
    all:['湖北经济学院','江西理工大学应用科学学院']
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //初始化的时候渲染wxSearchdata
   
  },

  wxSearchKeyTap:function(e){
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var that = this;
    var school=parseInt(e.currentTarget.id)+1;
    prevPage.setData({
      school:school,
      title:that.data.all[e.currentTarget.id]
    });
    app.globalData.sid=school;
    wx.setStorageSync('school', school);
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

})

