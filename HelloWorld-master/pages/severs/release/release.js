const app = getApp();

import _ from '../../../utils/underscore';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import urls from '../urls';

Page({
    data: {
    },

    /**
     * 页面初始化
     */
    onLoad: function (options) {
        this.onPullDownRefresh();
    },


    /**
     * 页面首次读入
     */
    onReady: function (options) {
        this.onPullDownRefresh();
    },

    /**
     * 页面下拉刷新
     */
    onPullDownRefresh: function () {
        requestUtil.get(urls.category.lists, {}, (data) => {
            //数据进行分组，四个为1组
            const group = [];
            var i = -1;
            for (var x in data) {
                if (x % 5 === 0) group[++i] = [];
                group[i].push(data[x]);
            }
            console.log(group);
            this.setData({ data: group });
        }, this, {
                isShowLoading: false,
                completeAfter: wx.stopPullDownRefresh
            });
    },

    /**
     * 选择分类
     */
    onChooseCateTap: function (e) {
        // data - url="../write/write?title={{item.title}}&cid={{item.id}}" data- type=""
        // wx.navigateTo({ url: e.currentTarget.dataset.url });
        const dataset = e.detail.target.dataset, gIndex = dataset.gIndex, index = dataset.index;
        const curCate = this.data.data[gIndex][index], childCates = curCate.child;

        requestUtil.pushFormId(e.detail.formId);
        if (childCates && childCates.length) {
            this.setData({ childCates });
        } else {
            wx.navigateTo({ url: '../write/write?title=' + curCate.title + '&cid=' + curCate.id });
        }
    },

	/**
	 * 选择子分类
	 */
    onChooseChildCateTap: function (e) {
        const dataset = e.currentTarget.dataset, index = dataset.index;
        const childCates = this.data.childCates, item = childCates[index];
        wx.navigateTo({ url: '../write/write?title=' + item.title + '&cid=' + item.id });
    },

	/**
	 * 选择被取消
	 */
    onChooseCancel: function (e) {
        this.setData({ childCates: null });
    }
})