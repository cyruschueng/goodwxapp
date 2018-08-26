var util = require('../../../util/util.js');
Page({
  data: {
    hidden: false,
    teamData: {},
    teamVideo: [],
    hotshidden: false, // 显示加载更多 loading
    hothidden: true,
    loadingMore: false, //是否正在加载 
    page: 1,
    uid: 0
  },
  onLoad: function (options) {

    var that = this;
    that.setData({
      uid: options.uid
    })
    util.Ajax('v1/user/info', {
      uid: options.uid
    }, function (res) {
      if (res.data.errno == 0) {
        that.setData({
          teamData: res.data.response,
          hotshidden: true
        })
        wx.setNavigationBarTitle({
          title: that.data.teamData.username
        })

      }
    });

    util.Ajax('v1/video/list', {
      uid: options.uid,
      page: that.data.page
    }, function (res) {
      if (res.data.errno == 0) {
        if (res.data.response.length == 0 && that.data.page == 1) {
          that.setData({
            hotshidden: false,
            hothidden: false,
            hidden: true
          })
          return;
        }
        that.setData({
          teamVideo: res.data.response,
          hotshidden: true,
          hidden: true
        })

      }
    });

  },
  scrolltolower: function (e) {
    if (this.data.loadingMore) return;
    var that = this;
    // 加载更多 loading
    that.setData({
      hotshidden: false
    })
    that.setData({ loadingMore: true });
    that.data.page++;

    util.Ajax('v1/video/list', {
      page: that.data.page,
      uid: that.data.uid
    }, function (res) {
      if (res.data.errno == 0) {
        if (res.data.response.length < res.data.page.pagesize) {
          that.setData({
            hothidden: false
          })
        }
        that.setData({
          teamVideo: that.data.teamVideo.concat(res.data.response),
          loadingMore: false
        })
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '99广场舞 - ' + this.data.teamData.username,
      desc: '99广场舞 - 专业广场舞视频教学网站',
      path: 'page/999d/team/team?uid=' + this.data.uid
    }
  },
  onReady: function () {

    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})