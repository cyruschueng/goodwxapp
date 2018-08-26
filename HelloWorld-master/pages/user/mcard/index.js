// pages/user/card/index.js
const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { duoguan_host_api_url as API_URL } from "../../../utils/data";
import requestUtil from '../../../utils/requestUtil';

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        listener.addEventListener('user.recharge', this.onRecharge);
        this.onPullDownRefresh();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        listener.removeEventListener('user.recharge', this.onRecharge);
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/getMyCardInfo.html", {}, (info) => {
            console.log(info);
            this.setData(info);
        }, this, { completeAfter: wx.stopPullDownRefresh });

        requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/getMyCoupons.html", {}, (info) => {
            this.setData({ data: info });
        }, this, { completeAfter: wx.stopPullDownRefresh });
    },

    /**
    * 跳转页面
    */
    onNavigateTap: function (e) {
        const url = e.currentTarget.dataset.url;
        wx.navigateTo({ url: url })
    },

    /**
     * 当用户充值时触发
     */
    onRecharge: function (money) {
        console.log(money);
        this.setData({
            recharge: parseFloat(this.data.recharge) + money
        });
    },

    /**
     * 支付测试
     */
    onPayTest: function () {
        util.payment({
            notify_url: API_URL + "/index.php?s=/addon/Card/CardApi/paymentTest.html",
            total_amount: Math.floor(Math.random() * 100)
        }, (res) => {
            if (res.code != 1) {
                wx.showModal({
                    content: res.msg,
                    showCancel: false,
                    fail: console.error
                });
            } else {
                this.onPullDownRefresh();
            }
        });
    }
})