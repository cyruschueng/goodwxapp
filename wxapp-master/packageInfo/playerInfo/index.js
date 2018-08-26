/**
 * @file 诗词大会个人信息页
 * @author niejianhui
 */
import config from '../../utils/config';
import util from '../../utils/util';
import wxService from '../../utils/wxService';
import * as t from '../../utils/loginKey';
import REPORT_LOG from '../../enums/REPORT_LOG';
var Charts = require('../../utils/Charts.js')
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
const bgMusicManager = util.bgMusicManager;
const bgMusics = util.getBgMusics;
const app = getApp();
Page({
    data: {
        gradeMap: config.GRADE_MAP,
        isAndroid: util.isAndroid(),
        shareShow: null
    },
    goPlayerProfile() {
        t.requestLog('button', REPORT_LOG.MINI_USER_INFO_GOPROFILE);
    },
    onLoad: function (options) {
        t.requestLog('page', REPORT_LOG.MINI_USER_INFO_PAGE);
        this.setData({
            shareShow: app.globalData.shareShow
        })
        var me = this;
        // wx.onBackgroundAudioStop(function () {
        //     bgMusicManager.play(bgMusics.BG_MUSIC);
        // });
        wx.updateShareMenu({
            withShareTicket: true
        });
        wxService({
            url: serverHost + PATHS.PROFILE,
            data: {},
            success: function (backendData) {
                me.setData({
                    profile: backendData.profile
                });
            },
            isShowLoading: true,
            loadingTip: '登录中',
            loadingMask: true
        });
        util.getShareMoney('groupRank', me);
        var systemInfo = wx.getSystemInfoSync();
        var windowWidth = systemInfo.windowWidth;
        var pxPercent = windowWidth * 2 / 750;
        var radarWidth = 266 * pxPercent - 10;
        var radarHeight = 240 * pxPercent;
        //radar 图
        wxService({
            url: serverHost + PATHS.RADAR,
            success: function (backendData) {
                var radar = backendData.radar;
                me.setData({
                    radar: radar,
                    pkInfo: backendData.pkInfo
                });
                var radarChart = new Charts({
                    canvasId: 'info-canvas',
                    type: 'radar',
                    dataPointShape: false,
                    legend: false,
                    categories: me.getItemArray(radar.polar, 'text'),
                    categoriesOffset: {
                        '0': {
                            Y: -8
                        },
                        '3': {
                            Y: 3
                        },
                        '4': {
                            X: -12,
                            Y: -3
                        },
                        '5': {
                            X: -15,
                            Y: 3
                        },
                    },
                    series: [
                        {
                            data: radar.series,
                            color: '#31D486'
                        }
                    ],
                    width: radarWidth,
                    height: radarHeight,
                    extra: {
                        radar: {
                            maxDataArray: me.getItemArray(radar.polar, 'max'),
                            gridColor: '#9D9D9E',
                            labelColor: '#ffffff',
                            labelFontSize: '16'
                        }
                    }
                });
            },
            isShowLoading: true,
            loadingTip: '加载中',
            loadingMask: true
        });
    },
    getItemArray: function (objArray, key) {
        var arr = [];
        for(var i = 0; i < objArray.length; i++) {
            arr.push(objArray[i][key]);
        }
        return arr;
    },
    onShareAppMessage: function (options) {
        var me = this;
        return {
            title: '本群诗词才情排行在此，看看你能排第几？',
            path: util.generateSharePath('/pages/shareRank/index'),
            imageUrl: 'https://imgs.genshuixue.com/0cms/d/file/content/2018/02/5a72c661ab220.png',
            success: function () {
                t.requestLog('share', REPORT_LOG.MINI_USER_INFO_SHARE_OK);
                var shareMoney = me.data.shareMoney;
                shareMoney && util.getShareAward('groupRank', function (totalMoney) {
                    me.setData({
                        'profile.money': totalMoney,
                        shareMoney: 0,
                        extraShareInfo: ''
                    });
                });
            },
            fail: function () {

            },
            complete: function () {

            }
        }
    },
    onclickShare() {
        t.requestLog('button', REPORT_LOG.MINI_USER_INFO_SHARE);
    }
});
