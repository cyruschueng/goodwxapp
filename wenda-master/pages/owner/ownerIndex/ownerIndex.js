import { server, imgServer, wxappServer } from '../../../libs/config.js';
var APP = getApp();
var mta = require('../../../libs/mta_analysis.js');
Page({
    data: {
        headImg: '',
        headName: '',
        ifAuth: '',                  //是否认证
        authContent: '',             //认证内容
        infoNum: '',                 //信息数
        ifShowInfo: '',             //是否展现信息数
        ifShowRedInfo: '',        // 是否展现红点
        account: '',            //赚取多少钱
        isSubmitAuth: '' ,     //申请认证提交状态,
        authText: '申请认证'
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        //String2
        mta.Page.init();
        this.setData(
            {
                headImg: APP.globalData.userInfo.avatarUrl,
                headName: APP.globalData.userInfo.nickName
            }
        )
        // this.gainAuthData();
        // this.gainInfoNum();
        // this.gainAccount();
    },
    onShow: function () {
        mta.Event.stat("indexowner",{});
        this.gainAuthData();
        this.gainInfoNum();
        this.gainAccount();
    },
    gainAuthData: function () {
        wx.request({
            url: wxappServer + 'help/user/' + APP.globalData.userId,
            data: {
                sid: APP.globalData.sid
            },
            success: (res) => {
                let data = res.data;
                let authText = '';
                if (data.suc === '200') {
                    if (data.data.isSubmitAuth) {
                        authText = '认证中';
                    }
                    else  {
                        if (data.data.isAuthVip) {
                            authText = '编辑认证';
                        }
                        else {
                            authText = '申请认证';
                        } 
                    }
                    this.setData({
                        ifAuth: data.data.isAuthVip,
                        isSubmitAuth: data.data.isSubmitAuth,
                        authContent: data.data.introduce,
                        authText: authText
                    })
                }

            },
        })
    },
    gainInfoNum: function () {
        wx.request({
            url: wxappServer + 'help/groupnotice/getunreadnum',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                sid: APP.globalData.sid
            },
            success: (res) => {
                let data = res.data;
                if (data.suc === '200') {
                    let infoNum = '';
                    let ifShowInfo = false;
                    let ifShowRedInfo = false;
                    if (data.data.sign) {
                        infoNum = data.data.sign;
                        ifShowInfo = true;
                    }
                    else if (data.data.UnReadNum) {
                        ifShowRedInfo = true;
                    }
                    this.setData({ infoNum, ifShowInfo, ifShowRedInfo })
                }
            },
        })
    },
    gainAccount: function () {
        wx.request({
            url: wxappServer + 'help/account/total',
            data: {
                sid: APP.globalData.sid
            },
            success: (res) => {
                let data = res.data;
                if (data.suc === '200') {
                    this.setData({
                        account: data.data / 100
                    })
                }

            },
        })
    },
    authEv: function (ev) {
        if (ev.target.dataset.flag) {
            return;
        }
        mta.Event.stat("ownerclickapplyvip",{});
        wx.navigateTo({
            url: '../applyVip/applyVip'
        })
    },
    walletEv: function () {
        mta.Event.stat("ownerclickwallet",{});
        wx.navigateTo({
            url: '../ownerWallet/ownerWallet'
        })
    },
    quesEv: function () {
        mta.Event.stat("ownerclickpersonthings",{});
        wx.navigateTo({
            url: '../myHelpList/myHelpList'
        })
    },
    infoEv: function () {
        mta.Event.stat("ownerclickinfo",{})
        wx.navigateTo({
            url: '../helpMessage/helpMessage'
        })
    }
})