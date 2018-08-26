const app = getApp()
var config = require('../../../../config.js')
var util = require('../../../../utils/util.js')
import req from '../../../../utils/request'

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    agentList: []
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '搜索代理人' })
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    let that = this;
    that.setData({
      inputVal: e.detail.value
    });
    let param = {
      condition: that.data.inputVal
    };
    req.get(config.api.getAgentFilterList, param).then(res => res.data).then(result => {
      if (result.success) {
        that.setData({ agentList: result.data })
      } else {
        wx.showToast({ icon: 'none', title: '获取代理商列表失败' });
      }
    });
  },

  //选择代理人
  chooseAgent: function (e) {
    var $data = e.currentTarget.dataset;
    var pages = getCurrentPages();
    pages[pages.length - 2].setData({ agent: $data.item });
    wx.navigateBack()
  }
});
