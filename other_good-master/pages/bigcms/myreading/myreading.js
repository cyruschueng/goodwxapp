// pages/my/myreading/myreading.js
const requestUtil = require('../../../utils/requestUtil');
const _DuoguanData = require('../../../utils/data');

Page({
  data:{
    isEmpty: false,//数据是否为空
    hasMore: true,//是否还有更多数据
    page: 1,//当前请求的页数
    c_data: [],//内容数据
    this_page_size: 1,
    this_page_num: 5,
    is_load_more: true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({ is_load_more: true, this_page_size: 1, data: [] });
    this.onReachBottom(1);//加载数据
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    var this_data = that.data.c_data;

    var requestData = {};
    requestData.cateid = that.data.tabIndex;
    requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/getIndexDataList.html", requestData, (data) => {
      if (data == null || data == '') {
        that.setData({ is_load_more: false });
      } else {
        that.setData({ c_data: data });
      }
    }, this, { completeAfter: wx.stopPullDownRefresh });
  },
  //滚动触底加载
  onReachBottom: function () {
    var that = this;
    var this_data = that.data.c_data;
    var is_more = that.data.hasMore;

    var requestData = {};
    requestData.pagesize = that.data.page;
    requestData.pagenum = that.data.this_page_num;
    if (is_more==true){
      requestUtil.get(_DuoguanData.duoguan_host_api_url + "/index.php?s=/addon/DuoguanBigCms/Api/myArticleList.html", requestData, (data) => {
        if (data == null || data == '') {
          that.setData({ is_load_more: false, hasMore: false });
        } else {
          this_data = this_data.concat(data);
          that.setData({ c_data: this_data, page: ++that.data.page });
        }
      }, this, {});
    }
  },
  onNavigateTap: function (e) {
    //跳转页面
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
})