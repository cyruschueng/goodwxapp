var app = getApp();
var url_common = app.globalData.url_common;
Page({
  data: {
    nonet: true,
    jiandi: false,
    imgUrls: app.globalData.picUrl.activityIntro,
  },
  onLoad: function (options) {
    let user_id = wx.getStorageSync("user_id");
    let that = this;
    wx.request({
      url: url_common + '/api/activity/myApplyActivity',
      data: {
        user_id : user_id,
        page: 1
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        let activity = res.data.data.activity;
        that.setData({
          activity: activity
        })
      }
    });
  },


  onShow: function () {
    let that = this;
    that.setData({
      requestCheck: true,
      currentPage: 1,
      page_end: false,
      push_page: 1,
    })
  },
  loadMore: function () {
    //请求上拉加载接口所需要的参数
    var user_id = wx.getStorageSync("user_id");
    let that = this;
    let activity = this.data.activity;
    if (that.data.requestCheck) {
      if (user_id != '') {
        if (that.data.page_end == false) {
          wx.showToast({
            title: 'loading...',
            icon: 'loading'
          });
          that.data.push_page++;
          that.setData({
            currentPage: this.data.push_page,
            requestCheck: false
          });
          //请求加载数据
          wx.request({
            url: url_common + '/api/activity/myApplyActivity',
            data: {
              user_id: user_id,
              page: this.data.currentPage
            },
            method: 'GET',
            success: function (res) {
              var newPage = res.data.data.activity;
              var page_end = res.data.data.page_end;
              for (var i = 0; i < newPage.length; i++) {
                activity.push(newPage[i]);
              }
              that.setData({
                activity: activity,
                page_end: page_end,
                requestCheck: true
              });
            }
          });
        } else {
          that.setData({
            requestCheck: true,
            jiandi: true
          });
        }
      }
    }
  },
  //跳转
  activityDetail(e){
    let activity_id = e.currentTarget.dataset.id;
    app.href("/activitySignIn/pages/activityProjectInfo/activityProjectInfo?activity_id=" + activity_id)
  },
  
})