const app = getApp();

import _ from '../../../utils/underscore';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import baseList from '../base-list';
import urls from '../urls';

Page(_.extend({}, baseList, {

    /**
     * 页面的初始数据
     */
	data: {
		isEmpty: false,//数据是否为空
		hasMore: true,//是否还有更多数据
		isLoading: true,//是否正在加载中
		page: 1,//当前请求的页数
		isCurrentUser: true,
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		this.registerListeners();

		//加载数据
		this.onPullDownRefresh();
		let config = wx.getStorageSync('servers_config');
		this.setData({ config: config });
	},

    /**
     * 生命周期函数--监听页面卸载
     */
	onUnload() {
		//移除注册的事件
		this.unRegisterListeners();
	},

    /**
     * 页面下拉刷新
     */
	onPullDownRefresh: function () {
		//加载配置信息
		requestUtil.get(urls.config.load, { name: 'config,show_mcard' }, (data) => {
			wx.setStorage({ key: 'servers_config', data: data.config });
			this.setData(data);
		}, this, { isShowLoading: false });

		requestUtil.get(urls.document.myLists, {}, (data, orgData) => {
			this.onDataHandler(data);
			this.setData({ uid: orgData.uid });
			this.onSetData(data, 1);
		}, this, { completeAfter: wx.stopPullDownRefresh });

		// util.goCoupon(this);
	},

    /**
     * 页面上拉加载
     */
	onReachBottom: function () {
		if (!this.data.hasMore) {
			console.log("没有更多了...");
			wx.stopPullDownRefresh();
			return;
		}

		//加载新数据
		this.setData({ isLoading: true });
		requestUtil.get(urls.document.myLists, { _p: this.data.page + 1 }, (data) => {
			this.onDataHandler(data);
			this.onSetData(data, this.data.page + 1);
		}, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: false });
	},

    /**
     * 数据处理
     */
	onDataHandler: function (data) {
		_(data).map((item) => {
			item.create_time = util.formatSmartTime(item.create_time * 1000, "yyyy-MM-dd hh:mm");
			return item;
		});
	},

    /**
     * 显示评论框
     */
	onShowCommentTap: function (e) { },

    /**
     * 去支付
     */
	onPayTap: function (e) {
		if (requestUtil.isLoading(this.payRQId)) return;

		const dataset = e.currentTarget.dataset, docId = dataset.docId;
		const item = _.find(this.data.data, { id: docId });
		if (this.data.show_mcard && item.wallet_id == 0) {
			wx.showActionSheet({
				itemList: ['余额', '微信支付'],
				success: (res) => {
					if (res.tapIndex == 0) {
						//余额支付
						this.onPayment(docId);
					} else if (res.tapIndex == 1) {
						//微信支付
						this.onWXPayment(docId);
					}
				}
			});
		} else {
			//微信支付
			this.onWXPayment(docId);
		}
	},

    /**
     * 余额付款
     */
	onPayment: function (docId) {
		this.payRQId = requestUtil.get(urls.document.payAmount, { id: docId }, (info) => {
			util.payment({
				id: docId,
				total_amount: parseFloat(info),
				notify_url: urls.document.imprestPay,
			}, (res) => {
				if (res.code == 1) {
					const data = this.data.data;
					const index = _.findIndex(data, { id: docId });
					if (index == -1) return;

					data[index].is_pay = 2;
					data[index].status = 1;
					listener.fireEventListener('severs.info.update', [data[index]]);

					this.setData({ data: data });
					wx.showToast({ title: '已审核通过...', icon: 'success' });
				}
			});
		});
	},

    /**
     * 微信付款 
     */
	onWXPayment: function (docId) {
		this.payRQId = requestUtil.get(urls.document.wechatPay, { id: docId }, (info) => {
			const handler = () => {
				const data = this.data.data;
				const index = _.findIndex(data, { id: docId });
				if (index == -1) return;

				data[index].is_pay = 2;
				data[index].status = 1;
				listener.fireEventListener('severs.info.update', [data[index]]);

				this.setData({ data: data });
				wx.showToast({ title: '已审核通过...', icon: 'success' });
			};

			if (info === 1) {
				handler();
			} else {
				wx.requestPayment(_.extend(info, {
					success: handler
				}));
			}
		});
	},

    /**
     * 删除信息
     */
	onDelTap: function (e) {
		if (requestUtil.isLoading(this.delRQId)) return;

		const dataset = e.currentTarget.dataset, id = dataset.id, index = dataset.index;

		wx.showModal({
			title: '温馨提示',
			content: '删除之后将无法恢复，你确定要删除吗？',
			showCancel: true,
			cancelText: '不了',
			confirmText: '就是要删',
			success: (res) => {
				if (res.cancel) return;

				this.delRQId = requestUtil.get(urls.document.del, { id: id }, () => {
					const data = this.data.data;
					data.splice(index, 1);
					this.setData({ data });
				});

			}
		})

	}

}));