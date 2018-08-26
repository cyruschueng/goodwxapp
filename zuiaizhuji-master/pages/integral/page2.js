import _ from '../../utils/underscore.js';
import requestUtil from '../../utils/requestUtil.js';

const BASE_PAGE = {

	/**
	 * 跳转页面
	 */
    onNavigateTap: function (e) {
        const dataset = e.detail.target ? e.detail.target.dataset : e.currentTarget.dataset;
        const url = dataset.url, type = dataset.type, nav = { url: url };
        if (e.detail.formId) requestUtil.pushFormId(e.detail.formId);
        if ("switch" == type) {
            nav.fail = () => wx.navigateTo({ url: url });
            wx.switchTab(nav);
        } else {
            wx.navigateTo(nav);
        }
    },

	/**
	 * 点击设置值
	 */
    onSetValueTap: function (e) {
        let dataset = e.target.dataset, name = dataset.name, value = dataset.value;
        const info = {};
        info[name] = value;
        this.setData(info);

        e.detail.formId && requestUtil.pushFormId(e.detail.formId);
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
                this.setData({ isShowCopyTips: true });
                setTimeout(() => { this.setData({ isShowCopyTips: false }); }, 1000);
            },
        });
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
};

function Page2(obj) {
    Page(_.extend({}, BASE_PAGE, obj));
}
module.exports = Page2;