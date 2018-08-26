// pages/pay-success/pay-success.js
import listener from '../../../utils/listener';

Page({

    /**
     * 用户信息
     */
    userInfo: null,

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
        listener.fireEventListener('user.get_info', [this.userInfo]);
    },

    /**
     * 获取用户权限-兼容老版本
     */
    onUserInfoTap: function (e) {
        if (wx.canIUse('button.open-type.getUserInfo')) return;
        wx.openSetting({
            success: (res) => {
                if (!res.authSetting['scope.userInfo']) return;
                wx.getUserInfo({
                    success: (res) => {
                        this.userInfo = res.userInfo;
                        wx.navigateBack();
                    },
                });
            },
        });
    },

    /**
     * 获取用户信息（version:1.4.4）
     */
    onUserInfo: function (e) {
        // console.log("userinfo", e);
        const detail = e.detail;
        if (!detail.userInfo) {
            console.error("授权失败：", e);
        } else {
            this.userInfo = detail.userInfo;
            wx.navigateBack();
        }
    }

})