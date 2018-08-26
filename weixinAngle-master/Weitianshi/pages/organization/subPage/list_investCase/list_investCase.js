let app = getApp();
let url = app.globalData.url;
let url_common = app.globalData.url_common;
import * as ShareModel from '../../../../utils/model/shareModel';
import * as httpModel from '../../../../utils/model/httpModel';
import * as FilterModel from '../../../../utils/model/filterModel';
Page({
  data: {
    SearchInit: FilterModel.data,
    label_industry: FilterModel._label_industry,
    linkDataShow: FilterModel._linkDataShow,
    nonet: true
  },
  onLoad: function (options) {
    let that = this;
    this.setData({
      investment_id: options.investment_id,
    });
    app.log(that,"investment_id",this.data.investment_id);
    //更改搜索模块初始化设置
    FilterModel.reInitSearch(that, {
      tab: [
        { type: 2, name: '领域', label: 'label_industry', itemId: 'industry_id', itemName: 'industry_name', longCheckBox: false, page: '0' },
        { type: 1, name: '地区', label: "hotCity", itemId: 'area_id', itemName: 'area_title', longCheckBox: false },
        { type: 1, name: '风格', label: "label_style", itemId: 'style_id', itemName: 'style_name', longCheckBox: false },
        { type: 1, name: '类型', label: "label_type", itemId: 'type_id', itemName: 'type_name', longCheckBox: true },
      ],
    })
    let SearchInit = that.data.SearchInit;
    let tab = SearchInit.tab;
    if (SearchInit.industry.length < 1) {
      tab.forEach(x => {
        SearchInit[x.label] = wx.getStorageSync(x.label)
      })
      that.setData({
        SearchInit: SearchInit
      })
    }
    this.setData({
      label_industry: wx.getStorageSync('label_industry')
    });
    app.netWorkChange(that)
  },
  onShow: function () {
    let that = this;
    that.setData({
      requestCheck: true,
      currentPage: 0,
      page_end: false,
      project_list: []
    })
    // app.initPage(that);
    this.investList();

  },

  //加载更多
  loadMore() {
    let that = this;
    let currentPage = this.data.currentPage;
    let project_list = this.data.project_list;
    let request = {
      url: url_common + '/api/investment/events',
      data: {
        page: this.data.currentPage,
        investment_id: this.data.investment_id,
        filter: this.data.SearchInit.searchData
      },
    }
    app.loadMore2(that, request, res => {
      console.log("投资案例", res)
      let newPage = res.data.data;
      let list = res.data.data.project_list;
      let page_end = res.data.data.page_end;
      if (list) {
        currentPage++;
        let newProject = project_list.concat(list)
        that.setData({
          newPage: newPage,
          project_list: newProject,
          page_end: page_end,
          requestCheck: true,
          currentPage: currentPage
        })
      }
      if (page_end == true) {
        app.errorHide(that, '没有更多了', 3000)
      }
    })
  },


  // --------------------------筛选搜索--------------------------------------------------

  // 下拉框
  move(e) {
    let that = this;
    let SearchInit = this.data.SearchInit;
    FilterModel.move(e, that)
  },
  // 标签选择
  tagsCheck(e) {
    FilterModel.tagsCheck(e, this)
  },
  // 展示项删除
  labelDelete(e) {
    FilterModel.labelDelete(e, this)
  },
  // 筛选重置
  reset() {
    FilterModel.reset(this)
  },
  // 筛选全部重置
  allReset() {
    FilterModel.allReset(this)
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
    })
    that.setData({
      currentPage: 0,
    })
    this.investList('search');
  },
  // 点击modal层
  modal() {
    let that = this;
    FilterModel.modal(that)
  },
  // 搜索
  searchSth() {
    let that = this;
    let str;
    str = this.data.currentTab == 0 ? "selected" : "newest"
    FilterModel.searchSth(that, str)
  },
  // 投资案例列表
  investList(search) {
    let that = this;
    wx.showLoading({
      title: 'loading',
      mask: true,
    })
    wx.request({
      url: url_common + '/api/investment/events',
      method: "POST",
      data: {
        filter: this.data.SearchInit.searchData,
        investment_id: this.data.investment_id,
      },
      success: function (res) {
        wx.hideLoading()
        let newPage = res.data.data;
        let list = res.data.data.project_list;
        let page_end = res.data.data.page_end;
        that.setData({
          newPage: newPage,
          project_list: list,
          page_end: page_end,
        })
        wx.hideLoading()
        if (page_end == true && !search) {
          app.errorHide(that, '没有更多了', 3000)
        }
      }
    })
  },

  // 一级联动选择
  linkFirstStair(e) {
    FilterModel.linkFirstStair(e, this)
  },
  // 二级联动选择
  linkSecondStair(e) {
    FilterModel.linkSecondStair(e, this)
  },
  // 联动选择全部
  linkCheckAll(e) {
    FilterModel.linkCheckAll(e, this);
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
    }, 1500)
  }
})