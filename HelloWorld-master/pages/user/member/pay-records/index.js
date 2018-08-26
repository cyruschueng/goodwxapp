// pages/user/member/pay-records/index.js
import {
    duoguan_host_api_url as API_URL,
} from '../../../../utils/data.js';
import _ from '../../../../utils/underscore';
import requestUtil from '../../../../utils/requestUtil';
import util from '../../../../utils/util';
import listener from '../../../../utils/listener';

const url = API_URL + '/index.php?s=/addon/DuoguanUser/CardApi/getTradeRecordList.html';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        isLoading: true,//是否正在加载中
        page: 1,//当前请求的页数
        data: [],
        card: null,
        type: 1
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
        requestUtil.get(url, { type: this.data.type }, (data,res) => {
            this.onDataHandler(data);
            this.onSetData(data, 1);
            this.setData({ card: res.card});
        }, this, { completeAfter: wx.stopPullDownRefresh });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if (!this.data.hasMore) {
            console.log("没有更多了...");
            return;
        }

        //加载新数据
        this.setData({ isLoading: true });
        requestUtil.get(url, { _p: this.data.page + 1, type: this.data.type }, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        }, this, { isShowLoading: false });
    },

    /**
     * 数据处理
     */
    onDataHandler: function (data) {
        _(data).map((item) => {
            item.create_time = util.formatSmartTime(item.cTime * 1000, "yyyy-MM-dd hh:mm");
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
    * 选择选项卡
    */
    onSwtchTabTap: function (e) {
        const dataset = e.target.dataset, index = dataset.index, type = this.data.type;
        requestUtil.pushFormId(e.detail.formId);
        if (index == type) return;

        this.setData({ type: index });
        this.onPullDownRefresh();
    },

});