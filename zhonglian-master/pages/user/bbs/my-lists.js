const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        page: 1,//当前请求的页数
        isload: true,//是否第一次加载
        isShowLoading: false,//是否显示下方loading
        tabIndex: 0,//选项卡索引
    },
    onLoad: function () {
        // 页面初始化 options为页面跳转所带来的参数
        this.onPullDownRefresh(1);//加载数据

        //监听删除帖子数据
        listener.addEventListener('post.delete', (id) => {
            var index = -1;
            _.each(this.data.data, function (item, itemIndex) {
                if (item.id == id) {
                    index = itemIndex;
                    return false;
                }
            });

            if (index > -1) {
                this.data.data.splice(index, 1);
                this.setData({ data: this.data.data });
            }
        });

        //先隐藏分享按钮，等加载完数据之后再显示分享
        wx.hideShareMenu();
        //获取分享信息
        requestUtil.get(urls.public.share, { name: 'Weiba' }, (info) => {
            this.shareInfo = info;
            //显示分享按钮
            wx.showShareMenu();
        });
    },
    onPullDownRefresh: function (isShowLoading) {
        //刷新数据
        requestUtil.get(urls.bbs.post.myLists, this.data.param, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, 1);
        }, { completeAfter: wx.stopPullDownRefresh, isShowLoading: isShowLoading });
    },
    onReachBottom: function (e) {
        //加载新数据
        if (!this.data.hasMore) {
            console.log("没有更多了...");
            wx.stopPullDownRefresh();
            return;
        }

        this.setData({ isShowLoading: true });
        requestUtil.get(urls.bbs.post.myLists, _.extend({ p: this.data.page + 1 }, this.data.param), (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        }, { completeAfter: wx.stopPullDownRefresh, isShowLoading: false });
    },
    onDataHandler: function (data) {
        //数据处理
        _(data).map((item) => {
            item.post_time = util.formatSmartTime(item.post_time * 1000);
            return item;
        });
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
    onNavigateTap: function (e) {
        //跳转页面
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    },
    onShareAppMessage: function () {
        //分享信息
        const title = this.shareInfo.title;
        const desc = this.shareInfo.description;
        return {
            title: title,
            desc: desc,
            path: '/pages/bbs/index/index'
        };
    }
});