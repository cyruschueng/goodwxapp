// pages/discoverInvest/investor/investor.js
var app = getApp();
var url_common = app.globalData.url_common;
import * as FilterModel from '../../../utils/model/filterModel';
import * as ShareModel from '../../../utils/model/shareModel';
let RG = require('../../../utils/model/register.js');
let register = new RG.register(); 
Page({
  data: {
    // 筛选搜索
    SearchInit: FilterModel.data,
    nonet: true
  },
  onLoad(options) {
    let that = this;
    let SearchInit = that.data.SearchInit;
    app.netWorkChange(that);
    let tab = SearchInit.tab;

    // ------------下面获取缓存是必要的,不要删除--------------------------------------------------
    // 无缓存用户FilterModel预处理
    if (!that.data.SearchInit.industry) {
      //获取筛选项所需的信息并存入缓存
      wx.request({
        url: url_common + '/api/category/getProjectCategory',
        method: 'POST',
        success: function (res) {
          // console.log('getProjectCategory',res)
          let thisData = res.data.data;
          thisData.area.forEach((x) => { x.check = false; });
          thisData.industry.forEach((x) => { x.check = false; });
          thisData.scale.forEach((x) => { x.check = false; });
          thisData.stage.forEach((x) => { x.check = false; });
          thisData.hotCity.forEach((x) => { x.check = false; });
          wx.setStorageSync("industry", thisData.industry);
          wx.setStorageSync("scale", thisData.scale);
          wx.setStorageSync("stage", thisData.stage);
          wx.setStorageSync('hotCity', thisData.hotCity);
          // 筛选的初始缓存
          let SearchInit = that.data.SearchInit;
          SearchInit.industry = wx.getStorageSync('industry');
          SearchInit.stage = wx.getStorageSync('stage');
          SearchInit.scale = wx.getStorageSync('scale');
          SearchInit.hotCity = wx.getStorageSync('hotCity');
          that.setData({
            SearchInit: SearchInit
          });
        },
      });
    }



    this.noSearch();
    app.initPage(that);
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
    });
  },
  onShow: function () {
    this.investorList();
  },

  //投资人列表信息
  investorList() {
    let that = this;
    let SearchInit = this.data.SearchInit;
    wx.showLoading({
      title: 'loading',
      mask: true,
    });
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
          app.log('投资人列表', res.data.data);
          wx.hideLoading();
          let investorList = res.data.data;
          SearchInit.currentIndex = 99;
          // 存入无筛选项的投资人列表以备他用
          if (!that.data.investorList) {
            that.setData({
              investorList2: investorList
            });
          }
          that.setData({
            investorList: investorList,
            SearchInit: SearchInit
          });
        }
      },
      complete() {
        wx.hideLoading();
      }
    });
  },
  // 控制投资机构不显示筛选项(辅助函数)
  noSearch() {
    if (this.data.currentTab == 0) {
      this.setData({
        hidden: false
      });
    } else {
      this.setData({
        hidden: true
      });
    }
  },
  // 下拉框
  move(e) {
    let that = this;
    FilterModel.move(e, that);
  },
  // 标签选择
  tagsCheck(e) {
    let that = this;
    FilterModel.tagsCheck(e, that);
  },
  // 筛选重置
  reset() {
    let that = this;
    FilterModel.reset(that);
  },
  // 全部筛选重置
  allReset() {
    let that = this;
    FilterModel.allReset(that);
  },
  // 筛选确定
  searchCertain() {
    let that = this;
    let searchData = FilterModel.searchCertain(that);
    app.log('筛选投资人', searchData);
    this.investorList();
    // console.log('searchCertain()出错了')
  },
  // 点击modal层
  modal() {
    let that = this;
    FilterModel.modal(that);
  },
  //搜索
  searchSth() {
    let that = this;
    let str = 'investorList';
    FilterModel.searchSth(that, str);
  },
  // 展示项删除
  labelDelete(e) {
    FilterModel.labelDelete(e, this);
  },
  // 一级联动选择
  firstLinkCheck(e) {
    FilterModel.firstLinkCheck(e, this);
  },
  // 联动选择全部
  linkCheckAll(e) {
    FilterModel.linkCheckAll(e, this);
  },

  // 上拉加载
  loadMore: function () {
    //请求上拉加载接口所需要的参数
    let that = this;
    let user_id = this.data.user_id;
    let request = {
      url: url_common + '/api/investor/getInvestorListByGroup',
      data: {
        user_id: user_id,
        type: 'investor',
        page: this.data.currentPage,
        filter: this.data.SearchInit.searchData
      }
    };
    //调用通用加载函数
    app.loadMore(that, request, "investorList");
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
    app.operationModel('contactsAdd', this,added_user_id, function (res) {
      app.log('申请添加人脉完成', res);
      that.contactsAddSuccessFunc(res, added_user_id, 2);
    });
  },
  // 直接加人脉
  contactsAddDirect(e) {
    let added_user_id = e.currentTarget.dataset.id;
    let that = this;
    app.operationModel('contactsAddDirect', this,added_user_id, function (res) {
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