import config from '../../utils/config'
import * as utils from '../../utils/util'

var app = getApp();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShowPage: false,
        tomain: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // setTimeout(() => {
        //     if (!this.data.tomain) {
        //         return;
        //     }
        //     wx.showModal({
        //         title: '提示',
        //         content: '去直播间看看吗？',
        //         confirmText: '去看看',
        //         cancelText: '不去',
        //         success: function (res) {
        //             if (res.confirm) {
        //                 wx.reLaunch({
        //                     url: '/pages/main/main',
        //                 })
        //             } else if (res.cancel) {
        //                 console.log('用户点击取消')
        //             }
        //         }
        //     })
        // }, 5000);
        wx.showShareMenu({
            withShareTicket: true
        });

        //status: 3,
        //{
        //  advertiserIcon:'',
        //  advertiserName: '',
        //  lotteryRedpackSendId:82,
        //  status: 3,
        //  totalMoney: 3
        //}

        // type: 0 / 主持人推送的消息， 点击详情
        // type: 1 / 群里点击进来的

        var { obj } = options;
        obj = JSON.parse(obj);
        this.setData({ obj });

        console.log(' 红包详情页的options.obj ', obj);


        if (obj.title) {
            utils.setPageTile(obj.title);
        }

        if (obj.status == 1) {

            // var obj = JSON.stringify({
            //     status:1,
            //     title,
            //     hasLottery,
            //     id,
            //     isLottery,
            //     money
            // });

            this.init(obj.id, 1);
            return;
        }

        if (obj.status == 2) {
            /**
              var obj = JSON.stringify({
                            advertiserIcon,
                            advertiserName,
                            lotteryRedpackSendId,
                            status,
                            totalMoney,
                            redpackId:options.redpackId
                        });
             */
            this.init(obj.lotteryRedpackSendId, 1);
            return;
        }
        if (obj.status == 3) {

            /**
              var obj = JSON.stringify({
                            advertiserIcon,
                            advertiserName,
                            lotteryRedpackSendId,
                            status,
                            totalMoney,
                            redpackId:options.redpackId
                        });
             */
            this.init(obj.lotteryRedpackSendId || obj.id, 1);
            return;
        }

        //点击主持人详情进来的
        this.init(obj.id, 0);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.data.tomain = true;
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        this.data.tomain = false;
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        this.data.tomain = false;
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        var { obj } = this.data;
        var share = {
            title: `${app.channelName || ''}正在发红包，数量不多了，快来抢~ `,
            path: `/pages/packagePopup/index?share=package&redpackId=${obj.redpackId}&banner=${obj.banner}&title=${obj.title}`,
            imageUrl: 'https://1251097942.cdn.myqcloud.com/1251097942/platform/miniApp/shake_broadcast_images/share-bg.png'
        };

        if (res.from === 'button') {
            share = {
                title: `${app.channelName || ''}正在发红包，数量不多了，快来抢~ `,
                path: `/pages/packagePopup/index?share=package&redpackId=${obj.redpackId}&banner=${obj.banner}&title=${obj.title}`,
                imageUrl: 'https://1251097942.cdn.myqcloud.com/1251097942/platform/miniApp/shake_broadcast_images/share-bg.png'
            };
        }

        return {
            title: share.title,
            path: share.path,
            imageUrl: share.imageUrl,
            success: (res) => {
                utils.wxShareMsg(res);
            },
            fail: (res) => {

            },
            complete: () => { }
        }
    },


    init(id, type) {

        app.getWatermark((watermark) => {
            wx.request({
                url: `${config.zc_url}/lotteryRedpack/getLotteryUser`,
                method: 'POST',
                data: {
                    watermark: watermark,
                    id: id,
                    type: type
                },
                success: (res) => {
                    wx.hideLoading();
                    console.log('列表 req:', JSON.stringify({
                        watermark: watermark,
                        id: id,
                        type: type
                    }));
                    console.log('列表 res:', res);

                    if (res.statusCode == 200) {
                        if (res.data.errCode != 0) {
                            wx.showModal({
                                title: '错误',
                                content: '抢红包人太多，先参与下直播互动吧',
                                showCancel: false,
                                success: function (res) {
                                    wx.reLaunch({
                                        url: '/pages/main/main',
                                    })
                                }
                            })
                            return;
                        }
                        var data = res.data.data;
                        var list = data.users;

                        this.setData({
                            totalMoneyStatus4: utils.toFixed(data.totalMoney),
                            moneyTotle: utils.toFixed(data.money),
                            advertiserIcon: utils.getUrl(data.advertiserIcon),
                            advertiserName: data.advertiserName,
                        });

                        if (list.length != 0) {

                            list.forEach((item) => {
                                item.money = utils.toFixed(item.money);
                            });

                            this.setData({
                                list
                            });
                        }
                    }

                    this.setData({
                        isShowPage: true
                    })
                },
                fail: res => {
                    wx.showModal({
                        title: '错误',
                        content: '抢红包人太多，先参与下直播互动吧',
                        showCancel: false,
                        success: function (res) {
                            wx.reLaunch({
                                url: '/pages/main/main',
                            })
                        }
                    })
                    console.log('lotteryRedpack/getLotteryUser fail:', req, res);
                }
            });
        });

    },

    toMain() {
        wx.reLaunch({
            url: `/pages/main/main?share=showMenu`,
            success: () => { }
        });
    }
})