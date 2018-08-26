var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    jiandi: false,
    nonet: true
  },
  onLoad(options) {
    let that = this;
    let activity_id = options.activity_id;
    let user_id = wx.getStorageSync("user_id");
    app.httpPost({
      url: url_common + '/api/activity/applyProjectList',
      data: {
        "user_id": user_id,
        "activity_id": activity_id,
        "page": 1
      },
    }).then(res => {
      let applyList = res.data.data.list;
      console.log(res.data.data.page_end)
      that.setData({
        applyList: applyList
      })
    })
    that.setData({
      requestCheck: true,
      currentPage: 1,
      page_end: false,
      activity_id: activity_id
    });
  },
  //加载更多
  loadMore() {
    var that = this;
    let applyList = this.data.applyList;
    if (that.data.requestCheck) {
      if (that.data.page_end == false) {
        wx.showToast({
          title: 'loading...',
          icon: 'loading'
        });
        that.data.currentPage++;
        that.setData({
          currentPage: this.data.currentPage,
          requestCheck: false
        });
        //请求加载数据
        wx.request({
          url: url_common + '/api/activity/applyProjectList',
          data: {
            "user_id": wx.getStorageSync('user_id'),
            "activity_id": this.data.activity_id,
            "page": this.data.currentPage
          },
          method: 'POST',
          success: function (res) {
            let newPage = res.data.data.list;
            let page_end = res.data.data.page_end;
            for (let i = 0; i < newPage.length; i++) {
              applyList.push(newPage[i]);
            }
            that.setData({
              applyList: applyList,
              page_end: page_end,
              requestCheck: true
            });
          }
        });
      } else {
        that.setData({
          requestCheck: true,
          atBottom: true
        });
      }
    }




  },
  //跳转项目详情
  projectDetail: function (e) {
    // 获取我自己的项目id
    // 获取当前点击的项目id
    var id = e.currentTarget.dataset.project;
    // 判斷項目是不是自己的
    wx.request({
      url: url + '/api/project/projectIsMine',
      data: {
        project_id: id
      },
      method: 'POST',
      success: function (res) {
        var userId = res.data.user_id;
        var user = wx.getStorageSync('user_id');
        if (userId == user) {
          app.href('/pages/myProject/projectDetail/projectDetail?id=' + id + '&&index=' + 0);
        } else {
          app.href('/pages/projectDetail/projectDetail?id=' + id);
        }
      }
    });
  },
})