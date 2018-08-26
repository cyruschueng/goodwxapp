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
    },
    //页面加载
    onLoad: function (options) {
        this.isChoice = options.choice;
        this.onPullDownRefresh(1);//加载数据
        listener.addEventListener('address.update', this.onPullDownRefresh);
    },
    onUnload: function () {
        listener.removeEventListener('address.update', this.onPullDownRefresh);
    },
    //下拉刷新
    onPullDownRefresh: function () {
        requestUtil.get(urls.member.address.lists, {}, (data) => {
            this.onDataHandler(data);
            this.onSetData(data, 1);
        }, { completeAfter: wx.stopPullDownRefresh });
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
    //选择地址
    onFireChoiceEventTap: function (e) {
        if (!this.isChoice || this.isLongTap) return;
        const dataset = e.currentTarget.dataset, index = dataset.index;
        listener.fireEventListener('address.choice', this.data.data[index]);
        wx.navigateBack();
    },
    //选择操作
    onActionLongTap: function (e) {
        this.isLongTap = true;
        const dataset = e.currentTarget.dataset, index = dataset.index;
        wx.showActionSheet({
            itemList: ['修改', '删除', '设置为默认地址'],
            success: (res) => {
                if (0 === res.tapIndex) {
                    wx.redirectTo({ url: 'write?id=' + this.data.data[index].id, });
                } else if (1 === res.tapIndex) {
                    if (requestUtil.isLoading(this.deleteRQId)) {
                        wx.showModal({
                            content: '你操作的太快了~',
                            showCancel: false
                        });
                        return;
                    }
                    this.onDeleteAction(index);
                } else if (2 === res.tapIndex) {
                    this.onSetDefaultAction(index);
                }

            },
            complete: () => {
                this.isLongTap = false;
            }
        });
    },
    //删除操作
    onDeleteAction: function (index) {
        wx.showModal({
            title: '温馨提示',
            content: '删除后将不能恢复，你确定要删除吗？',
            success: (res) => {
                if (res.cancel) return;
                const id = this.data.data[index].id;
                requestUtil.get(urls.member.address.delete, { id: id }, () => {
                    this.data.data.splice(index, 1);
                    this.setData({ data: this.data.data });
                });
            }
        })
    },
    //设置默认地址
    onSetDefaultAction: function (index) {
        const id = this.data.data[index].id;
        requestUtil.get(urls.member.address.setDefault, { id: id }, () => {
            _.each(this.data.data, function (item, itemIndex) {
                item.is_default = itemIndex === index;
            });
            this.setData({ data: this.data.data });
        });
    },
    onNavigateTap: function (e) {
        //跳转页面
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        })
    },
})