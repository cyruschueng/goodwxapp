import util from "../../../utils/util"
import { prizeApi } from '../../../utils/api/prizeApi.js';
import { userApi } from '../../../utils/api/userApi.js';

var app = getApp();
Page({
    data: {
        amount: '',
        authorid: '',
        KeyInput: '',
        btnColor: true,
        setmoney: true,
        argsdata:''
    },
    onLoad: function (options) {
        // 接口类
        let that = this;
        that.userApi = new userApi(that);
        that.prizeApi = new prizeApi(that);
        that.data.amount = options.amount;
        that.data.authorid = options.authorid;
        // console.log(that.data.amount)
        that.setData({
            amount: that.data.amount,
        });
    },

    onReady: function () {
        var that = this;
        // 设置屏幕
        wx.getSystemInfo({
            success: function (res) {
                // console.log(res);
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },
    bindKeyInput: function (e) {
        var that = this;
        that.data.KeyInput = e.detail.value.trim();
        if (that.data.KeyInput == '') {
            that.setData({
                btnColor: true
            });
        } else {
            that.setData({
                btnColor: false
            });
        }
    },
    setsubmit: function () {
        var that = this;
        if (that.data.btnColor == false) {
            that.data.argsdata = {
                uid: that.data.authorid,
                amount: that.data.amount,
                wechat_num: that.data.KeyInput
            }
            that.userApi.userapply(that.data.argsdata, 'cb_userapply');
        } else {
            wx.showToast({
                title: '填写的微信号哦~',
                duration: 2000,
                image: '/pages/images/warning.png'
            });
        }
    },
    cb_userapply: function (res, opt) {
        let that = this;
        if (res.code == 0) {
            that.setData({
                setmoney: false,
            });
        }
    },
    getknow: function () {
        var that = this;
        wx.switchTab({
            url: '/pages/prize/index/index'
        })
    }
});
