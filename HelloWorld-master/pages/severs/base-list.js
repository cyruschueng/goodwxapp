import _ from '../../utils/underscore';
import requestUtil from '../../utils/requestUtil';
import util from '../../utils/util';
import listener from '../../utils/listener';
import plugUtil from '../../utils/plugUtil';
import urls from 'urls';

/**
 * 列表基础页
 */
module.exports = {

    /** 
     * 数据源
     */
    data: {

        /** 
         * 评论参数
         */
        comment: {
            placeholder: null,
            param: {},
        }
    },

    /**
     * 监听器列表
     */
    listeners: {

        /**
         * 添加新的信息时
         */
        'severs.info.add': function () {
            this.onPullDownRefresh();
        },

        /** 
         * 当信息数据改变时
         */
        'severs.info.update': function (item) {
            const data = this.data.data, itemTemp = _.find(data, (itemTemp) => { return item.id == itemTemp.id; });
            if (itemTemp === undefined) return;

            _.extend(itemTemp, item);
            this.setData({ data: data });
        },

        /** 
         * 当信息删除时
         */
        'severs.info.delete': function (id) {
            const data = this.data.data, index = _.findIndex(data, (itemTemp) => { return id == itemTemp.id; });
            if (index === undefined) return;

            data.splice(index, 1);
            this.setData({ data: data });
        },

        /** 
         * 当用户被拉黑时
         */
        'severs.info.pullblack': function (uid) {
            const data = this.data.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].uid == uid) {
                    data.splice(i, 1);
                    i--;
                }
            }
            this.setData({ data: data });
        }
    },

    /**
     * 注册相关事件
     */
    registerListeners: function () {
        for (const key in this.listeners) listener.addEventListener(key, this.listeners[key].bind(this));
    },

    /**
     * 卸载相关事件
     */
    unRegisterListeners: function () {
        for (const key in this.listeners) listener.removeEventListener(key, this.listeners[key]);
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
    * 加载分享数据
    */
    loadShareData: function () {
        if (wx.showShareMenu) wx.hideShareMenu();
        requestUtil.get(urls.share, { mmodule: 'duoguan_info' }, (info) => {
            this.shareInfo = info;
            if (wx.showShareMenu) wx.showShareMenu();
        });
    },


    /**
     * 拨打电话
     */
    onCallTap: function (e) {
        const dataset = e.currentTarget.dataset, mobile = dataset.mobile;
        if (!mobile) return;
        const msg = this.data.config.call_before_tips || '你将要拨打电话：' + mobile;

        wx.showModal({
            title: '温馨提示',
            content: msg,
            success: (res) => {
                if (res.cancel) return;
                wx.makePhoneCall({ phoneNumber: mobile, });
            }
        });
    },

    /**
     * 跳转页面
     */
    onNavigateTap: function (e) {
        const dataset = e.detail.target ? e.detail.target.dataset : e.currentTarget.dataset;
        const url = dataset.url, type = dataset.type, nav = { url: url };
        if (dataset.invalid) return;

        if (e.detail.formId) requestUtil.pushFormId(e.detail.formId);
        if ("switch" == type) {
            nav.fail = function () {
                wx.navigateTo({ url: url });
            };
            wx.switchTab(nav);
        } else {
            wx.navigateTo(nav);
        }

    },

    /**
     * 预览视图
     */
    onPreviewTap: function (e) {
        let dataset = e.target.dataset, index = dataset.index, url = dataset.url;
        if (index === undefined && url === undefined) return;

        let urls = e.currentTarget.dataset.urls;
        urls = urls === undefined ? [] : urls;
        if (index !== undefined && !url) url = urls[index];
        wx.previewImage({ current: url, urls: urls });
    },

	/**
	 * 点击设置值
	 */
    onSetValueTap: function (e) {
        let dataset = e.target.dataset, name = dataset.name, value = dataset.value;
        const info = {};
        info[name] = value;
        this.setData(info);
    },

    /**
     * 赞
     */
    onGoodTap: function (e) {
        if (requestUtil.isLoading(this.goodRQId)) return;
        const dataset = e.currentTarget.dataset, id = dataset.id, index = dataset.index;

        this.goodRQId = requestUtil.get(urls.document.good, { id: id, ver: urls.version }, (res) => {
            const data = this.data.data;
            data[index].is_good = !data[index].is_good;
            data[index].good = res;
            this.setData({ data: data });
        });
    },

    //空的操作
    onEmptyTap: function () {
    },

	/**
	 * 启动下拉刷新
	 */
    startPullDownRefresh: function () {
        const sysInfo = wx.getSystemInfoSync();
        if (wx.startPullDownRefresh && sysInfo.platform !== 'ios') wx.startPullDownRefresh();
        else this.onPullDownRefresh();
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
                path: 'pages/severs/index/index'
            };
        }
    },

	/**
	 * 按钮点击的分享触发的消息
	 */
    onButtonShareAppMessage: function (target) {
        const dataset = target.dataset, index = dataset.index, item = this.data.data[index];
        return {
            title: item.content.substring(0, 48),
            path: 'pages/severs/detail/detail?id=' + item.id,
            success: () => {
                requestUtil.get(urls.util.shareStatistics, { id: item.id }, () => { }, { isShowLoading: false });
                plugUtil.share();
            }
        };
    }
};