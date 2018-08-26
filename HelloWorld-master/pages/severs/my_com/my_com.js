// pages/severs/my_com.js

import _ from '../../../utils/underscore';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import urls from '../urls';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoaded: false,//是否已加载过
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        page: 1,//当前请求的页数
        data: [],
        tabIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.onPullDownRefresh();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        const url = [urls.comment.myLists, urls.comment.replaysMe][this.data.tabIndex];
        requestUtil.get(url, {}, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, 1);
        }, this, { completeAfter: wx.stopPullDownRefresh });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        if (!this.data.hasMore) {
            console.log("没有更多了...");
            wx.stopPullDownRefresh();
            return;
        }

        //加载新数据
        const url = [urls.comment.myLists, urls.comment.replaysMe][this.data.tabIndex];
        requestUtil.get(url, _.extend({ _p: this.data.page + 1 }), (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: false });

    },

    /**
       * 数据处理
       */
    onDataHandler(data) {
        _(data).map((item) => {
            item.create_time = util.formatSmartTime(item.create_time * 1000, "yyyy-MM-dd hh:mm");
            return item;
        });
    },

    /**
    * 设置数据
    */
    onSetData(data, page) {
        data = data || [];
        this.setData({
            page: page !== undefined ? page : this.data.page,
            data: page === 1 || page === undefined ? data : this.data.data.concat(data),
            hasMore: page !== undefined && data.length >= 20,
            isEmpty: page === 1 || page === undefined ? data.length === 0 : false,
            isLoaded: true,
        });
    },

    /**
    * 跳转页面
    */
    onNavigateTap: function (e) {
        const url = e.currentTarget.dataset.url;
        wx.navigateTo({ url: url });
    },

    /**
     * 选项卡切换
     */
    onTabTap(e) {
        const dataset = e.currentTarget.dataset, index = dataset.index;
        if (index == this.data.tabIndex) {
            return;
        }
        this.setData({ tabIndex: index });
        this.onPullDownRefresh();
    }
});