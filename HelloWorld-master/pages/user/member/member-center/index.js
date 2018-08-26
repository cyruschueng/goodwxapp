// pages/user/member/member-center/index.js
import {
    duoguan_host_api_url as API_URL,
} from '../../../../utils/data.js';
import requestUtil from '../../../../utils/requestUtil.js';
import listener from '../../../../utils/listener';
import _ from '../../../../utils/underscore.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        recharge: {
            data: [],
            show: false
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.onPullDownRefresh();
        listener.addEventListener('user.recharge', this.onRechargeChange);
    },

    /**
     * 余额被改变
     */
    onRechargeChange: function (recharge) {
        this.data.card.recharge = recharge;
        this.setData({ card: this.data.card });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanUser/CardApi/getInfo.html", {}, (info) => {
            this.setData({ card: info });
        }, this, { completeAfter: wx.stopPullDownRefresh });
        requestUtil.get(API_URL + "/index.php?s=/addon/DuoguanUser/CardApi/getRechargeList.html", {}, (data) => {
            this.setData({ recharge_list: data });
        }, this, { completeAfter: wx.stopPullDownRefresh });
    },

    /**
     * 设置Page data 中的值
     */
    onSetValueTap: function (e) {
        const dataset = e.currentTarget.dataset, name = dataset.name, isMulti = dataset.isMulti || false;
        if (isMulti) {
            let values = JSON.parse(dataset.value);
            if (name) {
                const data = {};
                data[name] = Object.assign(this.data[name], values);
                this.setData(data);
            } else {
                for (let x in values) {
                    values[x] = Object.assign(this.data[x] || {}, values[x]);
                }
                this.setData(values);
            }
        } else {
            const value = dataset.value;
            const data = {};
            data[name] = value;
            this.setData(data);
        }
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
     * 充值
     */
    onRechargeSubmit: function (e) {
        const values = e.detail.value;
        requestUtil.pushFormId(e.detail.formId);
        if (requestUtil.isLoading(this.rechargeRQID)) return;

        const url = API_URL + "/index.php?s=/addon/Card/CardApi/recharge.html";
        this.rechargeRQID = requestUtil.get(url, values, (info) => {
            wx.requestPayment(_.extend(info, {
                success: (res) => {
                    wx.showToast({
                        title: '充值成功！',
                        duration: 1500,
                    });
                },
                fail: (res) => {
                    console.error(res);
                }
            }));
        });
    },

    /**
    * 跳转页面
    */
    onNavigateTap: function (e) {
        const url = e.currentTarget.dataset.url;
        wx.navigateTo({ url: url });
    },

    /**
     * 充值活动选择
     */
    onRechargeSelect: function (e) {
        const dataset = e.detail.target.dataset, index = dataset.index;
        requestUtil.pushFormId(e.detail.formId);
        if (requestUtil.isLoading(this.rechargeSelectID)) return;

        const conditions = this.data.recharge_list[index].conditions;
        if (conditions.length == 0) {
            wx.showModal({
                title: '温馨提示',
                content: '无法充值这个活动',
                showCancel: false,
            });
            return;
        }

        const url = API_URL + "/index.php?s=/addon/Card/CardApi/recharge.html";
        this.rechargeRQID = requestUtil.get(url, { money: conditions[0].condition }, (info) => {
            wx.requestPayment(_.extend(info, {
                success: (res) => {
                    wx.showToast({
                        title: '充值成功！',
                        duration: 1500,
                    });
                },
                fail: (res) => {
                    console.error(res);
                }
            }));
        });
    }

});