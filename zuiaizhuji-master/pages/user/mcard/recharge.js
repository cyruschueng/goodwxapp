// pages/user/card/recharge.js
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
		requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/getMyCardInfo.html", {}, (info) => {
			console.log(info);
			this.setData(info);
		}, this, { completeAfter: wx.stopPullDownRefresh });
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
    * 跳转页面
    */
    onNavigateTap: function (e) {
        const url = e.currentTarget.dataset.url;
        wx.navigateTo({ url: url })
    },

    /**
     * 金额输入
     */
    onMoneyInput: function (e) {
        var value = e.detail.value, dotIndex = value.indexOf(".");
        if (dotIndex != -1 && value.length - dotIndex > 3) {
            value = value.substring(0, dotIndex + 3);
        }
        if (parseFloat(value) >= 100000) value = "100000";
        return value;
    },

    /**
     * 开始充值
     */
    onSubmit: function (e) {
        if (requestUtil.isLoading(this.rechargeRQId)) return;
        const values = _.extend(e.detail.value, {
            form_id: e.detail.formId,
        });
        console.log(values);
        if (values.money == "") {
            this.showMsg("请输入金额！");
            return;
        }
        if (values.money <= 0) {
            this.showMsg("最小每次充值0.01元");
            return;
        }

        this.rechargeRQId = requestUtil.get(API_URL + "/index.php?s=/addon/Card/CardApi/recharge.html", values, (info) => {
            wx.requestPayment(_.extend(info, {
                success: (res) => {
                    wx.showToast({
                        title: '充值成功！',
                        duration: 1500,
                    });
                    listener.fireEventListener('user.recharge', [parseFloat(values.money)]);
                },
                fail: (res) => {
                    console.error(res);
                }
            }));
        });
    },

    /**
     * 显示提示信息
     */
    showMsg: function (content) {
        wx.showModal({
            content: content,
            showCancel: false,
        });
    }

})