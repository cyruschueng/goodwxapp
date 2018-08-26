const app = getApp();

import _ from '../../../utils/underscore';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import baseList from '../base-list';
import urls from '../urls';

Page(_.extend({}, baseList, {

    /**
     * 广告位变换配置
     */
	ad: {
		timerId: 0
	},

    /**
     * 分类ID
     */
	cid: 0,

    /**
     * 数据源
     */
	data: {
		childCid: 0,//子分类ID
		isEmpty: false,//数据是否为空
		hasMore: true,//是否还有更多数据
		isLoading: true,//是否正在加载中
		page: 1,//当前请求的页数
		tags: [],//筛选列表
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		this.cid = options.cid;
		this.title = options.title;
		this.setData(options);
		wx.setNavigationBarTitle({ title: this.title + " - 信息列表" });

		this.registerListeners();

		//加载数据
		this.onPullDownRefresh(1);
		this.loadShareData();
	},

    /**
     * 页面卸载
     */
	onUnload: function (options) {
		clearInterval(this.ad.timerId);

		//移除注册的事件
		this.unRegisterListeners();
	},

    /**
     * 页面下拉刷新
     */
	onPullDownRefresh: function (options) {
		//加载配置信息
		requestUtil.get(urls.config.load, { name: 'config,category,categorys', cid: this.cid, pid: this.cid }, (data) => {
			const { config, category, categorys } = data;
			wx.setStorage({ key: 'servers_config', data: config });

			if (!this.data.tags.length) {
				this.data.tags = _.map(category.tags, (item) => {
					return { active: false, text: item };
				});
			}
			this.setData({ config: config, category: category, categorys: categorys, tags: this.data.tags });

			//启动广告位
			this.startAd(config);

		}, this, { isShowLoading: false });

		//获取发布信息列表
		const params = { cid: this.cid, childCid: this.data.childCid }, tags = {};
		let tagIndex = 0;
		_.each(this.data.tags, tag => {
			if (tag.active) {
				tags['tags[' + tagIndex + ']'] = tag.text;
				tagIndex++;
			}
		});


		requestUtil.get(urls.document.lists, _.extend(params, tags), (data) => {
			this.onDataHandler(data);
			this.onSetData(data, 1);
		}, this, { completeAfter: wx.stopPullDownRefresh });
	},

    /**
     * 页面上拉加载
     */
	onReachBottom: function (options) {
		if (!this.data.hasMore) {
			console.log("没有更多了...");
			wx.stopPullDownRefresh();
			return;
		}

		//加载新数据
		this.setData({ isLoading: true });
		requestUtil.get(urls.document.lists, { cid: this.cid, _p: this.data.page + 1 }, (data) => {
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
     * 启动广告位
     */
	startAd: function (config) {
		clearInterval(this.ad.timerId);
		if (!config.imgs || !config.imgs.length) return;

		var index = 0;
		var handler = () => {
			this.setData({ ad_img: config.imgs[index], ad_index: index });
			index = index >= config.imgs.length - 1 ? 0 : index + 1;
		};
		this.ad.timerId = setInterval(handler, 3000);
		//立即执行
		handler();
	},

	/**
	 * 加载二级分类数据
	 */
	onLoadChooseCateTap: function (e) {
		const dataset = e.detail.target.dataset, cid = dataset.cid;

		requestUtil.pushFormId(e.detail.formId);
		this.setData({ childCid: cid });
		const sysInfo = wx.getSystemInfoSync();
		if (wx.startPullDownRefresh && sysInfo.platform !== 'ios') wx.startPullDownRefresh();
		else this.onPullDownRefresh();
	},

	/**
	 * 发布分类
	 */
	onWriteChooseCateTap: function (e) {
		const categorys = this.data.categorys, cateTitles = _.map(categorys, item => { return item.title; });
		console.log(requestUtil.pushFormId(e.detail.formId));

		if (categorys.length) {
			wx.showActionSheet({
				itemList: cateTitles,
				success: res => {
					if (res.cancel) return;
					const cate = categorys[res.tapIndex];
					wx.navigateTo({ url: '../write/write?cid=' + cate.id + '&title=' + cate.title });
				}
			});
		} else {
			const cate = this.data.category;
			wx.navigateTo({ url: '../write/write?cid=' + cate.id + '&title=' + cate.title });
		}
	},

	/**
	 * 切换标签
	 */
	onToggleTagTap: function (e) {
		const dataset = e.detail.target.dataset, index = dataset.index, tag = this.data.tags[index];

		requestUtil.pushFormId(e.detail.formId);
		tag.active = !tag.active;
		this.setData({ tags: this.data.tags });
		this.startPullDownRefresh();
	},

	/**
     * 分享页面
     */
	onShareAppMessage: function (options) {
		if (options.from === 'button') {
			return this.onButtonShareAppMessage(options.target);
		} else {
			this.shareInfo = this.shareInfo || {};
			const title = this.shareInfo.title || '';
			const desc = this.shareInfo.desc || '';
			return {
				title: title,
				desc: desc,
				path: 'pages/severs/lists/lists?cid=' + this.cid + '&title=' + this.title
			};
		}
	}

}));