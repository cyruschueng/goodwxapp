// pages/goods/bind.js
const app = getApp()
var config = require('../../../config.js')
var util = require('../../../utils/util.js')
import req from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '货物绑定' })
    this.loadData()
  },

  loadData: function () {
    let that = this;
    req.get(config.api.getGoodsList).then(res => res.data).then(result => {
      if (result.success) {
        that.setData({ goodsList: result.data })
      } else {
        wx.showToast({ icon: 'none', title: '获取商品列表失败' });
      }
    });
    req.get(config.api.getManufacturerList).then(res => res.data).then(result => {
      if (result.success) {
        that.setData({ manufacturerList: result.data })
      } else {
        wx.showToast({ icon: 'none', title: '获取厂商列表失败' });
      }
    });
  },

  bindAgentChange: function (e) {
    let that = this;
    that.setData({
      agentIndex: e.detail.value,
      agentId: that.data.agentList[e.detail.value].id
    })
  },

  bindGoodsChange: function (e) {
    let that = this;
    that.setData({
      goodsIndex: e.detail.value,
      bindCommodityId: that.data.goodsList[e.detail.value].id
    })
  },

  bindManufacturerChange: function (e) {
    let that = this;
    that.setData({
      manufacturerIndex: e.detail.value
    })
    req.get(config.api.getGoodsFilterList).then(res => res.data).then(result => {
      if (result.success) {
        that.setData({ goodsList: result.data });
      } else {
        wx.showToast({ icon: 'none', title: '获取商品列表失败' });
      }
    });
  },

  searchAgent: function () {
    wx.navigateTo({
      url: './agent/index'
    })
  },

  doScan: function () {
    let that = this;
    wx.scanCode({
      success: (res) => {
        let url = res.result.split('?')[0] + '?action=bind';
        let param = {
          commodityId: util.getUrlParam(res.result, 'commodityId'),
          serialNo: util.getUrlParam(res.result, 'serialNo'),
          bindCommodityId: that.data.bindCommodityId,
          agentId: that.data.agent.id
        };
        req.post(url, param).then(res => res.data).then(result => {
          if (result.success) {
            wx.showToast({ title: '绑定成功' });
          } else {
            wx.navigateTo({ url: '../message/fail?msg=货物绑定失败' });
          }
        });
      }
    })
  }
})