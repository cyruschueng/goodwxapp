var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
Page({
  data: {
    currentTab: 0,
    value: '',
    atBottom: false,
    showSth: false,
    nonet: true
  },
  onLoad: function (options) {
    let user_id = wx.getStorageSync('user_id');
    this.setData({
      user_id: user_id
    });
    let that = this;
    app.netWorkChange(that);
  },
  onShow: function () {

  },
  // 点击tab切换
  swichNav: function (e) {
    let that = this;
    let current = e.target.dataset.current;
    let searchValue = this.data.searchValue;
    that.setData({
      currentTab: e.target.dataset.current
    });
    app.initPage(that);
    if (!searchValue) {
      this.search();
    } else {
      this.searchYes();
    }
  },
  // 滑动切换tab
  bindChange: function (e) {
    let that = this;
    let searchValue = this.data.searchValue;
    that.setData({
      currentTab: e.detail.current
    });
    app.initPage(that);
    if (!searchValue) {
      this.search();
    } else {
      this.searchYes();
    }
  },
  //输入的内容
  searchSth(e) {
    let value = e.detail.value;
    this.setData({
      searchValue: value
    });
  },
  //搜索确定的按钮
  searchYes() {
    let current = this.data.currentTab * 1;
    let searchValue = this.data.searchValue;
    this.setData({
      show: true
    });
    switch (current) {
    case 0: {
      this.search(searchValue);
      break;
    }
    case 1: {
      this.newestProject(searchValue);
      break;
    }
    case 2: {
      this.applyList(searchValue);
      break;
    }
    case 3: {
      this.investorList(searchValue);
      break;
    }
    case 4: {
      this.faList(searchValue);
      break;
    }
    }
  },
  //搜索指定内容
  jumpToSearch(e) {
    let current = e.currentTarget.dataset.current;
    app.initPage(this);
    this.search();
    this.setData({
      currentTab: current,
      show: true
    });
  },

  // 上拉加载
  loadMore: function () {
    //请求上拉加载接口所需要的参数
    let that = this;
    let user_id = this.data.user_id;
    let currentPage = this.data.currentPage;
    let currentTab = this.data.currentTab * 1;
    // console.log(typeof currentTab)
    let searchValue = this.data.searchValue;
    switch (currentTab) {
    case 1:
      {
        let request = {
          url: url_common + '/api/project/getMarketProjectList',
          data: {
            user_id: this.data.user_id,
            page: this.data.currentPage,
            filter: { search: searchValue }
          }
        };
        //调用通用加载函数
        app.loadMore(that, request, "projects_list");
      }
      break;
    case 2:
      {

        let investments_list = this.data.investments_list;
        let request = {
          url: url_common + '/api/search/investmentSearch',
          data: {
            user_id: this.data.user_id,
            word: searchValue,
            page: this.data.currentPage
          }
        };
        //调用通用加载函数
        app.loadMore2(that, request, res => {
          let list = res.data.data.investments_list.list;
          let page_end = res.data.data.investments_list.page_end;
          if (list) {
            let investList = investments_list.concat(list);
            that.setData({
              investments_list: investList,
              page_end: page_end,
              requestCheck: true,
              atBottom: false
            });
          }
          if (page_end == true) {
            that.setData({
              atBottom: true
            });
          }
        });
      }
      break;
    case 3:
      {
        let request = {
          url: url_common + '/api/investor/searchInvestorListByGroup',
          data: {
            user_id: user_id,
            type: 'investor',
            page: this.data.currentPage,
            search: searchValue
          }
        };
        //调用通用加载函数
        app.loadMore(that, request, "investors_list");
      }
      break;
    case 4:
      {
        let request = {
          url: url_common + '/api/investor/searchInvestorListByGroup',
          data: {
            user_id: user_id,
            type: 'fa',
            page: this.data.currentPage,
            search: searchValue
          }
        };
        //调用通用加载函数
        app.loadMore(that, request, "fa_list");
      }
      break;
    }
  },
  //最新项目
  newestProject(searchValue) {
    let that = this;
    if (!that.data.financingNeed) {
      wx.showLoading({
        title: 'loading',
        mask: true,
      });
    }
    wx.request({
      url: url_common + '/api/project/getMarketProjectList',
      data: {
        user_id: this.data.user_id,
        filter: { search: searchValue }
      },
      method: 'POST',
      success: function (res) {
        var financingNeed = res.data.data;
        app.log(that,'最新', financingNeed);
        that.setData({
          projects_list: financingNeed,
        });
        if (res.data.page_end) {
          that.setData({
            atBottom: true
          });
        }
      },
      complete() {
        wx.hideLoading();
      }
    });
  },
  //投资机构
  applyList(searchValue) {
    let that = this;
    wx.request({
      url: url_common + '/api/search/investmentSearch',
      method: "POST",
      data: {
        user_id: this.data.user_id,
        word: searchValue
      },
      success: function (res) {
        app.log(that,"投资机构", res);
        wx.hideLoading();
        let investments_list = res.data.data.investments_list.list;
        that.setData({
          investments_list: investments_list
        });
        wx.hideLoading();
        if (res.data.page_end) {
          that.setData({
            atBottom: true
          });
        }
      }
    });
  },
  //投资人列表信息
  investorList(searchValue) {
    let that = this;
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    wx.request({
      url: url_common + '/api/investor/searchInvestorListByGroup',
      data: {
        user_id: this.data.user_id,
        type: 'investor',
        search: searchValue
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == '2000000') {
          app.log(that,'投资人列表', res.data.data);
          wx.hideLoading();
          let investors_list = res.data.data;
          that.setData({
            investors_list: investors_list,
          });
          if (res.data.page_end) {
            that.setData({
              atBottom: true
            });
          }
        }
      },
      complete() {
        wx.hideLoading();
      }
    });
  },
  //FA列表信息
  faList(searchValue) {
    let that = this;
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    wx.request({
      url: url_common + '/api/investor/searchInvestorListByGroup',
      data: {
        user_id: this.data.user_id,
        type: 'fa',
        search: searchValue
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == '2000000') {
          app.log(that,'FA列表', res.data.data);
          wx.hideLoading();
          that.setData({
            fa_list: res.data.data,
          });
          if (res.data.page_end) {
            that.setData({
              atBottom: true
            });
          }
        }
      },
      complete() {
        wx.hideLoading();
      }
    });
  },
  //项目详情跳转
  detail: function (e) {
    let thisData = e.currentTarget.dataset;
    let id = thisData.id;
    let user_id = this.data.user_id;
    // 判斷項目是不是自己的
    wx.request({
      url: url + '/api/project/projectIsMine',
      data: {
        project_id: id
      },
      method: 'POST',
      success: function (res) {
        var that = this;
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
  //跳转投资机构详情
  institutionalDetails(e) {
    let institutionId = e.currentTarget.dataset.id;
    app.href('/pages/organization/org_detail/org_detail?investment_id=' + institutionId);
  },
  //跳转投资人详情或者FA详情
  userDetail(e) {
    let userDetailId = e.currentTarget.dataset.id;
    let user_id = wx.getStorageSync('user_id');
    if (user_id == userDetailId) {
      app.href('/pages/my/my/my')
    } else {
      app.href('/pages/userDetail/networkDetail/networkDetail?id=' + userDetailId);
    }
  },
  search() {
    let user_id = wx.getStorageSync('user_id');
    let that = this;
    let timer = this.data.timer;
    let currentTab = this.data.currentTab;
    let searchValue = this.data.searchValue;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(x => {
      wx.showLoading({
        title: 'loading',
        mask: true
      });
      app.httpPost({
        url: url_common + '/api/search/multipleSearch',
        data: {
          user_id: user_id,
          word: searchValue
        }
      }).then(res => {
        let searchData = res.data.data;
        // console.log(searchData);
        wx.hideLoading();
        that.setData({
          searchData: searchData,
          fa_list: searchData.fa_list.list,
          investors_list: searchData.investors_list.list,
          investments_list: searchData.investments_list.list,
          projects_list: searchData.projects_list.list,
          showSth: true
        });
      });
    }, 500);
    this.setData({
      timer: timer
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