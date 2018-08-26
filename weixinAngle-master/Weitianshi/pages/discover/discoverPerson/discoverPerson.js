var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import * as FilterModel from '../../../utils/model/filterModel';
import * as ShareModel from '../../../utils/model/shareModel';
let RG = require('../../../utils/model/register.js');
let register = new RG.register();

Page({
  data: {
    jiandi: false,
    firstTime: true,
    searchText: '请输入姓名、公司、品牌',
    investorList: '',
    hidden: true,
    slectProject: '',
    SearchInit: FilterModel.data,
    // 筛选搜索
    tab: [
      { name: '领域', check: false, arr: false, id: 'industry' },
      { name: '轮次', check: false, arr: false, id: "stage" },
      { name: '金额', check: false, arr: false, id: "scale" },
      { name: '地区', check: false, arr: false, id: "hotCity" }
    ],
    searchData: {
      industry: [],
      stage: [],
      scale: [],
      hotCity: [],
      schedule: [],
    },
    nonet: true
  },
  onLoad(options) {
    let that = this;
    // let searchData = that.data.searchData;
    app.initPage(that);
    app.netWorkChange(that);
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    //请求精选项目数据
    app.loginPage(function (user_id) {
      that.setData({
        user_id: user_id
      });
      // 身份认证状态获取
      wx.request({
        url: url_common + '/api/user/getUserGroupByStatus',
        data: {
          user_id: user_id
        },
        method: 'POST',
        success: function (res) {
          app.log('身份状态获取', res);
          // 0:未认证1:待审核 2 审核通过 3审核未通过
          let status = res.data.status;
          if (status != 0) {
            let group_id = res.data.group.group_id;
            that.setData({
              group_id: group_id
            });
          }
          that.setData({
            status: status
          });
        }
      });
      that.investorList();
    });
  },
  onShow() {
    if (!this.data.firstTime) {
      this.investorList();
    }
    // this.investorList();
    this.setData({
      requestCheck: true,
      currentPage: 1,
      page_end: false
    });
  },
  //下拉刷新
  onPullDownRefresh() {
    //请求投资人列表
    this.investorList();
  },
  //投资人列表信息
  investorList() {
    let that = this;
    // let SearchInit = this.data.SearchInit;
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
    wx.request({
      url: url_common + '/api/investor/getInvestorListByGroup',
      data: {
        user_id: this.data.user_id,
        type: 'investor',
        filter: this.data.searchData
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status_code == '2000000') {
          app.log('投资人列表', res.data.data);
          wx.hideLoading();
          let investorList = res.data.data;
          // let page_end = res.data.data.page_end;
          // searchData.currentIndex = 99;
          // 存入无筛选项的投资人列表以备他用
          if (!that.data.investorList) {
            that.setData({
              investorList2: investorList
            });
          }
          that.setData({
            investorList: investorList,
            // searchData: searchData
          });
        }
      },
      complete() {
        wx.hideLoading();
      }
    });
  },
  // 搜索
  searchSth() {
    let user_id = this.data.user_id;
    let str;
    str = 'investorList';
    app.href('/pages/search/search3/search3?user_id=' + user_id + '&&entrance=' + str);
  },
  //  跳转到项目店铺筛选页面
  tagFilter() {
    app.href('/pages/my/projectShop/tagFilter/tagFilter');
  },
  // 用户详情
  userDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    var user_id = wx.getStorageSync("user_id");//用戶id
    if (id == user_id) {
      app.href('/pages/my/my/my')
    } else {
      app.href('/pages/userDetail/networkDetail/networkDetail?id=' + id);
    }
  },
  // 上拉加载
  loadMore: function () {
    //请求上拉加载接口所需要的参数
    let that = this;
    let user_id = this.data.user_id;
    // let currentPage = this.data.currentPage;

    let request = {
      url: url_common + '/api/investor/getInvestorListByGroup',
      data: {
        user_id: user_id,
        type: 'investor',
        page: this.data.currentPage,
        filter: this.data.searchData
      }
    };
    //调用通用加载函数
    app.loadMore(that, request, "investorList");
    if (this.data.page_end == true) {
      that.setData({
        jiandi: true
      });
    }

  },
  // 分享当前页面
  onShareAppMessage: function () {
    return ShareModel.discoverInvestShare();
  },
  // 项目推送
  projectPush(e) {
    let that = this;
    let pushTo_user_id = e.currentTarget.dataset.id;
    app.operationModel('projectPush', that, pushTo_user_id);
  },
  // 申请加人脉
  contactsAdd(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAdd',this, added_user_id, function (res) {
      app.log('申请添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 2);
    });
  },
  // 直接加人脉
  contactsAddDirect(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAddDirect',this, added_user_id, function (res) {
      app.log('直接添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 1);
    });
  },
  // 加人脉成功后处理(辅助函数)
  contactsAddSuccessFunc(res, added_user_id, num) {
    let that = this;
    let investorList = this.data.investorList;
    let faList = this.data.faList;
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
    } else {
      app.errorHide(that, res.data.error_Msg, 3000);
    }
  },
  //---------------------------我的人脉--------------------------------------------------------------
  // 一键拨号
  telephone: function (e) {
    let telephone = e.currentTarget.dataset.telephone;
    wx.makePhoneCall({
      phoneNumber: telephone,
    });
  },
  // -----------------------------------立即认证
  // 立即认证
  toAccreditation: function () {
    let status = this.data.status;
    let user_id = wx.getStorageSync('user_id');
    app.checkUserInfo(this, res => {
      var complete = res.data.is_complete;
      //如果信息完整就可以显示去认证
      if (status == 0) {
        app.href('/pages/my/identity/indentity/indentity');
      } else if (status == 3) {
        wx.showModal({
          title: '友情提示',
          content: '您的身份未通过审核,只有投资人和买方FA才可申请查看项目',
          confirmColor: "#333333;",
          confirmText: "重新认证",
          showCancel: false,
          success: function (res) {
            wx.request({
              url: url_common + '/api/user/getUserGroupByStatus',
              data: {
                user_id: user_id
              },
              method: 'POST',
              success: function (res) {
                let group_id = res.data.group.group_id;
                app.href('/pages/my/identity/indentity/indentity?group_id=' + group_id);
              }
            });
          }
        });
      }
    })
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

