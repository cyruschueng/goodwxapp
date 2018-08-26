const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

//选项卡
Page({
    data: {
        isEmpty: false,//数据是否为空
        hasMore: true,//是否还有更多数据
        page: 1,//当前请求的页数
        isload: true,//是否第一次加载
        isShowLoading: false,//是否显示下方loading
        hostUrl: urls.hostUrl
    },
    onShow: function () {
        this.onPullDownRefresh(1);//加载数据
    },
    //显示隐藏
    onToggleTap: function (e) {
        const dataset = e.currentTarget.dataset, id = dataset.id;
        const data = this.data.data;
        for (var i = 0; i < data.length; i++) {
            data[i].isOpen = data[i].id == id
        }
        this.setData({ data: data, });
    },
    //下拉刷新
    onPullDownRefresh: function (isShowLoading) {
        requestUtil.get(urls.bbs.category.tree, {}, (data) => {
            console.log(data);
            this.onDataHandler(data);
            this.onSetData(data, 1);
        }, this, { completeAfter: wx.stopPullDownRefresh, isShowLoading: isShowLoading });
    },
    onDataHandler: function (data) {
        //数据处理
        _(data).map((item) => {
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
})