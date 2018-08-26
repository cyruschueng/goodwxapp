// pages/user/info/score_check.js
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
		isEmpty: false,//数据是否为空
		hasMore: true,//是否还有更多数据
		page: 1,//当前请求的页数
		isload: true,//是否第一次加载
		hostUrl: urls.baseHostUrl,//服务器主机地址
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
		requestUtil.get(urls.ranking.check_lists, this.data.param, (data, res) => {
			this.onDataHandler(data);
			this.onSetData(data, 1);
			this.setData({ quota: res.quota, fenzhi: res.fenzhi });
		}, {
				completeAfter: wx.stopPullDownRefresh,
				failAfter: (code) => {
					if (code === -2) {
						wx.navigateBack();
					}
				}
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

		requestUtil.get(urls.ranking.check_lists, _.extend({ p: this.data.page + 1 }, this.data.param), (data, res) => {
			this.onDataHandler(data);
			this.onSetData(data, this.data.page + 1);
			this.setData({ quota: res.quota, fenzhi: res.fenzhi });
		}, { completeAfter: wx.stopPullDownRefresh, isShowLoading: false });
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
     *图片预览
     */
	onPreviewTap: function (e) {
		const dataset = e.currentTarget.dataset, imgs = dataset.imgs, index = e.target.dataset.index;
		if (!index) return;
		wx.previewImage({
			current: urls.baseHostUrl + imgs[index], // 当前显示图片的http链接
			urls: imgs.map(item => {
				return urls.baseHostUrl + item;
			})
		});
	},

    /**
     * 审核通过
     */
	onCheckedTap: function (e) {
		const dataset = e.currentTarget.dataset, index = dataset.index, type = dataset.type;
		if (this.data.quota <= this.data.fenzhi) {
			wx.showModal({
				title: '温馨提示',
				content: '积分额度已使用完毕！',
				showCancel: false,
			})
			return;
		}
		wx.showModal({
			title: '温馨提示',
			content: '执行此操作后将不能撤回，你确定要执行此操作吗？',
			showCancel: true,
			cancelText: '不用了',
			cancelColor: '#45e082',
			confirmText: '是的',
			confirmColor: '#f25e5e',
			success: (res) => {
				if (res.cancel) return;
				this.checked(type, index);
			},
		});
	},

    /**
     * 审核操作
     */
	checked: function (status, index) {
		const data = this.data.data, item = data[index];
		requestUtil.get(urls.ranking.check, { id: item.id, status: status }, (info) => {
			item.status = status;
			this.setData({ data });
		});
	}
})