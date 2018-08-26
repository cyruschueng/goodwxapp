import * as utils from '../../utils/util'
import * as api from './api'

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        var { entityId, title, detail } = options;

        this.setData({
            detail,
            entityId,
            title
        });

        utils.setPageTile(title);


        //1.互动页点击主持人推送的消息按钮进来的
        //2.主持人列表
        if (detail == 'true') {
            this.getDataFromDetail(entityId);
        } else {
            this.getDataFromPopup(entityId);
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        var {
            entityId,
            title,
            advertiserName
        } = this.data;
        return {
            title: `快来看看${advertiserName}发的中奖记录~`,
            imageUrl: 'https://1251097942.cdn.myqcloud.com/1251097942/platform/miniApp/shake_broadcast_images/entity-after-share.png',
            path: `/pages/entity/index?entityId=${entityId}&title=${title}`
        }
    },


    getDataFromPopup(entityId) {
        app.getWatermark((watermark) => {
            api.getLotteryUserInfo(watermark, entityId, (res) => {
                var lotteryEntityInfo = res.data;
                if (lotteryEntityInfo) {
                    var { users } = lotteryEntityInfo;
                    this.setData({
                        lotteryUserId: lotteryEntityInfo.lotteryUserId,
                        getType: lotteryEntityInfo.getType,
                        address: lotteryEntityInfo.address,
                        phone: lotteryEntityInfo.phone,
                        status: lotteryEntityInfo.status,
                        entityName: lotteryEntityInfo.entityName,
                        entityIcon: utils.getUrl(lotteryEntityInfo.entityIcon),
                        advertiserIcon: utils.getUrl(lotteryEntityInfo.advertiserIcon),
                        advertiserName: lotteryEntityInfo.advertiserName,
                        users,
                        num: lotteryEntityInfo.num
                    });
                }

            });
        });
    },
    getDataFromDetail(entityId) {
        app.getWatermark((watermark) => {
            api.getLotteryUserList(watermark, entityId, (res) => {
                var lotteryEntityInfo = res.data;
                if (lotteryEntityInfo) {
                    var { users } = lotteryEntityInfo;
                    this.setData({
                        lotteryUserId: lotteryEntityInfo.lotteryUserId,
                        getType: lotteryEntityInfo.getType,
                        address: lotteryEntityInfo.address,
                        phone: lotteryEntityInfo.phone,
                        status: lotteryEntityInfo.status,
                        entityName: lotteryEntityInfo.entityName,
                        entityIcon: utils.getUrl(lotteryEntityInfo.entityIcon),
                        advertiserIcon: utils.getUrl(lotteryEntityInfo.advertiserIcon),
                        advertiserName: lotteryEntityInfo.advertiserName,
                        users,
                        num: lotteryEntityInfo.num
                    });
                }

            });
        });
    },
    get() {
        var { lotteryUserId, title, address, phone, getType, entityName, advertiserName,advertiserIcon, entityIcon } = this.data;

        var data = JSON.stringify({ entityId: lotteryUserId, title, address, phone, getType, entityName, advertiserName, advertiserIcon, entityIcon })

        wx.navigateTo({
            url: `/pages/myPrizeSelectGet/index?data=${data}`
        });
    }
})