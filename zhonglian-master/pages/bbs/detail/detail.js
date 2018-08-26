const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    postId: null,
    isShowMore: false,
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        page: 0,//当前请求的页数
        isload: true,//是否第一次加载
        isShowLoading: false,//是否显示下方loading
        data: [],//评论列表
        param: {},
    },
    onLoad: function (options) {
        this.postId = options.id;
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function () {
        //请求帖子详情
        requestUtil.get(urls.bbs.post.info, { id: this.postId }, (data) => {
            data.post_time = util.formatSmartTime(data.post_time * 1000);
            data.img_list = _.map(data.img_list, function (item) {
                return urls.hostUrl + item;
            });
            this.setData(data);
            app.getUserInfo({
                success: (info) => {
                    this.setData({ user_info: info });
                }
            });
            requestUtil.get(urls.bbs.weiba.isModerator, { weiba_id: data.weiba_id }, (isModerator) => {
                this.setData({ isModerator: isModerator });
            });

            requestUtil.get(urls.bbs.comment.lists, { post_id: this.postId }, (data) => {
                this.onDataHandler(data);
                this.onSetData(data, 1);
            });

        }, { completeAfter: wx.stopPullDownRefresh });
    },
    onReachBottom: function (e) {
        if (!this.data.hasMore) {
            console.log("没有更多了...");
            wx.stopPullDownRefresh();
            return;
        }

        requestUtil.get(urls.bbs.comment.lists, { p: this.data.page + 1, post_id: this.postId }, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        });
    },
    onDataHandler: function (data) {
        //数据处理
        _(data).map((item) => {
            item.ctime = util.formatSmartTime(item.ctime * 1000);
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
        const dataset = e.currentTarget.dataset, value = dataset.value;
        this.setData(JSON.parse(value));
    },
    onReportSubmit: function (e) {
        //提交举报
        if (requestUtil.isLoading(this.reportRQId)) return;
        const values = _.extend({ id: this.data.report_id }, e.detail.value);

        if (values.content == '') {
            wx.showModal({
                title: '提示',
                content: '对不起，请输入举报信息',
                showCancel: false
            }); return false;
        }

        const url = this.data.report_type == 1 ? urls.bbs.post.report : urls.bbs.comment.report;
        requestUtil.post(url, values, () => {
            this.setData({ jubao_layer_isshow: 0 });
            wx.showToast({
                title: '举报成功!',
                icon: 'success'
            });
        });
    },
    onCommentSubmit: function (e) {
        //提交评论
        if (requestUtil.isLoading(this.commentRQId)) return;
        const values = _.extend({
            id: this.data.reply_id, type: this.data.reply_type,
            post_id: this.postId,
        }, e.detail.value);

        if (values.content == '') {
            wx.showModal({
                title: '提示',
                content: '对不起，请输入评论内容',
                showCancel: false
            });
            return false;
        }

        requestUtil.post(urls.bbs.comment.create, values, (data) => {
            if (this.data.reply_type == 1) {
                var itemData = [data];
                this.onDataHandler(itemData);
                this.data.data.unshift(itemData[0]);
            } else {
                _.each(this.data.data, (item) => {
                    if (item.reply_id == this.data.reply_id) {
                        item.child = item.child || [];
                        item.child.unshift(data);
                    }
                });
            }
            this.setData({ reply_layer_isshow: 0, data: this.data.data });
        });
    },
    onPraiseTap: function (e) {
        // 喜欢操作
        const dataset = e.currentTarget.dataset, id = dataset.id,
            type = dataset.type;// 1为帖子2为回复

        const url = type == 1 ? urls.bbs.post.praise : urls.bbs.comment.praise;
        requestUtil.get(url, { id: id, type: type }, (data) => {
            if (type == 1) {
                this.setData({ praise: data.praise, is_praise: data.is_praise });
            } else {
                _.each(this.data.data, (item) => {
                    if (item.reply_id == id) {
                        item.digg_count = data.praise;
                        item.is_praise = data.is_praise;
                    }
                });
                this.setData({ data: this.data.data });
            }

        });
    },
    onPreviewTap: function (e) {
        //图片预览
        const dataset = e.currentTarget.dataset, index = dataset.index;
        wx.previewImage({
            current: this.data.img_list[index], // 当前显示图片的http链接
            urls: this.data.img_list
        });
    },
    onDetailTap: function () {
        //全局事件
        if (this.isShowMore) {
            this.hideMore();
        }
    },
    hideMore: function () {
        //隐藏更多菜单
        this.isShowMore = false;
        const data = this.data.data;
        for (var i = 0; i < data.length; i++) {
            data[i].active = false;
        }
        this.setData({ data: data, });
    },
    onMoreMenuTap: function (e) {
        //显示更多菜单
        const dataset = e.currentTarget.dataset, replyId = dataset.id;
        const data = this.data.data;
        for (var i = 0; i < data.length; i++) {
            data[i].active = replyId == data[i].reply_id;
        }
        this.isShowMore = true;
        this.setData({ data: data });
    },
    //删除帖子
    onDeleteTap: function () {
        wx.showModal({
            title: '提示',
            content: '确认要删除该帖子吗',
            success: (res) => {
                if (!res.confirm) return;
                requestUtil.get(urls.bbs.post.delete, { id: this.postId }, () => {
                    listener.fireEventListener('post.delete', [this.postId]);
                    wx.navigateBack();
                });
            }
        })
    },
    onShareAppMessage: function () {
        const title = this.data.title || "中联";
        return {
            title: title,
            path: 'pages/bbs/detail/detail?id=' + this.postId
        }
    }
})