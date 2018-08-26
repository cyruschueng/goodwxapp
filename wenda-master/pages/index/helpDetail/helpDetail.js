import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');

var animation = wx.createAnimation({
    duration: 80,
    timingFunction: 'linear',
    transformOrigin: '50% 50%'
})
var listenTimer = null;

Page({
    data: {
        score: [0, 0, 0, 0, 0],
        leftTime: 3,
        headimg: '../../../images/head.png',
        ifCreator: false,
        spareTime: '已解决',
        answerNum: [],
        pageNum: 1,
        imgsrc: imgServer + "wxapp/",
        play: false,
        headsrc: imgServer + 'waheadimg/',
        scoreText: ' ',
        imgServer: imgServer
    },
    scoreShow() {
        this.setData({
            scoreShow: true
        })
    },
    chooseScore(e) {
        let len = ++e.currentTarget.dataset.num;
        let scoreTextArr = ['一般般', '还可以', '有点用', '好用', '特别好用']
        let arr = [];
        for (let i = 0; i < 5; i++) {
            if (i < len) {
                arr[i] = 1;
            } else {
                arr[i] = 0;
            }
        }
        this.setData({
            score: arr,
            contentScore: len,
            scoreText: scoreTextArr[--len]
        })
    },
    onLoad(options) {
        mta.Page.init();
        wx.getSystemInfo({
            success: (res) => {
                this.setData({
                    windowHeight: res.windowHeight
                })
            }
        })
        wx.getStorageInfo({ //判断是否是第一次进入
            success: (res) => {
                for (let i in res.keys) {
                    if (res.keys[i] === "first") {
                        return
                    }
                }
                this.setData({
                    ruleShow: true
                })
                wx.setStorage({
                    key: "first",
                    data: true
                })
            }
        })
        if (options.helpId) {
            APP.globalData.helpId = options.helpId
        }
        if (options.publish) {
            this.setData({
                fromPublish: true
            })
        }
        this.audioCtx = wx.createAudioContext('question')
    },
    onShow() {
        if (this.data.refresh) { //防止查看大图回退刷新
            this.setData({
                refresh: false
            })
            return
        }
        APP.login(this.gainAll, this);
    },
    count() {
        let timer = setInterval(() => {
            this.setData({
                leftTime: --this.data.leftTime
            })
            if (this.data.leftTime === 0) {
                clearInterval(timer);
            }
        }, 1000)
    },
    shareTopHide() {
        this.setData({
            shareTopShow: true
        })
        setTimeout(() => {
            this.setData({
                shareTopShow: false
            })
        }, 1500)
    },
    gainData() {
        wx.request({
            url: APP_BASE + 'help/detail/' + APP.globalData.helpId,
            data: {
                sid: APP.globalData.sid
            },
            success: (res) => {
                if (res.data.suc === "200") {
                    this.setData({
                        ifOnlyMe: res.data.data.onlyMe,
                        detail: res.data.data.group,
                        ifMeReply: res.data.data.hasReplys,
                        ifReward: res.data.data.hasReward,
                        ifShare: res.data.data.shared
                    })
                    if (res.data.data.hasReward || res.data.data.payed) {
                        this.setData({
                            ifPayed: true
                        })
                    } else {
                        this.setData({
                            ifPayed: false
                        })
                    }
                    if (res.data.data.resUrls) {
                        this.setData({
                            questionImg: res.data.data.resUrls.split(",")
                        })
                    }

                    if (res.data.data.group.creatorImg) {
                        this.setData({
                            headimg: imgServer + 'waheadimg/' + res.data.data.group.creatorImg
                        })
                    }
                    if (res.data.data.group.status === 5) {
                        this.setData({
                            spareTime: '已过期'
                        })
                    } else if (res.data.data.group.status === 3 || res.data.data.group.status === 4) {
                        this.setData({
                            spareTime: '已解决',
                            status: 'done'
                        })
                    } else {
                        let newTime = 172800000 - (new Date() - res.data.data.group.createTime * 1000);
                        if (newTime > 3600000) {
                            this.setData({
                                spareTime: '剩余' + Math.round(newTime / 3600000) + '小时'
                            })
                        } else {
                            if (newTime < 0) {
                                this.setData({
                                    spareTime: '剩余0分钟'
                                })
                            } else {
                                this.setData({
                                    spareTime: '剩余' + Math.floor(newTime / 60000) + '分钟'
                                })
                            }
                        }
                    }
                    if (res.data.data.group.creatorId === APP.globalData.userId) {
                        this.setData({
                            ifCreator: true
                        })
                    } else {
                        this.setData({
                            ifCreator: false
                        })
                    }
                    if (res.data.data.group.answerCount > 0) {
                        this.setData({
                            ifReply: true
                        })
                        this.gainReply()
                    } else {
                        this.setData({
                            ifReply: false
                        })
                        if (this.data.detail.status < 3) {
                            this.buttonText();
                        }
                        if (this.data.detail.status === 5) {
                            this.gainOthers()
                        } else {
                            this.setData({
                                show: true
                            })
                            if (this.data.fromPublish) {
                                this.shareTopHide();
                            }
                            if (this.data.detail.status < 3) {
                                this.setAnimation = setInterval(() => {
                                    this.animateEv();
                                }, 80)
                            }
                        }
                    }
                } else if (res.data.errCode === 'WA_ERROR_20000019') {
                    wx.redirectTo({
                        url: '../helpTransition/helpTransition?keyword=s',
                    })
                }
            }
        })
    },
    gainOthers() {
        wx.request({
            url: APP_BASE + 'help/recommand',
            data: {
                sid: APP.globalData.sid
            },
            success: (res) => {
                let newList = res.data.data;
                newList.map(item => {
                    let newTime = 172800000 - (new Date() - item.createTime * 1000);
                    if (newTime > 3600000) {
                        item.createTime = '剩余' + Math.round(newTime / 3600000) + '小时'
                    } else {
                        item.createTime = '剩余' + Math.floor(newTime / 60000) + '分钟'
                    }
                })
                this.setData({
                    recoList: res.data.data,
                    show: true
                })
            }
        })
    },
    buttonText() {
        if (!this.data.ifCreator) {
            this.setData({
                buttonShow: true,
                buttonText: '回答（最高得7元）'
            })
        } else {
            if (this.data.ifShare) {
                this.setData({
                    buttonShow: true,
                    buttonText: '领取专属邀请卡'
                })
            } else {
                this.setData({
                    buttonShow: true,
                    buttonText: '邀请朋友回答'
                })
            }
        }
    },
    gainReply() {
        if ((this.data.status === 'done' && this.data.ifPayed) || this.data.ifCreator) {
            wx.request({
                url: APP_BASE + 'help/contentList',
                data: {
                    sid: APP.globalData.sid,
                    pageNum: this.data.pageNum,
                    pageSize: 2,
                    id: APP.globalData.helpId
                },
                success: (res) => {
                    this.toArray(res.data.data.list);
                    console.log(res.data.data.hasNextPage)
                    this.setData({
                        hasNextPage: res.data.data.hasNextPage,
                        contentList: res.data.data.list,
                        pageNum: ++this.data.pageNum
                    })
                    if (this.data.ifReward) {
                        this.setData({
                            buttonShow: true,
                            buttonText: '炫耀一下'
                        })
                    }
                    if (this.data.contentList.length === 0 && this.data.detail.status < 3) {
                        this.buttonText();
                    }
                    this.setData({
                        show: true
                    })
                }
            })
        } else {
            if (!this.data.ifMeReply) {
                if (this.data.detail.status < 3) {
                    this.buttonText();
                }
                this.setData({
                    show: true
                })
                return
            }
            wx.request({
                url: APP_BASE + '/help/myReply',
                data: {
                    sid: APP.globalData.sid,
                    id: APP.globalData.helpId
                },
                success: (res) => {
                    if (!res.data.data) {
                        return
                    }
                    let newarr = [];
                    newarr.push(res.data.data);
                    let newList = newarr;
                    this.toArray(newList);
                    this.setData({
                        contentList: newList,
                        hasNextpage: false
                    })
                    if (this.data.contentList.length === 0 && this.data.detail.status < 3) {
                        this.buttonText();
                    }
                    if (this.data.detail.status < 3) {
                        this.gainOthers()
                    } else {
                        this.setData({
                            show: true
                        })
                    }
                }
            })
        }
    },
    gainAll() {
        if (this.setAnimation) {
            clearInterval(this.setAnimation);
        }
        this.rotateI = 0;
        this.setData({
            contentList: [],
            pageNum: 1,
            answerNum: [],
            buttonShow: false,
            questionImg: [],
            show: false,
            score: [0, 0, 0, 0, 0],
            contentScore: 0,
            scoreText: ' '
        });
        this.gainData();
    },
    toArray: function (arr) {
        arr.map((item, index) => {
            let nowTime = new Date(item.createTime * 1000);
            if (item.resources !== '' && item.resources) {
                item.resources = item.resources.split(",");
            }
            item.flag = false;
            if (item.headimg) {
                item.headimg = imgServer + 'waheadimg/' + item.headimg;
            } else {
                item.headimg = '../../../images/head.png'
            }
            item.createTime = this.doubleDate(nowTime.getMonth() + 1) + "-" + this.doubleDate(nowTime.getDate()) + " " + this.doubleDate(nowTime.getHours()) + ":" + this.doubleDate(nowTime.getMinutes());
        })
    },
    doubleDate: function (num) {
        return num < 10 ? '0' + num : num
    },
    previewAnswer: function (e) {
        this.setData({
            refresh: true
        })
        let obj = e.currentTarget.dataset;
        this.previewImg(this.data.contentList[obj.num].resources, obj);
    },
    previewQuestion: function (e) {
        this.setData({
            refresh: true
        })
        this.previewImg(this.data.questionImg, e.currentTarget.dataset);
    },
    previewImg: function (newArr, obj) {
        let arr = newArr;
        arr.map((item, index) => {
            if (item.indexOf(imgServer) < 0) {
                arr[index] = imgServer + "wxapp/" + item;
            }
        })
        wx.previewImage({
            current: obj.src,
            urls: arr
        })
    },
    pay: function () {
        wx.request({
            url: APP_BASE + 'help/view/pay/' + APP.globalData.helpId,
            data: {
                sid: APP.globalData.sid
            },
            success: (res) => {
                mta.Event.stat("detailclickpay",{});
                let data = res.data.data.wxPay
                wx.requestPayment({
                    'timeStamp': data.timeStamp,
                    'nonceStr': data.nonceStr,
                    'package': data.pack,
                    'signType': data.signType,
                    'paySign': data.sign,
                    'success': (res) => {
                        APP.login(this.gainAll(), this);
                    }
                })
            },
        })
    },
    select: function (e) {
        mta.Event.stat("detailclickadopt",{});
        let key = 'contentList[' + e.currentTarget.dataset.num + '].flag';
        this.setData({
            [key]: !this.data.contentList[e.currentTarget.dataset.num].flag
        })
        let arr = this.data.answerNum;
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            if (arr[i] === e.currentTarget.dataset.num) {
                arr.splice(i, 1);
                this.setData({
                    answerNum: arr
                })
                return
            }
        }
        arr.push(e.currentTarget.dataset.num);
        this.setData({
            answerNum: arr
        })
    },
    end: function () {
        let selectAnswer = [];
        let selectUser = [];
        this.data.answerNum.map((item, index) => {
            selectAnswer.push(this.data.contentList[item].id);
            selectUser.push(this.data.contentList[item].userId);
        });
        if (this.data.answerNum.length === 0) {
            wx.showToast({
                title: '没有选中要答谢的人',
                icon: 'success',
                duration: 2000
            })
            return
        }
        wx.request({
            url: APP_BASE + 'help/complete',
            data: {
                sid: APP.globalData.sid,
                id: APP.globalData.helpId,
                selected: selectUser.join(","),
                contentIds: selectAnswer.join(",")
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                if (res.data.suc === "200") {
                    mta.Event.stat("detailclickapartmoney",{});
                    this.gainAll();
                } else {
                    wx.showToast({
                        title: '群求助状态已经关闭',
                        icon: 'success',
                        duration: 2000
                    })
                }
            }
        })
    },
    animateEv() {
        animation.rotate(6 * (++this.rotateI)).step();
        this.setData({
            animationData: animation.export()
        })
    },
    onReachBottom: function () {
        if (!this.data.hasNextPage || this.data.bottomLock) {
            return
        }
        this.setData({
            bottomLock: true
        })
        wx.request({
            url: APP_BASE + 'help/contentList',
            data: {
                sid: APP.globalData.sid,
                pageNum: this.data.pageNum,
                pageSize: 2,
                id: APP.globalData.helpId
            },
            success: (res) => {
                if (res.data.suc === '200') {
                    this.toArray(res.data.data.list);
                    let newList = this.data.contentList.concat(res.data.data.list);
                    this.setData({
                        contentList: newList,
                        pageNum: ++this.data.pageNum,
                        hasNextPage: res.data.data.hasNextPage,
                        bottomLock: false
                    })
                }
            }
        })
    },
    listenRecord() {
        if (!this.data.play) {
            this.audioCtx.play();
            listenTimer = setTimeout(() => {
                console.log(12)
                this.setData({
                    play: false
                })
            },this.data.detail.voiceDuration * 1000 + 1000)
        } else {
            clearTimeout(listenTimer)
            this.audioCtx.seek(0);
            this.audioCtx.pause();
        }
        this.setData({
            play: !this.data.play
        })
    },
    onShareAppMessage(res) {
        if (this.data.ifCreator) {
            mta.Event.stat("detailclickshareb",{})
        } else {
            mta.Event.stat("detailclicksharec",{});
        }
        wx.request({
            url: APP_BASE + 'help/shareQuestion',
            data: {
                sid: APP.globalData.sid,
                questionId: APP.globalData.helpId
            },
            success: (res) => {
                if (res.data.suc === '200') {
                    if (!this.data.ifShare) {
                        this.setData({
                            ifShare: true
                        })
                        if (this.data.creator) {
                            this.buttonText();
                        }
                    }
                }
            }
        })
        var title = '';
        if (this.data.status === 'done') {
            if (this.data.ifCreator) {
                title = '我收到了超值10元的问答，快来看看';
            } else {
                if (this.data.ifReward) {
                    title = '我参与了红包问答，得了一个大红包！6不6？';
                } else {
                    title = '我分享你一个价值10元的问答，快来看吧！';
                }
            }
        } else if (this.data.detail.status < 3) {
            if (this.data.ifCreator) {
                title = '您收到了一份红包问答，点击领取';
            } else {
                title = '邀请你帮我回答一个问题，给红包！';
            }
        } else if (this.data.detail.status === 5) {
            var title = '高手快来！我遇到一个没人能答的问题。';
        }
        return (this.shareEv(title))
    },
    shareEv(title) {
        return {
            title,
            desc: '回答赚大钱，分享赚小钱',
            path: '/pages/index/helpDetail/helpDetail?helpId=' + APP.globalData.helpId
        }
    },
    buttonEv() {
        switch (this.data.buttonText) {
            case '回答（最高得7元）':
                mta.Event.stat("detailclickanswerc",{});
                wx.navigateTo({
                    url: '../helpCommit/helpCommit'
                })
                break;
            case '领取专属邀请卡':
                this.gainCard();
                break;
            case '炫耀一下':
                mta.Event.stat("detailclickshowc",{});
                this.shareTopHide();
                break;
            default:
                this.shareTopHide();
        }
    },
    onPullDownRefresh() {
        APP.login(this.gainAll, this);
        wx.stopPullDownRefresh();
    },
    hideRule() {
        this.setData({
            ruleShow: false
        })
    },
    showRule() {
        if (this.data.ifCreator) {
            mta.Event.stat("detailclickrulesb",{});
        } else {
            mta.Event.stat("detailclickrulesc",{});  
        }
        this.setData({
            ruleShow: true
        })
    },
    scoreItem(e) {
        mta.Event.stat("detailclickevaluate",{});
        this.setData({
            scoreShow: true,
            scoreItemId: e.currentTarget.dataset.id,
            scoreItemIndex: e.currentTarget.dataset.num
        })
    },
    scoreHide() {
        this.setData({
            scoreShow: false,
            score: [0, 0, 0, 0, 0],
            contentScore: 0,
            scoreText: ' '
        })
    },
    completeScore() {
        if (this.data.scoreLock) {
            return
        }
        this.setData({
            scoreLock: true
        })
        wx.request({
            url: APP_BASE + 'help/evaluate',
            data: {
                sid: APP.globalData.sid,
                id: APP.globalData.helpId,
                level: this.data.contentScore,
                contentId: this.data.scoreItemId
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                let newList = this.data.contentList;
                newList[this.data.scoreItemIndex].contentLevel = this.data.contentScore;
                this.setData({
                    scoreShow: false,
                    scoreLock: false,
                    contentList: newList,
                    score: [0, 0, 0, 0, 0],
                    contentScore: 0,
                    scoreText: ' '
                })
            }
        })
    },
    otherQue(e) {
        mta.Event.stat("detailclickrecomendc",{});
        APP.globalData.helpId = e.currentTarget.dataset.id;
        APP.login(this.gainAll, this);
    },
    toMine(e) {
        if (this.data.ifCreator) {
            mta.Event.stat("detailclickpersonpageb",{});
        } else {
            mta.Event.stat("detailclickpersonpagec",{});
        }
        wx.navigateTo({
            url: '../../owner/helpPerson/helpPerson?userId=' + e.currentTarget.dataset.id,
        })
    },
    gainCard() {
        if (this.data.ifCreator) {
            mta.Event.stat("detailclickinvitecardb",{})
        } else {
            mta.Event.stat("detailclickinvitecardc",{});
        }
        wx.navigateTo({
          url: '../helpInviteCard/helpInviteCard'
        })
    }
})