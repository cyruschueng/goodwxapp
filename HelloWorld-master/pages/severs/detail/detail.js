const app = getApp();

import _ from '../../../utils/underscore';
import requestUtil from '../../../utils/requestUtil';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import urls from '../urls';

Page({

    /**
     * 当前文档的id
     */
    id: null,

    /**
     * 数据源
     */
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        page: 1,//当前请求的页数

        top_day: 1,
        isShowTop: false,
        isShowActionMenu: false,
        isActive: false,

        isUseRichText: wx.canIUse('rich-text')
    },

    /** 
     * 页面初始化
     */
    onLoad: function (options) {
        this.id = options.id;

        //加载数据
        this.loadShareData();
        this.onPullDownRefresh(1);
    },

    /**
     * 页面下拉刷新
     */
    onPullDownRefresh: function (isShowLoading) {

        //加载配置信息
        requestUtil.get(urls.config.load, { name: 'config' }, (data) => {
            const { config } = data;
            this.setData({ config: config });
        });

        //获取文档详细信息
        requestUtil.get(urls.document.detail, { id: this.id }, (data, orgData) => {
            this.onDetailDataHandler(data);

            listener.fireEventListener('severs.info.update', [{ id: this.id, click: util.formatSmartNumber(data.click) }]);

            //获取位置信息
            wx.getLocation({
                success: (res) => {
                    requestUtil.get(urls.util.getDistance, {
                        from: res.longitude + ',' + res.latitude,
                        to: data.longitude + ',' + data.latitude
                    }, (distance) => {
                        distance = parseFloat(distance).toFixed(2);
                        distance = "≈" + distance + "km";
                        this.setData({ distance: distance });
                    });
                }, fail: () => {
                    wx.showModal({
                        title: '温馨提示',
                        content: '获取位置信息失败，请检查网络是否良好，以及是否禁用位置',
                        showCancel: false,
                    });
                }
            });

            //获取发布信息评论列表
            requestUtil.get(urls.comment.lists, { doc_id: this.id }, (data) => {
                this.onDataHandler(data);
                this.onSetData(data, 1);
            });

            _.each(orgData.recommend, item => {
                item.create_time = util.formatSmartTime(item.create_time * 1000, "yyyy-MM-dd hh:mm");
            });

            this.setData(_.extend({ currentUid: orgData.uid, recommend: orgData.recommend }, data));
        }, this, {
                error: (code, msg) => {
                    if (code == 404 || code == 5) {
                        //信息未找到，或请求参数有误，直接返回当前页
                        wx.navigateBack();
                    }
                },
                completeAfter: wx.stopPullDownRefresh,
                isShowLoading: isShowLoading
            });
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

        //获取发布信息评论列表
        requestUtil.get(urls.comment.lists, { doc_id: this.id, _p: this.data.page + 1 }, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, this.data.page + 1);
        }, this, { completeAfter: wx.stopPullDownRefresh });
    },

	/**
	 * 文档详情信息数据处理
	 */
    onDetailDataHandler: function (data) {
        data.create_time = util.formatSmartTime(data.create_time * 1000, "yyyy-MM-dd hh:mm");
        data.isShowWalletMoney = data.pull_wallet_amount != undefined || data.is_wallet_end != 0;

        //如果附加红包口令，则在文章里面随机显示
        if (data.wallet) {
            wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#ff4b4b',
                animation: {
                    duration: 500,
                }
            });
            // let position = Math.floor(Math.random() * data.content.length);
            // data.content = data.content.substring(0, position) + "<span class='wallet_pwd' data-role='wallet'>【红包口令：" + data.wallet.pwd + "】</span>" + data.content.substring(position);
        }

        _.each(data.wallet_users, item => {
            item.create_time = util.formatSmartTime(item.create_time * 1000, "yyyy-MM-dd hh:mm");
        });
    },

    onCopyPwdTap: function (e) {
        // console.log(e);
        wx.setClipboardData({
            data: this.data.wallet.pwd,
            success: function (res) {
                wx.showModal({ content: '口令已复制！', showCancel: false, });
            },
        });
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
     * 设置数据
     */
    onSetData: function (data, page) {
        data = data || [];
        this.setData({
            page: page !== undefined ? page : this.data.page,
            data: page === 1 || page === undefined ? data : this.data.data.concat(data),
            hasMore: page !== undefined && data.length >= 20,
            isEmpty: page === 1 || page === undefined ? data.length === 0 : false
        });
    },

    /**
     * 加载分享数据
     */
    loadShareData: function () {
        if (wx.hideShareMenu) wx.hideShareMenu();
        requestUtil.get(urls.share, { mmodule: 'duoguan_info' }, (info) => {
            this.shareInfo = info;
            if (wx.showShareMenu) wx.showShareMenu();
        });
    },

    /**
     * 赞
     */
    onGoodTap: function (e) {
        if (requestUtil.isLoading(this.goodRQId)) return;

        requestUtil.get(urls.document.good, { id: this.id }, (res) => {
            const info = { id: this.id, good: res, is_good: !this.data.is_good };
            listener.fireEventListener('severs.info.update', [info]);
            this.setData(info);
        });

        // 赞效果
        if (!this.data.is_good) {
            this.setData({ isActive: true });
            setTimeout(() => {
                this.setData({ isActive: false });
            }, 1000)
        }
    },

    /**
     * 预览视图
     */
    onPreviewTap: function (e) {
        var dataset = e.target.dataset, index = dataset.index, url = dataset.url;
        if (index === undefined && url === undefined) return;

        let urls = e.currentTarget.dataset.urls;
        urls = urls === undefined ? [] : urls;
        if (index !== undefined && !url) url = urls[index];
        wx.previewImage({ current: url, urls: urls });
    },

    /**
     * 打开地图
     */
    onOpenMapTap: function () {
        wx.openLocation({
            latitude: this.data.latitude,
            longitude: this.data.longitude,
            scale: 14,
            name: this.data.address,
            address: this.data.address
        });
    },

    /**
     * 删除
     */
    onDeleteTap: function (e) {
        if (requestUtil.isLoading(this.delRQId)) return;

        wx.showModal({
            title: '温馨提示',
            content: '删除后将不能恢复，你确定要删除这条信息吗？',
            success: (res) => {
                if (!res.confirm) return;

                requestUtil.get(urls.document.del, { id: this.id }, (res) => {
                    listener.fireEventListener('severs.info.delete', [this.id]);
                    wx.navigateBack();
                });
            }
        });
    },

    /**
     * 审核
     */
    onCheckTap: function () {
        if (requestUtil.isLoading(this.checkRQId)) return;

        requestUtil.get(urls.document.checked, { id: this.id }, () => {
            this.setData({ status: 1, isShowActionMenu: false });
            wx.showToast({ title: '审核通过！', icon: 'success', duration: 1500, mask: true });
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
        const dataset = e.currentTarget.dataset, url = dataset.url, type = dataset.type || "";
        if (type == 'redirect') {
            wx.redirectTo({ url: url });
        } else if (type == 'switchTab') {
            wx.switchTab({ url: url });
        } else {
            wx.navigateTo({ url: url });
        }
    },

    /**
     * 显示评论框
     */
    onShowCommentTap: function (e) {
        if (this.isShowCommentActionSheet) return;
        if (requestUtil.isLoading(this.commentRQId)) return;

        const dataset = e.currentTarget.dataset, dataset2 = e.target.dataset;
        const values = {
            index: dataset.index || dataset2.index,
            reply_id: dataset.replyId || dataset2.replyId,
            reply_uid: dataset.uid || dataset2.uid,
            doc_id: dataset.docId || dataset2.docId,
        };
        console.log(values, dataset);

        if (!values.reply_id && !values.doc_id) return;

        this.commentParam = values;
        const comment_placeholder = (values.reply_id ? "回复 " : "评论 ") + (dataset.nickname || dataset2.nickname);

        this.setData({ show_comment: true, comment_placeholder: comment_placeholder, isShowActionMenu: false });
    },

    /**
     * 隐藏评论框
     */
    onHideCommentTap: function () {
        this.setData({ show_comment: false });
    },

    /**
     * 删除评论或回复
     */
    onShowDeleteCommentTap: function (e) {
        const dataset = e.currentTarget.dataset, isShow = dataset.show, id = dataset.id, index = dataset.index, replyIndex = dataset.replyIndex, uid = dataset.uid || e.target.dataset.uid;
        console.log(e, dataset, uid);
        if (isShow != 1) return;

        const menu = ['删除'];
        this.data.is_admin && uid && menu.push('拉黑');

        this.isShowCommentActionSheet = true;
        wx.showActionSheet({
            itemList: menu,
            success: (res) => {
                if (res.tapIndex === undefined) return;
                if (res.tapIndex == 0) {
                    if (requestUtil.isLoading(this.deleteCommentRQId)) return;
                    //删除评论
                    this.deleteCommentRQId = requestUtil.get(urls.comment.del, { id: id }, () => {
                        if (replyIndex !== undefined) {
                            this.data.data[index].reply_list.splice(replyIndex, 1);
                            this.setData({ data: this.data.data, isShowActionMenu: false });
                        } else {
                            this.data.data.splice(index, 1);
                            this.setData({ data: this.data.data, comment: this.data.comment - 1, isShowActionMenu: false });
                        }
                    });
                } else {
                    if (!uid) return;
                    wx.showModal({
                        title: '温馨提示',
                        content: '拉黑之后将不能再次发帖，同时此用户所有帖子均为隐藏，你确定要拉黑此用户吗？',
                        success: (res) => {
                            if (res.cancel) return;

                            requestUtil.get(urls.document.pullblack, { _uid: uid }, () => {
                                listener.fireEventListener('severs.info.pullblack', [uid]);
                                wx.showToast({
                                    title: '已拉黑成功，可以在后台恢复发帖权限！',
                                    duration: 3000, mask: true
                                });
                                this.setData({ isShowActionMenu: false });
                            });

                        }
                    });
                }
            },
            complete: () => {
                this.isShowCommentActionSheet = false;
            }
        });
    },

    /**
     * 提交评论
     */
    onCommentSubmit: function (e) {
        const values = _.extend({}, e.detail.value, this.commentParam);
        requestUtil.pushFormId(e.detail.formId);
        console.log(values);

        this.commentRQId = requestUtil.post(urls.comment.add, values, (info) => {
            const data = this.data.data;
            info.create_time = util.formatSmartTime(info.create_time * 1000);
            if (values.reply_id) {
                //回复
                data[values.index].reply_list.push(info);
                data[values.index].reply_count++;
            } else {
                //评论
                info.reply_list = [];
                data.push(info);
                this.data.comment++;
                listener.fireEventListener('severs.info.update', [{ id: this.id, comment: this.data.comment }]);
            }
            this.setData({ data: data, comment: this.data.comment, show_comment: false });
        });
    },

    /**
     * 管理员拉黑
     */
    onPullBlackTap: function () {
        wx.showModal({
            title: '温馨提示',
            content: '拉黑之后将不能再次发帖，同时此用户所有帖子均为隐藏，你确定要拉黑此用户吗？',
            success: (res) => {
                if (res.cancel) return;

                requestUtil.get(urls.document.pullblack, { id: this.id }, () => {
                    listener.fireEventListener('severs.info.pullblack', [this.data.uid]);
                    wx.showToast({
                        title: '已拉黑成功，可以在后台恢复发帖权限！',
                        duration: 3000, mask: true
                    });
                    this.setData({ isShowActionMenu: false });
                });

            }
        });
    },

    /**
     * 管理员置顶/取消置顶
     */
    onToggleTopTap: function () {
        if (requestUtil.isLoading(this.toggleTopRQId)) return;

        this.toggleTopRQId = requestUtil.get(urls.document.toggleTop, { id: this.id, day: this.data.top_day }, (info) => {
            info = { id: this.id, is_top: info, isShowTop: false, isShowActionMenu: false };
            listener.fireEventListener('severs.info.update', [info]);
            this.setData(info);
        });
    },

	/**
	 * 点击设置值
	 */
    onSetValueTap(e) {
        const dataset = e.target.dataset, name = dataset.name;
        let value = dataset.value, info = {};
        if (name) {
            info[name] = value;
        } else {
            info = JSON.parse(value);
        }
        this.setData(info);
    },

    /**
     * 选择天数被改变
     */
    onTopDayChange: function (e) {
        const day = parseInt(e.detail.value);
        this.setData({ top_day: day });
    },

	/**
	 * 抢红包
	 */
    onPullWalletSubmit: function (e) {
        if (requestUtil.isLoading(this.pullWalletRQId)) return;

        const values = _.extend(e.detail.value, {
            form_id: e.detail.formId,
            id: this.id
        });
        this.pullWalletRQId = requestUtil.get(urls.document.pullWallet, values, (info) => {
            const wallet = this.data.wallet, walletUsers = this.data.wallet_users;
            wallet.pull_num = info.pull_num;
            wallet.pull_amount = info.pull_amount;
            walletUsers.unshift({
                nickname: info.nickname,
                headimgurl: info.headimgurl,
                amount: info.amount,
                create_time: util.formatSmartTime(new Date(), "yyyy-MM-dd hh:mm")
            });

            this.setData({ isShowWalletMoney: true, pull_wallet_amount: info.amount, is_wallet_end: info.is_wallet_end, wallet: wallet, wallet_users: walletUsers });
        }, this, {
                error: (code, msg) => {
                    this.setData({ pull_wallet_msg: msg });
                    return false;
                }
            });
    },

    /**
     * 复制内容信息
     */
    onContentActionTap: function (e) {
        wx.showActionSheet({
            itemList: ['复制'],
            success: (res) => {
                if (res.tapIndex == 0) { //复制信息内容
                    wx.setClipboardData({
                        data: this.data.content,
                        success: function (res) {
                            wx.showToast({ title: '复制成功！', })
                        },
                        fail: function (res) {
                            wx.showModal({
                                title: '复制失败',
                                content: res.errMsg,
                                showCancel: false,
                            });
                        },
                    })
                }
            },
        })
    },

    /**
     * 分享页面
     */
    onShareAppMessage: function () {
        const title = this.data.content || '同城';
        requestUtil.get(urls.util.shareStatistics, { id: this.id }, () => { }, this, { isShowLoading: false });
        return {
            title: title.substr(0, 48) + (title.length > 48 ? '...' : ''),
            path: 'pages/severs/detail/detail?id=' + this.id
        };
    }
})