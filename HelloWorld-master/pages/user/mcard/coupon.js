// pages/user/mcard/coupon.js
const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { duoguan_host_api_url as API_URL } from "../../../utils/data";
import requestUtil from '../../../utils/requestUtil';

Page({

    /**
     * 路由器
     */
    route: null,

    /**
     * 页面的初始数据
     */
    data: {
        isLoaded: false,//是否已加载过
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        page: 1,//当前请求的页数
        data: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //加载数据
        this.onPullDownRefresh();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        if (wx.showNavigationBarLoading) wx.showNavigationBarLoading();
        requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/getMyCoupons.html", {}, (data) => {
            this.onSetData(data, 1);
        }, this, {
                completeAfter: () => {
                    wx.stopPullDownRefresh();
                    if (wx.hideNavigationBarLoading) wx.hideNavigationBarLoading();
                }, isShowLoading: false
            });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.hasMore) {
            console.log("没有更多了...");
            wx.stopPullDownRefresh();
            return;
        }

        //加载新数据
        if (wx.showNavigationBarLoading) wx.showNavigationBarLoading();
        requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/getMyCoupons.html", _.extend({ _p: this.data.page + 1 }, this.data.param), (data) => {
            this.onSetData(data, this.data.page + 1);
        }, this, {
                completeAfter: () => {
                    wx.stopPullDownRefresh();
                    if (wx.hideNavigationBarLoading) wx.hideNavigationBarLoading();
                }, isShowLoading: false
            });
    },


    /**
     * 数据处理
     */
    onDataHandler: function (data) {
        _(data).map((item) => {
            item.use_start_date = util.format(item.use_start_time * 1000, "yyyy-MM-dd");
            item.use_end_date = util.format(item.use_end_time * 1000, "yyyy-MM-dd");
            return item;
        });
    },

    /**
     * 设置数据
     */
    onSetData: function (data, page) {
        data = data || [];
        this.onDataHandler(data);
        this.setData({
            page: page !== undefined ? page : this.data.page,
            data: page === 1 || page === undefined ? data : this.data.data.concat(data),
            hasMore: page !== undefined && data.length === 20,
            isEmpty: page === 1 || page === undefined ? data.length === 0 : false,
            isLoaded: true,
        });
    },


    /**
    * 跳转页面
    */
    onNavigateTap: function (e) {
        const dataset = e.currentTarget.dataset, url = dataset.url, type = dataset.type;

        if (!url && type === "coupon") {
            return;
        }

        if (!url) return;
        wx.navigateTo({ url: url })
    },
})