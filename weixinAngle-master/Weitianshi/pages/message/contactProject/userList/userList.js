var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({

  data: {
    nonet: true
  },

  onLoad: function (options) {
    let that = this;
    app.netWorkChange(that);
    let user_id = wx.getStorageSync('user_id');//获取我的user_id
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    wx.request({
      url: url_common + '/api/project/myMeet',
      data: {
        user_id: user_id,
        page: 1
      },
      method: 'POST',
      success: function (res) {
        wx.hideLoading();
        let list = res.data.data;
        let count = res.data.data.count;
        let projectList = res.data.data.projects;
        app.log("projectList",projectList);
        that.setData({
          count: count,
          projectList: projectList,
          list: list
        });
      }
    });
  },
  onShow: function () {
    this.setData({
      requestCheck: true,
      currentPage: 1,
      page_end: false
    });
  },
  //跳转项目详情
  projectDetail: function (e) {
    let that=this;
    let project_id = e.currentTarget.dataset.project;
    app.log("project_id",project_id);
    // 判斷項目是不是自己的
    wx.request({
      url: url + '/api/project/projectIsMine',
      data: {
        project_id: project_id
      },
      method: 'POST',
      success: function (res) {
        var userId = res.data.user_id;
        var user = wx.getStorageSync('user_id');
        if (userId == user) {
          app.href('/pages/myProject/projectDetail/projectDetail?id=' + project_id + '&&index=' + 0);
        } else {
          app.href('/pages/projectDetail/projectDetail?id=' + project_id);
        }
      }
    });
  },
  //下拉加载
  loadMore: function () {
    var that = this;
    let user_id = wx.getStorageSync('user_id');//获取我的user_id
    var currentPage = this.data.currentPage;
    let projectList = this.data.projectList;
    // let list = this.data.list;
    var request = {
      url: url_common + '/api/project/myMeet',
      data: {
        user_id: user_id,
        page: currentPage
      }
    };
    //调用通用加载函数
    app.loadMore2(that, request, res => {
      let rank = res.data.data.projects;
      let page_end = res.data.data.page_end;
      if (rank) {
        let newRank_list = projectList.concat(rank);
        that.setData({
          projectList: newRank_list,
          page_end: page_end,
          requestCheck: true
        });
      }
    });
  },
  // 重新加载
  refresh() {
    let timer = '';
    wx.showLoading({
      title: 'loading',
      mask: true
    });
    timer = setTimeout(x => {
      wx.hideLoading();
      this.onShow();
    }, 1500);
  }
}); 