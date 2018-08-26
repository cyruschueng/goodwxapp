const app = getApp();
import _ from '../../utils/underscore';
import util from '../../utils/util';
import listener from '../../utils/listener';
import { urls } from '../../utils/data';
import requestUtil from '../../utils/requestUtil';
import WxParse from '../../wxParse/wxParse';

Page({
    data: {
        isShowWrite: 0,
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.id = options.id;
        //加载数据
        this.onPullDownRefresh(1);
    },
    onPullDownRefresh: function (isShowLoading) {
        //刷新数据
        requestUtil.get(urls.article.info, { id: this.id }, (info) => {
            info.create_time = util.formatSmartTime(info.create_time * 1000);
            this.setData(info);

            var handler = {
                setData: (bindData) => {
                    _.each(bindData.content.images, (item, index) => {
                        if (item.attr.src.indexOf('http') !== 0) {
                            item.attr.src = urls.baseHostUrl + item.attr.src;
                            bindData.content.imageUrls[index] = item.attr.src;
                        }
                    });
                    this.setData(bindData);
                }
            };
            WxParse.wxParse('content', 'html', info.content, handler);
            this.wxParseImgLoad = handler.wxParseImgLoad;
            this.wxParseImgTap = handler.wxParseImgTap;

            //加载评论信息
            requestUtil.get(urls.article.getCommentList, { doc_id: this.id }, (data) => {
                this.onDataHandler(data);
                this.onSetData(data, 1);
            }, { completeAfter: wx.stopPullDownRefresh, isShowLoading: isShowLoading });
        }, { isShowLoading: isShowLoading });
    },
    onReachBottom: function (e) {
        if (!this.data.hasMore) {
            console.log("没有更多了...");
            wx.stopPullDownRefresh();
            return;
        }

        requestUtil.get(urls.article.getCommentList, { p: this.data.page + 1, post_id: this.postId }, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        });
    },
    onDataHandler: function (data) {
        //数据处理
        _(data).map((item) => {
            item.create_time = util.formatSmartTime(item.create_time * 1000);
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
    onBindDataTap: function (e) {
        //绑定数据
        const dataset = e.currentTarget.dataset, name = dataset.name, value = dataset.value;
        const info = {};
        info[name] = value;
        this.setData(info);
    },
    onCommentSubmit: function (e) {
        //评论
        if (requestUtil.isLoading(this.commentRQId)) return;
        const values = _.extend({ doc_id: this.id, }, e.detail.value);

        //请求网络数据
        this.commentRQId = requestUtil.post(urls.article.comment, values, (info) => {
            const tempData = [info];
            this.onDataHandler(tempData);
            this.data.data.unshift(tempData[0]);
            this.setData({ data: this.data.data, isShowWrite: 0 });
        });
    },
    onTogglePraiseTap: function () {
        //赞/取消赞
        if (requestUtil.isLoading(this.praiseRQId)) return;

        //请求网络数据
        this.praiseRQId = requestUtil.get(urls.article.togglePraise, { doc_id: this.id }, (info) => {
            this.setData(info);
        });
    },
    onEmptyTap: function () {
        //什么也不干
    }
})