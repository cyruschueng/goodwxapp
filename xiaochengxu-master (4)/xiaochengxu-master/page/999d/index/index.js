//获取应用实例
var util = require('../../../util/util.js');
// var app = getApp()
Page({
  data: {
    hidden: false,
    motto: '',
    userInfo: {},
    indexData: [],
    searchText: "",
    hotshidden: false, // 显示加载更多 loading
    hothidden: true,
    loadingMore: false, //是否正在加载
    pgstart: 0,
    pgoffset: 20
    // loading

  },
  onLoad: function (options) {
 

    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo( function( userInfo ) {
    //   //更新数据
    //   that.setData( {
    //     userInfo: userInfo,
    //     motto: '欢迎,' + userInfo.nickName + ', 访问99广场舞'
    //   })
    // })  
    util.Ajax('v2/app/home/getDayRecommendList', {
      pgoffset: that.data.pgoffset,
      pgstart: that.data.pgstart
    }, function (res) {
      if (res.data.code == 0) {
        that.setData({
          indexData: res.data.data,
          hidden: true,
          hotshidden: true
        })
      }
    });

  }, scrolltolower: function (e) {
    if (this.data.loadingMore) return;
    var that = this;
    // 加载更多 loading
    that.setData({
      hotshidden: false
    })
    that.setData({ loadingMore: true });
    that.data.pgstart++;

    util.Ajax('v2/app/home/getDayRecommendList', {
      pgoffset: that.data.pgoffset,
      pgstart: that.data.pgstart
    }, function (res) {

      if (res.data.code == 0) {
        if (res.data.data.length < that.data.pgoffset) {
          that.setData({
            hothidden: false
          })
        }

        that.setData({
          indexData: that.data.indexData.concat(res.data.data),
          loadingMore: false
        })

      }
    });
  }, onShareAppMessage: function () {
    return {
      title: '99广场舞 - 专业广场舞视频教学网站',
      desc: '99广场舞以“人人都是舞蹈家”为核心理念，以“全民健身”为主旨，注重打造一个专业、全面、便捷的广场舞视频分享交流平台，让喜爱广场舞的人们，在学跳广场舞的过程中，不仅能够健身娱乐休闲，更能一步步的实现自己的舞蹈梦。',
      path: 'page/999d/index/index',
      success(res) {
        var shareTicket = res.shareTickets[0] // 获取 shareTicket
        console.log(shareTicket) // 你可以选择将这段代码取消注释，让 shareTicket 在控制台输出
        wx.getShareInfo({
          shareTicket: shareTicket,
          complete(res) {
            console.log(res) // 输出加密后的 openGId 信息
          }
        })
      }
    }
  }, bindSearch: function (e) {//这里是搜索
    var context = this;
    this.setData({
      searchText: e.detail.value
    })

    if (this.data.searchText) {
      util.Ajax('v1/cates', function (res) {
        if (res.data.status == 1) {
          context.setData({
            hellspawnList: res.data.body.hellspawn_list
          })
        }
      });
      var url = http.generateUrl('api/v1/search/' + this.data.searchText);

    }



  }
});
