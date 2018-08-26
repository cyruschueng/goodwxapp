import _ from '../../../utils/underscore';
// import dg from '../../utils/dg';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import plugUtil from '../../../utils/plugUtil';
import listener from '../../../utils/listener';
import * as client from '../../../utils/client';
import baseList from '../base-list';
import urls from '../urls';

const app = getApp();


Page(_.extend({}, baseList, {

    /**
     * 广告位变换配置
     */
    ad: {
        timerId: 0
    },

	/**
	 * tab 距离顶部像素
	 */
    tabOffsetTop: null,

    /**
     * 是否是导航栏点击
     */
    isTabbarTapRefresh: false,

    /** 
     * 数据源
     */
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        isLoading: true,//是否正在加载中
        page: 1,//当前请求的页数
        searchShow: false,//搜索栏显示隐藏
        param: {
            keyword: '',
            type: 0
        },
        styles: {},//样式表
        canIUse: {
            pageScrollTo: wx.canIUse('pageScrollTo')
        }
    },


    /**
     * 页面初始化
     */
    onLoad: function (options) {
        //添加监听消息
        client.Client.addRoute(msg => { return 'DuoguanInfo.push' == msg.getType() }, msg => {
            const data = msg.getData();
            if ('refresh' == data.action) { //刷新页面
                wx.showModal({
                    content: data.nickname + '发布了新的内容，刷新看看~',
                    showCancel: true,
                    success: (res) => {
                        if (res.cancel) return;
                        this.startPullDownRefresh();
                    }
                });
            }
        });

        this.registerListeners();

        const sysInfo = wx.getSystemInfoSync();
        this.setData({
            sysInfo: sysInfo,
            imgHeight: sysInfo.screenWidth / 5
        });

        //加载数据
        this.loadStorageData();
        this.onPullDownRefresh(1);
        this.loadShareData();
    },

    /**
     * 页面卸载
     */
    onUnload: function () {
        clearInterval(this.ad.timerId);

        //移除注册的事件
        this.unRegisterListeners();
    },

    /**
     * 启动广告位
     */
    startAd: function (config) {
        clearInterval(this.ad.timerId);
        if (!config.imgs || !config.imgs.length) return;

        let index = 0, adInterval = config.ad_interval === undefined ? 3000 : config.ad_interval * 1000;
        var handler = () => {
            this.setData({ ad_img: config.imgs[index], ad_index: index });
            index = index >= config.imgs.length - 1 ? 0 : index + 1;
        };
        this.ad.timerId = setInterval(handler, adInterval);
        //立即执行
        handler();
    },

    /**
     * 公告被单击
     */
    onNoticeTap: function (e) {
        const dataset = e.currentTarget.dataset, docId = dataset.docId;
        if (!docId) return;

        wx.navigateTo({ url: '../detail/detail?id=' + docId, });
    },

    /**
     * 获取配置信息
     */
    onPullDownRefresh: function () {
        //加载配置信息
        requestUtil.get(urls.config.load, { name: 'config,categorys' }, (data) => {
            const { config, categorys } = data;
            config.view_count = config.view_count >= 10000 ? (Math.floor(config.view_count / 100) / 100) + " 万" : config.view_count;
            config.info_count = config.info_count >= 10000 ? (Math.floor(config.info_count / 100) / 100) + " 万" : config.info_count;
            config.share_count = config.share_count >= 10000 ? (Math.floor(config.share_count / 100) / 100) + " 万" : config.share_count;

            //数据进行分组，四个为1组
            const group = [], styles = {};
            var i = -1;
            for (var x in categorys) {
                if (x % 10 === 0) group[++i] = [];

                const item = categorys[x];
                group[i].push(item);

                try {
                    styles[item.id] = JSON.parse(item.style ? item.style : "{}");
                } catch (e) {
                    console.error(e);
                }
            }

            wx.setStorage({ key: 'servers_config', data: config });
            wx.setStorage({ key: 'servers_categorys', data: group, });
            wx.setStorage({ key: 'servers_styles', data: styles, });
            this.setData({ config: config, categorys: group, styles: styles });

            //启动广告位
            this.startAd(config);

        }, this, {
                isShowLoading: false,
                completeAfter: () => {
                    //wxml 节点查询工具
                    if (wx.createSelectorQuery) {
                        setTimeout(this.updateTabOffsetTop, 500);
                    }
                }
            });

        //获取发布信息列表
        requestUtil.get(urls.document.lists, _.extend({}, this.data.param), (data) => {
            this.onDataHandler(data);
            this.onSetData(data, 1);
            wx.setStorage({ key: 'servers_data', data: data, });
        }, this, {
                completeAfter: () => {
                    wx.stopPullDownRefresh();

                    //加载插件
                    if (!this.isTabbarTapRefresh) plugUtil.popup(this,'DuoguanInfo');
                    this.isTabbarTapRefresh = false;
                }
            });
    },

    /**
     * 加载更多数据
     */
    onReachBottom: function () {
        if (!this.data.hasMore) {
            console.log("没有更多了...");
            wx.stopPullDownRefresh();
            return;
        }

        //加载新数据
        this.setData({ isLoading: true });
        requestUtil.get(urls.document.lists, _.extend({ _p: this.data.page + 1 }, this.data.param), (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: false });
    },

	/**
	 * 更新tab距离顶部距离
	 */
    updateTabOffsetTop: function () {
        const selectorQuery = wx.createSelectorQuery();
        selectorQuery.select('#tab').boundingClientRect();
        selectorQuery.selectViewport().scrollOffset();
        selectorQuery.exec((res) => {
            if (!res[0] || !res[1]) return;
            if (res[1].scrollTop > 0) {
                if (res[0].top > 0) {
                    this.tabOffsetTop = res[1].scrollTop + res[0].top;
                } else {
                    this.tabOffsetTop = (res[1].scrollTop - Math.abs(res[0].bottom)) + res[0].height * 2;
                }
            } else {
                this.tabOffsetTop = res[0].top;
            }
        });
    },

    /**
     * 数据处理
     */
    onDataHandler: function (data) {
        _(data).map((item) => {
            item.good = util.formatSmartNumber(item.good);
            item.click = util.formatSmartNumber(item.click);
            item.comment = util.formatSmartNumber(item.comment);
            item.share = util.formatSmartNumber(item.share);
            item.create_time = util.formatSmartTime(item.create_time * 1000, "yyyy-MM-dd hh:mm");
            return item;
        });
    },

    /**
     * 广告被点击
     */
    onAdTap: function (e) {
        requestUtil.pushFormId(e.detail.formId);
        const id = this.data.config.ad_ids[this.data.ad_index];
        if (id <= 0) return;
        wx.navigateTo({ url: '../detail/detail?id=' + id });
    },

    /**
     * 加载本地缓存数据
     */
    loadStorageData: function () {
        this.setData({
            // config: wx.getStorageSync('servers_config'),
            data: wx.getStorageSync('servers_data'),
            categorys: wx.getStorageSync('servers_categorys'),
            styles: wx.getStorageSync('servers_styles'),
        });
    },

    /**
     * 显示搜索框
     */
    onShowSearchTap: function () {
        this.setData({ searchShow: true, });
    },

    /**
     * 隐藏搜索框
     */
    onHideSearchBlur: function (e) {
        if (!e.detail.value)
            this.setData({ searchShow: false, });
    },

    /**
     * 搜索操作
     */
    onSearchSubmit: function (e) {
        this.data.param.keyword = e.detail.value.keyword;
        console.log(this.data.param);
        this.onPullDownRefresh();
    },

    /**
     * 清除关键字
     */
    onClearKeywordTap: function () {
        this.data.param.keyword = '';
        this.setData({ param: this.data.param });
    },

    /**
     * 选择选项卡
     */
    onSwtchTabTap: function (e) {
        const dataset = e.detail.target.dataset, index = dataset.index, param = this.data.param;
        requestUtil.pushFormId(e.detail.formId);
        if (index == param.type) return;

        this.isTabbarTapRefresh = true;
        if (index == 1) {
            //按距离排序,获取位置信息
            wx.showToast({ title: '正在获取你的位置,请稍后..', icon: 'loading', duration: 10000, mask: false });
            wx.getLocation({
                success: (res) => {
                    param.type = index;
                    param.lat = res.latitude;
                    param.lng = res.longitude;
                    this.setData({ param: param });
                    this.startPullDownRefresh();
                }, fail: () => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '温馨提示',
                        content: '获取位置信息失败，请检查网络是否良好，以及是否禁用位置',
                        showCancel: false
                    });
                }
            });
        } else {
            //按最新排序
            param.type = index;
            this.setData({ param: param });
            this.startPullDownRefresh();
        }
    },

	/**
	 * 页面滚动
	 */
    onPageScroll: function (e) {
        if (this.tabOffsetTop !== null) {
            const isTabFixed = this.data.isTabFixed,
                tmpIsTabFixed = e.scrollTop >= this.tabOffsetTop;
            if (isTabFixed != tmpIsTabFixed) this.setData({ isTabFixed: tmpIsTabFixed });
        }
    },

    /**
     * 返回顶部
     */
    onScrollTopTap: function () {
        wx.pageScrollTo({ scrollTop: 0, });
    }

}));