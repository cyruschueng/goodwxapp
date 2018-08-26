var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import * as FilterModel from '../../../utils/model/filterModel';
let RG = require('../../../utils/model/register.js');
let register = new RG.register();
Page({
  data: {
    SearchInit: FilterModel.data,
    financingNeed: [],//最新
    slectProject: [],
    investorList: [],
    faList: [],
    myList: [],
    placeHold: "请输入姓名、公司、品牌",
    nonet: true
  },
  onLoad: function (options) {
    let that = this;
    let user_id = options.user_id;
    let entrance = options.entrance;
    // entrance: slected,newest,investorList,faList,myList
    this.setData({
      user_id: user_id,
      entrance: entrance
    });
    app.initPage(that);
    switch (entrance) {
      case 'selected':
        wx.setNavigationBarTitle({
          title: '项目搜索',
        });
        that.setData({
          placeHold: "请输入项目名称，公司名称"
        });
        break;
      case 'newest':
        wx.setNavigationBarTitle({
          title: '项目搜索',
        });
        that.setData({
          placeHold: "请输入项目名称，公司名称"
        });
        break;
      case "investorList":
        wx.setNavigationBarTitle({
          title: '搜索投资人',
        });
        break;
      case "faList":
        wx.setNavigationBarTitle({
          title: '搜索融资顾问',
        });
        break;
      case "myList":
        wx.setNavigationBarTitle({
          title: '搜索好友',
        });
        break;
    }
    app.netWorkChange(that);
  },
  //搜索事件
  searchSth: function (e) {
    let that = this;
    let user_id = this.data.user_id;
    let currentUser = wx.getStorageSync('user_id');
    let entrance = this.data.entrance;
    let str = e.detail.value;
    let SearchInit = this.data.SearchInit;
    let timer = this.data.timer;
    SearchInit.searchData.search = str;
    this.setData({
      SearchInit: SearchInit
    });
    //防止多次请求进行延时处理
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(x => {
      wx.showLoading({
        title: 'loading',
        mask: true
      });
      switch (entrance) {
        case 'selected':
          this.selectedProject();
          break;
        case 'newest':
          this.newestProject();
          break;
        case "investorList":
          this.newSearch(0);
          break;
        case "faList":
          this.newSearch(1);
          break;
        case "myList":
          this.newSearch(2);
          break;
      }
    }, 1500);
    this.setData({
      timer: timer,
    });
  },
  // 取消
  searchEsc: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  //点击进入项目详情
  projectDetail: function (e) {
    var project_id = e.currentTarget.dataset.project;
    // 判斷項目是不是自己的
    app.httpPost({
      url: url + '/api/project/projectIsMine',
      data: {
        project_id: project_id
      },

    }, this).then(res => {
      var that = this;
      var userId = res.data.user_id;
      var user = wx.getStorageSync('user_id');
      if (userId == user) {
        app.href('/pages/myProject/projectDetail/projectDetail?id=' + project_id + '&&index=' + 0);
      } else {
        app.href('/pages/projectDetail/projectDetail?id=' + project_id);
      }
    }).catch(res => {
      app.errorHide(this, res.data.error_msg);
    });


  },
  //点击进入用户详情
  userDetail(e) {
    let id = e.currentTarget.dataset.id;
    var user_id = wx.getStorageSync("user_id");//用戶id
    if (id == user_id) {
      app.href('/pages/my/my/my');
    } else {
      app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id);
    }
  },
  //上拉加载
  loadMore: function () {
    let entrance = this.data.entrance;
    let that = this;
    let user_id = wx.getStorageSync('user_id');
    let search = this.data.SearchInit.searchData.search;
    let request;
    switch (entrance) {
      case 'newest':
        request = {
          url: url_common + '/api/project/getMarketProjectList',
          data: {
            user_id: this.data.user_id,
            filter: this.data.SearchInit.searchData,
            page: this.data.currentPage
          }
        };
        app.loadMore(that, request, "financingNeed");
        break;
      case 'selected':
        request = {
          url: url_common + '/api/project/getSelectedProjectList',
          data: {
            user_id: user_id,
            filter: this.data.SearchInit.searchData,
            page: this.data.currentPage,
          }
        };
        //调用通用加载函数
        app.loadMore(that, request, "slectProject");
        break;
      case 'investorList':
        {
          request = {
            url: url_common + '/api/user/searchUser',
            data: {
              user_id: user_id,
              page: this.data.currentPage,
              search: search
            }
          };
          //调用通用加载函数
          app.loadMore(that, request, "investorList");
        }
        break;
      case 'faList':
        {
          request = {
            url: url_common + '/api/user/searchUser',
            data: {
              user_id: user_id,
              search: search,
              page: this.data.currentPage,
            }
          };
          //调用通用加载函数
          app.loadMore(that, request, "faList");
        }
        break;
      case 'myList':
        {
          request = {
            url: url_common + '/api/user/searchUser',
            data: {
              user_id: user_id,
              search: search,
              page: that.data.currentPage,
            }
          };
          //调用通用加载函数
          app.loadMore(that, request, 'myList');
        }
        break;
    }
  },
  //申请查看
  matchApply(e) {
    let that = this;
    let pro_id = e.currentTarget.dataset.project;
    let slectProject = that.data.slectProject;
    let financingNeed = that.data.financingNeed;
    let entrance = that.data.entrance;
    app.operationModel('projectApply', this, pro_id, res => {
      if (entrance == 'selected') {
        slectProject.forEach(x => {
          if (x.project_id == pro_id) {
            x.relationship_button = 0;
          }
        });
      } else if (entrance == 'newest') {
        financingNeed.forEach(x => {
          if (x.project_id == pro_id) {
            x.relationship_button = 0;
          }
        });
      }
      that.setData({
        slectProject: slectProject,
        financingNeed: financingNeed
      });
    });
  },
  // 项目推送
  projectPush(e) {
    let that = this;
    let pushTo_user_id = e.currentTarget.dataset.id;
    app.operationModel('projectPush', that, pushTo_user_id);
  },
  // 申请加人脉
  contactsAdd(e) {
    let that = this;
    let added_user_id = e.currentTarget.dataset.id;
    app.log(that, "add_user", added_user_id);
    app.operationModel('contactsAdd', this, added_user_id, function (res) {
      app.log(that, '申请添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 2);
    });
  },
  // 直接加人脉
  contactsAddDirect(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAddDirect', this, added_user_id, function (res) {
      app.log(that, '直接添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 1);
    });
  },
  // 加人脉成功后处理(辅助函数)
  contactsAddSuccessFunc(res, added_user_id, num) {
    let that = this;
    let investorList = this.data.investorList;
    let faList = this.data.faList;
    let myList = this.data.myList;
    if (res.data.status_code == 2000000) {
      //更改投资人和FA列表中该人的加人脉按钮的字段
      if (investorList) {
        investorList.forEach(x => {
          if (x.user_id == added_user_id) {
            x.follow_status = num;
          }
        });
        that.setData({
          investorList: investorList
        });
      }
      if (faList) {
        faList.forEach(x => {
          if (x.user_id == added_user_id) {
            x.follow_status = num;
          }
        });
        that.setData({
          faList: faList
        });
      }
      if (myList) {
        myList.forEach(x => {
          if (x.user_id == added_user_id) {
            x.follow_status = num;
          }
        });
        that.setData({
          myList: myList
        });
      }
    } else {
      app.errorHide(that, res.data.error_Msg, 3000);
    }
  },
  // ----------------------------------获取搜索结果---------------------------------------------------
  // 最新
  newestProject() {
    let that = this;
    app.httpPost({
      url: url_common + '/api/project/getMarketProjectList',
      data: {
        user_id: this.data.user_id,
        filter: this.data.SearchInit.searchData
      },
    }, this).then(res => {
      wx.hideLoading();
      app.log(that, '最新', res);
      var financingNeed = res.data.data;
      that.setData({
        financingNeed: financingNeed,
      });
    }).catch(res => {
      app.errorHide(this, res.data.error_msg);
    });
  },
  // 精选
  selectedProject() {
    let that = this;
    app.httpPost({
      url: url_common + '/api/project/getSelectedProjectList',
      data: {
        user_id: this.data.user_id,
        filter: this.data.SearchInit.searchData
      }
    }).then(res => {
      wx.hideLoading();
      var slectProject = res.data.data;
      app.log(that, '精选', res);
      that.setData({
        slectProject: slectProject,
      });
    });
  },
  // 投资人(弃用)
  investorList() {
    let that = this;
    let SearchInit = this.data.SearchInit;
    wx.request({
      url: url_common + '/api/investor/getInvestorListByGroup',
      data: {
        user_id: this.data.user_id,
        type: 'investor',
        filter: this.data.SearchInit.searchData
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == '2000000') {
          app.log(that, '投资人列表', res.data.data);
          wx.hideLoading();
          var investorList = res.data.data;
          that.setData({
            investorList: investorList,
          });
        }
      }
    });






  },
  // FA(弃用)
  faList() {
    let that = this;
    let SearchInit = this.data.SearchInit;
    wx.request({
      url: url_common + '/api/investor/getInvestorListByGroup',
      data: {
        user_id: this.data.user_id,
        type: 'fa',
        filter: this.data.SearchInit.searchData
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == '2000000') {
          app.log(that, 'FA列表', res.data.data);
          wx.hideLoading();
          var faList = res.data.data;
          that.setData({
            faList: faList,
          });
        }
      }
    });
  },
  // 我的人脉(弃用)
  myList() {
    let user_id = this.data.user_id;
    let that = this;
    let SearchInit = this.data.SearchInit;
    // 检查个人信息全不全
    if (user_id != 0) {
      app.checkUserInfo(this, res => {
        that.setData({
          notIntegrity: res.data.is_complete,
          empty: 1
        });
      })
    }
    // 获取人脉库信息
    if (user_id) {
      wx.showLoading({
        title: 'loading',
        mask: true,
      });
      wx.request({
        url: url_common + '/api/user/getMyFollowList',
        data: {
          user_id: user_id,
          page: 1,
          filter: SearchInit.searchData
        },
        method: 'POST',
        success: function (res) {
          wx.hideLoading();
          app.log(that, '我的人脉列表', res);
          if (res.data.status_code == '2000000') {
            var myList = res.data.data;//所有的用户
            var page_end = res.data.page_end;
            that.setData({
              myList: myList,
              page_end: page_end,
            });
          }
        }
      });
    }
  },
  // 一键拨号
  telephone: function (e) {
    let telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone,
    });
  },
  // 新搜索逻辑
  newSearch(num) {
    let user_id = this.data.user_id;
    let that = this;
    let search = this.data.SearchInit.searchData.search;
    wx.request({
      // url: url_common + '/api/investor/searchInvestor',
      url: url_common + '/api/user/searchUser',
      data: {
        user_id: user_id,
        search: search,
      },
      method: 'POST',
      success(res) {
        if (res.data.status_code == 2000000) {
          switch (num) {
            case 0: {
              app.log(that, '投资人列表', res.data.data);
              wx.hideLoading();
              var investorList = res.data.data;
              that.setData({
                investorList: investorList,
              });
              break;
            }
            case 1: {
              app.log(that, 'FA列表', res.data.data);
              wx.hideLoading();
              var faList = res.data.data;
              that.setData({
                faList: faList,
              });
              break;
            }
            case 2: {
              wx.hideLoading();
              var myList = res.data.data;//所有的用户
              var page_end = res.data.page_end;
              app.log(that, "myList", myList);
              that.setData({
                myList: myList,
                page_end: page_end,
              });
              break;
            }
          }
        } else {
          wx.hideLoading();
          app.errorHide(that, res.data.error_msg, 3000);
        }
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