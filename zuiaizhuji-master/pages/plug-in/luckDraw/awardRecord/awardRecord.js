// pages/errand/awardRecord/awardRecord.js
import requestUtil from '../../../../utils/requestUtil';
import _ from '../../../../utils/underscore';
import util from '../../../../utils/util';
import { duoguan_host_api_url as API_HOST } from '../../../../utils/data';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        isLoading: true,//是否正在加载中
        page: 1,//当前请求的页数
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onPullDownRefresh();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        const url = API_HOST + '/index.php/addon/MarketingLuckDraw/Api/getLuckDrawLog';
        requestUtil.get(url, { type: 1, }, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, 1);
        }, this, { completeAfter: wx.stopPullDownRefresh });
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
        this.setData({ isLoading: true });
        const url = API_HOST + '/index.php/addon/MarketingLuckDraw/Api/getLuckDrawLog';
        requestUtil.get(url, { type: 1, _p: this.data.page + 1 }, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: false });
    },

    /**
      * 数据处理
      */
    onDataHandler: function (data) {
        _(data).map((item) => {
            item.add_time = util.format(item.add_time * 1000, 'yyyy-MM-dd hh:mm');
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
            isLoading: false,
        });
    },

    /**
     * 复制数据
     */
    onCopyTap: function (e) {
        const dataset = e.currentTarget.dataset, data = dataset.data;
        wx.setClipboardData({
            data: data,
            success: (res) => {
                wx.showToast({ title: '已复制兑换码', });
            },
        });
    },
});