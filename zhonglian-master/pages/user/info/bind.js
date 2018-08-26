const app = getApp();
import _ from '../../../utils/underscore';
import util from '../../../utils/util';
import listener from '../../../utils/listener';
import { urls } from '../../../utils/data';
import requestUtil from '../../../utils/requestUtil';

function showMsg(content) {
    wx.showModal({
        content: content,
        showCancel: false,
    });
}

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
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        requestUtil.inBindAccount = false;
        listener.fireEventListener('user.bind');
    },

    /**
     * 提价数据
     */
    onSubmit: function (e) {
        if (this.submitRQId) return;
        const values = e.detail.value;
        values.form_id = e.detail.formId;
        values.open_id = wx.getStorageSync('open_id');

        if (values.username == '') {
            showMsg('用户名不为空！'); return;
        }
        if (values.pwd == '') {
            showMsg('密码不为空！'); return;
        }
        if (values.repwd == '') {
            showMsg('确认密码不为空！'); return;
        }
        if (values.repwd != values.pwd) {
            showMsg('两次密码不一致！'); return;
        }

        this.submitRQId = new Date().getTime();
        wx.request({
            url: urls.member.bind,
            data: values,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
                const data = res.data;
                if (data.status == 1) {
                    const info = data.data, utoken = info.utoken;
                    wx.setStorageSync("utoken", utoken);
                    app.globalData.utoken = utoken;
                    app.globalData.userInfo = info;
                    listener.fireEventListener('user.bind');
                    wx.navigateBack({});
                } else {
                    wx.showModal({
                        content: data.info,
                        showCancel: false,
                    });
                }
            },
            fail: function (res) { },
            complete: (res) => { this.submitRQId = 0; },
        });
    },
})