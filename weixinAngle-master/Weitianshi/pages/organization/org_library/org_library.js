// pages/organization/org_library/org_library.js
var app = getApp();
var url = app.globalData.url;
var url_common = app.globalData.url_common;
import * as FilterModel from '../../../utils/model/filterModel';
import * as ShareModel from '../../../utils/model/shareModel';
Page({
  data: {
    //筛选搜索
    SearchInit: FilterModel.data,
    label_industry: FilterModel._label_industry,
    linkDataShow: FilterModel._linkDataShow,
    imgUrls: app.globalData.picUrl.invest_org,
    nonet: true
  }, 
  onLoad: function (options) {
    let label = options.label;
    let itemId = options.itemId;
    let that = this;
    wx.showLoading({
      title: 'loading',
      mask: true,
    });

    //更改搜索模块初始化设置
    FilterModel.reInitSearch(that, {
      tab: [
        { type: 2, name: '领域', label: 'label_industry', itemId: 'industry_id', itemName: 'industry_name', longCheckBox: false, page: '0' },
        { type: 1, name: '地区', label: "hotCity", itemId: 'area_id', itemName: 'area_title', longCheckBox: false },
        { type: 1, name: '风格', label: "label_style", itemId: 'style_id', itemName: 'style_name', longCheckBox: false },
        { type: 1, name: '类型', label: "label_type", itemId: 'type_id', itemName: 'type_name', longCheckBox: true },
      ],
    });
    let SearchInit = that.data.SearchInit;
    let tab = SearchInit.tab;
    if (SearchInit.industry.length < 1) {
      tab.forEach(x => {
        SearchInit[x.label] = wx.getStorageSync(x.label);
      });
      that.setData({
        SearchInit: SearchInit 
      });
    }

    // 页面间跳转传值筛选
    if (label) {
      FilterModel.detialItemSearch(label, itemId, that, searchData => {
        app.log(that,"searchData",searchData);
      });
    }
    this.applyList();
    app.netWorkChange(that);
  },
 
  onShow: function () {
    this.setData({
      requestCheck: true,
      currentPage: 1,
      page_end: false
    });
  },
  // 上拉加载
  loadMore: function () {
    let that = this;
    let investment_list = this.data.investment_list;
    let currentPage = this.data.currentPage;
    var request = {
      url: url_common + '/api/investment/list',
      data: {
        page: this.data.currentPage,
        filter: this.data.SearchInit.searchData
      }
    };
    //调用通用加载函数
    app.loadMore2(that, request, res => {
      let investment_list_new = res.data.data.investment_list.list;
      let page_end = res.data.data.investment_list.page_end;
      if (investment_list) {
        investment_list = investment_list.concat(investment_list_new);
        currentPage++;
        that.setData({
          investment_list: investment_list,
          page_end: page_end,
          requestCheck: true
        });
        app.log(that,"investment_list",investment_list);
      }
      if (page_end == true) {
        app.errorHide(that, '没有更多了', 3000);
      }
    });
  },

  //跳转机构详情
  institutionalDetails: function (e) {
    let id = e.currentTarget.dataset.id;

  },

  // --------------------------筛选搜索--------------------------------------------------

  // 下拉框
  move(e) {
    let that = this;
    let SearchInit = this.data.SearchInit;
    FilterModel.move(e, that);
  },
  // 标签选择
  tagsCheck(e) {
    FilterModel.tagsCheck(e, this);
  },
  // 筛选重置
  reset() {
    FilterModel.reset(this);
  },
  // 筛选全部重置
  allReset() {
    FilterModel.allReset(this);
  },
  // 筛选确定
  searchCertain() {
    let that = this;
    let current = this.data.currentTab;
    let SearchInit = this.data.SearchInit;
    let searchData = FilterModel.searchCertain(that);
    SearchInit.searchData = searchData;
    this.setData({
      searchInit: SearchInit
    });
    this.applyList();
  },
  // 点击modal层
  modal() {
    let that = this;
    FilterModel.modal(that);
  },
  // 搜索
  searchSth() {
    let that = this;
    let str;
    str = this.data.currentTab == 0 ? "selected" : "newest";
    FilterModel.searchSth(that, str, x => {
      app.href(
        "/pages/organization/org_search/org_search"
      );
    });
  },
  // 展示项删除
  labelDelete(e) {
    FilterModel.labelDelete(e, this);
  },
  // 一级联动选择
  linkFirstStair(e){
    let that=this;
    app.log(that,"industry",this.data.label_industry);
    FilterModel.linkFirstStair(e,this);
  },
  // 二级联动选择
  linkSecondStair(e){
    FilterModel.linkSecondStair(e,this);
  },
  // 联动选择全部
  linkCheckAll(e) {
    FilterModel.linkCheckAll(e, this);
  },


  // -----------------------------------------------------------------------------------------
  //跳转帮助
  guideHelp() {
    app.href('/pages/organization/subPage/guide_help/guide_help');
  },
  //机构详情跳转
  institutionalDetails(e) {
    let id = e.currentTarget.dataset.id;
    app.href('/pages/organization/org_detail/org_detail?investment_id=' + id);
  },

  onShareAppMessage: function () {
    return ShareModel.projectListShare();
  },
  applyList() {
    let that = this;
    wx.request({
      url: url_common + '/api/investment/list',
      method: "POST",
      data: {
        filter: this.data.SearchInit.searchData
      },
      success: function (res) {
        wx.hideLoading();
        let investormentList = res.data.data;
        let investment_list = investormentList.investment_list.list;
        that.setData({
          investormentList: investormentList,
          investment_list: investment_list
        });
        wx.hideLoading();
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