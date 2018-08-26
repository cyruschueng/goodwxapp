import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var APP_BASE = wxappServer;
var mta = require('../../../libs/mta_analysis.js');
Page({
    data: {
        valueLen: 0,
        done: false
    },
    onLoad() {
        mta.Page.init();
        if (!APP.globalData.sid) {
            APP.login();
        }  
    },
    inputEv(e) {
        this.setData({
            valueLen: e.detail.value.trim().length
        })
    },
    saveWx(e) {
        this.setData({
            wxValue: e.detail.value
        })
    },
    saveAd(e) {
        this.setData({
            adValue: e.detail.value
        })
    },
    complete() {
        setTimeout(() => {
            this.completeEv()
        }, 1000)
    },
    completeEv() {
        if (this.data.lock) {
            return
        }
        if (!this.data.wxValue) {
            wx.showToast({
                title: '微信号不能为空',
                duration: 2000
            })
            return
        }
        if (this.data.valueLen < 4) {
            wx.showToast({
                title: '优势不能少于4个字',
                duration: 2000
            })
            return
        }
        this.setData({
            lock: true
        })
        wx.request({
            url: APP_BASE + 'help/authvip/updateinfo',
            data: {
                sid: APP.globalData.sid,
                introduce: this.data.adValue,
                wechatId: this.data.wxValue
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: (res) => {
                mta.Event.stat("applyclickbtn",{})
                if (res.data.suc === '200') {
                    this.setData({
                        done: true
                    })
                } else if (res.data.errCode === 'WA_ERROR_20000028') {
                    wx.showToast({
                        title: '认证中，不可以更改信息a',
                        duration: 2000
                    })
                }
            },
            complete: () => {
                this.setData({
                    lock: false
                })
            }
        })
    }
})