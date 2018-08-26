import config from '../../utils/config'
import * as utils from '../../utils/util'
import * as api from './api'
import WebSocket from '../../utils/WebSocket'
import { checkStatus } from './api';

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hideToMainBtn: true,
        contentList: [],
        index: 0,
        isMore: true
    },
    //连接socket  
    linkSocket(watermark, cb) {
        var websocket_url = `${config.websocket_url}/${app.channel_code}/${app.program_code}/user/ws?id=${watermark}`;
        //console.log('socket 链接:', websocket_url);
        this.webSocket = new WebSocket({
            url: websocket_url,
            onMessage: res => {
                var data = JSON.parse(res.data);
                console.log('onMessage', data);
                //开播
                if (data.type == 3) {
                    this.toMain();
                }
            },
            debug: true
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // var { banner, title } = options;
        // banner = 'http://tmp.s.weshaketv.com/sam-service3/upload/broatcast/imgs/20171214/a517d182-f044-4e62-ba43-b8852572eaa7.png'
        // this.setData({ banner, title });
        // utils.setPageTile(title);

        this.getHistory();

        api.program({
            channelCode: app.channel_code,
            programCode: app.program_code,
            success: (res) => {
                var { banner, programName } = res;
                res.banner = utils.getUrl(banner);
                res.title = programName;
                this.setData(res);

                utils.setPageTile(programName);

                wx.hideLoading();

            }
        });


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

        // this.myAudioHtml = wx.createAudioContext('myAudioHtml');

        this.bgAudio = wx.getBackgroundAudioManager();


        this.bgAudio.onPlay(() => {
            wx.hideLoading();
        });

        this.bgAudio.onEnded(() => {
            var { contentList } = this.data;

            contentList.forEach((item) => {
                item.isPlay = false;
            });

            this.setData({ contentList });

        });


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        api.checkStatus(app.channel_code, app.program_code, (data, errorCode) => {
            if (errorCode == 0) {
                this.toMain();
            } else {
                if (this.webSocket && this.webSocket.isOpen) return;
                console.log("mainEnd", "onshow")
                app.getWatermark((watermark) => {
                    this.linkSocket(watermark, () => { });
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

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
        this.getHistory();
    },
    onUnload: function () {

        if (this.webSocket) {
            clearInterval(this.webSocket.socketHandler);
            this.webSocket.socketHandler = null;

            this.webSocket.closeSocket();
        }

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '经济之声那些年',
            path: '/pages/main/main',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    toIndex() {

    },
    toMy() {
        wx.navigateTo({
            url: `/pages/mainUserCenter/index?title=${this.data.title}`
        })
    },
    toMain() {

        this.setData({
            hideToMainBtn: false
        });

        wx.showModal({
            title: '提示',
            content: '直播开始了，是否观看直播？',
            cancelText: '暂时不去',
            confirmText: '去直播间',
            success: (res) => {
                if (res.confirm) {

                    wx.stopBackgroundAudio();
                    // wx.pauseBackgroundAudio();

                    wx.reLaunch({
                        url: `/pages/main/main`,
                        success: () => { }
                    });
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
    },
    //获取历史直播记录
    getHistory() {
        var { index, contentList, isMore } = this.data;

        if (!isMore) {
            return;
        }

        api.history({
            index,
            channelCode: app.channel_code,
            programCode: app.program_code
        }, (res) => {
            var { content, last, totalElements } = res;

            if (content.length == 0) return;

            content = content.map((li) => {
                return {
                    liveFullUrl: li.liveFullUrl,
                    issueCode: li.issueCode,
                    issueName: li.issueName,
                    liveUrl: li.liveUrl,
                    topic: li.topic,
                    startTime: utils.getNYR(li.startTime),
                    isPlay: false
                }
            });

            content.forEach((item) => {
                contentList.push(item);
            });
            this.setData({ totalElements, contentList, isMore: !last, index: index + 1 });
        });
    },

    //播放当前音频
    currentPlayUrl: '',
    play(e) {
        //索引
        var { index } = e.currentTarget.dataset;
        var { contentList, banner } = this.data;
        //播放地址
        var src = contentList[index].liveFullUrl || `${config.websocket_data_src}/${contentList[index].liveUrl}`;


        //播放
        contentList.forEach((item, ind) => {
            if (index == ind) {
                if (item.isPlay == true) {
                    item.isPlay = false;
                    this.bgAudio.pause();
                } else {
                    wx.showLoading({
                        title: '加载中…',
                    });
                    item.isPlay = true;
                    this.bgAudio.title = item.topic || item.issueName;
                    this.bgAudio.epname = item.issueName;
                    this.bgAudio.coverImgUrl = this.data.banner || '';
                    if (this.currentPlayUrl != src) {
                        console.log(src)
                        this.currentPlayUrl = src;
                        // this.setData({ src });
                        // this.myAudioHtml.src = src;

                        this.bgAudio.src = src;
                    }
                    this.bgAudio.play();

                    console.log(this.bgAudio);

                }
            } else {
                item.isPlay = false;
            }
        });

        this.setData({ contentList });
    },

    toMainPage() {
        wx.reLaunch({
            url: `/pages/main/main`,
            success: () => { }
        });
    }

})