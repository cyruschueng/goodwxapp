// pages/integral/integral-info/index.js
import Page2 from '../page2.js';
import { duoguan_host_api_url as API_URL } from "../../../utils/data";
import requestUtil from '../../../utils/requestUtil';
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
const WxParse = require('../../../wxParse/wxParse.js');
Page2({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    isEmpty: false,//数据是否为空
    hasMore: true,//是否还有更多数据
    isLoading: false,//是否正在加载中
    page: 1,//当前请求的页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.startPullDownRefresh();
  },

  onShow: function () {
    // 页面显示
    this.onPullDownRefresh(1);//加载数据
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (isShowLoading) {
    var that = this;
    isShowLoading = isShowLoading || false;
    requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanIntegral/Api/getIntegralRule.html", {}, (data) => {
      console.log(data);
      this.onSetData(data, 1);
      this.setData(data);
      WxParse.wxParse('content', 'html', data.integral_rule, that);
    }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading : isShowLoading });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    if (!this.data.hasMore) {
      console.log("没有更多了...");
      wx.stopPullDownRefresh();
      return;
    }
    requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanIntegral/Api/getIntegralRule.html", { _p: this.data.page + 1 }, (data) => {
      this.onSetData(data, this.data.page + 1);
      this.setData(data);
      WxParse.wxParse('content', 'html', data.integral_rule, that);
    }, this, { completeAfter: wx.stopPullDownRefresh });
  }

})