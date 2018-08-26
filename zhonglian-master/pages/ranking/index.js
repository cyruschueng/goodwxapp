const app = getApp();
import _ from '../../utils/underscore';
import util from '../../utils/util';
import listener from '../../utils/listener';
import { urls } from '../../utils/data';
import requestUtil from '../../utils/requestUtil';

Page({
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        page: 1,//当前请求的页数
        isload: true,//是否第一次加载
        isShowLoading: false,//是否显示下方loading
        tabIndex: 0,//选项卡索引

        tabs: [
            {
                title: '昨日积分明细',
                url: urls.ranking.getScoreByDay,
                type: 4,
                hasMore: true,
            }, {
                title: '积分风采展示',
                url: urls.ranking.getFengCaiByDay,
                type: 3,
                hasMore: true,
            }, {
                title: '季度排名',
                url: urls.ranking.getJiDuRanking,
                type: 1,
                hasMore: true,
            }, {
                title: '个人排名',
                url: urls.ranking.person,
                type: 1
            }, {
                title: '站经理排名',
                url: urls.ranking.manager,
                type: 1
            }, {
                title: '加油站排名',
                url: urls.ranking.gas,
                type: 2
            }, {
                title: '单位排名',
                url: urls.ranking.company,
                type: 2
            }, {
                title: '机关人员排名',
                url: urls.ranking.jiguanrenyuan,
                type: 1
            }
        ],
    },
    onLoad: function (options) {
        this.setData({ hostUrl: urls.baseHostUrl });

        wx.hideShareMenu();
        requestUtil.get(urls.public.share, { name: 'Ranking' }, (info) => {
            this.shareInfo = info;
            wx.showShareMenu();
        });

        this.onPullDownRefresh(1);
    },

    onPullDownRefresh: function () {
        //刷新数据
        wx.showToast({ title: '加载中...', icon: 'loading', duration: 10000, mask: true, });
        const data = this.data, tabs = data.tabs, tabIndex = data.tabIndex, url = tabs[tabIndex].url;

        wx.request({
            url: url, data: this.param,
            success: (res) => {
                res = res.data.RESULT;
                this.onDataHandler(res);
                this.onSetData(res, 1);
            },
            complete: () => {
                wx.hideToast();
                wx.stopPullDownRefresh();
            }
        });
    },

    onDataHandler: function (data) {
        //数据处理
        _(data).map((item) => {
            item.URL = encodeURIComponent(item.URL);
            if (item.attach_list) {
                item.attach_list = _(item.attach_list).map(item => { return urls.baseHostUrl + item });
            }
            return item;
        });

        const tabs = this.data.tabs, tabIndex = this.data.tabIndex, url = tabs[tabIndex].url;
        if (tabs[tabIndex].type == 1 || tabs[tabIndex].type == 4) {
            const top = [];
            top.push(data.shift(), data.shift(), data.shift());
            this.setData({ top: top });
        }
    },

    onSetData: function (data, page) {
        //设置数据
        data = data || [];
        this.setData({
            page: page !== undefined ? page : this.data.page,
            data: page === 1 || page === undefined ? data : this.data.data.concat(data),
            hasMore: page !== undefined && data.length >= 20,
            isEmpty: page === 1 || page === undefined ? data.length === 0 : false,
            isload: false, isShowLoading: page === 1 ? this.data.isShowLoading : false
        });
    },

    onTabSwitchTap: function (e) {
        //切换选项卡
        const dataset = e.currentTarget.dataset, index = dataset.index;
        if (index == this.data.tabIndex) return;
        this.setData({ tabIndex: index });
        this.onPullDownRefresh(1);
    },

    onNavigateTap: function (e) {
        const dataset = e.currentTarget.dataset, url = dataset.url, type = dataset.type;
        //跳转页面
        wx.navigateTo({ url: url });
    },

    onImgErr: function (e) {
    },

    /**
     * 预览
     */
    onPreviewTap(e) {
        const imgs = e.currentTarget.dataset.imgs, index = e.target.dataset.index;

        wx.previewImage({
            current: imgs[index],
            urls: imgs,
        });
    },

    onShareAppMessage: function () {
        //分享信息
        const title = this.shareInfo.title;
        const desc = this.shareInfo.description;
        return {
            title: title,
            desc: desc,
            path: '/pages/ranking/index'
        };
    }
})