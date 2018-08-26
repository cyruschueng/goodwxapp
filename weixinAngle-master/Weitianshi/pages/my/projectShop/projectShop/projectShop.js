let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as ShareModel from '../../../../utils/model/shareModel';
let RG = require('../../../../utils/model/register.js');
let register = new RG.register();
Page({
  data: {
    isChecked1: false,
    buttonOne: {
      text: "新增项目"
    },
    searchText: '搜索公司名称，项目名称',
    tab: [
      { name: '领域', check: false, arr: false, id: 'industry' },
      { name: '轮次', check: false, arr: false, id: "stage" },
      { name: '金额', check: false, arr: false, id: "scale" },
      { name: '地区', check: false, arr: false, id: "hotCity" }
    ],
    banner_personShop: app.globalData.picUrl.banner_personShop,
    currentIndex: 5,
    searchData: {
      industry: [],
      stage: [],
      scale: [],
      hotCity: [],
      schedule: [],
    },
    myPublicProject_page: 1,
    myPublicCheck: true,
    myPublic_page_end: false,
    check: false,
    isChecked: true,
    contentMore: false,
    otherPerson: false,
    notHave: 1,
    firstTime: true,
    // bottomBtn
    subOperation: [
      {
        id: 1,
        eventName: '_toIndex',
        picUrl: '/img/icon-fenxiang@2x.png',
        text: "首页",
        func: function () {
        }
      },
      {
        id: 2,
        eventName: '_toIndex',
        picUrl: '/img/icon-fenxiang@2x.png',
        text: '分享'
      },
      {
        id: 3,
        eventName: '_toIndex',
        picUrl: '/img/icon-fenxiang@2x.png',
        text: '店铺装修'
      },

    ],
    mainOperation: {
      value: '创建项目'
    },
    nonet: true,
    atBottom: false,
  },
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    let that = this;
    let followed_user_id = options.followed_user_id;
    let searchData = this.data.searchData;
    this.setData({
      followed_user_id: followed_user_id,
    });

    app.loginPage(user_id => {
      app.initPage(that);
      //判断是不是分享页面,并判断分享者和查看者是不是本人 
      if (followed_user_id && followed_user_id != user_id) {
        this.setData({
          user_id: followed_user_id,
          otherPerson: true
        });
      } else {
        this.setData({
          user_id: user_id
        });
      }
      this._getUserInfo();
      // 获取审核列表
      app.httpPost({
        url: url_common + '/api/project/getNodeCount',
        data: {
          user_id: this.data.user_id
        }
      }, that).then(res => {
        let node_list = res.data.data.node_list;
        let searchData = that.data.searchData;
        if (node_list) {
          that.setData({
            hasCompetitor: true
          });
          node_list.forEach(x => {
            if (x.is_select == 1) {
              searchData.schedule = [x.schedule_id];
            }
          });
        } else {
          that.setData({
            hasCompetitor: false
          });
        }
        that.setData({
          node_list: node_list,
          searchData: searchData
        });
        that.requestPost();
      });
    });
    app.netWorkChange(that);
  },
  onShow: function () {
    if (!this.data.firstTime) {
      this._getUserInfo();
      this.setData({
        requestCheck: true,
        currentPage: 1,
        page_end: false
      });
      this.requestPost();
    }
  },
  //获取项目详情
  _getProjectInfo() {
    let that = this;
    wx.request({
      url: url_common + '/api/project/getMyProjectList',
      data: {
        user_id: this.data.user_id,
        filter: this.data.searchData
      },
      method: 'POST',
      success: function (res) {
        let myProject = res.data.data;
        app.log(that, "myProject", myProject);
        wx.hideLoading();
        //刷新数据
        that.setData({
          myProject: myProject,
          myPublic_page_end: false,
          myPublicProject_page: 1
        });
      }
    });
  },
  //获取用户详情 
  _getUserInfo() {
    let that = this;
    wx.request({
      url: url_common + '/api/user/getUserBasicInfo',
      data: {
        user_id: this.data.user_id
      },
      method: 'POST',
      success: function (res) {
        let userInfo = res.data.user_info;
        let user_name = userInfo.user_real_name;
        let shop_name = userInfo.shop_name;
        if (userInfo.user_intro) {
          let user_intro = userInfo.user_intro;
          if (user_intro.length >= 100) {
            that.setData({
              contentMore: true,
              isChecked1: false
            });
          } else {
            that.setData({
              contentMore: false,
              isChecked1: true
            });
          }
        }
        that.setData({
          userInfo: userInfo
        });
        if (!shop_name) {
          wx.setNavigationBarTitle({
            title: user_name + '的店铺'
          });
        } else {
          wx.setNavigationBarTitle({
            title: shop_name
          });
        }
      }
    });
  },
  // --------------------------搜索和筛选-----------------------------------------------
  // 搜索
  searchSth() {
    let user_id = this.data.user_id;
    app.href('/pages/my/projectShop/projectSearch/projectSearch?user_id=' + user_id);
  },
  // 评分阶段筛选
  scheduleCheck(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let node_list = this.data.node_list;
    let searchData = this.data.searchData;
    searchData.schedule = [];
    node_list.forEach(x => {
      x.is_select = 0;
    });
    node_list[index].is_select = 1;
    searchData.schedule.push(node_list[index].schedule_id);
    this.setData({
      node_list: node_list,
      searchData: searchData,

    });
    // 发送筛选请求
    this.requestPost();
  },
  // 发送筛选请求
  requestPost() {
    let that = this;
    let page_end = this.data.page_end;
    wx.request({
      url: url_common + '/api/project/getMyProjectList',
      data: {
        user_id: this.data.user_id,
        filter: this.data.searchData
      },
      method: 'POST',
      success: function (res) {
        app.log(that, 'getMyProjectList', res);
        wx.hideLoading();
        if (res.data.data.length == 0) {
          that.setData({
            currentIndex: 5,
            myProject: res.data.data,
            notHave: 0,
            requestCheck: true,
            currentPage: 1,
            page_end: false
          });
        } else {
          that.setData({
            currentIndex: 5,
            myProject: res.data.data,
            requestCheck: true,
            currentPage: 1,
            page_end: false
          });
        }
      }
    });
  },
  // -------------------------------------------------------------------------
  // 点击modal层
  modal() {
    let currentIndex = this.data.currentIndex;
    this.setData({
      currentIndex: 5
    });
  },
  // 上拉加载
  loadMore() {
    let that = this;
    let searchData = this.data.searchData;
    let myProject = this.data.myProject;
    let currentPage = this.data.currentPage;
    let request = {
      url: url_common + '/api/project/getMyProjectList',
      data: {
        user_id: this.data.user_id,
        filter: searchData,
        page: currentPage
      },
    };
    app.loadMore2(that, request, res => {
      let newPage = res.data.data;
      let page_end = res.data.page_end;
      if (myProject) {
        myProject = myProject.concat(newPage);
        currentPage++;
        that.setData({
          myProject: myProject,
          page_end: page_end,
          requestCheck: true,
          currentPage: currentPage
        });
      }
      if (page_end == true) {
        this.setData({
          atBottom: true
        });
      }
    });

  },
  // 项目详情
  detail: function (e) {
    let thisData = e.currentTarget.dataset;
    let id = thisData.id;
    let index = thisData.index;
    let user_id = this.data.user_id;
    let followed_user_id = this.data.followed_user_id;
    // followed_user_id 存在:他人的店铺详情;不存在:自己的店铺详情
    if (followed_user_id) {
      app.href('/pages/projectDetail/projectDetail?id=' + id + "&&index=" + index + "&&share_id=" + user_id);
    } else {
      app.href('/pages/myProject/projectDetail/projectDetail?id=' + id + "&&index=" + index);
    }
  },
  // 新增项目
  editDetail: function (e) {
    this._identity('/pages/myProject/publishProject/publishProject?type=8', 1);
  },
  //  推送项目
  pushProject: function () {
    let pushId = this.data.user_id;
    this._identity('/pages/myProject/pushTo/pushTo?pushId=' + pushId, 2);
  },
  //  跳转到我的店铺
  toMyShop: function () {
    this._identity('/pages/my/projectShop/projectShop/projectShop', 2);
  },
  // 店铺装修
  decorate: function () {
    let user_id = this.data.userInfo.user_id;
    app.href('/pages/my/projectShop/shopEdit/shopEdit?user_id=' + user_id);
  },
  // 选中项目
  clickProject: function (e) {
    let that = this;
    let user_id = this.data.user_id;
    let myProject = this.data.myProject;
    let project_id = e.currentTarget.dataset.id;
    let is_top = e.currentTarget.dataset.top;
    wx.request({
      url: url_common + '/api/project/stickProject',
      data: {
        project_id: project_id,
        user_id: user_id
      },
      method: "POST",
      success: function (res) {
        if (res.data.status_code = 200000) {
          myProject.forEach((x) => {
            if (x.project_id == project_id && is_top == 0) {
              app.errorHide(that, "设为推荐项目", 1000);
              x.is_top = 1;
            } else if (x.project_id == project_id && is_top == 1) {
              app.errorHide(that, "取消推荐项目", 1000);
              x.is_top = 0;
            }
          });
          that.setData({
            myProject: myProject
          });
        }
      }
    });
  },
  //  展开
  allPoint: function () {
    this.setData({
      isChecked: false
    });
  },
  //  收起
  noPoint: function () {
    this.setData({
      isChecked: true
    });
  },
  //  更多精选项目
  moreProject: function () {
    app.href('/pages/discoverProject/discoverProject');
  },
  //  跳转用户详情
  toPersonDetail: function () {
    let user_id = this.data.user_id;
    let currentUser = wx.getStorageSync('user_id');
    if (user_id != currentUser) {
      app.href('/pages/userDetail/networkDetail/networkDetail?id=' + user_id);
    }
  },
  //  跳转到项目店铺筛选页面
  tagFilter() {

    app.href('/pages/my/projectShop/tagFilter/tagFilter');
  },
  //  身份验证
  _identity: function (targetUrl, num) {
    let user_id = wx.getStorageSync('user_id');
    app.checkUserInfo(this, res => {
      let complete = res.data.is_complete;
      if (targetUrl && num == 1) {
        wx.navigateTo({
          url: targetUrl
        });
      } else if (targetUrl && num == 2) {
        app.href(targetUrl);
      }
    })
  },
  // -----------------------分享------------------------------------------
  //  分享页面
  // onShareAppMessage: function () {
  //   let that = this;
  //   return ShareModel.projectShopShare(that);
  // },
  //  分享店铺二维码
  toShareShop() {
    let user_id = this.data.user_id;
    app.href("/pages/my/projectShop/shopShare/shopShare?user_id=" + user_id);
  },
  //  分享页面
  onShareAppMessage: function () {
    let that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      app.log(that, "target", res.target);
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        app.log(that, "res成功", res);
      },
      fail: function (res) {
        app.log(that, "res失败", res);
      }
    };
  },
  onUnload: function () {
    app.initTran();
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
  },
  // 微信授权绑定
  getPhoneNumber(e) {
    register.getPhoneNumber.call(this, e);
  },
  // 手机号码绑定
  telephoneRegister() {
    register.telephoneRegister.call(this);
  },
  // 关闭绑定方式选择弹框
  closeRegisterModal() {
    register.closeRegisterModal.call(this);
  }
});