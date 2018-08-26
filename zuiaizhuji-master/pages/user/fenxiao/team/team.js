const app = getApp();
const requestUtil = require('../../../../utils/requestUtil');
const _DuoguanData = require('../../../../utils/data');
Page({
  data: {
    data_list: [],
    
  },
  onLoad: function (options) {
    var that = this
    that.getDataList()
  },
  onPullDownRefresh: function () {
    var that = this
    that.getDataList()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  //获取数据
  getDataList: function () {
    var that = this
    requestUtil.get(_DuoguanData.duoguan_host_api_url + '/index.php?s=/addon/DuoguanShop/FenxiaoApi/teamtj', {}, (info) => {
      console.log(info)
      that.setData({data_list:info})
    }, this, { isShowLoading: true });
  }
})