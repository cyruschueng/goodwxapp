import * as api from './api'
import * as utils from '../../utils/util'

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShowPage: false,
        totalPage: 1,
        index: 1,
        recordsList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getPrizeList();
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
        this.getPrizeList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    getPrizeList() {

        var { index, totalPage, recordsList } = this.data;

        if (index > totalPage) {
            console.log('没有更多数据！');
            return;
        }

        app.getWatermark((watermark) => {
            api.getUserEntityList(watermark, index, (res) => {
                var { records, totalPage, totalRecord } = res.data;
                if (records) {
                    records.forEach((item) => {
                        item.entityIcon = utils.getUrl(item.entityIcon);
                        item.advertiserIcon = utils.getUrl(item.advertiserIcon);
                        recordsList.push(item);
                    });
                }

                index += 1;

                this.setData({ index, recordsList, totalPage, totalRecord, isShowPage: true })
            });
        });
    },

    toPrizeDetail(e) {
        // console.log(e)
        var { index } = e.currentTarget.dataset;
        var { recordsList: records } = this.data;
        var status = records[index].status;
        // 待领取
        if (status == 1) { this.oDlq(records[index]); }
        // 待发货
        if (status == 2) { this.oDfh(records[index]); }
        // 已发货
        if (status == 3) { this.oYfh(records[index]); }
        // 待自取
        if (status == 4) { this.oDzq(records[index]); }
        // 已领取
        if (status == 5) { this.oYlq(records[index]); }
        // 已过期
        if (status == 6) { this.oYgq(records[index]); }
    },
    oDlq(records) {
        // { entityId, title, address, phone, getType, entityName, advertiserName, entityIcon }

        console.log('当前项对象：', records)

        if (this.isODlq) {
            return;
        }
        this.isODlq = true;

        var { lotteryUserId, getType, entityName, advertiserName, entityIcon } = records;

        app.getWatermark((watermark) => {
            api.getUserEntityDetail(watermark, lotteryUserId, (res) => {

                var { getAddress, getPhone } = res.data;

                console.log('待领取：', res);

                var data = JSON.stringify({
                    entityId: lotteryUserId,
                    title: '领取奖品',
                    address: getAddress,
                    phone: getPhone,
                    getType,
                    entityName,
                    advertiserName,
                    entityIcon
                });

                wx.navigateTo({
                    url: `/pages/myPrizeSelectGet/index?data=${data}`
                });

                this.isODlq = false;

            });
        });

    },
    oDfh(records) {
        var { lotteryUserId } = records;

        wx.navigateTo({
            url: `/pages/myPrizeDfh/index?entityId=${lotteryUserId}`
        });

    },
    oYfh(records) {
        var { lotteryUserId } = records;

        wx.navigateTo({
            url: `/pages/myPrizeYfh/index?entityId=${lotteryUserId}`
        });
    },
    oDzq(records) {

        var { lotteryUserId } = records;

        wx.navigateTo({
            url: `/pages/myPrizeDzq/index?entityId=${lotteryUserId}`
        });
    },
    oYlq(records) {
        var { lotteryUserId } = records;

        wx.navigateTo({
            url: `/pages/myPrizeYlq/index?entityId=${lotteryUserId}`
        });
    },
    oYgq(records) {
        var { lotteryUserId } = records;

        wx.navigateTo({
            url: `/pages/myPrizeYgq/index?entityId=${lotteryUserId}`
        });
    }
})