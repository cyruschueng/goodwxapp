const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

Page({
    data: {
        userInfo: {}
    },
    //加载完成后 读取用户信息
    onLoad: function () {
        app.getUserInfo({
            success: (info) => {
                const userInfo = typeof this.data.userInfo == "string" ? {} : this.data.userInfo || {};
                _.extend(userInfo, info);
                this.setData({ userInfo: info });
            }
        });
        this.onPullDownRefresh();
    },
    //下拉刷新
    onPullDownRefresh: function () {
        requestUtil.get(urls.member.info, { force: 1 }, (info) => {
            const userInfo = typeof this.data.userInfo == "string" ? {} : this.data.userInfo || {};
            _.extend(userInfo, info);
            this.setData({ userInfo: info });
        }, { completeAfter: wx.stopPullDownRefresh });
    },
    //数据被改变
    onBindDataChange: function (e) {
        const dataset = e.currentTarget.dataset, name = dataset.name, value = e.detail.value;
        const info = {};
        info[name] = value;
        this.setData(info);
    },
    //提交
    onPushSubmit: function (e) {
        if (requestUtil.isLoading(this.pushRQId)) return;
        const values = _.extend({
            form_id: e.detail.formId,
        }, e.detail.value);
        wx.request({
            url: urls.member.modify + "?UID=" + this.data.userInfo.uid,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: values,
            method: 'POST',
            success: function (res) {
                res = res.data;
                if ('OK' == res.RESULT) {
                    listener.fireEventListener('member.update');
                    wx.showToast({
                        title: '更新成功！',
                        icon: 'success',
                    });
                } else {
                    wx.showModal({
                        title: '温馨提示',
                        content: '保存失败，请联系管理员~',
                        showCancel: false,
                    })
                }
            },
            fail: function (res) {
                wx.showModal({
                    title: '温馨提示',
                    content: '保存失败，请联系管理员~',
                    showCancel: false,
                })
            },
        });
    },
});