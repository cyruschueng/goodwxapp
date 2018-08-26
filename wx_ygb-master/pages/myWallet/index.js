import config from '../../utils/config'
import * as utils from '../../utils/util'

var app = getApp();

let getUserRedpackList = (watermark, index, cb) => {
    wx.request({
        url: `${config.zc_url}/userCenter/getUserRedpackList`,
        method: 'POST',
        data: {
            watermark,
            index
        },
        success: (res) => {
            cb && cb(res.data);
        },
        fail: res => {
            console.log('userCenter/getUserRedpackList fail:', res);
        }
    });
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        canIUse: wx.canIUse('web-view'),
        money: 0,
        index: 1,
        totalPage: 1,
        recordsList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.getListData();

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
        this.getListData();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    getListData() {
        var { index, totalPage, recordsList } = this.data;

        if (index > totalPage) {
            console.log('没有数据了！');
            return;
        }

        app.getWatermark((watermark) => {

            getUserRedpackList(watermark, index, (res) => {

                var { money, records, totalRecord, totalPage } = res.data;

                money = utils.toFixed(money);

                if (records.length != 0) {
                    records.forEach((item) => {
                        item.money = utils.toFixed(item.money);
                        item.advertiserIcon = utils.getUrl(item.advertiserIcon);
                        recordsList.push(item)
                    });
                }

                index += 1;

                this.setData({ index, money, recordsList, totalRecord, totalPage });
            });

        });
    },
    toTx() {



        if (!this.data.canIUse) {
            wx.showModal({
                showCancel: false,
                title: '提示',
                content: '您的微信不是最新的，请升级到最新版本！'
            });
            return;
        }

        //==========================

        var { money } = this.data;

        if (money == 0) {
            wx.showModal({
                showCancel: false,
                title: '提示',
                content: '提现不满足条件！'
            });
            return;
        }

        if (this.isToTx) {
            return;
        }

        this.isToTx = true;

        wx.showLoading({
            title: '提现走起！',
        });

        app.getWatermark((watermark) => {
            wx.hideLoading();
            wx.navigateTo({
                url: `/pages/exchange/index?watermark=${watermark}`,
                complete: () => {
                    this.isToTx = false;
                }
            });
        })


    }
})