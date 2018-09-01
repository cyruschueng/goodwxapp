/**
 * @file pk主页，陌生人、好友公用
 *      参数说明：
 *          段位入场：gradeType段位和appearanceFee
 *          邀请好友：userId用户id
 * @author hurry
 * @date 2018/01/25
 */
import wsService from './util/ws';
import config from './config';
import comConfig from '../../utils/config';
import util from '../../utils/util';
import animationUtil from './util/animation';
import bgAudioUtil from './util/bgAudio';
import * as t from '../../utils/loginKey';
import REPORT_LOG from '../../enums/REPORT_LOG';
const bgAudioManager = util.audioManager;
const app = getApp();
// websocket服务
let socketService;
let reconnectCount = 1;

Page({
	data: {
        // 计数器
        timer: {
            type: config.CAL_TYPE.ADD,
            num: 1,
            isShow: true
        },
        // 网络是否连接
        isNetworkConnected: true,
        // websocket是否关闭
        isWSClose: false,
        // 好友房间是否创建成功
        isFriendRingCreated: false,
        // 好友是否征求再来一局
        isAskReplayFriendRing: false,
        // 是否显示vs
        isShowVs: false,
        // 是否显示“寻找对手中...”
        isShowFindEnemyTips: false,
        game: {
            status: config.GAME_STATUS.FIND,
            type: ''
        },
        // 当前用户
        userInfo: {
            baseInfo: null,
            offset: {
                top: '10%'
            },
            isShowAvatar: true
        },
        // 参数中的userId
        userId: '',
        // 对手信息
        enemyInfo: {
            baseInfo: null,
            isShowAvatar: false
        },
        /**
         * @params {Object} 问题
         * @params {Object} question.options选项
         * @params {Object} question.result结果
         * @params {Number} currentRound结果
         * @params {String} tag
         * @params {String} title
         */
        question: {
            options: null,
            result: null,
            currentRound: 1,
            tag: '',
            title: '',
            // 配合动画使用
            // 是否显示问题tag
            tagDisplayType: config.DISPLAY_TYPE.HIDDEN,
            // 是否显示问题标题
            isShowQustionTitle: false,
            // 问题是否结束，倒计时结束触发、qustionOptions都选择完成触发
            isQuestionOver: false,
            // 是否显示问题选项
            isShowQuestionOptions: false,
        },
        // 头像信息
        avatar: {
            isHiddenOtherInfo: true
        },
        // pk结果
        result: {
            // 是否显示最终结果
            isShowTotal: false,
            totalScore: 0,
            enemyTotalScore: 0
        },
        leftCloud: {
            top: '38%',
            moveOffset: '-80',
            offsetX: '-80rpx'
        },
        rightCloud: {
            top: '0',
            moveOffset: '-80',
            offsetX: '-80rpx'
        },
        shareShow: null
    },
    // 初始化websocket
    initSocket: function (obj) {
        let wsOpt = {};
        if (obj.userId) {
            // 邀请好友
            if (+obj.userId === +this.data.userInfo.baseInfo.userId) {
                console.log(obj.pkServer);
                // 邀请者
                wsOpt = {
                    cmd: config.CMD_TYPE.CLIENT.CREATE_FRIEND_RING
                };
            } else {
                var friendUserId = this.GetQueryString('appId', decodeURIComponent(obj.pkServer)) + ':' + this.GetQueryString('openId', decodeURIComponent(obj.pkServer));
                // 被邀请者
                wsOpt = {
                    cmd: config.CMD_TYPE.CLIENT.JOIN_FRIEND_RING,
                    data: { friendUserId }
                };
                this.setData({ friendUserId })
            }
            this.setData({
                isShowVs: true,
                'timer.isShow': false,
                userId: +obj.userId
            });
        } else {
            // 陌生人
            wsOpt = {
                cmd: obj.rateType === config.GAME_TYPE.PK ? config.CMD_TYPE.CLIENT.MATCH : config.CMD_TYPE.CLIENT.TESTING,
                data: {
                    gradeType: +obj.gradeType
                }
            };
            animationUtil.findStrangerAnimation(this);
        }
        // 寻找对手中
        // bgAudioUtil.playAudio(util.getBgMusics.FIND_PLAYER);
        bgAudioManager.play(util.getBgMusics.FIND_PLAYER)
        wsOpt.onSocketClose =this.onSocketClose.bind(this);
        wsOpt.onSocketError = this.onSocketError.bind(this);
        obj.pkServer = wx.getStorageSync('PK_SERVER');
        this.socketService = wsService(obj.pkServer, wsOpt, this.data.userInfo.baseInfo.userId);
        this.socketService.on(this.onSocketMessage.bind(this));
    },
    init: function (obj) {
        if (this.data.game.type === config.GAME_TYPE.INVITE) {
            this.setData({
                'enemyInfo.isShowAvatar': true
            });
        }
        this.initSocket(obj);
    },
    GetQueryString: function(name, pkServer){
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = pkServer.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    onSocketClose: function () {
        if (this.isJudgeWSClose && [config.GAME_STATUS.FIND, config.GAME_STATUS.PK].indexOf(this.data.game.status) > -1 && reconnectCount < 5) {
            reconnectCount++;
            // 寻找好友和pk中重连
            this.socketService.reconnect();
            this.setData({
                isWSClose: true
            });
            return;
        }
        this.setData({
            isWSClose: true
        });
        if (this.isJudgeWSClose) {
            wx.showModal({
                content: '连接失败，请重新进入',
                showCancel: false,
                success: () => {
                    wx.navigateBack();
                }
            });
        }
    },
    onSocketError: function (res) {
        this.setData({
            isWSClose: true
        });
        wx.showModal({
            content: 'PK场太拥挤了，重进试试吧',
            showCancel: false,
            success: () => {
                wx.navigateBack();
            }
        });
    },
    onLoad: function (obj) {
        t.requestLog('page', REPORT_LOG.MINI_PK_PAGE);
        reconnectCount = 1;
        // util();
        const me = this;
        me.isJudgeWSClose = true;
        me.isGameOver = false;
        me.isErrorExit = false;
        //分享类型
        var rateType = obj.rateType;
        var shareType = 'pk';
        if (rateType === 'invite') {
            shareType = 'friendPK';
        }
        me.setData({
            'game.type': rateType,
            shareType,
            shareShow: app.globalData.shareShow
        });
        util.getShareMoney(shareType, me);

        let userInfo = this.getUserInfo();
        userInfo.appearanceFee = obj.appearanceFee;
        me.setData({
            'userInfo.baseInfo': userInfo
        }, function () {
            me.init(obj);
        });
        wx.updateShareMenu({
            withShareTicket: true
        });
        wx.onNetworkStatusChange(function(res) {
            me.setData({
                isNetworkConnected: res.isConnected,
            });
        })
    },
    getUserInfo: function () {
        return wx.getStorageSync('PROFILE');
    },
    onUnload: function () {
        // 网络已连接 && websocket已连接 &&  非异常退出 && 非游戏结束 && 已获取对手信息
        if (this.data.isNetworkConnected && !this.data.isWSClose && !this.isErrorExit && !this.isGameOver && this.data.enemyInfo.baseInfo) {
            // pk赛pk中逃跑
            const appearanceFee = this.data.userInfo.baseInfo.appearanceFee;
            // 主动退赛
            wx.setStorageSync('DEDUCTMONEY', appearanceFee);
            this.socketService.send(config.CMD_TYPE.CLIENT.RUNAWAY);
        }

        this.isJudgeWSClose = false;
        this.socketService.close();
        bgAudioUtil.stop();
    },
    // 监听服务端信息
    onSocketMessage: function (res) {
        const me = this;
        const dt = JSON.parse(res.data);
        const data = dt.data;
        console.log('[' + (new Date().getTime()) + ']:' + dt.cmd);
        switch (dt.cmd) {
            case config.CMD_TYPE.SERVER.INTRODUCE:
                if (me.data.game.type === config.GAME_TYPE.INVITE) {
                    me.setData({
                        isFriendRingCreated: me.data.userId === me.data.userInfo.baseInfo.userId,
                        'enemyInfo.baseInfo': data.enemy,
                        'enemyInfo.isShowAvatar': true
                    });
                    return;
                }
                // 匹配成功
                animationUtil.introduceThenPkAnimation(me, data).then(() => {
                    if (me.data.game.type === config.GAME_TYPE.PK) {
                        this.isJudgeWSClose && me.socketService.send(config.CMD_TYPE.CLIENT.READY);
                    }
                });
                break;
            case config.CMD_TYPE.SERVER.QUESTION:
                if (me.data.game.type === config.GAME_TYPE.INVITE && me.data.game.status === config.GAME_STATUS.FIND) {
                    // 好友pk
                    animationUtil.beginFriendQuestion(me, data).then(() => {
                        animationUtil.questionAnimation(me, data);
                    });
                    return;
                }
                animationUtil.questionAnimation(me, data);
                break;
            case config.CMD_TYPE.SERVER.REPORT:
                data.enemyOption++;
                data.correctOption++;
                // 下发成绩
                me.setData({
                    'question.result': data
                });
                break;
            case config.CMD_TYPE.SERVER.FINAL_REPORT:
                me.isGameOver = true;
                me.isJudgeWSClose = false;
                if (data.enemyRunway) {
                    me.setData({
                        isShowVs: false
                    });
                    wx.showToast({
                        title: '对方已逃跑'
                    });
                }
                util.getShareMoney(me.data.shareType, me);
                // 本题最终成绩
                animationUtil.showGameOverPageAnimation(me, data);
                break;
            case config.CMD_TYPE.SERVER.RING_CREATED:
                // 好友比赛创建房间成功
                break;
            case config.CMD_TYPE.SERVER.ASK_REPLAY_FRIEND_RING:
                me.setData({
                    isAskReplayFriendRing: true
                });
                // 当前好友想继续比赛
                wx.showModal({
                    content: '对方邀请您再来一局',
                    confirmText: '进入',
                    success: (res) => {
                        if (res.confirm) {
                            this.socketService.send(
                                config.CMD_TYPE.CLIENT.REPLAY_FRIEND_RING_OK,
                                { friendUserId: me.data.friendUserId }
                            );
                            this.playAgain(false);
                        }
                    }
                });
                break;
            case config.CMD_TYPE.SERVER.RING_CANCELED:
            case config.CMD_TYPE.SERVER.FRIEND_RING_HAS_BEGIN:
            case config.CMD_TYPE.SERVER.JOIN_NOT_FOUND_FRIEND_RING:
                // 好友离开
                if (dt.cmd === config.CMD_TYPE.SERVER.RING_CANCELED && me.data.userId === me.data.userInfo.baseInfo.userId) {
                    // 当前用户是擂主，对手离开
                    me.setData({
                        'enemyInfo.baseInfo': null,
                        isFriendRingCreated: false
                    });
                    return;
                }

                me.isJudgeWSClose = false;
                me.setData({
                    'game.status': config.GAME_STATUS.FIND_ERROR,
                    'timer.isShow': false,
                    'enemyInfo.baseInfo': null,
                    joinNotFoundFriendRing: dt.cmd !== config.CMD_TYPE.SERVER.FRIEND_RING_HAS_BEGIN,
                    friendRingHasBegin: dt.cmd === config.CMD_TYPE.SERVER.FRIEND_RING_HAS_BEGIN,
                    isShowVs: false
                });
                break;
            case config.CMD_TYPE.SERVER.ERROR:
                me.isErrorExit = true;
                me.isJudgeWSClose = false;
                wx.showModal({
                    showCancel: false,
                    content: dt.message || '服务端异常',
                    confirmText: '知道了',
                    success: () => {
                        wx.navigateBack();
                    }
                });
                break;
        }
    },
    // 放弃比赛
    onGiveUp: function () {
        t.requestLog('button', REPORT_LOG.MINI_PK_GIVEUP);
        this.socketService.send(config.CMD_TYPE.CLIENT.CANCEL_FRIEND_RING);
        wx.navigateBack();
    },
    // 页面分享
    onShareAppMessage: function (e) {
        var me = this;
        if (e.from === 'button' && e.target.dataset.type === config.SHARE_TYPE.INVITE) {
            let obj = util.inviteFriendShareObj();
            obj.success = () => {
                t.requestLog('share', REPORT_LOG.MINI_PK_REINVITE_SHARE_OK);

                if (this.data.game.status === config.GAME_STATUS.OVER || this.data.game.status === config.GAME_STATUS.FIND_ERROR) {
                    // 结束邀请，需重新创建房间
                    this.socketService.send(
                        config.CMD_TYPE.CLIENT.CREATE_FRIEND_RING,
                        { token: this.data.userInfo.baseInfo.token }
                    );
                    this.playAgain(true);
                }
            }
            return obj;
        }
        var where = me.data.shareType;
        return {
            title: `我在诗词大会获得了${this.data.result.totalScore}分，加入挑战赢取iPhone X！`,
            path: `/pages/loading/index?where=${where}`,
            imageUrl: util.getShareImgUrl(),
            success: () => {
                t.requestLog('share', REPORT_LOG.MINI_PK_SHARE_OK);

                var selfData = me.data;
                var shareMoney = selfData.shareMoney;
                var shareType = selfData.shareType;
                shareMoney && util.getShareAward(shareType, function () {
                    me.setData({
                        shareMoney: 0,
                        extraShareInfo: ''
                    });
                });
            }
        };
    },
    // 回答回调
    onAnswerEvent: function (e) {
        this.socketService.send(
            config.CMD_TYPE.CLIENT.ANSWER,
            {
                option: e.detail.selectedIndex - 1,
                currentRound: this.data.question.currentRound
            }
        );
    },
    // 当前问题回答结束
    onQuestionOverEvent: function (e) {
        // questionOptions触发
        this.currentQuestionOver(e.detail.selectedIndex);
    },
    // 问题选项动画结束回调
    onOptionsAnimationendEvent: function () {
        // questionOptions触发
        this.setData({
            timer: {
                type: config.CAL_TYPE.MINUS,
                num: config.COUNT_DOWN_NUM,
                isShow: true
            },
        });
    },
    currentQuestionOver: function (selectedIndex) {
        this.setData({
            'question.isQuestionOver': true
        });
        // 答案没回来
        if (!this.data.question.result) {
            return;
        }

        animationUtil.questionOverAnimation(this, selectedIndex, this.data.question.result);
    },
    onCountDownEndEvent: function () {
        if (
            this.data.game.status === config.GAME_STATUS.FIND
            && this.data.game.type === config.GAME_TYPE.PK
            && !this.data.enemyInfo.baseInfo
        ) {
            // pk寻找对手，10s之后无反应
            // setTimeout(() => {
                wx.showModal({
                    showCancel: false,
                    content: '无敌是多么寂寞，无人敢应战',
                    confirmText: '重新挑战',
                    success: () => {
                        wx.navigateBack();
                    }
                });
            // }, 1000);
            return;
        }
        // pk阶段倒计时结束，自动结束问题
        if (this.data.game.status === config.GAME_STATUS.PK) {
            this.currentQuestionOver(-1);
        }
    },
    onPlayAgainTap: function (e) {
        t.requestLog('button', REPORT_LOG.MINI_PK_PLAYAGAIN);
        if (this.data.game.type === config.GAME_TYPE.INVITE) {
            this.socketService.send(config.CMD_TYPE.CLIENT.REPLAY_FRIEND_RING);
            this.playAgain(true);
            return;
        }
        // 继续挑战， 跳转到挑战赛首页
        wx.navigateBack();
    },
    /**
     * @params {Boolean} isCreater 是否擂主
     */
    playAgain: function (isCreater) {
        this.setData({
            'game.status': config.GAME_STATUS.FIND,
            isFriendRingCreated: false,
            'enemyInfo.baseInfo': null,
            'userInfo.isWinner': false,
            'enemyInfo.isWinner': false,
            'timer.isShow': false,
            isShowDoubleCombo: false,
            userId: isCreater ? this.data.userInfo.baseInfo.userId : this.data.userId,
            finalReport: null,
            question: {
                options: null,
                result: null,
                currentRound: 1,
                tag: '',
                title: '',
                // 配合动画使用
                // 是否显示问题tag
                tagDisplayType: config.DISPLAY_TYPE.HIDDEN,
                // 是否显示问题标题
                isShowQustionTitle: false,
                // 问题是否结束，倒计时结束触发、qustionOptions都选择完成触发
                isQuestionOver: false,
                // 是否显示问题选项
                isShowQuestionOptions: false,
            },
            result: {
                // 是否显示最终结果
                isShowTotal: false,
                totalScore: 0,
                enemyTotalScore: 0
            },
        });
    },
    onBeginFriendRingTap: function () {
        t.requestLog('button', REPORT_LOG.MINI_PK_START);
        this.socketService.send(config.CMD_TYPE.CLIENT.BEGIN_FRIEND_RING);
    },
    // 参加排位赛
    onJoinPkRate: function () {
        wx.redirectTo({
            url: '/packagePK/joinPkRate/index'
        });
    }
});
