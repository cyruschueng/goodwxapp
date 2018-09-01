/**
 * @file 诗词大会index页
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
var quickerInterval = animationIntervel.QUICKER;
var quickInterval = animationIntervel.QUICK;
var normalInterval = animationIntervel.NORMAL;
var slowInterval = animationIntervel.SLOW;
const bgMusicManager = util.bgMusicManager;
const bgAudioManager = util.audioManager;
const bgMusics = util.getBgMusics;
const app = getApp();
//排位赛动画
var pkAnimation = wx.createAnimation({
    duration: quickerInterval,
    timingFunction: 'ease'
});
//好友对战动画
var inviteAnimation = wx.createAnimation({
    duration: quickerInterval,
    timingFunction: 'ease'
});
//排行榜动画
var rankAnimationData = wx.createAnimation({
    duration: quickerInterval,
    timingFunction: 'ease'
});
//为了onShow时触发领取奖励弹窗  场景：新手训练之后从PK页返回
var triggerShowDialog = 1;
Page({
    data: {
        inviteAnimationData: {},
        rankAnimationData: {},
        pkAnimationData: {},
        triggerShowDialog: triggerShowDialog,
        validSession: false,
        isAndroid: util.isAndroid(),
        shareShow: null
    },
    goPlayerProfile() {
        t.requestLog('button', REPORT_LOG.MINI_HOME_GOPROFILE);
    },
    goPlayerInfo() {
        t.requestLog('button', REPORT_LOG.MINI_HOME_GOINFO);
    },
    onLoad: function (options) {
        t.requestLog('page', REPORT_LOG.MINI_HOME_PAGE);
        var me = this;
        var token = wx.getStorageSync('TOKEN');
        var skipUrl = options.skipUrl ? decodeURIComponent(options.skipUrl) : '';
        wxService({
            url: serverHost + PATHS.GET_MY_VALUE,
            data: {
                key: 'um:qun:fe:shareShow'
            },
            success(res) {
                app.globalData.shareShow = +res;
                me.setData({
                    shareShow: +res
                })
            }
        });
        me.setData({
            skipUrl: skipUrl
        });
        wx.checkSession({
            success: function () {
                if (token) {
                    me.updateUserInfo(skipUrl);
                }
                else {
                    me.doLogin();
                }
            },
            fail: function () {
                me.doLogin();
            }
        });
        // wx.onBackgroundAudioStop(function () {
        //     bgMusicManager.play(bgMusics.BG_MUSIC);
        // });
    },
    doLogin: function () {
        var me = this;
        t.queryLoginKey().then(function (loginKey) {
            wx.setStorageSync('TOKEN', loginKey);
            me.updateUserInfo(me.data.skipUrl);
        });
    },
    onShow: function () {
        var me = this;
        var token = wx.getStorageSync('TOKEN');
        var validSession = me.data.validSession;
        if (token && validSession) {
            me.updateUserInfo('');
            me.setData({
                triggerShowDialog: ++triggerShowDialog
            });
        }
    },
    updateUserInfo: function (skipUrl) {
        var me = this;
        wxService({
            url: serverHost + PATHS.PROFILE,
            data: {},
            success: function (backendData) {
                var profile = backendData.profile;
                wx.setStorageSync('PROFILE', profile);
                me.setData({
                    profile,
                    validSession: true,
                    season: backendData.season
                });
                if (skipUrl) {
                    if (skipUrl.indexOf('/pk/index') > -1) {
                        bgMusicManager.stop();
                    }
                    setTimeout(function () {
                        wx.navigateTo({
                            url: skipUrl
                        });
                    }, 500);
                }
            },
            isShowLoading: true,
            loadingTip: '登录中',
            loadingMask: true
        });
    },
    btnClickVoice: function () {
        bgAudioManager.play(bgMusics.CLICK_BTN);
    },
    toJoinRate: function () {
        t.requestLog('button', REPORT_LOG.MINI_HOME_QUALIFIER);
        var me = this;
        me.btnClickVoice();

        pkAnimation.opacity(0.7).scale(0.95).step();
        pkAnimation.opacity(1).scale(1).step();
        me.setData({
            pkAnimationData: pkAnimation.export()
        });
        setTimeout(function () {
            wx.navigateTo({
                url: '/packagePK/joinPkRate/index'
            });
        }, 100);
    },
    jumpToRank: function () {
        t.requestLog('button', REPORT_LOG.MINI_HOME_RANK);
        var me = this;
        me.btnClickVoice();
        rankAnimationData.scale(0.95).opacity(0.7).step();
        rankAnimationData.scale(1).opacity(1).step();
        me.setData({
            rankAnimationData: rankAnimationData.export()
        });
        setTimeout(function () {
            wx.navigateTo({
                url: '/packageInfo/rank/index'
            });
        }, 100);
    },
    jumpToHome: function () {
        console.log(111)
    },
    inviteFriend: function () {
        t.requestLog('button', REPORT_LOG.MINI_HOME_INVITE);
        var me = this;
        me.btnClickVoice();
        inviteAnimation.scale(0.95).opacity(0.7).step();
        inviteAnimation.scale(1).opacity(1).step();
        me.setData({
            inviteAnimationData: inviteAnimation.export()
        });
    },
    updateMoney: function (e) {
        var me = this;
        var totalMoney = me.data.profile.money + e.detail.money;
        me.setData({
            'profile.money': totalMoney
        });
    },
    sendKefuMsg: function (e) {
        var type = e.currentTarget.dataset.type || '';

        const type_name = (type === 'help' ? REPORT_LOG.MINI_HOME_HELP : REPORT_LOG.MINI_HOME_LIBAO);
        t.requestLog('button', type_name);
    },
    onShareAppMessage: function (options) {
        var me = this;
        var title, path, imageUrl, successHandler;
        if (options.from === 'button') {
            var profile = me.data.profile;
            var userId = profile.userId;
            var obj = util.inviteFriendShareObj();
            imageUrl = obj.imageUrl;
            title = obj.title;
            path = obj.path;
            var pkServer = wx.getStorageSync('PK_SERVER');
            if (!pkServer) {
                wx.showModal({
                    content: '获取服务器地址有误，请重新打开',
                    showCancel: false,
                    success() {
                        wx.navigateBack();
                    }
                });
            }
            successHandler = function () {
                t.requestLog('share', REPORT_LOG.MINI_HOME_INVITE_SHARE_OK);
                bgMusicManager.stop();
                wx.navigateTo({
                    url: '/packagePK/pk/index?rateType=invite&userId=' + userId + '&pkServer=' + encodeURIComponent(pkServer)
                });
            };
        }
        else {
            title = '打擂台上诗词大会，赢取iPhone X';
            path = util.generateSharePath();
            imageUrl = util.getShareImgUrl();
            successHandler = function (res) {
                console.log(res, 123123131313131);
                t.requestLog('share', REPORT_LOG.MINI_HOME_SHARE_OK);
            };
        }
        return {
            title,
            path,
            imageUrl,
            success(res) {
                successHandler(res);
            },
            fail() {

            },
            complete() {

            }
        }
    }
});
