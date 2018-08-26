import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');
Page({
    data: {
        show: false,
        pageNum: 1,
        listType: 0
    },
    onLoad: function () {
        mta.Page.init();
    },
    doubleDate: function (num) {
        return num < 10 ? '0' + num : num
    },
    gainMine(str, num, ifClick) {
        if(this.data.listType !== num) {
            this.setData({
                listType: num,
                pageNum: 1,
                list: []
            })
        } else if (this.data.listType === num && ifClick) {
            return
        }
        if (ifClick) {
            this.setData({
                show: false
            })
        }
        wx.request({
            url: APP_BASE + 'help/' + str + '/' + this.data.pageNum + '/10',
            data: {
                sid: APP.globalData.sid
            },
            success: (res) => {
                if (res.data.suc === '200') {
                    let arr = res.data.data.list;
                    arr.map((item) => {
                        if (this.data.listType === 1) {
                            var nowTime = new Date(item.createTime * 1000);
                            switch (item.status) {
                                case 0:
                                    item.statusText = '未解决';
                                    break;
                                case 1:
                                    item.statusText = '已解决';
                                    break;
                                case 2:
                                    item.statusText = '已过期';
                                    break;
                            }
                        } else if (this.data.listType === 2) {
                            var nowTime = new Date(item.answerTime * 1000);
                            switch (item.accept) {
                                case 0:
                                    item.statusText = '未结束';
                                    break;
                                case 1:
                                    item.statusText = '未被采纳';
                                    break;
                                case 2:
                                    item.statusText = '被采纳';
                                    break;
                            }
                        } else {
                            var nowTime = new Date(item.shareTime * 1000);
                            item.statusText = item.answerCount + '人回答被采纳';
                        }
                        item.createTime = this.doubleDate(nowTime.getMonth() + 1) + "-" + this.doubleDate(nowTime.getDate()) + " " + this.doubleDate(nowTime.getHours()) + ":" + this.doubleDate(nowTime.getMinutes());
                    });
                    if (this.data.list.length) {
                        let newArr = this.data.list;
                        newArr = newArr.concat(arr);
                        this.setData({
                            list: newArr
                        })
                    } else {
                        this.setData({
                            list: arr
                        })
                    }
                    this.setData({
                        hasNextPage: res.data.data.hasNextPage,
                        show: true,
                        pageNum: ++this.data.pageNum,
                        bottomLock: false
                    })
                }
            },
        })
    },
    gainMyQuestion() {
        if (this.data.btnLock) {
            return
        }
        this.setData({
            btnLock: true
        })
        setTimeout(() => {
            this.setData({
                btnLock: false
            })
        }, 1000)
        mta.Event.stat("myhelpclickproblem",{});
        this.gainMine('myQuestions', 1, true);
    },
    gainMyAnswer() {
        if (this.data.btnLock) {
            return
        }
        this.setData({
            btnLock: true
        })
        setTimeout(() => {
            this.setData({
                btnLock: false
            })
        }, 1000)
        mta.Event.stat("myhelpclickanswer",{});
        this.gainMine('myAnswers', 2, true);
    },
    gainMyShare() {
        if (this.data.btnLock) {
            return
        }
        this.setData({
            btnLock: true
        })
        setTimeout(() => {
            this.setData({
                btnLock: false
            })
        }, 1000)
        mta.Event.stat("myhelpclickshare",{});
        this.gainMine('myShares', 3, true);
    },
    onShow() {
        APP.login(this.gainMyQuestion, this);
    },
    toDetail(e) {
        APP.globalData.helpId = e.currentTarget.dataset.id;
        wx.navigateTo({
          url: '../../index/helpDetail/helpDetail',
        })
    },
    onReachBottom: function () {
        if (!this.data.hasNextPage || this.data.bottomLock) {
            return
        }
        this.setData({
            bottomLock: true
        })
        switch (this.data.listType) {
            case 1:
                this.gainMine('myQuestions', 1);
                break;
            case 2:
                this.gainMine('myAnswers', 2);
                break;
            case 3:
                this.gainMine('myShares', 3);
                break;
        }
    }
})