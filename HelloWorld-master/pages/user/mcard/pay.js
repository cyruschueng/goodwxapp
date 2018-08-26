// pages/user/mcard/pay.js
const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { duoguan_host_api_url as API_URL } from "../../../utils/data";
import requestUtil from '../../../utils/requestUtil';

/**
 * 显示消息
 */
function showMsg(msg, complete) {
    wx.showModal({
        content: msg,
        showCancel: false,
        complete: complete
    });
}
/**
 * 显示消息并最后退出
 */
function showMsgAndBack(msg) {
    showMsg(msg, wx.navigateBack);
}

/**
 * 格式化浮点数
 */
function formatFloat(num, dotNum) {
    dotNum = dotNum || 2;
    if ("string" !== typeof num) num += "";
    return num.substring(0, num.lastIndexOf('.') + dotNum + 1);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        payInfo: null,
        coupon: {}
    },

    /**
     * 支付key
     */
    key: null,

    /**
     * 请求结果
     */
    resultInfo: null,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.key = options.key;
        listener.addEventListener('pay.payinfo_' + this.key, this.onPayInfo);
        console.log('pay.payinfo_' + this.key, "addEvented");
        listener.fireEventListener('pay.get_payinfo_' + this.key, this.onPayInfo);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //加载会员卡信息
        if (wx.showNavigationBarLoading) wx.showNavigationBarLoading();
        requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/getMyCardInfo.html", {}, (info) => {
            _.extend(this.data, info);
            this.updateDiscount();
        }, this, {
                completeAfter: () => {
                    if (wx.showNavigationBarLoading) wx.hideNavigationBarLoading();
                }, isShowLoading: false
            });
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        listener.removeEventListener('pay.payinfo_' + this.key, this.onPayInfo);

        const result = this.resultInfo ? { code: 1, msg: 'OK', result: this.resultInfo } : { code: -1, msg: '取消了付款' };
        listener.fireEventListener('pay.result_' + this.key, [result]);
    },

    /**
     * 点击选择优惠券
     */
    onSelectCouponTap: function () {
        const coupon = this.data.coupon, useCoupon = this.data.use_coupon;
        coupon.isShow = true;

        util.useCoupon({
            page: this,
            onSelect: (coupon) => {
                console.log(coupon);
                this.data.use_coupon = coupon;
                this.updateDiscount();
            },
            params: { money: this.data.payInfo.total_amount },
            coupon_id: useCoupon ? useCoupon.id : 0
        });
    },

    /**
     * 选择优惠券
     */
    onSelectCoupon: function (index) {
        const ticket = this.data.ticket[index];
        this.setData({ select_ticket: ticket });
    },

    /**
     * 支付信息
     */
    onPayInfo: function (payInfo) {
        console.log(payInfo, "payInfo");
        if (payInfo.notify_url === undefined || payInfo.notify_url == "") {
            showMsgAndBack("业务处理回调地址错误！");
            return;
        }

        if (payInfo.total_amount === undefined || payInfo.total_amount <= 0) {
            showMsgAndBack("总金额错误！");
            return;
        }

        this.setData({ payInfo: payInfo });
    },

    /**
     * 支付请求
     */
    onPaySubmit: function (e) {
        if (requestUtil.isLoading(this.payRQId)) return;

        const values = _.extend(e.detail.value, this.data.payInfo, {
            formId: e.detail.formId,
            form_id: e.detail.formId
        });

        this.payRQId = requestUtil.post(this.data.payInfo.notify_url, values, (info) => {
            this.resultInfo = info;
            wx.showToast({
                title: '支付成功！',
                success: (res) => {
                    wx.navigateBack();
                },
            });
        });
    },


    /**
    * 跳转页面
    */
    onNavigateTap: function (e) {
        const url = e.currentTarget.dataset.url;
        wx.navigateTo({ url: url })
    },

    /**
     * 更新优惠信息
     */
    updateDiscount: function () {
        const data = this.data,
            useCoupon = data.use_coupon, levelLnfo = data.level_info,
            payInfo = data.payInfo, total_amount = payInfo.total_amount;

        const info = {
            pay_amount: total_amount,
            coupon_discount: "0.00",
            level_discount: "0.00"
        };

        if (useCoupon) { //卡券优惠
            let couponDiscount = "0.00";
            if (useCoupon.type == 0) { //代金券
                if (useCoupon.discount > total_amount) {
                    couponDiscount = total_amount;
                    info.pay_amount = "0.00";
                } else {
                    info.pay_amount = (total_amount - useCoupon.discount).toFixed(2) + "";
                    couponDiscount = useCoupon.discount;
                }
                info.coupon_discount = formatFloat(couponDiscount);
            } else { //折扣券
                couponDiscount = total_amount * (useCoupon.discount / 10);
                if (couponDiscount > 0.01) {
                    couponDiscount = formatFloat(couponDiscount);
                    info.pay_amount = couponDiscount

                    couponDiscount = (total_amount - couponDiscount).toFixed(2) + "";
                    info.coupon_discount = couponDiscount;
                } else {
                    couponDiscount = "0.00";
                }
            }
            console.log(couponDiscount);
        } else { //会员等级优惠
            let levelDiscount = levelLnfo.discount / 100;
            levelDiscount = formatFloat((total_amount * levelDiscount) + "");

            if (levelDiscount < 0.01) {
                info.level_discount = "0.00";
            } else {
                info.pay_amount = (total_amount - levelDiscount).toFixed(2);
                info.level_discount = levelDiscount;
            }

        }

        info.is_show_pay = parseFloat(this.data.recharge) >= parseFloat(info.pay_amount);

        _.extend(data, info);
        this.setData(data);
    }

});