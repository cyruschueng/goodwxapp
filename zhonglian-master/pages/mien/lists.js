const app = getApp();
import _ from '../../utils/underscore';
import util from '../../utils/util';
import listener from '../../utils/listener';
import { urls } from '../../utils/data';
import requestUtil from '../../utils/requestUtil';
import WxParse from '../../wxParse/wxParse';

Page({
    param: {},//请求参数
    /**
     * 页面的初始数据
     */
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        page: 1,//当前请求的页数
        isload: true,//是否第一次加载
        isShowLoading: false,//是否显示下方loading
        tabIndex: 0,//选项卡索引
        hostUrl: urls.hostUrl,//服务器主机地址
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.param.cid = options.cid || 0;
        this.param.name = options.name || '';
        this.title = decodeURIComponent(options.title);
        wx.setNavigationBarTitle({ title: this.title });

        //加载数据
        this.onPullDownRefresh(1);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function (isShowLoading) {
        requestUtil.get(urls.article.lists, this.param, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, 1);
        }, { completeAfter: wx.stopPullDownRefresh, isShowLoading: isShowLoading });
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

        requestUtil.get(urls.article.lists, _.extend(this.param, { p: this.data.page + 1 }), (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        });
    },

    /**
     * 数据处理
     */
    onDataHandler: function (data) {
        _(data).map((item) => {
            item.create_time = util.formatSmartTime(item.create_time * 1000);
            return item;
        });
    },

    /**
     * 设置数据
     */
    onSetData: function (data, page) {
        data = data || [];
        this.setData({
            page: page !== undefined ? page : this.data.page,
            data: page === 1 || page === undefined ? data : this.data.data.concat(data),
            hasMore: page !== undefined && data.length >= 20,
            isEmpty: page === 1 || page === undefined ? data.length === 0 : false,
            isload: false, isShowLoading: page === 1 ? this.data.isShowLoading : false
        });
    },

    /**
     * 跳转页面
     */
    onNavigateTap: function (e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
})