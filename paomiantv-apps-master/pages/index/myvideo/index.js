//index.js
var util = require('../../../utils/util.js');

//获取应用实例
const app = getApp()

Page({
  data: {
    videoList: [],
    showBtn: false,
  },

  onLoad: function () {

    this.getVideoList();
    
  },

  onShow: function(){

    this.dodo()
  },


  

  getVideoList: function () {
    wx.request({
      url: app.globalData.baseUrl + '/p1/sys/video_list',
      success: res => {
        console.log("video_list=" + JSON.stringify(res));
        if (res.data.status != 0 ) {
          return;
        }
        var data = res.data.data;

        this.setData({
          videoList: data.video_list
        });
      }
    })
  },
  playVideo: function (e) {
    var videoUrl = e.currentTarget.dataset.key;
    var imgUrl = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: '/pages/video/preview/index?videoUrl=' + videoUrl + "&imgUrl=" + imgUrl,
    })
  },
  

  dodo: function () {
    wx.request({
      url: app.globalData.baseUrl + '/p1/sys/info',
      success: res => {
        console.log(JSON.stringify(res));
       if (!res.data.data) {
          return;
        }
        if (res.data.data.sys_status == 0) {
          this.setData({
            showBtn: true
          })
        }else{
          this.setData({
            showBtn: false
          })
        }
      }
    })
  },

  toIndex: function(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  }
})