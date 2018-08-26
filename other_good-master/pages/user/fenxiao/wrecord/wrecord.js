const app = getApp();
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
Page({
  data: {
    pagesize: 1,
    pagenum: 10,
    data_list: [],
    is_loadmore: true

  },
  onLoad: function (options) {
    var that = this
    that.setData({ pagesize: 1 })
    that.getDataList()
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({ pagesize: 1 })
    that.getDataList()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  //获取数据
  getDataList: function () {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/FenxiaoApi/getcashrecord', { pagesize: that.data.pagesize, pagenum: that.data.pagenum }, (info) => {
      console.log(info)
      if (info == null) {
        that.setData({ is_loadmore: false });
      } else {
        if (info.length < 10) {
          that.setData({ is_loadmore: false });
        }
      }
      if (that.data.pagesize == 1) {
        that.setData({ data_list: info })
      } else {
        that.setData({ data_list: that.data.data_list.concat(info) })
      }
    }, this, { isShowLoading: true });
  },
  onReachBottom: function () {
    console.log('触底加载')
    var that = this;
    wx.showNavigationBarLoading();
    if (that.data.is_loadmore == false) {
      wx.hideNavigationBarLoading();
      return false;
    }
    that.setData({ pagesize: that.data.pagesize + 1 })
    that.getDataList();
  },
})