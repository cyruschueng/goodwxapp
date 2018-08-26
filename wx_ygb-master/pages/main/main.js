import config from '../../utils/config'
import * as utils from '../../utils/util'
import * as api from './api'
import WebSocket from '../../utils/WebSocket'
import * as api_entity_detail from '../entityDetail/api'

var app = getApp();

// function mock() {
//     var arr = []
//     for (var i = 1; i < 1000; i++) {
//         arr.push({
//             userIcon: 'https://1251097942.cdn.myqcloud.com/1251097942/tv/scws/wozhidao/images/head/touxiang' + i + '.jpg',
//             userNickname: 'name' + i,
//             type: 36,
//             id: 'id' + i,
//             isTada: false,
//             advertiserName: '获得 ' + i,
//             entityName: '' + i,
//             money: 8.8 
//         })
//     }
//     return arr;
// }


Page({
    webSocket: null,
    data: {
        isHideLiveOverPopup: true,
        overPopupOnline: 0,
        online: 0, //在线人数
        entityZjPopup: true,
        entityMzjPopup: true,
        isShowMenu: false,
        entityTimer: null,
        topItemId: 'id0',
        entityArr: [],
        packageArr: [],
        scrollWinList: [],
        isHideEntityPopup: true,
        isHideEntityPopupAni: true,
        isHideQunQiangPopup: true,
        isHideQiangPopup: true,
        isHideQiangPopupAni: true,
        isHidePackageBtn: true,
        isWinHide: true,
        isTolower: false,
        listInput: [],
        listOutput: [],
        imgsInput: [],
        imgsOutput: [],
        inputValue: '',
        isRotateBanner: false,
        pageIsHide: true,
        websoketData: [],
        headAniTimer: null,
        itemId: 'id0',
        menuMoney: 0,
        loadend: false, //是否加载完成
        anchor: { anchorIcon: "" },
        isOnEnd: false
    },

    /**
     * 生命周期函数--监听页面加载
     * 
     */
    onLoad: function(options) {

        var { share } = options;
        this.setData({ share });

        this.onloadTimer = setTimeout(() => {
            if (this.data.loadend) {
                return;
            }
            wx.showModal({
                title: '提示',
                content: '网速过慢，重新进入下吧？',
                showCancel: false,
                success: function(res) {
                    wx.reLaunch({
                        url: '/pages/main/main',
                    })
                }
            })
        }, 10000);

        wx.showLoading({
            title: '获取直播数据',
        });

        console.log('======= 分割线 =======');

        //获取最新的5条聊天记录
        // this.setData({
        //     listOutput: topic.getTopicList(app.program_code)
        // });

        //获取页面基本信息
        this.pageInit(() => {

            //2.播放直播流
            this.liveAudioPlay();

            setTimeout(() => {
                //4.转盘缩小动画
                this.setData({
                    isChangeTop: true
                });

                //5.小头像动画
                if (!this.data.headAniTimer) {
                    console.log('headAniTimer', this.data.headAniTimer)
                    this.startTopHeadAni();
                }

                //定时器拉取
                this.onHeartbeat();

                //是否显示侧边栏
                if (options.share) {
                    setTimeout(() => {
                        this.shareShowMenu(options.share);
                    }, 600);
                }

                //mock数据顶部中奖滚动信息滚动
                // this.setData({
                //   packageArr: mock()
                // });

            }, 500);

            //3.获取用户授权信息， 并连接socket
            this.getUserInfoAndLinkSocket(() => {});
        });

        wx.showShareMenu({
            withShareTicket: true
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        console.log('main onReady');

        this.compereAudio = wx.createAudioContext('compereAudio');
        this.userAudio = wx.createAudioContext('userAudio');
        this.liveAudio = wx.createAudioContext('liveAudio');

        this.liveAudioPlay();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

        // this.liveAudioPlay();
        this.livePlay(this.isUserLivePlay);

        wx.hideLoading();

        if (this.webSocket) {
            console.log('isOpen:', this.webSocket.isOpen);
            if (!this.webSocket.isOpen) {
                app.getWatermark((watermark) => {
                    console.log("首页onshow获得水印", watermark);
                    this.linkSocket(watermark, () => {});
                });
            }
        }

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log('main onHide');

        this.compereAudio.pause();

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        console.log('main onUnload');

        this.isSocketLinked = false;
        if (this.webSocket) {
            clearInterval(this.webSocket.socketHandler);
            this.webSocket.socketHandler = null;

            this.webSocket.closeSocket();
        }

        if (this.data.headAniTimer) {
            clearInterval(this.data.headAniTimer);
            this.data.headAniTimer = null;
        }

        this.onloadTimer && clearTimeout(this.onloadTimer);

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
    onShareAppMessage: function(res) {

        let { lotteryEntity, lotteryRedpack, isHideQiangPopup, isHideEntityPopup, banner, title } = this.data;

        //分享逻辑
        //1、实物开奖 前 后
        //2、红包
        //3、其它
        let entityBefore = () => {
            var { advertiserName } = this.data.lotteryEntity;
            return {
                title: `${advertiserName || ''}正在发奖品,数量不多了,快来抢~`,
                imageUrl: 'https://1251097942.cdn.myqcloud.com/1251097942/platform/miniApp/shake_broadcast_images/entity-before-share.png',
                path: `/pages/entity/index?share=entity`
            }
        }

        let entityAfter = () => {
            var { advertiserName } = this.data.lotteryEntity;

            return {
                title: `快来看看${advertiserName || ''}发的中奖记录~`,
                imageUrl: 'https://1251097942.cdn.myqcloud.com/1251097942/platform/miniApp/shake_broadcast_images/entity-after-share.png',
                path: `/pages/entity/index?share=entity`
            }
        }

        /**
         * 
        let redpack = () => {
            let { redpackId } = this.data.lotteryRedpack;
            return {
                title: `${ this.data.channelName || ''}正在发红包，数量不多了，快来抢~`,
                imageUrl: 'https://1251097942.cdn.myqcloud.com/1251097942/platform/miniApp/shake_broadcast_images/share-bg.png',
                path: `/pages/main/main?share=package&redpackId=${redpackId}`,
                success: (res) => {
                    console.log('红包分享 res：', res);
                    console.log('红包分享 redpackId：', redpackId);
                    console.log('红包分享 app.scene：', app.scene);
                    utils.wxShareMsg(res);
                }
            }
        }
        */

        let redpack = () => {
            let { redpackId } = this.data.lotteryRedpack;
            return {
                title: `${this.data.channelName || ''}正在发红包,数量不多了,快来抢~`,
                imageUrl: 'https://1251097942.cdn.myqcloud.com/1251097942/platform/miniApp/shake_broadcast_images/share-bg.png',
                path: `/pages/packagePopup/index?share=package&redpackId=${redpackId}&banner=${banner}&title=${title}`,
                success: (res) => {
                    console.log('红包分享 res：', res);
                    console.log('红包分享 redpackId：', redpackId);
                    console.log('红包分享 app.scene：', app.scene);
                    utils.wxShareMsg(res);
                }
            }
        }

        let order = () => {

            var { banner, title } = this.data;

            return {
                title,
                imageUrl: banner,
                path: `/pages/main/main?share=order`
            }
        }

        // 红包分享
        if (!isHideQiangPopup) {
            return redpack();
        }

        // 实物前
        if (lotteryEntity.hasEntity && !isHideEntityPopup) {
            return entityBefore();
        }

        // 实物后
        if (lotteryEntity.hasEntity == false && !isHideEntityPopup) {
            return entityAfter();
        }

        // 其它状态
        return order();

    },

    //初始化
    pageInit(cb) {

        let parseData = (data, errorCode) => {
            console.log('errorCode:', errorCode)
            wx.hideLoading();
            this.data.loadend = true;
            //直播结束
            if (errorCode != 0) {

                try {
                    wx.removeStorageSync(app.program_code + '_watermark');
                } catch (e) {
                    // Do something when catch error
                }


                var { share, title } = this.data;

                if (share == 'showMenu') {
                    wx.reLaunch({
                        url: `/pages/mainUserCenter/index?title=${title}`
                    })
                } else {
                    this.liveEnd();
                }
                return;
            }

            console.log('初始化data:', data);


            if (data.channelName) {
                app.channelName = data.channelName;
            }

            //设置页面title
            if (data.title) {
                app.title = data.title;
                utils.setPageTile(data.title);
            } else {
                data.title = '';
            }

            if (data.anchor) {
                data.anchor.anchorIcon = utils.getUrl(data.anchor.anchorIcon);
            }

            //banner
            data.banner = utils.getUrl(data.banner)

            //电话数据
            data.hotline = JSON.parse(data.hotline);

            if (utils.isArray(data.hotline)) {
                data.phoneMsg = [];
                data.phoneNumber = [];
                data.hotline.forEach((item) => {
                    if (item.No && item.name) {
                        data.phoneMsg.push(item.name);
                        data.phoneNumber.push(item.No);
                    }
                });
            }
            console.log("是否有红包:", data.lotteryRedpack);
            //初始化红包
            if (data.lotteryRedpack) {
                //有红包
                if (data.lotteryRedpack.hasRedpack) {
                    var { maxMoney, advertiserIcon, money } = data.lotteryRedpack;
                    data.lotteryRedpack.maxMoney = utils.toFixed(maxMoney);
                    data.lotteryRedpack.allMoney = utils.toFixed(money);
                    data.lotteryRedpack.advertiserIcon = utils.getUrl(advertiserIcon);
                    this.setData({
                        isHidePackageBtn: false
                    });
                }
            }

            //初始化实物
            if (data.lotteryEntity) {

                var { entityIcon, advertiserIcon } = data.lotteryEntity;

                if (entityIcon) {
                    data.lotteryEntity.entityIcon = utils.getUrl(entityIcon);
                }

                if (advertiserIcon) {
                    data.lotteryEntity.advertiserIcon = utils.getUrl(advertiserIcon);
                }

                //是否有实物
                if (data.lotteryEntity.hasEntity) {
                    var { isJoin } = data.lotteryEntity;
                    var { fromShare } = this.data;



                    //显示实物按钮
                    this.setData({
                        isWinHide: false
                    });
                    if (fromShare != 'package') {

                        this.entityCountDown(data.lotteryEntity);
                        //是否报名实物
                        // if (!isJoin) {
                        //     this.setData({
                        //         isHideEntityPopup: false
                        //     });
                        // }
                    }
                }
            }

            app.issueCode = data.issueCode;

            this.setData(data);

            //1.显示页面
            this.setData({
                pageIsHide: false
            });

        };

        app.getWatermark((watermark) => {

            this.setData({ watermark });

            api.init(watermark, app.channel_code, app.program_code, (data, errorCode) => {
                parseData(data, errorCode);
                cb && cb();
            });

        });

    },

    //1.获取水印，
    //2.获取iv, encryptedData
    //3.调用user 接口
    //4.连接socket
    getUserInfoAndLinkSocket(cb) {

        let { watermark, listOutput } = this.data;

        let userApi = (watermark, encryptedData, iv) => {
            wx.request({
                url: `${config.https_url}/mini/user`,
                data: {
                    watermark: watermark,
                    encryptedData: encryptedData,
                    iv: iv
                },
                success: (res) => {
                    if (res.statusCode == 200) {
                        wx.hideLoading();
                        this.linkSocket(watermark, cb);
                    }
                },
                fail: (res) => {
                    console.log('/mini/user fail:', res);
                }
            });
        }

        let setDefaultUserInfo = (userInfo = {}) => {
            this.setData({
                icon: utils.getHeadSrc(userInfo.avatarUrl) || utils.randomImg(),
                nickName: userInfo.nickName || config.nickName
            });
        }

        wx.getUserInfo({
            lang: 'zh_CN',
            withCredentials: true,
            success: (res) => {
                //console.log('用户基本信息：', res);
                var { encryptedData, iv } = res;
                userApi(watermark, encryptedData, iv);
                setDefaultUserInfo(res.userInfo);

                //欢迎语
                this.welcomeSpeech();


            },
            fail: res => {
                console.log('wx.getUserInfo fail', res);
                this.linkSocket(watermark, cb);
                setDefaultUserInfo();
            }
        });

    },

    //连接socket
    isSocketLinked: false,
    linkSocket(watermark, cb) {
        var websocket_url = `${config.websocket_url}/${app.channel_code}/${app.program_code}/user/ws?id=${watermark}`;
        //console.log('socket 链接:', websocket_url);
        this.webSocket = new WebSocket({
            url: websocket_url,
            onMessage: res => {
                var data = JSON.parse(res.data);
                console.log('onMessage', data);
                this.onMessage(data);
                if (!this.isSocketLinked) {
                    this.isSocketLinked = true;
                    cb && cb();
                }
            },
            onHeartbeat: () => {
                //console.log("onHeartbeat");
            },
            debug: true
        });
    },
    //心跳回调
    onHeartbeat(cb) {
        //拉取数据
        var { issueCode } = this.data;
        if (!issueCode) {
            return;
        }
        wx.request({
            url: `${config.https_url}/mini/${app.channel_code}/${app.program_code}/heartbeat`,
            data: {
                issueCode
            },
            success: (res) => {

                // var lastImgsId = -1;
                var lastListId = -1;
                if (!res.data.data) {
                    return;
                }
                var { auditMessage, onlineMessage, online } = res.data.data;

                //在线人数
                this.setData({ online });

                // var { imgsOutput, imgsInput, listOutput, listInput } = this.data;
                var { listOutput, listInput } = this.data;

                //获取用户消息最后一个id
                if (listInput.length != 0) {
                    for (let c = listInput.length - 1; c >= 0; c--) {
                        if (listInput[c].resourceType == 0) {
                            lastListId = listInput[c].resource.id;
                            break;
                        }
                    }
                } else {
                    for (let y = listOutput.length - 1; y >= 0; y--) {
                        if (listOutput[y].resourceType == 0) {
                            lastListId = listOutput[y].resource.id;
                            break;
                        }
                    }
                }

                //console.log('最后一个的id:', lastListId);

                //获取用户头像最后一个id
                // if (imgsInput.length != 0) {
                //     if (imgsInput[imgsInput.length - 1]) {
                //         lastImgsId = imgsInput[imgsInput.length - 1].id
                //     }
                // } else {
                //     if (imgsOutput[imgsOutput.length - 1]) {
                //         lastImgsId = imgsOutput[imgsOutput.length - 1].id
                //     }
                // }

                if (res.statusCode == 200) {
                    if (auditMessage) {
                        //向用户消息内存中push数据 
                        for (var i = auditMessage.length - 1; i >= 0; i--) {
                            var auditMessageId = auditMessage[i].resource.id
                            if (auditMessageId > lastListId) {
                                this.onUserTextData(auditMessage[i]);
                            }
                        }
                    }

                    //向用户头像内存中push数据
                    if (onlineMessage) {
                        for (var j = onlineMessage.length - 1; j >= 0; j--) {
                            // var onlineMessageId = onlineMessage[j].id
                            // if (onlineMessageId > lastImgsId) {
                            //     this.onLineData(onlineMessage[j]);
                            // }
                            this.onLineData(onlineMessage[j]);
                        }
                    }
                }
            },
            fail: (res) => {

            },
            complete: (res) => {
                cb && cb();
            }
        });
    },
    //订阅消息
    onMessage(data) {


        let set = () => {
            data.id = utils.rdNum();
            if (data.identity != 'compere') {
                data.icon = utils.getHeadSrc(data.icon) || config.icon;
            }
            data.nickName = (data.nickName > 4 ? data.nickName.substr(0, 4) : data.nickName) || config.nickName;
        }


        // 实物抽奖倒计时
        if (data.type == 31) {
            this.showEntityBtn(data);
            return;
        }

        // 实物开奖 跳转页面
        if (data.type == 32) {
            var { lotteryEntity, title } = this.data;
            var { entityId } = data;
            if (lotteryEntity.isJoin) {
                //console.log('参加了活动,可以进去领取页面');
                // wx.navigateTo({
                //     url: `/pages/entityDetail/index?entityId=${ entityId }&title=${ title }`
                // });
                this.getDataFromPopup(entityId, (status) => {

                    this.setData({
                        isHideEntityPopup: true,
                        isHideQiangPopup: true,
                        isHideQiangPopupAni: true,
                        isHideQunQiangPopup: true
                    });
                    console.log("status=" + status);
                    if (status == 1) {
                        //中奖弹窗
                        this.setData({
                            entityZjPopup: false,
                            entityMzjPopup: true
                        })
                    } else if (status == 2) {
                        //未中奖
                        this.setData({
                            entityZjPopup: true,
                            entityMzjPopup: false
                        })
                    }

                });
            }
            return;
        }

        // 实物开奖信息 主持人
        if (data.resourceType == 6 && data.identity == 'compere') {
            this.showCompereEntity(data);
            return;
        }

        // 实物顶部滚动中奖消息
        if (data.type == 35) {
            set();
            this.entityWinData(data);
            return;
        }

        // 红包抽奖开始--显示红包按钮
        if (data.type == 33) {
            this.showPackageBtn(data);
            return;
        }

        // 红包结束, 含有主持人区域的 红包信息
        if (data.resourceType == 5 && data.identity == 'compere') {
            this.showPackageInfo(data);
            return;
        }

        //红包顶部滚动信息
        if (data.type == 36) {
            set();
            this.getPackageScrollData(data);
            return;
        }

        //这个红包结束了
        if (data.type == 38) {
            this.currentPackageOver();
            return;
        }

        // 用户进入房间
        if (data.type == 1 && data.action == 1) {
            this.onLineData(data);
            return;
        }

        // 用户退出房间
        // if (data.type == 1 && data.action == -1) {
        //     //this.offLineData(data);
        //     return;
        // }


        // type == 0 主持人消息
        if (data.type == 0 && data.identity == 'compere') {
            this.onCompereData(data);
            return;
        }

        // type == 0 用户文本消息
        if (data.type == 0 && data.identity == 'user') {
            if (data.resourceType == 0) {
                this.onUserTextData(data);
                return;
            }
        }
        console.log("data.type", data.type);
        //直播结束
        if (data.type == 2) {
            //var { banner, title } = this.data;
            //this.liveEnd(banner, title);
            this.liveOverPopup();
            this.liveAudio.pause();
        }

        //开播
        if (data.type == 3) {
            wx.reLaunch({
                url: `/pages/main/main`,
                success: () => {}
            });
        }



    },

    onLineData(data) {

        if (!data.icon) {
            return;
        }

        data.icon = utils.getHeadSrc(data.icon);

        var { imgsInput, imgsOutput } = this.data;
        var isPush = true;

        imgsInput.forEach((item) => {
            if (item.icon == data.icon) {
                isPush = false;
                //console.log('重复头像',data.icon );
                return;
            }
        });

        imgsOutput.forEach((item) => {
            if (item.icon == data.icon) {
                //console.log('重复头像',data.icon );
                isPush = false;
                return;
            }
        });

        //已经有相同的头像了
        if (!isPush) {
            return;
        }

        imgsInput.push(data);

        this.setData({
            imgsInput
        });

    },

    offLineData(data) {
        var { imgsOutput } = this.data;

        imgsOutput.forEach((item, index) => {
            if (data.icon == item.icon) {
                imgsOutput.shift(index, 1);
            }
        });

        this.setData({
            imgsOutput
        });

    },

    //顶部头像动画
    startTopHeadAni() {
        //定时插入头像
        let insetHead = () => {
            var { imgsInput, imgsOutput } = this.data;
            var data = imgsInput.shift();
            if (!data) return;
            //插到第一个位置
            imgsOutput.unshift(data);
            this.setData({ imgsOutput });

            data.timer = setTimeout(() => {
                clearTimeout(data.timer);
                data.timer = null;
                data.headAni = true;

                if (imgsOutput.length > 4) {
                    imgsOutput.pop();
                }

                this.setData({ imgsOutput });

            }, 100);
        }


        //定时插入列表
        let insetList = () => {
            var { listInput, listOutput } = this.data;
            var data = listInput.shift();
            if (!data) return;

            if (listOutput.length > 50) {
                listOutput.splice(0, 30);
            }

            listOutput.push(data);
            this.setData({ listOutput });
            //if (this.data.isTolower) {
            this.inputFocus();
            //}
        }

        //实物和红包的信息展示，优先展示实物中奖信息
        let isWin = true;
        let insetScrollWinData = () => {
            var { entityArr, packageArr, scrollWinList } = this.data;

            if (scrollWinList.length > 30) {
                scrollWinList.length = 0;
            }

            if (entityArr.length != 0) {
                var obj = entityArr.shift();
                scrollWinList.push(obj);

                this.setData({
                    scrollWinList,
                    topItemId: `id${scrollWinList[scrollWinList.length - 1].id}`
                });
                return;
            }

            if (packageArr.length != 0) {
                var obj = packageArr.shift();

                scrollWinList.push(obj);
                this.setData({
                    scrollWinList,
                    topItemId: `id${scrollWinList[scrollWinList.length - 1].id}`
                });

                setTimeout(() => {
                    var { scrollWinList } = this.data;
                    scrollWinList[scrollWinList.length - 1].isTada = true;
                    this.setData({ scrollWinList });
                }, 100);

            }
        }

        insetList();
        var time10 = true;
        this.data.headAniTimer = setInterval(() => {

            insetHead();
            insetList();
            insetScrollWinData();

            //10s 调一次
            if (time10) {
                time10 = false;
                setTimeout(() => {
                    this.onHeartbeat(() => {
                        time10 = true;
                    });
                }, 8 * 1000)
            }

        }, 1000 * 2);
    },

    onCompereData(data) {
        var _this = this;
        var { websoketData } = this.data;
        var keys = Object.keys(_this.filterData);
        websoketData.length = 0;

        function getData(d) {
            var data = null;
            for (var i = 0; i < keys.length; i++) {
                if (data = _this.filterData[keys[i]](d)) {
                    break;
                }
            }
            return data;
        }

        if (utils.isObject(data)) {
            var filterD = getData(data);
            websoketData.push(filterD);
            this.setData({
                websoketData,
                anchor: {
                    anchorName: data.nickName,
                    anchorIcon: data.icon
                }
            });
        }

        // if (utils.isArray(data)) {
        //     data.forEach((item, index, arr) => {
        //         websoketData.push(getData(item));
        //     });
        //     this.setData({ websoketData });
        // }
    },

    onUserTextData(data) {

        data.oId = utils.rdNum();
        if (!data.icon) {
            data.icon = config.icon;
        } else {
            data.icon = utils.getHeadSrc(data.icon);
        }

        var { listInput, listOutput } = this.data;

        //头像，名称，文本内容三者相同，不显示这条数据
        let uniqList = (list, data) => {
            for (let i = list.length - 1; i >= 0; i--) {
                let { icon, nickName, resource } = list[i];
                let { message } = resource;
                if (icon == data.icon && nickName == data.nickName) {
                    if (message == data.resource.message) {
                        return true;
                    }
                }
            }
        }

        if (uniqList(listInput, data)) {
            return;
        }

        if (uniqList(listOutput, data)) {
            return;
        }



        listInput.push(data);

        this.setData({ listInput });


        //topic.saveTopicList(data);

    },

    // 抽奖开始
    showPackageBtn(data) {

        var { lotteryRedpack } = this.data;

        data.advertiserIcon = utils.getUrl(data.advertiserIcon);
        data.maxMoney = utils.toFixed(data.maxMoney);
        data.allMoney = utils.toFixed(data.money);

        this.setData({
            'lotteryRedpack.redpackId': data.redpackId,
            'lotteryRedpack.advertiserName': data.advertiserName,
            'lotteryRedpack.advertiserIcon': data.advertiserIcon,
            'lotteryRedpack.maxMoney': data.maxMoney,
            'lotteryRedpack.allMoney': data.allMoney,
            isHidePackageBtn: false
        });
    },

    // 主持人消息类型---红包结果信息
    showPackageInfo(data) {
        // if (data.resource.lotteryRedpackSendId == this.data.lotteryRedpack.redpackId) {
        //     this.setData({
        //         isHidePackageBtn: true
        //     });
        // }


        var { websoketData } = this.data;
        websoketData.length = 0;

        if (data.resource) {
            data.resource.money = utils.toFixed(data.resource.money);
        }

        websoketData.push(data);

        this.setData({
            websoketData: websoketData
        });

    },
    //实物中奖信息
    entityWinData(data) {
        var { entityArr } = this.data;
        var { advertiserIcon } = data;
        data.advertiserIcon = utils.getUrl(advertiserIcon);
        data.userIcon = utils.getHeadSrc(data.userIcon);
        entityArr.push(data);
        this.setData({ entityArr });
    },

    //实物主持人推送
    showCompereEntity(data) {
        var { websoketData } = this.data;
        websoketData.length = 0;
        websoketData.push(data);
        this.setData({
            websoketData: websoketData
        });
    },

    //实物倒计时 31
    showEntityBtn(data) {
        this.setData({ isWinHide: false });
        var { lotteryEntity } = this.data;

        this.setData({
            'lotteryEntity.isJoin': false,
            'lotteryEntity.hasEntity': true,
            'lotteryEntity.advertiserIcon': utils.getUrl(data.advertiserIcon),
            'lotteryEntity.advertiserName': data.advertiserName,
            'lotteryEntity.entityIcon': utils.getUrl(data.entityIcon),
            'lotteryEntity.entityId': data.entityId,
            'lotteryEntity.time': data.time,
            'lotteryEntity.entityName': data.entityName
        });

        this.entityCountDown(data);
        this.setData({
            isWinHide: false,
            isHideEntityPopup: true
        });
    },

    //webSocket消息35 获取红包滚动信息
    getPackageScrollData(data) {
        var { packageArr, listInput } = this.data;

        if (listInput.length > 100) {
            return;
        }

        data.money = utils.toFixed(data.money);

        if (data.userIcon) {
            data.userIcon = utils.getHeadSrc(data.userIcon);
        } else {
            data.userIcon = utils.randomImg();
        }

        if (!data.userNickname) {
            data.userNickname = config.nickName;
        }

        packageArr.push(data);

        this.setData({ packageArr });
    },

    /**
     * 参加实物抽奖，
     */
    entityFormSubmit(event) {
        wx.showLoading({
            title: '报名中...',
        })
        if (this.isFormSubmit) {
            return;
        }
        this.isFormSubmit = true;

        var { formId } = event.detail;
        this.setData({
            'lotteryEntity.isJoin': true,
            entityJoinSuccess: null
        });
        app.getWatermark((watermark) => {
            api.addLotteryUser(watermark, formId, (res) => {
                wx.hideLoading();
                if (res.errCode == 0) {
                    this.setData({ entityJoinSuccess: true });
                    this.isFormSubmit = false;

                    setTimeout(() => {

                        this.hideHideEntityPopup();
                    }, 4 * 1000);
                }
            });
        });
    },

    // 点击抢红包
    showQiangPopup() {
        this.setData({
            isHideQiangPopup: false,
            isHideQiangPopupAni: false
        })
    },

    //隐藏抢红包弹窗
    hideQiangPopup() {
        this.setData({
            isHideQiangPopupAni: true
        });
        setTimeout(() => {
            this.setData({
                isHideQiangPopup: true
            });
        }, 500);
    },



    //消息类型
    //0.文本 1.图片 2.音频 3.视频 4.位置 5.红包 6.实物 7.卡券 
    filterData: {
        text(data) {
            if (data.resourceType != 0) return false;
            data.createTime = utils.time(data.createTime);
            data.icon = `${config.websocket_data_src}/${data.icon}`;
            return data;
        },
        image(data) {
            if (data.resourceType != 1) return false;
            data.createTime = utils.time(data.createTime);
            data.icon = `${config.websocket_data_src}/${data.icon}`;
            data.resource.images = utils.split(data.resource.images).map((img) => `${config.websocket_data_src}/${img}`);
            //data.resource.imagesMore = data.resource.images.slice(0, 3);
            return data;
        },
        voice(data) {
            if (data.resourceType != 2) return false;
            data.isPlay = false;
            data.createTime = utils.time(data.createTime);
            data.icon = `${config.websocket_data_src}/${data.icon}`;
            data.resource.url = `${config.websocket_data_src}/${data.resource.url}`;
            return data;
        },
        video(data) {
            if (data.resourceType != 3) return false;
            data.createTime = utils.time(data.createTime);
            data.icon = `${config.websocket_data_src}/${data.icon}`;
            data.resource.poster = `${config.websocket_data_src}/${data.resource.poster}`;
            data.resource.url = `${config.websocket_data_src}/${data.resource.url}`;
            return data;
        },
        location(data) {
            if (data.resourceType != 4) return false;
            data.createTime = utils.time(data.createTime);
            data.icon = `${config.websocket_data_src}/${data.icon}`;
            return data;
        }
    },

    //打电话
    call() {
        var { phoneNumber, phoneMsg, hotline, issueCode } = this.data;

        if (!phoneNumber) {
            console.log('没有电话数据');
            return;
        }

        wx.showActionSheet({
            itemList: phoneMsg,
            success: function(res) {

                var advertiserId = hotline[res.tapIndex].id

                wx.makePhoneCall({
                    phoneNumber: phoneNumber[res.tapIndex],
                    success: () => {
                        app.recordHotline(advertiserId, issueCode)
                    }
                })
            },
            fail: function(res) {
                console.log(res.errMsg)
            }
        });
    },

    //查看图片
    checkImg() {
        var { websoketData, title } = this.data;
        var { resourceCode } = websoketData[0].resource;
        // var images = websoketData[0].resource.images
        // wx.previewImage({
        //     current: images[0],
        //     urls: images // 需要预览的图片http链接列表
        // });

        //流量统计
        if (resourceCode) {
            app.flowStatis(resourceCode);
        }

        //去图片详情页
        var toObj = JSON.stringify(websoketData[0]);
        wx.navigateTo({
            url: `/pages/resouceImages/index?toObj=${toObj}&title=${title}`,
        });

    },

    //播放主持人语音
    currentAudioUrl: '',
    playCompereVoice() {
        var { websoketData } = this.data;
        var { url } = websoketData[0].resource;
        //是否播放
        if (websoketData[0].isPlay) {
            this.compereAudio.pause();
            websoketData[0].isPlay = false;
        } else {
            //播放
            websoketData[0].isPlay = true;
            if (this.currentAudioUrl != url) {
                this.currentAudioUrl = url;
                this.compereAudio.setSrc(url);
            }
            this.compereAudio.play();
        }

        this.setData({ websoketData });

        var { resourceCode } = websoketData[0].resource;

        //流量统计
        if (resourceCode) {
            app.flowStatis(resourceCode);
        }

    },

    //播放主持人视频
    playCompereVideo() {

        this.compereAudio.pause();

        var { websoketData } = this.data;
        var { resourceCode, message, url, poster } = websoketData[0].resource;
        var { icon, nickName } = websoketData[0];

        var resouce = JSON.stringify({ message, icon, nickName, poster })

        if (url) {
            wx.navigateTo({
                url: `/pages/resouceVideo/index?src=${url}&resouce=${resouce}`
            });
        }

        //流量统计
        if (resourceCode) {
            app.flowStatis(resourceCode);
        }
    },

    //查看地图
    checkMap() {
        var { websoketData } = this.data;
        var map = websoketData[0].resource;
        if (map) {
            wx.openLocation({
                latitude: map.latitude - 0,
                longitude: map.longitude - 0,
                address: map.address,
                name: map.message,
                scale: 28
            })
        }
    },


    //点击主持人推送的消息，去红包详情页
    clickCompereToDetail() {

        var { websoketData, title } = this.data;
        var { resource } = websoketData[0];

        var obj = JSON.stringify({
            status: 4,
            id: resource.lotteryRedpackSendId,
            advertiserName: resource.advertiserName,
            advertiserIcon: resource.advertiserIcon,
            title: title
        });

        wx.navigateTo({
            url: `/pages/packageDetail/index?obj=${obj}`,
            complete: () => {

            }
        });
    },

    //1主持人语音-开始播放
    compereAudioStart() {
        console.log('1主持人语音-开始播放');

        // this.compereAudio && this.compereAudio.pause();
        this.userAudio && this.userAudio.pause();
        // this.liveAudio && this.liveAudio.pause();

        this.livePlay(false);
        // this.setData({
        //     isRotateBanner: false
        // });

    },

    //主持人语音-暂停
    compereAudioPause() {
        console.log('主持人语音-暂停');

        //播放直播流
        if (this.data.liveUrl) {
            // this.liveAudio && this.liveAudio.play();
            // this.setData({
            //     isRotateBanner: true
            // });
            this.livePlay(true);
        }

        var { websoketData } = this.data;
        if (websoketData[0].isPlay) {
            websoketData[0].isPlay = false;
        }

        this.setData({ websoketData });

    },

    //主持人语音-播放完毕
    compereAudioEnd() {
        console.log('主持人语音-播放完毕');

        var { websoketData } = this.data;
        websoketData[0].isPlay = false;
        this.setData({ websoketData });

        this.livePlay(true);
    },

    //2用户语音-开始播放
    userAudioStart() {
        this.compereAudio && this.compereAudio.pause();
        // this.userAudio && this.userAudio.pause();
        // this.liveAudio && this.liveAudio.pause();

        this.livePlay(false);
    },

    //用户语音-播放完毕
    userAudioEnd() {

    },


    //直播流-开始播放
    liveAudioStart() {
        console.log('直播流-开始播放');

        this.compereAudio && this.compereAudio.pause();
        this.userAudio && this.userAudio.pause();
        // this.liveAudio && this.liveAudio.pause();
        // this.setData({
        //     isRotateBanner: true
        // });
    },

    //直播流-暂停
    liveAudioPause() {
        console.log('直播流-暂停');
        // this.setData({
        //     isRotateBanner: false
        // });
        // this.isFirstLivePlay = false;
    },

    //直播流-播放完毕
    liveAudioEnd() {
        console.log('直播流-播放完毕');
        // this.setData({
        //     isRotateBanner: false
        // });
        // this.isFirstLivePlay = false;
    },

    //直播流-play
    isFirstLivePlay: false,
    isUserLivePlay: false,
    liveAudioPlay() {
        // if (this.isFirstLivePlay && !isUserLivePlay) {
        //     console.log('已经在播直播流');
        //     return;
        // };
        // var { liveUrl } = this.data;
        // if (liveUrl && this.liveAudio) {
        //     this.isFirstLivePlay = true;
        //     this.liveAudio.setSrc(liveUrl);
        //     this.liveAudio.play();
        // }
    },

    compereAudioPlay() {
        console.log('1主持人语音-开始播放');

        // this.compereAudio && this.compereAudio.pause();
        this.userAudio && this.userAudio.pause();

        this.setData({
            isRotateBanner: false
        });
    },

    livePlay(isStart) {
        //用户开关控制
        if (!this.isUserLivePlay) {
            this.liveAudio && this.liveAudio.pause();
            this.setData({
                isRotateBanner: false
            });
            return;
        }
        //系统开关控制
        var { liveUrl } = this.data;
        if (isStart) {
            this.liveAudio && this.liveAudio.setSrc(liveUrl);
            this.liveAudio && this.liveAudio.play();
            this.setData({
                isRotateBanner: true
            });
        } else {
            this.liveAudio && this.liveAudio.pause();
            this.setData({
                isRotateBanner: false
            });
        }
    },

    //获取input输入框的值
    inputChange(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },

    sendInputData() {
        var { inputValue, icon, nickName, listOutput } = this.data;


        if (inputValue.trim()) {

            var id = utils.rdNum();

            var obj = {
                oId: id,
                type: -1,
                createTime: utils.time(new Date() - 0),
                icon: icon,
                identity: 'user',
                nickName: nickName,
                resource: {
                    message: inputValue,
                    resourceId: -1
                },
                resourceType: -1
            }

            listOutput.push(obj);

            this.webSocket.sendMessage(inputValue);

            var itemId = `id${id}`

            this.setData({
                itemId,
                inputValue: '',
                listOutput
            });

            //topic.saveTopicList(obj);

        }

    },

    //获得焦点
    inputFocus() {
        var { listOutput } = this.data;
        if (listOutput.length == 0) return;
        var obj = listOutput[listOutput.length - 1];
        if (obj) {
            this.setData({
                itemId: `id${obj.oId}`
            });
        }
    },
    //scroll 
    scrollView(e) {
        return;
        //this.data.isTolower = false;
    },
    //scroll-view滚动到底部
    scrollViewTolower(e) {
        this.data.isTolower = true;
    },

    //直播流暂停播放开关
    liveAudioSwitchBtn() {
        this.isUserLivePlay = !this.isUserLivePlay;
        if (this.isUserLivePlay) {
            this.livePlay(true);
        } else {
            this.livePlay(false);
        }

        // if (this.isFirstLivePlay) {
        //     //暂停
        //     this.isFirstLivePlay = false;
        //     this.liveAudio.pause();
        // } else {
        //     //播放
        //     this.isFirstLivePlay = true;
        //     this.liveAudio.play();
        // }
    },

    stopPropagation() {
        return;
    },

    packageAniCb() {
        console.log('回调')
    },

    //实物倒计时
    entityCountDown(data) {
        var { lotteryEntity, entityTimer } = this.data;
        if (entityTimer) {
            clearInterval(entityTimer);
            entityTimer = null;
        }
        entityTimer = setInterval(() => {
            // console.log(entityTimer)
            if (data.time <= 0) {
                clearInterval(entityTimer);
                entityTimer = null;
                this.entityCountDownCb();
                return;
            }
            data.time--;
            var t = utils.countDown(data.time);
            this.setData({
                'lotteryEntity.countDown': t,
                entityTimer
            })
        }, 1000);
    },

    //倒计时结束
    entityCountDownCb() {
        console.log('倒计时结束');
        var { lotteryEntity, title } = this.data;
        this.setData({
            isHideEntityPopup: true,
            'lotteryEntity.hasEntity': false,
            isWinHide: true
        });
    },

    hideHideEntityPopup() {
        this.setData({
            isHideEntityPopup: true
        });
    },

    showHideEntityPopup() {
        this.setData({
            isHideEntityPopup: false
        });
    },
    toCompereList() {

        if (this.data.isToCompereList) {
            return;
        }

        this.setData({
            isToCompereList: true
        });

        wx.navigateTo({
            url: `/pages/compereList/index`,
            success: () => {
                setTimeout(() => {
                    this.setData({
                        isToCompereList: false
                    });
                }, 1000)
            }
        });
    },

    // 去实物详情页
    clickCompereToEntityDetail() {
        var { resource } = this.data.websoketData[0];
        if (resource.lotteryEntitySendId) {
            wx.navigateTo({
                url: `/pages/entityDetail/index?entityId=${resource.lotteryEntitySendId}&title=${this.data.title}&detail=true`
            });
        }
    },

    /**
     * 侧滑菜单栏
     * 
     */
    showMenu() {

        this.setData({
            isShowMenu: true
        });

        app.getWatermark((watermark) => {
            api.getUserMoney(watermark, (res) => {
                var { money } = res.data;
                money = utils.toFixed(money);
                this.setData({
                    menuMoney: money
                });
            });
        });

    },

    //实物开奖
    getDataFromPopup(entityId, cb) {
        app.getWatermark((watermark) => {
            api_entity_detail.getLotteryUserInfo(watermark, entityId, (res) => {
                var lotteryEntityInfo = res.data;
                if (lotteryEntityInfo) {
                    this.setData({
                        entityPopup: {
                            lotteryUserId: lotteryEntityInfo.lotteryUserId,
                            getType: lotteryEntityInfo.getType,
                            address: lotteryEntityInfo.address,
                            phone: lotteryEntityInfo.phone,
                            status: lotteryEntityInfo.status,
                            entityName: lotteryEntityInfo.entityName,
                            entityIcon: utils.getUrl(lotteryEntityInfo.entityIcon),
                            advertiserIcon: utils.getUrl(lotteryEntityInfo.advertiserIcon),
                            advertiserName: lotteryEntityInfo.advertiserName,
                            num: lotteryEntityInfo.num
                        }
                    });
                }
                cb && cb(lotteryEntityInfo.status);
            });
        });
    },

    //实物立即领取
    entityGetBtn() {
        var { title } = this.data;
        var { lotteryUserId, address, phone, getType, entityName, advertiserName, advertiserIcon, entityIcon } = this.data.entityPopup;
        var data = JSON.stringify({ entityId: lotteryUserId, title, address, phone, getType, entityName, advertiserName, advertiserIcon, entityIcon })

        this.setData({
            entityZjPopup: true
        })

        wx.navigateTo({
            url: `/pages/myPrizeSelectGet/index?data=${data}`
        });
    },

    //隐藏实物没中奖弹窗
    closeEntityMzjPopup() {
        this.setData({
            entityMzjPopup: true
        });
    },

    //隐藏实物中奖弹窗
    closeEntityZjPopup() {
        this.setData({
            entityZjPopup: true
        });
    },

    liveEnd() {
        wx.reLaunch({
            url: `/pages/mainEnd/index`
        });
    },

    //添加欢迎语
    welcomeSpeech() {
        var { listOutput, anchor, nickName } = this.data;

        if (!nickName) {
            return;
        }

        listOutput.push({
            resourceType: -1,
            icon: anchor.anchorIcon,
            resource: {
                message: `欢迎${nickName}进入节目直播互动~`
            }
        });

        this.setData({ listOutput })
    },

    //是否显示侧边栏
    shareShowMenu(share) {
        if (share == 'showMenu') {
            this.showMenu();
        }
    },

    //语音详情
    toResouceAudio() {
        var { websoketData, title } = this.data;
        var toObj = JSON.stringify(websoketData[0]);
        wx.navigateTo({
            url: `/pages/resouceAudio/index?toObj=${toObj}&title=${title}`,
        });
    },

    //直播结束弹窗
    liveOverPopup() {
        var { online, overPopupOnline } = this.data;
        overPopupOnline = online;
        this.setData({
            overPopupOnline,
            isHideLiveOverPopup: false,
            isRotateBanner: false
        });
    },

    //去结束页面
    toMainEnd() {
        // var { banner, title } = this.data;
        this.liveEnd();
    },

    currentPackageOver() {
        this.setData({
            isHidePackageBtn: true,
            isHideQiangPopup: true
        })
    }


});