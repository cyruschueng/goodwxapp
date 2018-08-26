//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    videoList: []
  },
  onLoad: function () {
    this.getVideoList()
  },
  linkToWeb: function () { // 跳转到官方下载页
    wx.navigateTo({
       url: '/pages/web/index?url=https://www.paomiantv.cn/download/index.html'
    })
  },
  getVideoList: function () {
    var sessionid = app.globalData.jsessionid;
    wx.request({
      url: app.globalData.baseUrl + '/p1/redpacket_video/my_videos?jsessionid=' + sessionid,
      success: res => {
        console.log("my_videos=" + JSON.stringify(res));
        if (res.data.status != 52001 && res.data.status != 52002) {
          return;
        }
        var data = res.data.data;

        this.setData({
          videoList: data.video_list
        });
      }
    })
  },

  useVideo: function (event) {
    var videoItem = event.currentTarget.dataset.item;
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里
      var packet = prePage.data.packet;
      console.log("videoItem info=" + JSON.stringify(videoItem));
      console.log("packet info=" + JSON.stringify(packet));
      packet.video_id = videoItem[0];
      packet.img_url = videoItem[2];
      packet.video_url = videoItem[1];
      prePage.setData({
        packet: packet,
        refresh: false
      })
    }
    wx.navigateBack()
  },

  playVideo: function (e) {
    var videoUrl = e.currentTarget.dataset.key;
    var imgUrl = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: '/pages/video/preview/index?videoUrl=' + videoUrl + "&imgUrl=" + imgUrl,
    })
  },


})
