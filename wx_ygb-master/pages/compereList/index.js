import * as utils from '../../utils/util'
import * as api from './api'
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isHideCodePopup: true
    },

    /**
     * 生命周期函数--监听页面加载 
     */
    onLoad: function (options) {

        api.msgList(app.channel_code, app.program_code, (data) => {
            var compere = [];
            var {
                msgList,
                channelName,
                programName,
                banner,
                mpAccount,
                runtime
            } = data;


            utils.setPageTile(programName);

            if (msgList) {
                if (msgList.length) {
                    msgList.forEach((item) => {

                        item.icon = utils.getUrl(item.icon);
                        item.createTime = utils.time(item.createTime);

                        if (item.resourceType == 1) {
                            if (item.resource.images) {
                                item.resource.images = utils.split(item.resource.images).map((img) => utils.getUrl(img));
                                item.resource.imagesMore = item.resource.images.slice(0, 3);
                            }
                        }

                        if (item.resourceType == 2) {
                            item.isPlay = false;
                            if (item.resource) {
                                item.resource.url = utils.getUrl(item.resource.url);
                            }
                        }

                        if (item.resourceType == 3) {
                            if (item.resource) {
                                item.resource.poster = utils.getUrl(item.resource.poster);
                                item.resource.url = utils.getUrl(item.resource.url);
                            }
                        }

                        if (item.resourceType == 5) {
                            if (item.resource) {
                                item.resource.money = utils.toFixed(item.resource.money);
                            }
                        }

                        compere.push({
                            nickName: item.nickName,
                            icon: item.icon
                        });

                    });
                }
            }

            if (banner) {
                banner = utils.getUrl(banner);
            }

            compere = utils.uniqeByKeys(compere, ['nickName']);


            this.setData({
                compere,
                msgList,
                channelName,
                programName,
                banner,
                mpAccount,
                runtime
            });


        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.myAudio = wx.createInnerAudioContext();

        this.compereAudio = wx.createAudioContext('myAudio');

        // this.myAudio.onEnded(() => {
        //     var { msgList } = this.data;
        //     msgList.forEach((item, ind) => {
        //         if (item.resourceType == 2) {
        //             item.isPlay = false;
        //         }
        //     });
        //     this.setData({ msgList });
        // })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    hidePopup() {

        this.setData({
            isHideCodePopup: true
        });

    },

    showPopup() {

        this.setData({
            isHideCodePopup: false
        });

    },

    copyCode() {

        var { mpAccount } = this.data;

        wx.setClipboardData({
            data: mpAccount,
            success: (res) => {
                wx.showModal({
                    showCancel: false,
                    title: '提示',
                    content: '复制成功'
                });
            }
        })

    },

    playCompereVideo(e) {
        var { src, index } = e.currentTarget.dataset;
        var { resource, icon, nickName } = this.data.msgList[index];
        var { message, poster } = resource;

        var resouce = JSON.stringify({ message, icon, nickName, poster });

        if (src) {
            wx.navigateTo({
                url: `/pages/resouceVideo/index?src=${src}&resouce=${resouce}`
            });
        }


        //流量统计
        if (resource.resourceCode) {
            app.flowStatis(resource.resourceCode);
        }
    },

    checkImg(e) {
        var { imgarr, img, index } = e.currentTarget.dataset;
        // wx.previewImage({
        //     current: img,
        //     urls: imgarr // 需要预览的图片http链接列表
        // });

        var { msgList, programName } = this.data;
        var { resource } = msgList[index];
        //流量统计
        if (resource.resourceCode) {
            app.flowStatis(resource.resourceCode);
        }

        var toObj = JSON.stringify(msgList[index]);
        wx.navigateTo({
            url: `/pages/resouceImages/index?toObj=${toObj}&title=${programName}`,
        });
    },
    checkMap(e) {
        var { index } = e.currentTarget.dataset;
        var { resource } = this.data.msgList[index];
        if (!resource) return;
        var { latitude, longitude, address, message } = resource;
        wx.openLocation({
            latitude: latitude - 0,
            longitude: longitude - 0,
            address: address,
            name: message,
            scale: 28
        });
    },
    playVoice(e) {
        var { src, index } = e.currentTarget.dataset;
        var { msgList } = this.data;

        if (!this.myAudio.paused) {
            this.myAudio.stop();
        }


        // console.log(src);

        this.myAudio.src = src;
        this.myAudio.play();
        this.myAudio.onPlay(() => {
            msgList.forEach((item, ind) => {
                if (item.resourceType == 2) {
                    if (ind == index) {
                        item.isPlay = true;
                    } else {
                        item.isPlay = false;
                    }
                }
            });
            this.setData({ msgList });
        });

        this.myAudio.onError(() => {
            var obj = {};
            obj[msgList[index].isPlay] = false;
            this.setData(obj);
        });

        var { resource } = this.data.msgList[index];
        //流量统计
        if (resource.resourceCode) {
            app.flowStatis(resource.resourceCode);
        }
    },
    clickCompereToEntityDetail(e) {
        var { index } = e.currentTarget.dataset;
        var { resource } = this.data.msgList[index];
        if (!resource) return;
        var { lotteryEntitySendId } = resource;

        wx.navigateTo({
            url: `/pages/entityDetail/index?entityId=${lotteryEntitySendId}&title=${this.data.programName}&detail=true`
        });
    },
    clickCompereToDetail(e) {

        var { programName } = this.data;

        var { index } = e.currentTarget.dataset;
        var { resource } = this.data.msgList[index];
        if (!resource) return;
        var { lotteryRedpackSendId, advertiserName, advertiserIcon } = resource;

        var obj = JSON.stringify({
            status: 4, //红包详情进来
            id: lotteryRedpackSendId,
            advertiserName: advertiserName,
            advertiserIcon: advertiserIcon,
            title: programName
        });

        wx.navigateTo({
            url: `/pages/packageDetail/index?obj=${obj}`,
            complete: () => {

            }
        });
    },
    playedResourceCode: '',
    playCompereAudio(e) {
        var { src, index } = e.currentTarget.dataset;
        var { msgList } = this.data;

        msgList.forEach((item, ind) => {
            if (item.resourceType == 2) {
                if (ind == index) {
                    item.isPlay = !item.isPlay;
                    if (item.isPlay) {
                        console.log(111, item.resource.resourceCode);
                        if (this.playedResourceCode != item.resource.resourceCode) {
                            this.playedResourceCode = item.resource.resourceCode;
                            this.compereAudio.setSrc(src);
                        }
                        this.compereAudio.play();
                    } else {
                        this.compereAudio.pause();
                    }
                } else {
                    item.isPlay = false;
                }
            }
        });
        this.setData({ msgList });

        var { resource } = this.data.msgList[index];
        //流量统计
        if (resource.resourceCode) {
            app.flowStatis(resource.resourceCode);
        }
    },

    compereAudioEnd() {
        var { msgList } = this.data;
        msgList.forEach((item, ind) => {
            if (item.resourceType == 2) {
                item.isPlay = false;
            }
        });
        this.setData({ msgList });
    },

    toResouceAudio(e) {
        var { index } = e.currentTarget.dataset;
        var { msgList, programName } = this.data;
        var toObj = JSON.stringify(msgList[index]);
        wx.navigateTo({
            url: `/pages/resouceAudio/index?toObj=${toObj}&title=${programName}`,
        });
    }
})