// pages/integral-detail/index.js
import Page2 from '../page2.js';
import { duoguan_host_api_url as API_URL } from "../../../utils/data";
import requestUtil from '../../../utils/requestUtil';
import _ from '../../../utils/underscore';
import util from '../../../utils/util';

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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
    onPullDownRefresh: function () {
        requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanIntegral/Api/getScoreLog.html", {}, (data) => {
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

        requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanIntegral/Api/getScoreLog.html", { _p: this.data.page + 1 }, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        }, this, { completeAfter: wx.stopPullDownRefresh });
    },

	/**
	* 数据处理
	*/
    onDataHandler: function (data) {
        _(data).map((item) => {
            item.cTime = util.format(item.cTime * 1000, "yyyy-MM-dd");
            return item;
        });
    },
})