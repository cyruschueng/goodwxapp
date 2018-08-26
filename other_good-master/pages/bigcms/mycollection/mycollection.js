// pages/my/mycollection/mycollection.js
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');

Page({
  data: {
    isEmpty: false,//数据是否为空
    page: 1,//当前请求的页数
    c_data: [],//内容数据
    this_page_size: 1,
    this_page_num: 10,
    is_load_more: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({ is_load_more: true, this_page_size: 1, c_data: [] });
    this.getMycollection();//加载数据
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  //请求获取我的收藏
  getMycollection: function (isShowLoading){
    var that = this;
    var this_data = that.data.c_data;
    isShowLoading = isShowLoading || false;

    var requestData = {};
    requestData.pagesize = that.data.this_page_size;
    requestData.pagenum = that.data.this_page_num;

    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/myCollectionList.html", requestData, (data) => {
      if (data == null || data == '') {
        that.setData({ is_load_more: false });
      } else {
        if (data.length < that.data.this_page_num) {
          that.setData({ is_load_more: false });
        }
        if (that.data.this_page_size == 1) {
          that.setData({ c_data: data });
        } else {
          this_data = this_data.concat(data);
          that.setData({ c_data: this_data });
        }
      }
    }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: isShowLoading });
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({ this_page_size: 1, is_load_more: true, c_data: []});
    that.getMycollection();//请求我的收藏列表
  },
  //触底加载
  onReachBottom: function () {
    var that = this;
    if (that.data.is_load_more == false) {
      wx.hideNavigationBarLoading();
      return false;
    }else{
      that.setData({ this_page_size: ++that.data.this_page_size });
      that.getMycollection(true);//请求我的收藏列表
    }
  },
  onNavigateTap: function (e) {
    //跳转页面
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  
})