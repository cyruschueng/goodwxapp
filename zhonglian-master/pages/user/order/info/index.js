const app = getApp();
import _ from '../../../../utils/underscore';
import util from '../../../../utils/util';
import listener from '../../../../utils/listener';
import { urls } from '../../../../utils/data';
import requestUtil from '../../../../utils/requestUtil';

Page({
    data: {
        this_order_id: 0,
        oinfo: []
    },
    onLoad: function (options) {
        var that = this
        var order_id = options.oid;
        console.log(order_id)
        that.setData({
            this_order_id: order_id,
        })
        //请求订单详情
        requestUtil.get(urls.shoping.order.info, { id: order_id }, (data) => {
            data['add_time'] = util.formatSmartTime(parseInt(data['add_time']) * 1000);
            that.setData({
                oinfo: data
            })
        }, { completeAfter: that.aaa });
    },
    //支付
    order_go_pay_bind: function () {
        var order_id = this.data.this_order_id
        wx.redirectTo({
            url: '../../../shop/orderpay/index?order_id=' + order_id
        })
    },
    //评论
    order_go_comment_bind: function () {
        var order_id = this.data.this_order_id
        wx.redirectTo({
            url: '../comment/index?order_id=' + order_id
        })
    },
    //确认收货
    order_go_shouhuo_bind: function () {
        var order_id = this.data.this_order_id
        wx.showModal({
            title: '提示',
            content: "确认兑换吗?",
            success: (res) => {
                if (!res.confirm) return;

                this.data.oinfo.order_status = 1;
                requestUtil.get(urls.shoping.order.confirm, { id: order_id }, () => {
                    this.setData({ oinfo: this.data.oinfo });
                });
            }
        })
    },
})