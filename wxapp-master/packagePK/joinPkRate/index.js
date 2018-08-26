/**
 * @file 诗词大会参加排位赛
 * @author niejianhui
 */
import config from '../../utils/config';
import util from '../../utils/util';
import wxService from '../../utils/wxService';
import * as t from '../../utils/loginKey';
import REPORT_LOG from '../../enums/REPORT_LOG';
const PATHS = config.PATHS;
const serverHost = config.SERVER_HOST;
const animationIntervel = config.ANIMATION_INTERVAL;
var quickInterval = animationIntervel.QUICK;
var normalInterval = animationIntervel.NORMAL;
var slowInterval = animationIntervel.SLOW;
const bgMusicManager = util.bgMusicManager;
const bgAudioManager = util.audioManager;
const bgMusics = util.getBgMusics;
var hasClicked = false;
//动画
var gradeAnimation = wx.createAnimation({
    duration: quickInterval,
    timingFunction: 'ease'
});
Page({
    data: {
        typeArray: [
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f55eb40b4.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f55030094.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f55e8742c.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f54ff4170.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f54f933d8.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f54fc8ead.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f54f66f61.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f550b402f.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f55090af1.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f54f34607.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f54f065c4.png',
            'https://imgs.genshuixue.com/0cms/d/file/content/2018/01/5a67f550668f0.png'
        ],
        gradeAnimationData: {},
        currentIndex: -1,
        isAndroid: util.isAndroid()
    },
    onLoad: function (options) {
        t.requestLog('page', REPORT_LOG.MINI_QUALIFIER_PAGE);
        // wx.onBackgroundAudioStop(function () {
        //     bgMusicManager.play(bgMusics.BG_MUSIC);
        // });
    },
    onShow: function () {
        var me = this;
        me.updateProfile();
        me.setData({
            currentIndex: -1
        });
        var deductMoney = wx.getStorageSync('DEDUCTMONEY');
        if (deductMoney) {
            wx.showModal({
                'title': '你逃跑了',
                'content': '银子 －' + deductMoney + '兩',
                showCancel: false,
                success: function () {

                }
            });
            wx.removeStorageSync('DEDUCTMONEY');
        }
    },
    updateProfile: function () {
        var me = this;
        wxService({
            url: serverHost + PATHS.PROFILE,
            data: {},
            success: function (backendData) {
                var profile = backendData.profile;
                me.setData({
                    profile: profile,
                    season: backendData.season,
                    currentGradeId: 'current-grade'
                });
                wx.setStorageSync('PROFILE', profile);
                gradeAnimation.scale(1).opacity(1).step();
                me.setData({
                    gradeAnimationData: gradeAnimation.export()
                });
            },
            isShowLoading: true,
            loadingTip: '加载中',
            loadingMask: true
        });
    },
    setAnimation: function (e, flag) {
        t.requestLog('button', REPORT_LOG.MINI_QUALIFIER_DUANWEI);
        var me = this;
        var index = +e.currentTarget.dataset.index;
        flag && bgMusicManager.stop();
        bgAudioManager.play(bgMusics.CLICK_BTN);
        me.setData({
            currentIndex: index
        });
        setTimeout(function () {
            me.setData({
                currentIndex: -1
            });
        }, 300);
    },
    showRemindDialog: function (e) {
        t.requestLog('button', REPORT_LOG.MINI_QUALIFIER_DUANWEI_NOMONEY);
        var me = this;
        me.setAnimation(e, true);
        wx.showModal({
            title: '提示',
            content: '你的银子不足，可通过每天登录奖励，分享或参与低段位排位赛赚取银子',
            showCancel: false
        });
    },
    onShareAppMessage: function (options) {
        var me = this;
        return {
            title: '打擂台上诗词大会，赢取iPhone X',
            path: util.generateSharePath(),
            imageUrl: util.getShareImgUrl(),
            success: function () {
                t.requestLog('share', REPORT_LOG.MINI_QUALIFIER_SHARE_OK);
            },
            fail: function () {

            },
            complete: function () {

            }
        }
    }
});
