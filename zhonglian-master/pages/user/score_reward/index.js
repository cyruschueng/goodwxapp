// pages/ranking/revise_rank/index.js
const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({

    /**
     * 页面的初始数据
     */
	data: {

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
		requestUtil.get(urls.ranking.departments, {}, (data, res) => {
			this.setData({ data });
			console.log(data);
		}, { completeAfter: wx.stopPullDownRefresh });
	},

    /**
     * 页面上拉触底事件的处理函数
     */
	onReachBottom: function () {

	},

    /**
     * 跳转页面
     */
	onNavigateTap: function (e) {
		wx.navigateTo({
			url: e.currentTarget.dataset.url
		})
	},

})