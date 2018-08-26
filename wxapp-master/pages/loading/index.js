/**
 * @file 诗词大会loading页
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
var slowerInterval = animationIntervel.SLOWER;
var slowestInterval = animationIntervel.SLOWEST;
const USERINFO = 'USERINFO';
const bgMusicManager = util.bgMusicManager;
const bgMusics = util.getBgMusics;
//动画们  其实这些动画元素应该抽成组件的 一开始没设计好  时间关系没来得及改。。。
var lightAnimation = wx.createAnimation({
    duration: slowInterval,
    timingFunction: 'ease'
});
var darkAnimation = wx.createAnimation({
    duration: slowInterval,
    timingFunction: 'ease'
});
var textAnimation = wx.createAnimation({
    duration: slowInterval,
    timingFunction: 'ease'
});
var leftCloudAnimation = wx.createAnimation({
    duration: slowInterval,
    timingFunction: 'ease-out'
});
var rightCloudAnimation = wx.createAnimation({
    duration: slowInterval,
    timingFunction: 'ease-out'
});
var hideBgAnimation = wx.createAnimation({
    duration: slowInterval,
    timingFunction: 'ease'
});
Page({
    data: {
        authFailed: false,
        lightAnimationData: {},
        darkAnimationData: {},
        textAnimationData: {},
        leftCloudAnimationData: {},
        rightCloudAnimationData: {},
        hideBgAnimationData: {},
        noticeDialogData: null,
    },
    onLoad: function (options) {
        t.requestLog('page', REPORT_LOG.MINI_LOADING_PAGE);
        if (options.where === "pk") {
            t.requestLog('page', REPORT_LOG.MINI_QUALIFIER_SHARE_IN);
        } else if (options.skipUrl) {
            t.requestLog('page', REPORT_LOG.MINI_HOME_FRIENDPK_SHARE_IN);
        } else if (options.where = "friendPk") {
            t.requestLog('page', REPORT_LOG.MINI_PK_REINVITE_SHARE_IN);
        }
        var me = this;
        //停机维护公告弹窗
        wxService({
            url: serverHost + PATHS.GET_MY_VALUE,
            data: {
                key: 'um:qun:fe:maintain'
            },
            success: function (backendData) {
                if (+backendData) {
                    me.setData({
                        noticeDialogData: JSON.parse(backendData),
                    });
                }
                else {
                    me.doAnimations(options);
                }
            }
        });
    },
    doAnimations: function (options) {
        var me = this;
        // bgMusicManager.play(bgMusics.BG_MUSIC);
        var skipUrl = options.skipUrl || '';
        me.setData({
            skipUrl: skipUrl
        });

        //动画们
        setTimeout(function () {
            lightAnimation.opacity(1).scale(1).step();
            me.setData({
                lightAnimationData: lightAnimation.export()
            });
        }, 100);

        setTimeout(function () {
            darkAnimation.opacity(1).scale(1).step();
            textAnimation.opacity(1).scale(1).step();
            me.setData({
                darkAnimationData: darkAnimation.export(),
                textAnimationData: textAnimation.export()
            });
        }, 300);

        setTimeout(function () {
            leftCloudAnimation.opacity(1).translateX(10).step({duration: 100});
            leftCloudAnimation.opacity(1).translateX(140).step();
            leftCloudAnimation.opacity(1).translateX(150).step();
            leftCloudAnimation.opacity(0).translateX(160).step({duration: 100});
            rightCloudAnimation.opacity(1).translateX(-10).step({duration: 100});
            rightCloudAnimation.opacity(1).translateX(-140).step();
            rightCloudAnimation.opacity(1).translateX(-150).step();
            rightCloudAnimation.opacity(0).translateX(-160).step({duration: 100});
            me.setData({
                leftCloudAnimationData: leftCloudAnimation.export(),
                rightCloudAnimationData: rightCloudAnimation.export()
            });
        }, 1000);

        setTimeout(function () {
            var userInfo = wx.getStorageSync(USERINFO);
            if (userInfo) {
                me.skipToIndex(skipUrl);
            }
            else {
                wx.getUserInfo({
                    success: function (res) {
                        wx.setStorageSync(USERINFO, res.userInfo);
                        me.skipToIndex(skipUrl);
                    },
                    fail: function () {
                        me.setData({
                            authFailed: true
                        });
                    }
                });
            }
        }, 2500);
    },
    getUserInfo: function (e) {
        var me = this;
        var skipUrl = me.data.skipUrl;
        var userInfo = e.detail.userInfo;
        if (userInfo) {
            wx.setStorageSync(USERINFO, userInfo);
            me.skipToIndex(skipUrl);
        }
    },
    createFadeOutAnimation: function () {
        hideBgAnimation.opacity(0).scale(0.25).step();
        textAnimation.opacity(0).scale(0.25).step();
        this.setData({
            hideBgAnimationData: hideBgAnimation.export(),
            textAnimationData: textAnimation.export()
        });
    },
    skipToIndex: function (skipUrl) {
        var me = this;
        // 获取邀请好友的websocket地址，保存到storage中
        wxService({
            url: serverHost + PATHS.PK_SERVER,
            success: (res) => {
                wx.setStorageSync('PK_SERVER', res.server);
                var url = '/pages/index/index';
                if (skipUrl) {
                    url += '?skipUrl=' + skipUrl
                }
                me.createFadeOutAnimation();
                wx.redirectTo({
                    url: url
                });
            }
        });
    }
});
